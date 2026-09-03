# Supabase setup

Two things live here: SQL migrations (run in the dashboard) and Edge Functions
(deployed from your machine).

## 1. Migrations

Run these **in order**, in the Supabase dashboard → SQL Editor → New query →
paste → Run. "Success. No rows returned" is what success looks like.

| File | What it creates |
| --- | --- |
| `migrations/0001_discussion.sql` | `profiles`, `posts`, `comments`, `post_votes` — the forum tab |
| `migrations/0002_proficiency.sql` | `concept_states`, `assessment_responses` — the assessment tab |
| `migrations/0003_response_detail.sql` | rubric breakdown, transcripts, and grader confidence on the review log |

`0002` depends on `0001` (it references `public.profiles`), so don't skip it.

Every table has row-level security on. Forum content is world-readable and
author-writable; proficiency data is readable and writable only by the user it
belongs to.

## 2. Edge Functions

The tutor and the open-response grader both call the Anthropic API. **That API
key must never be in the web app** — anything in `web/src/` ships to the browser
and can be read by anyone who opens devtools. These functions exist so the key
stays server-side.

Until they're deployed, the app degrades honestly rather than silently: the
Tutor tab says the tutor isn't deployed, and written-answer questions in the
Assessment tab report that they can't be scored and record nothing. Numeric and
multiple-choice questions are graded in the browser and work without any of
this.

### Deploy

Supabase does **not** support installing the CLI as a global npm package, so use
`npx` (nothing to install) or a platform package manager:

```bash
npx supabase --version               # any platform
scoop install supabase               # Windows, if you use scoop
brew install supabase/tap/supabase   # macOS / Linux
```

Check the API key before deploying anything that depends on it:

```bash
ANTHROPIC_API_KEY=sk-ant-... ./supabase/test-key.sh
```

That validates the key for free (`GET /v1/models`), then sends one real message
as the exact model the functions use — which is what distinguishes "bad key"
from "valid key, no credit on the account".

Log in once, then deploy from the repo root:

```bash
npx supabase login
ANTHROPIC_API_KEY=sk-ant-... ./supabase/deploy.sh YOUR_PROJECT_REF
```

Your project ref is the subdomain in your project URL: for
`https://abcdefgh.supabase.co`, the ref is `abcdefgh`. Get an API key at
<https://console.anthropic.com/settings/keys>.

Run the deploy script from Git Bash, not PowerShell — `VAR=value cmd` is not
PowerShell syntax. Or do it by hand, which works in any shell:

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
npx supabase functions deploy tutor
npx supabase functions deploy grade
```

### Optional settings

```bash
# Restrict CORS to your deployed site (defaults to "*")
supabase secrets set ALLOWED_ORIGIN=https://your-site.example

# Override the model (defaults to claude-sonnet-5)
supabase secrets set ANTHROPIC_MODEL=claude-sonnet-5
```

### Checking it worked

```bash
supabase functions list          # both should appear as ACTIVE
supabase functions logs tutor    # errors from the function show up here
```

If the Tutor tab still reports "not deployed", the usual causes are a project
ref pointing at a different project than `web/.env`, or a deploy that failed
partway — `supabase functions list` distinguishes them.

## How the grader scores

The judge does not return a mark. It returns per-rubric-element credit on fixed
anchors — 1.0 fully present and justified, 0.75 correct but thinly justified, 0.5
right idea with the mechanism missing, 0.25 vocabulary without substance, 0
absent — plus one sentence per element saying what earned that credit and what
full credit needed.

The score is computed **in the function, not by the model**: a weighted sum over
elements, then two caps. A `required` element below 0.5 caps the total at 0.5; a
forbidden move committed at 0.5 or more caps it at 0.3. Keeping the arithmetic in
code means models aren't asked to do weighted sums, and a rubric change can be
replayed over the stored response log instead of re-billing every past response.

`web/tools/verifyGrading.ts` (`npm run verify:grading` in `web/`) tests that
arithmetic — including that a strictly better answer can never score lower, which
is the property that makes a spectrum meaningful.

## Billing (Stripe)

Payments use **Stripe Checkout** and the **Customer Portal** — both hosted by
Stripe. Card details are entered on Stripe's domain and never reach this app or
its database, which is what keeps us out of PCI-DSS scope. Nothing here stores a
card number.

### One-time Stripe setup

1. Create an account at <https://dashboard.stripe.com>. Stay in **Test mode**
   (toggle, top right) until you're ready to charge real money.
2. **Products → Add product**, twice:
   - *Graded* — recurring, monthly, $8. Copy the **price id** (`price_...`).
   - *Tutored* — recurring, monthly, $15. Copy its price id.
3. **Developers → API keys** → copy the **Secret key** (`sk_test_...`).
4. **Developers → Webhooks** (Stripe now labels this area *Event destinations*,
   and the button *Add destination* — same feature, renamed). Note the order:
   events are chosen **before** the URL.
   - **Events**: `checkout.session.completed`, `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`
   - **Events from**: *Your account* (not Connected accounts)
   - **Destination type**: *Webhook endpoint* (not Amazon EventBridge)
   - **URL**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/stripe-webhook`
   - Create, then reveal and copy the **signing secret** (`whsec_...`).
5. **Settings → Billing → Customer portal** → activate it.

### Deploy with billing

```bash
ANTHROPIC_API_KEY=sk-ant-... \
STRIPE_SECRET_KEY=sk_test_... \
STRIPE_WEBHOOK_SECRET=whsec_... \
STRIPE_PRICE_GRADED=price_... \
STRIPE_PRICE_TUTORED=price_... \
./supabase/deploy.sh YOUR_PROJECT_REF
```

Omit the Stripe variables and everything else still deploys; the pricing page
then reports that billing isn't configured.

### Testing without real money

In test mode use card `4242 4242 4242 4242`, any future expiry, any CVC. Card
`4000 0000 0000 9995` is declined, which is worth trying once to see the
`past_due` path. Watch webhook deliveries under **Developers → Webhooks**; a
red delivery there is why a subscription didn't apply.

### Why the webhook is the only writer

`subscriptions` has a read policy for the owning user and **no write policy at
all**. Entitlement is money, so the sole writer is the webhook, running with the
service role. If users could write that table, a single PostgREST call would
grant a paid tier. The tier is re-checked server-side inside `grade`, `tutor`,
and `transcribe` before any paid work happens — the UI gate is only courtesy.

## Cost note

Both functions bill per call to your Anthropic account. The grader runs once per
written answer; the tutor once per message. Neither is called for numeric or
multiple-choice questions.

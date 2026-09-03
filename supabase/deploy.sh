#!/usr/bin/env bash
#
# Deploys the tutor and grader Edge Functions.
#
# Usage, from the repo root:
#   ANTHROPIC_API_KEY=sk-ant-... ./supabase/deploy.sh <project-ref>
#
# The project ref is the subdomain of your Supabase URL: for
# https://abcdefgh.supabase.co it is "abcdefgh".
#
# Safe to re-run — deploying is an overwrite, and setting a secret replaces it.

set -euo pipefail

PROJECT_REF="${1:-}"

if [ -z "$PROJECT_REF" ]; then
  echo "usage: ANTHROPIC_API_KEY=sk-ant-... $0 <project-ref>" >&2
  exit 1
fi

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "error: ANTHROPIC_API_KEY is not set." >&2
  echo "Get one at https://console.anthropic.com/settings/keys" >&2
  exit 1
fi

# Billing is optional: without Stripe keys the AI functions still deploy, and
# the pricing page reports that billing is not set up rather than breaking.
DEPLOY_BILLING=0
if [ -n "${STRIPE_SECRET_KEY:-}" ]; then
  if [ -z "${STRIPE_WEBHOOK_SECRET:-}" ] || [ -z "${STRIPE_PRICE_GRADED:-}" ] || [ -z "${STRIPE_PRICE_TUTORED:-}" ]; then
    echo "error: STRIPE_SECRET_KEY is set, but STRIPE_WEBHOOK_SECRET," >&2
    echo "       STRIPE_PRICE_GRADED and STRIPE_PRICE_TUTORED are also required." >&2
    exit 1
  fi
  DEPLOY_BILLING=1
fi

# Supabase does not support a global npm install, so prefer an installed binary
# and fall back to npx, which needs nothing on the machine.
if command -v supabase >/dev/null 2>&1; then
  SUPABASE="supabase"
else
  echo "==> supabase CLI not on PATH, using npx"
  SUPABASE="npx --yes supabase@latest"
fi

cd "$(dirname "$0")/.."

echo "==> Linking to project $PROJECT_REF"
$SUPABASE link --project-ref "$PROJECT_REF"

# The key is passed via env rather than as an argument so it does not land in
# the shell history or in the process list.
echo "==> Setting ANTHROPIC_API_KEY"
$SUPABASE secrets set "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY"

if [ "$DEPLOY_BILLING" = "1" ]; then
  echo "==> Setting Stripe secrets"
  $SUPABASE secrets set \
    "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" \
    "STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET" \
    "STRIPE_PRICE_GRADED=$STRIPE_PRICE_GRADED" \
    "STRIPE_PRICE_TUTORED=$STRIPE_PRICE_TUTORED"
fi

echo "==> Deploying functions"
$SUPABASE functions deploy tutor
$SUPABASE functions deploy grade
$SUPABASE functions deploy transcribe

if [ "$DEPLOY_BILLING" = "1" ]; then
  $SUPABASE functions deploy stripe-checkout
  $SUPABASE functions deploy stripe-portal
  # config.toml turns JWT verification off for this one; it authenticates by
  # verifying Stripe's signature instead.
  $SUPABASE functions deploy stripe-webhook
else
  echo "==> Skipping Stripe functions (STRIPE_SECRET_KEY not set)"
fi

echo
echo "Done. Verify with:"
echo "  $SUPABASE functions list"
echo "  $SUPABASE functions logs grade"

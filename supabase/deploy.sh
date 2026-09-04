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
  echo "usage: $0 <project-ref> [function ...]" >&2
  echo >&2
  echo "  $0 abcdefgh              deploy every function" >&2
  echo "  $0 abcdefgh grade        deploy only the grader" >&2
  echo >&2
  echo "Secrets are kept unless you supply them:" >&2
  echo "  ANTHROPIC_API_KEY=sk-ant-... $0 abcdefgh" >&2
  exit 1
fi

# Secrets live in the Supabase project, not in this script, so they only need
# setting when they change. Omit them and the existing values are kept — which
# makes redeploying after a code change a one-liner rather than a hunt through
# five dashboards for keys that are already correct.
#
# Values are shape-checked before being written. Overwriting a working secret
# with a placeholder is silent and expensive to diagnose: the deploy succeeds,
# and the failure surfaces much later as an authentication error from the
# provider, which looks like a key that was revoked rather than one we broke.
SET_ANTHROPIC=0
if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  case "$ANTHROPIC_API_KEY" in
    *...*|*"<"*|*" "*)
      echo "error: ANTHROPIC_API_KEY looks like a placeholder, not a key." >&2
      echo "       Paste the whole key from https://console.anthropic.com/settings/keys" >&2
      exit 1
      ;;
    sk-ant-*) ;;
    *)
      echo "error: ANTHROPIC_API_KEY should start with 'sk-ant-'." >&2
      exit 1
      ;;
  esac
  if [ ${#ANTHROPIC_API_KEY} -lt 40 ]; then
    echo "error: ANTHROPIC_API_KEY is only ${#ANTHROPIC_API_KEY} characters — truncated?" >&2
    exit 1
  fi
  SET_ANTHROPIC=1
fi

SET_STRIPE=0
if [ -n "${STRIPE_SECRET_KEY:-}" ]; then
  if [ -z "${STRIPE_WEBHOOK_SECRET:-}" ] || [ -z "${STRIPE_PRICE_GRADED:-}" ] || [ -z "${STRIPE_PRICE_TUTORED:-}" ]; then
    echo "error: STRIPE_SECRET_KEY is set, but STRIPE_WEBHOOK_SECRET," >&2
    echo "       STRIPE_PRICE_GRADED and STRIPE_PRICE_TUTORED are also required." >&2
    echo "       Set all four, or none (to keep the values already stored)." >&2
    exit 1
  fi
  SET_STRIPE=1
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
if [ "$SET_ANTHROPIC" = "1" ]; then
  echo "==> Setting ANTHROPIC_API_KEY"
  $SUPABASE secrets set "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY"
else
  echo "==> Keeping the stored ANTHROPIC_API_KEY"
fi

if [ "$SET_STRIPE" = "1" ]; then
  echo "==> Setting Stripe secrets"
  $SUPABASE secrets set \
    "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" \
    "STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET" \
    "STRIPE_PRICE_GRADED=$STRIPE_PRICE_GRADED" \
    "STRIPE_PRICE_TUTORED=$STRIPE_PRICE_TUTORED"
fi

# Deploy every function, or just the ones named as extra arguments:
#   ./supabase/deploy.sh <ref>              -> all
#   ./supabase/deploy.sh <ref> grade        -> only the grader
# Note stripe-webhook relies on config.toml to disable JWT verification; it
# authenticates by verifying Stripe's signature instead.
ALL_FUNCTIONS="tutor grade transcribe stripe-checkout stripe-portal stripe-sync stripe-webhook"

shift || true
FUNCTIONS="${*:-$ALL_FUNCTIONS}"

echo "==> Deploying:$(printf ' %s' $FUNCTIONS)"
for fn in $FUNCTIONS; do
  if [ ! -d "supabase/functions/$fn" ]; then
    echo "error: no such function: $fn" >&2
    exit 1
  fi
  $SUPABASE functions deploy "$fn"
done

echo
echo "Done. Verify with:"
echo "  $SUPABASE functions list"
echo "  $SUPABASE functions logs grade"

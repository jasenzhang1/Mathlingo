#!/usr/bin/env bash
#
# Checks an Anthropic API key before deploying anything that depends on it.
#
# Usage, from the repo root:
#   ANTHROPIC_API_KEY=sk-ant-... ./supabase/test-key.sh
#
# Runs two checks:
#   1. GET /v1/models  — validates the key, costs nothing.
#   2. POST /v1/messages with the exact model the Edge Functions use, which is
#      what catches "key works but has no credit" and "model not available to
#      this account". Costs a fraction of a cent.

set -uo pipefail

MODEL="${ANTHROPIC_MODEL:-claude-sonnet-5}"
API="https://api.anthropic.com/v1"

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "error: ANTHROPIC_API_KEY is not set." >&2
  echo "usage: ANTHROPIC_API_KEY=sk-ant-... $0" >&2
  exit 1
fi

echo "==> 1/2  Validating the key (GET /v1/models, no tokens spent)"
status=$(curl -sS -o /tmp/anthropic-models.json -w '%{http_code}' "$API/models" \
  --header "x-api-key: $ANTHROPIC_API_KEY" \
  --header "anthropic-version: 2023-06-01")

if [ "$status" != "200" ]; then
  echo "FAILED (HTTP $status)"
  cat /tmp/anthropic-models.json
  echo
  case "$status" in
    401) echo "-> The key is invalid, revoked, or has a typo (check for a trailing space)." ;;
    403) echo "-> The key is valid but not permitted to do this." ;;
    *)   echo "-> See the message above." ;;
  esac
  exit 1
fi
echo "    key is valid."

echo "==> 2/2  Sending a real message as model '$MODEL'"
status=$(curl -sS -o /tmp/anthropic-message.json -w '%{http_code}' "$API/messages" \
  --header "x-api-key: $ANTHROPIC_API_KEY" \
  --header "anthropic-version: 2023-06-01" \
  --header "content-type: application/json" \
  --data "{\"model\":\"$MODEL\",\"max_tokens\":64,\"messages\":[{\"role\":\"user\",\"content\":\"Reply with exactly: setup ok\"}]}")

if [ "$status" != "200" ]; then
  echo "FAILED (HTTP $status)"
  cat /tmp/anthropic-message.json
  echo
  case "$status" in
    400) echo "-> Usually an unknown model id, or no credit on the account." ;;
    429) echo "-> Rate limited. Wait a moment and retry." ;;
    529) echo "-> Anthropic is overloaded. Retry shortly." ;;
  esac
  echo "-> Add credit at https://console.anthropic.com/settings/billing"
  exit 1
fi

echo
echo "    response: $(sed -n 's/.*"text":"\([^"]*\)".*/\1/p' /tmp/anthropic-message.json)"
echo
echo "Key works with model '$MODEL'. You can deploy:"
echo "  ANTHROPIC_API_KEY=\$ANTHROPIC_API_KEY ./supabase/deploy.sh sqayuyawppdnkggklhzc"

rm -f /tmp/anthropic-models.json /tmp/anthropic-message.json

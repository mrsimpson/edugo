#!/usr/bin/env bash
# Validate arc42 architecture documents.
# Exits 1 if there are real model errors (excluding E013 = DOMPurify/Node 24 bug).
# With --strict flag, also fails on hints.
#
# Usage: ./scripts/arc42-validate.sh [--strict]

set -euo pipefail

DOCS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/docs"
STRICT=false

for arg in "$@"; do
  case $arg in
    --strict) STRICT=true ;;
  esac
done

if ! command -v arc42 &>/dev/null; then
  echo "arc42 CLI not found. Install @doctc/arc42 globally: npm install -g @doctc/arc42@0.24.0"
  exit 1
fi

cd "$DOCS_DIR"
JSON=$(arc42 validate --format json 2>&1)
VALID=$(echo "$JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('valid', False))")
DIAGS=$(echo "$JSON" | python3 -c "
import sys, json
d = json.load(sys.stdin)
diags = d.get('diagnostics', [])
# E013 = DOMPurify/Node 24 bug — not our code
real_errors = [x for x in diags if x['severity'] == 'error' and x.get('code') != 'E013']
warnings    = [x for x in diags if x['severity'] == 'warning']
hints       = [x for x in diags if x['severity'] == 'hint']
for d in real_errors:
    print(f\"error {d['code']}  {d['file']}:{d['line']}  {d['message']}\")
for d in warnings:
    print(f\"warning {d['code']}  {d['file']}:{d['line']}  {d['message']}\")
for d in hints:
    print(f\"hint {d['code']}  {d['file']}:{d['line']}  {d['message']}\")
print(f\"COUNTS:{len(real_errors)}:{len(warnings)}:{len(hints)}\")
")

echo "$DIAGS" | grep -v "^COUNTS:" || true

COUNTS=$(echo "$DIAGS" | grep "^COUNTS:" | cut -d: -f2-)
ERRORS=$(echo "$COUNTS" | cut -d: -f1)
WARNINGS=$(echo "$COUNTS" | cut -d: -f2)
HINTS=$(echo "$COUNTS" | cut -d: -f3)

echo ""
echo "arc42 validate: ${ERRORS} model errors, ${WARNINGS} warnings, ${HINTS} hints (E013/DOMPurify excluded)"

if [ "$ERRORS" -gt 0 ]; then
  echo "FAIL: model errors found"
  exit 1
fi

if [ "$STRICT" = true ] && [ "$HINTS" -gt 0 ]; then
  echo "FAIL (--strict): hints found"
  exit 1
fi

echo "OK"
exit 0

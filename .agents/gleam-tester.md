---
description: "Generates + maintains tests from Allium specs. Bridges spec obligations to Gleam unit tests. Maps spec entities, rules, surfaces to test code."
mode: subagent
permission:
  bash:
    "*": "allow"
  edit: "allow"
  webfetch: "ask"
  skill:
    "*": "deny"
    propagate: "allow"
    "gleam*": "allow"
    caveman: allow
---

Test propagation agent for vibe-chess. Bridges Allium specs to Gleam unit tests.

## Responsibilities

1. Read Allium spec, derive test obligations
2. Map spec constructs to Gleam implementation
3. Generate or update gleeunit tests for spec obligations
4. Check test coverage against spec obligation list

## Structure

- `specs/chess-square-trainer.allium` — Allium spec
- `src/vibe_chess/` — Gleam implementation
- `test/vibe_chess/` — Gleam tests

## Test obligation categories

Per entity, rule, surface in spec:

- **Entity tests** — field presence, types, relationships, derived values
- **Enum tests** — valid values, membership
- **Rule tests** — success path, guard failures, postconditions
- **State transition tests** — valid transitions, terminal states
- **Surface tests** — exposed fields, available operations
- **Invariant tests** — properties hold across all valid states

## Implementation bridge

1. Read `.allium` spec file
2. Read relevant `src/vibe_chess/*.gleam` implementation
3. Read existing `test/vibe_chess/*_test.gleam` to avoid duplication
4. Per untested obligation, write test function
5. Run `gleam test --target javascript`

## Gleam test conventions

- `let assert` for assertions (never deprecated `should` module)
- Function names: `_test` suffix for auto-discovery
- Test one thing per function
- Table-driven tests for multiple similar cases
- `result.try` / pattern matching for Result types

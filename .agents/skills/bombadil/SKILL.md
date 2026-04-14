---
name: bombadil
description: Property-based testing for web UIs. Use when writing UI tests, fuzz testing web apps, or validating web application correctness with Bombadil.
---

# Bombadil — Property-Based Testing for Web UIs

Bombadil is property-based testing (fuzzing) for web UIs. It autonomously explores and validates correctness properties, finding harder bugs earlier. It runs locally, in CI, and inside Antithesis.

## When to use this skill

- Writing UI tests for web applications
- Replacing or supplementing Playwright/Cypress example-based tests
- Fuzz testing web UIs for unexpected states, inputs, or action sequences
- Validating correctness properties (invariants, guarantees, state machines) of a web app

## Installation

### CLI binary

**macOS (aarch64):**
```bash
curl -L -o bombadil https://github.com/antithesishq/bombadil/releases/download/v0.4.2/bombadil-aarch64-darwin
chmod +x bombadil
mv ./bombadil ~/.local/bin/bombadil
```

**Linux (x86_64):**
```bash
curl -L -o bombadil https://github.com/antithesishq/bombadil/releases/download/v0.4.2/bombadil-x86_64-linux
chmod +x bombadil
mv ./bombadil ~/.local/bin/bombadil
```

Do not download the executable with a web browser — it will be blocked by GateKeeper on macOS.

### TypeScript types

```bash
npm install --save-dev @antithesishq/bombadil
```

## How Bombadil works

Bombadil runs in a loop:
1. Extracts the current state from the browser
2. Checks all properties against the current state, recording violations
3. Selects the next action based on the current state, and performs it
4. Waits for the next event (page navigation, DOM mutation, or timeout)
5. Returns to step 1

You provide **properties** (what should be true) and **action generators** (what can be done). Bombadil does the rest.

## Running tests

### Basic test with defaults
```bash
bombadil test https://example.com
```

### Test with custom specification
```bash
bombadil test https://example.com spec.ts
```

### Test with output and exit-on-violation (useful in CI)
```bash
bombadil test https://example.com spec.ts --output-path results --exit-on-violation
```

### Inspect test results
```bash
bombadil inspect results
```

## Specification structure

A specification is a plain TypeScript/JavaScript ES module that exports **properties** and **action generators**:

```typescript
export const myProperty = ...;
export const myAction = ...;
```

Always re-export defaults unless you want to override them entirely:

```typescript
export * from "@antithesishq/bombadil/defaults";
```

Or selectively:

```typescript
export { noUncaughtExceptions } from "@antithesishq/bombadil/defaults/properties";
export { clicks, reload } from "@antithesishq/bombadil/defaults/actions";
```

## Core concepts

### Extractors

Use `extract` to pull state from the browser. It runs on every captured state and returns a `Cell<T>`:

```typescript
const pageTitle = extract(state => state.document.title || "");
const notificationCount = extract(state =>
    state.document.body.querySelectorAll(".notification").length,
);
```

Access the current value with `.current`.

### Properties (Formulas)

Properties are exported formulas. The main temporal operators:

- `always(x)` — x holds in this and every future state
- `eventually(x)` — x holds in this or any future state
- `next(x)` — x holds in the next state
- `now(() => ...)` — wraps a thunk into a formula for use with logical connectives

Logical connectives (methods on formulas):
- `x.and(y)` — both hold
- `x.or(y)` — at least one holds
- `x.implies(y)` — if x holds then y holds
- `x.not()` or `not(x)` — negation

Time-bounded guarantees:
```typescript
eventually(() => condition).within(5, "seconds")
```

### Action generators

Custom action generators use the `actions` function:

```typescript
export const myAction = actions(() => {
    const point = someExtractor.current;
    return point ? [{ Click: { name: "my-element", point } }] : [];
});
```

Action types:
- `"Back"`, `"Forward"`, `"Reload"`, `"Wait"`
- `{ Click: { name, content?, point } }`
- `{ DoubleClick: { name, content?, point, delayMillis } }`
- `{ TypeText: { text, delayMillis } }`
- `{ PressKey: { code } }`
- `{ ScrollUp: { origin, distance } }`
- `{ ScrollDown: { origin, distance } }`

Weighted action generators:
```typescript
export const navigation = weighted([
    [10, back],
    [1, forward],
    [1, reload],
]);
```

## Common property patterns

### Invariant: condition always holds
```typescript
export const max_notifications = always(() =>
    notificationCount.current <= 5,
);
```

### Guarantee: something eventually happens
```typescript
export const errorDisappears = always(
    now(() => errorMessage.current !== null).implies(
        eventually(() => errorMessage.current === null).within(5, "seconds"),
    ),
);
```

### State machine: valid transitions
```typescript
const unchanged = now(() => {
    const current = counterValue.current;
    return next(() => counterValue.current === current);
});

const increment = now(() => {
    const current = counterValue.current;
    return next(() => counterValue.current === current + 1);
});

export const counterStateMachine =
    always(unchanged.or(increment).or(decrement));
```

### Sliding window: compare to past state
```typescript
import { time } from "@antithesishq/bombadil";

export const constantCount = now(() => {
    const start = time.current;
    return always(() =>
        notificationCount.current === notificationCount.at(start),
    );
});
```

### Contextful guarantee: value from past appears in future
```typescript
export const notificationIncludesMessage = always(() => {
    const nameEntered = name.current?.trim() ?? "";
    return now(() => nameEntered !== "")
        .and(next(() => submitInProgress.current))
        .implies(eventually(() =>
            notificationText.current?.includes(nameEntered) ?? false,
        ).within(5, "seconds"));
});
```

## CLI reference

### `bombadil test <ORIGIN> [SPECIFICATION_FILE]`

| Option | Description | Default |
|--------|-------------|---------|
| `--output-path <PATH>` | Where to store trace, screenshots, etc. | — |
| `--exit-on-violation` | Exit on first failing property | — |
| `--width <WIDTH>` | Viewport width in pixels | 1024 |
| `--height <HEIGHT>` | Viewport height in pixels | 768 |
| `--device-scale-factor <FACTOR>` | Viewport scaling (high-DPI) | 2 |
| `--instrument-javascript <LIST>` | JS coverage: "files", "inline" | files,inline |
| `--headless` | Run browser in headless mode | — |
| `--no-sandbox` | Disable Chromium sandboxing | — |

### `bombadil test-external <ORIGIN> [SPECIFICATION_FILE]`

Same as `test` plus:

| Option | Description |
|--------|-------------|
| `--remote-debugger <URL>` | Address to remote debugger (e.g. http://localhost:9222) |
| `--create-target` | Create new tab and navigate to origin |

### `bombadil inspect <TRACE_PATH>`

| Option | Description | Default |
|--------|-------------|---------|
| `--port <PORT>` | Port for inspect server | 1073 |
| `--no-open` | Skip auto-opening browser | — |

## Importing in specifications

```typescript
// Local modules
import { thing } from "./lib/thing.ts";

// NPM packages (limited runtime, no NodeJS)
import equal from "deep-equal";

// Non-code files (use import attributes)
import data from "./fixtures/data.json" with { type: "json" };
import contents from "./wordlist.txt" with { type: "text" };
import raw from "./snapshot.dat" with { type: "binary" };

// JSON by extension alone also works
import data from "./fixtures/data.json";
```

## Key rules

1. Properties must be exported from the top-level specification module
2. Action generators must be exported from the top-level specification module
3. Actions returned should depend on extractors/cells to validate they are possible in the current state
4. The specification file must only export properties and action generators
5. Use `extract` for browser state access — it runs inside the browser context
6. Always wrap property conditions in thunks (arrow functions with no args) for temporal operators

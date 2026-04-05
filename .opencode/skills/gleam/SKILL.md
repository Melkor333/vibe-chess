---
name: gleam
description: Write idiomatic Gleam code targeting JavaScript — syntax, types, Result handling, the use expression, pipelines, and project tooling
license: MIT
compatibility: opencode
metadata:
  target: javascript
---

# Gleam (JavaScript target)

Gleam is a statically typed functional language that compiles to Erlang (BEAM) and JavaScript. This skill covers the **JavaScript target only**. It has no null, no exceptions, no implicit conversions, and no mutable state. If it compiles, it is unlikely to crash at runtime.

## Project structure

```
gleam new my_app                        # scaffold
gleam run --target javascript           # compile + run on JavaScript
gleam test --target javascript          # run tests on JavaScript
gleam add envoy argv                    # add Hex dependencies
gleam build --target javascript         # compile only
```

Always pass `--target javascript`. To make it the default, set it in `gleam.toml`:

```toml
target = "javascript"
```

`gleam.toml` holds metadata and dependencies. `manifest.toml` pins exact versions — commit it. Source in `src/`, tests in `test/`, dev tooling in `dev/`.

Module names follow the file path: `src/my_app/user.gleam` → `import my_app/user`. Always place modules inside a directory named after your package to avoid global namespace collisions.

## Language basics

```gleam
// snake_case for variables/functions, PascalCase for types/constructors
// Comments with //, doc comments with ///

import gleam/io
import gleam/string

pub fn main() {
  let name = "Joe"
  io.println("Hello, " <> name <> "!")
}
```

- All values are immutable. Rebinding a name does not mutate the original.
- `let x = expr` — assignment. `let _unused = expr` — silence unused warning.
- Blocks `{ expr1\nexpr2 }` return the last expression.
- No `return` keyword — functions return their last expression.

## Types

**Primitives:** `Int`, `Float`, `String`, `Bool`, `Nil`

Float operators are distinct: `+.`, `-.`, `*.`, `/.`. Integer division truncates.

**JavaScript float behaviour:** floats are native JS 64-bit doubles. Exceeding the maximum representable value produces `Infinity` or `-Infinity`; dividing two infinities produces `NaN`. This differs from the Erlang target, which raises an error on overflow instead.

**Collections:**
```gleam
let nums = [1, 2, 3]           // List(Int) — immutable linked list
let more = [0, ..nums]         // prepend (efficient), append is O(n)
let pair = #("hello", 42)      // tuple #(String, Int)
```

**Custom types:**
```gleam
pub type Shape {
  Circle(radius: Float)
  Rectangle(width: Float, height: Float)
}

// Single-variant records are idiomatic structs
pub type User {
  User(id: Int, name: String, active: Bool)
}

let u = User(id: 1, name: "Lucy", active: True)
let updated = User(..u, active: False)  // record update syntax
echo u.name                             // field accessor
```

**Generic types:**
```gleam
pub type Pair(a, b) {
  Pair(first: a, second: b)
}
```

**Type aliases** (use sparingly — they don't add type safety):
```gleam
pub type UserId = Int
```

## Results and errors

Gleam has no exceptions. Fallible functions return `Result(OkType, ErrorType)`.

```gleam
pub type AppError {
  NotFound(id: Int)
  Unauthorised
}

pub fn find_user(id: Int) -> Result(User, AppError) {
  case id {
    0 -> Error(NotFound(id:))
    _ -> Ok(User(id:, name: "Lucy", active: True))
  }
}
```

Handle results with `case`, or chain them with `result.try` / `result.map`:

```gleam
import gleam/result

// Chain: stops at first Error
fn run(id: Int) -> Result(String, AppError) {
  use user <- result.try(find_user(id))
  Ok(user.name)
}

// Unwrap with a default
let name = result.unwrap(find_user(1), or: User(0, "unknown", False)).name
```

**Convention:** Prefer `Result(a, Nil)` over `Option(a)` for fallible functions with no useful error payload. Reserve `option.Option` for data fields that are genuinely optional.

## Pattern matching

`case` is exhaustive — the compiler enforces all variants are handled.

```gleam
case shape {
  Circle(radius:) -> float.pi *. radius *. radius
  Rectangle(width:, height:) -> width *. height
}

// Multiple subjects
case x, y {
  0, 0 -> "origin"
  0, _ -> "on y-axis"
  _, 0 -> "on x-axis"
  _, _ -> "elsewhere"
}

// List patterns
case items {
  [] -> "empty"
  [x] -> "one item"
  [first, ..rest] -> "starts with " <> string.inspect(first)
}

// String prefix
case input {
  "Hello, " <> name -> name
  _ -> "unknown"
}

// Guards
case n {
  x if x > 100 -> "large"
  x if x > 0   -> "small"
  _            -> "non-positive"
}
```

Avoid catch-all `_` patterns when pattern-matching on custom types — exhaustiveness checking helps you catch unhandled cases when you add new variants.

## Functions and pipelines

```gleam
// Type annotations on all public functions (convention)
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

// Labelled arguments (order doesn't matter when labels used)
pub fn greet(name name: String, greeting greeting: String) -> String {
  greeting <> ", " <> name <> "!"
}
greet(greeting: "Hello", name: "Joe")

// Pipelines: passes left as first argument to right
"  hello  "
|> string.trim
|> string.uppercase
|> io.println

// Function captures (partial application)
let add_ten = add(10, _)
echo add_ten(5)  // 15

// Anonymous functions
let double = fn(x) { x * 2 }
```

## The `use` expression

`use` desugars callback-heavy code into linear style. It works with any function whose last argument is a callback.

```gleam
import gleam/result

// Without use — nested callbacks
fn process(id: Int) -> Result(String, AppError) {
  result.try(find_user(id), fn(user) {
    result.try(get_permissions(user), fn(perms) {
      Ok(perms.role)
    })
  })
}

// With use — linear, reads top-to-bottom
fn process(id: Int) -> Result(String, AppError) {
  use user  <- result.try(find_user(id))
  use perms <- result.try(get_permissions(user))
  Ok(perms.role)
}
```

`use` is powerful for `result.try`, `option.then`, and callback-taking functions in general (e.g. `bool.guard`, resource acquisition patterns).

## Recursion

Gleam has no loops — iteration is via recursion or standard library functions. Use `list.map`, `list.filter`, `list.fold` when working with lists; write manual recursion for more complex traversals. Gleam supports tail-call optimisation.

```gleam
// Tail-recursive with accumulator
pub fn sum(nums: List(Int)) -> Int {
  do_sum(nums, 0)
}

fn do_sum(nums: List(Int), acc: Int) -> Int {
  case nums {
    [] -> acc
    [n, ..rest] -> do_sum(rest, acc + n)
  }
}
```

## Opaque types

Make a type opaque to enforce invariants and hide implementation details:

```gleam
pub opaque type NonEmptyList(a) {
  NonEmptyList(head: a, tail: List(a))
}

pub fn new(head: a, tail: List(a)) -> NonEmptyList(a) {
  NonEmptyList(head:, tail:)
}
```

Callers can use the type but cannot construct or destructure it directly.

## Key conventions (from gleam.run/documentation/conventions-patterns-and-anti-patterns)

- **Use qualified imports** for functions: `string.reverse(s)`, not `reverse(s)`. Types and constructors may be imported unqualified.
- **Annotate all public functions** with argument and return types.
- **`snake_case`** for variables/functions/modules, **`PascalCase`** for types/constructors/variants.
- **Treat acronyms as single words**: `json`, `http`, not `JSON`, `HTTP`.
- **Conversion functions**: name them `x_to_y`, e.g. `user_to_json`. If the module name matches the type, drop the prefix: `identifier.to_string`, not `identifier.identifier_to_string`.
- **Module names are singular**: `import app/user`, not `import app/users`.
- **Avoid `_` catch-all** in case expressions on custom types.
- **No panics in libraries**: return `Result` instead of using `panic` or `let assert`.
- **Prefer `Result` over `Option`** for fallible functions.
- **Don't split modules prematurely**: a large well-designed module beats many small fragmented ones.
- **Replace bools with custom types** when the bool represents domain state.
- **Make invalid states impossible**: encode constraints in the type system rather than validating at runtime.

## Standard library highlights

```gleam
import gleam/list    // map, filter, fold, find, zip, flatten, unique, sort …
import gleam/result  // try, map, unwrap, map_error, partition …
import gleam/option  // Some, None, map, unwrap, then …
import gleam/string  // reverse, split, join, trim, contains, inspect …
import gleam/int     // to_string, parse, min, max, clamp, random …
import gleam/dict    // new, insert, get, delete, keys, values, map_values …
import gleam/set     // new, insert, delete, union, intersection …
```

Full docs: https://hexdocs.pm/gleam_stdlib/

**JavaScript-compatible core team packages:** `gleam_time`, `gleam_http`, `gleam_javascript`.
**Erlang-only — do not use on the JavaScript target:** `gleam_erlang`, `gleam_otp`.

## JavaScript target notes

- **Bit arrays** have limited support on JavaScript — not all segment options are available. Avoid bit array syntax unless you know your options are JS-compatible.
- **Integers** are represented as JS 64-bit floats, so very large integers (beyond 2^53) lose precision.
- **No OTP / processes** — `gleam_otp` actors and supervisors are unavailable. Use JavaScript concurrency primitives (promises, workers) via FFI instead.
- **FFI to JavaScript:** use `@external` to call JS functions directly.

```gleam
@external(javascript, "./my_ffi.mjs", "readFile")
pub fn read_file(path: String) -> Result(String, String)
```

The second argument is the module path (relative to the compiled output), the third is the exported function name.

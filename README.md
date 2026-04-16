# Chess2Brain

Chess2Brain is your daily training ground for chess board awareness. Sharpen your ability to recognize squares instantly -- a fundamental skill that separates confident players from the rest.

## Game Modes

### Learn the names of the fields

A square is highlighted on the board. Type its name (e.g. "e4") into the input field and submit.

> ![Name the Square mode](assets/name-the-square.webp)

### Find the field with the name

A square name is displayed (e.g. "e4"). Click the matching square on the board.

> ![Find the Square mode](assets/find-the-square.webp)

### If you know its color, you got it memorized

A square is highlighted on the board. Guess whether it is a black or white square.

> ![Color Square mode](assets/color-square.webp)

## Development

Built with [Gleam](https://gleam-lang.org/) targeting JavaScript, using the [Lustre](https://lustre.build/) framework.

### Prerequisites

- [Gleam](https://gleam-lang.org/) (target is JavaScript)
- [Node.js](https://nodejs.org/) (for Bombadil tests)

### Build and run

```bash
# Build for development
gleam build --target javascript

# Run the dev server (port 1234)
lustre dev
```

### Run tests

```bash
# Gleam unit tests
gleam test --target javascript

# Bombadil property-based UI tests (requires running server)
bombadil test http://localhost:1234 bombadil/chess-trainer.spec.ts --output-path bombadil/results

# Inspect Bombadil results
bombadil inspect bombadil/results
```

## Design

Swiss International Typographic Style. Muted green/gray palette (`#4a5c4a`, `#6b8b6b`, `#8ba88b`, `#a8a8a0`, `#6b6b5c`). Helvetica Neue typography. Sharp corners, no rounded edges. CSS lives in `src/vibe_chess.css`.

## Architecture

The app follows Lustre's Model-Update-View pattern:

- **Model** — holds the game state (score, attempts, current square, mode, history)
- **Update** — pure function that transforms the model on each message
- **View** — renders the model into HTML, dispatching messages on user interaction

Game behaviour is specified in [Allium](https://allium-lang.org/) (`specs/chess-square-trainer.allium`). The spec defines entities, rules, and surfaces — the `trainer.gleam` module implements these rules. Bombadil tests verify the UI matches the spec through property-based fuzzing with temporal logic assertions.

### Module structure

| Module | Responsibility |
|--------|---------------|
| `vibe_chess.gleam` | Main Lustre app (init, update, view) |
| `square.gleam` | Board square types (file, rank, name), parsing, generation |
| `board.gleam` | Board abstraction, random square selection |
| `game.gleam` | Game state machine, score tracking, mode handling |
| `answer.gleam` | Answer recording for both modes |
| `trainer.gleam` | Rule implementations matching the Allium spec |
| `delay.gleam` | Lustre Effect for delayed message dispatch |

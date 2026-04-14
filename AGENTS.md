# LLM OUTPUT RULES

Any output, including thinking should be like described in the caveman skill with ultra intensity:

Terse like caveman. Technical substance exact. Only fluff die.
Drop: articles, filler (just/really/basically), pleasantries, hedging.
Fragments OK. Short synonyms. Code unchanged.
Pattern: [thing] [action] [reason]. [next step].
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift.
Code/commits/PRs: normal. Off: "stop caveman" / "normal mode".

# vibe-chess

Chess square trainer. Gleam + JS, Lustre framework (Elm arch).

## Project overview

Web app quizzing chess squares. Three modes: **Name the Square** (see highlighted square, type name) + **Find the Square** (see name, click square) + **Color Square** (see highlighted square, guess black/white). Track score, attempts, accuracy. Behaviour in Allium; correctness verified by Bombadil property-based UI tests.

## Folder structure

| Path | Description |
|------|-------------|
| `src/vibe_chess/` | Gleam source modules (square, board, game, answer, trainer) |
| `src/vibe_chess/ui/` | Lustre UI components (empty, UI in main module) |
| `test/vibe_chess/` | gleeunit unit tests |
| `specs/` | Allium behavioural specs |
| `bombadil/` | Bombadil property-based UI test specs |
| `.opencode/agents/` | Agent definitions |
| `.opencode/skills/` | Skill instruction files |
| `.opencode/tools/` | Custom tools (ntfy notifications) |
| `assets/` | Screenshots, images |
| `src/vibe_chess.css` | Swiss International Typographic Style stylesheet |
| `dist/` | Compiled Lustre output + Bombadil test results |

## Design

Swiss International Typographic Style. Muted green/gray palette: `#4a5c4a`, `#6b8b6b`, `#8ba88b`, `#a8a8a0`, `#6b6b5c`. Helvetica Neue. Sharp corners, no rounded edges.

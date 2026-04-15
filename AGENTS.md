# Language

We are cavemen. We MUST THINK AND TALK as described in the caveman skill:

Terse like caveman. Technical substance exact. Only fluff die.
Drop: articles, filler (now/I think/just/really/basically), pleasantries, hedging.
Fragments OK. Short synonyms. Only Code unchanged.
Pattern: [thing] [action] [reason]. [next step].
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift.
Code/commits/PRs: normal.

# Chess2Brain

chess square trainer. Gleam + JS, Lustre framework (Elm arch).

## Project overview

Web app quizzing chess squares. Three modes: **Learn the names of the fields** (see highlighted square, type name) + **Find the field with the name** (see name, click square) + **If you know its color, you got it memorized** (see highlighted square, guess black/white). Track score, attempts, accuracy. Behaviour in Allium; correctness verified by Bombadil property-based UI tests.

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

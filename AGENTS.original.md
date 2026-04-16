# LLM OUTPUT RULES

Any output, including thinking should be like described in the caveman skill with ultra intensity:

Terse like caveman. Technical substance exact. Only fluff die.
Drop: articles, filler (just/really/basically), pleasantries, hedging.
Fragments OK. Short synonyms. Code unchanged.
Pattern: [thing] [action] [reason]. [next step].
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift.
Code/commits/PRs: normal. Off: "stop caveman" / "normal mode".

# vibe-chess

Chess square trainer web app built with Gleam targeting JavaScript, using the Lustre framework (Elm architecture).

## Project overview

An interactive web app that quizzes players on chess board squares. Players choose between three modes: **Name the Square** (see a highlighted square, type its name) and **Find the Square** (see a name, click the square). The app tracks score, attempts, and accuracy. Behaviour is specified in Allium; correctness is verified by Bombadil property-based UI tests.

## Folder structure

| Path | Description |
|------|-------------|
| `src/vibe_chess/` | Gleam source modules (square, board, game, answer, trainer) |
| `src/vibe_chess/ui/` | Lustre UI components (currently empty, UI lives in main module) |
| `test/vibe_chess/` | gleeunit unit tests |
| `specs/` | Allium behavioural specifications |
| `bombadil/` | Bombadil property-based UI test specs |
| `.agents/` | Agent definitions and skill instruction files |
| `.opencode/tools/` | Custom tools (ntfy notifications) |
| `assets/` | Screenshots and images |
| `dist/` | Compiled Lustre output and Bombadil test results |

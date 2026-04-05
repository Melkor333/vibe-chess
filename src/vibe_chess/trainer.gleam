//// Trainer module implementing the Allium spec rules.
////
//// This module orchestrates the game rules:
//// - StartGame: Begin a new game from idle state
//// - HighlightNextSquare: Show next random square
//// - SubmitAnswer: Process player's answer
//// - ContinueAfterAnswer: Auto-highlight after answer
//// - EndGame: Finish the game

import gleam/option.{type Option, None, Some}
import vibe_chess/game.{type Game}

/// Result of submitting an answer.
pub type AnswerResult {
  AnswerResult(game: Game, correct: Bool)
}

/// Rule: StartGame
/// Requires: game.status = Idle
/// Ensures: status=Active, score=0, attempts=0, highlights next square
pub fn start_game(game: Game) -> Result(Game, String) {
  game.start(game)
}

/// Rule: HighlightNextSquare
/// Requires: game.status = Active
/// Ensures: game.current_square = random square
pub fn highlight_next_square(game: Game) -> Result(Game, String) {
  game.highlight_next(game)
}

/// Rule: SubmitAnswer
/// Requires: game.status = Active, game.current_square != null
/// Ensures: attempts+1, score+1 if correct, creates Answer, returns AnswerResult
pub fn submit_answer(
  game: Game,
  submitted_name: String,
) -> Result(AnswerResult, String) {
  case game.submit_answer(game, submitted_name) {
    Ok(#(updated, is_correct)) ->
      Ok(AnswerResult(game: updated, correct: is_correct))
    Error(e) -> Error(e)
  }
}

/// Rule: ContinueAfterAnswer
/// Triggered by AnswerResult, requires active
/// Ensures: highlights next square (already done in submit_answer)
pub fn continue_after_answer(game: Game) -> Result(Game, String) {
  case game.get_status(game) {
    game.Active -> Ok(game)
    _ -> Error("Cannot continue: game not active")
  }
}

/// Rule: EndGame
/// Requires: game.status = Active
/// Ensures: status=Finished, current_square=null
pub fn end_game(game: Game) -> Result(Game, String) {
  game.end(game)
}

/// Get the current highlighted square name for display.
/// Returns None if no square is highlighted or game not active.
pub fn get_highlighted_square_name(game: Game) -> Option(String) {
  case game.get_status(game), game.get_current_square(game) {
    game.Active, Some(sq) -> Some(sq.name)
    _, _ -> None
  }
}

/// Get accuracy when game is finished.
/// Returns None if game not finished.
pub fn get_accuracy(game: Game) -> Option(Float) {
  case game.get_status(game) {
    game.Finished -> Some(game.accuracy(game))
    _ -> None
  }
}

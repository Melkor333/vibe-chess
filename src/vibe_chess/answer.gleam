//// Answer entity.
////
//// Records a player's response to a highlighted square.
//// Supports both text answers (NameSquare mode) and
//// square click answers (FindSquare mode).

import gleam/option.{type Option, None, Some}
import vibe_chess/square.{type Square}

/// A single answer in the game.
pub type Answer {
  Answer(
    round: Int,
    highlighted_square: Square,
    submitted_name: String,
    submitted_square: Option(Square),
    correct: Bool,
  )
}

/// Create a new answer from a text submission (NameSquare mode).
pub fn new(
  round: Int,
  highlighted_square: Square,
  submitted_name: String,
) -> Answer {
  Answer(
    round:,
    highlighted_square:,
    submitted_name:,
    submitted_square: None,
    correct: submitted_name == highlighted_square.name,
  )
}

/// Create a new answer from a square click (FindSquare mode).
pub fn new_from_click(
  round: Int,
  highlighted_square: Square,
  clicked_square: Square,
) -> Answer {
  Answer(
    round:,
    highlighted_square:,
    submitted_name: clicked_square.name,
    submitted_square: Some(clicked_square),
    correct: clicked_square.name == highlighted_square.name,
  )
}

/// Get the round number.
pub fn get_round(answer: Answer) -> Int {
  answer.round
}

/// Get the highlighted square.
pub fn get_highlighted_square(answer: Answer) -> Square {
  answer.highlighted_square
}

/// Get the submitted name.
pub fn get_submitted_name(answer: Answer) -> String {
  answer.submitted_name
}

/// Get the submitted square (if from click mode).
pub fn get_submitted_square(answer: Answer) -> Option(Square) {
  answer.submitted_square
}

/// Check if the answer was correct.
pub fn is_correct(answer: Answer) -> Bool {
  answer.correct
}

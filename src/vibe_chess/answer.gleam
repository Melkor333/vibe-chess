//// Answer entity.
////
//// Records a player's response to a highlighted square.

import vibe_chess/square.{type Square}

/// A single answer in the game.
pub type Answer {
  Answer(
    round: Int,
    highlighted_square: Square,
    submitted_name: String,
    correct: Bool,
  )
}

/// Create a new answer.
pub fn new(
  round: Int,
  highlighted_square: Square,
  submitted_name: String,
) -> Answer {
  Answer(
    round:,
    highlighted_square:,
    submitted_name:,
    correct: submitted_name == highlighted_square.name,
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

/// Check if the answer was correct.
pub fn is_correct(answer: Answer) -> Bool {
  answer.correct
}

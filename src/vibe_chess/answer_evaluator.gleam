//// Answer evaluator.
//// Implements the deferred spec: AnswerEvaluator.evaluate
//// Evaluates whether a learner's answer is correct for a given question.

import chessy/fen as chessy_fen
import chessy/game as chessy_game
import chessy/moves as chessy_moves
import chessy/types as chessy_types
import gleam/list
import gleam/option
import gleam/string
import vibe_chess/question_generator
import vibe_chess/types.{type Question}

/// Evaluate whether the given answer is correct for the question.
pub fn evaluate(question: Question, answer: String) -> Bool {
  let normalized_answer = string.lowercase(string.trim(answer))

  case question.exercise_kind {
    types.NameTheSquare -> evaluate_name_the_square(question, normalized_answer)
    types.FindTheSquare -> evaluate_find_the_square(question, normalized_answer)
    types.NameTheColor -> evaluate_name_the_color(question, normalized_answer)
    types.PieceLegalMove ->
      evaluate_piece_legal_move(question, normalized_answer)
    types.PieceBestMove -> evaluate_piece_best_move(question, normalized_answer)
  }
}

/// Name the square: answer must match the square's algebraic name.
fn evaluate_name_the_square(question: Question, answer: String) -> Bool {
  answer == string.lowercase(question.correct_answer)
}

/// Find the square: answer must match the name of the target square.
fn evaluate_find_the_square(question: Question, answer: String) -> Bool {
  answer == string.lowercase(question.correct_answer)
}

/// Name the color: answer must be "light" or "dark" matching the square's color.
fn evaluate_name_the_color(question: Question, answer: String) -> Bool {
  answer == string.lowercase(question.correct_answer)
}

/// Piece legal move: answer is any square the piece can legally reach.
fn evaluate_piece_legal_move(question: Question, answer: String) -> Bool {
  case question.position_fen {
    option.Some(fen) -> {
      case chessy_fen.parse(fen) {
        Ok(position) -> {
          let chessy_square =
            question_generator.square_to_chessy(question.square)
          let legal = chessy_moves.legal_moves(position)
          let piece_moves =
            list.filter(legal, fn(m) {
              let chessy_types.Move(from, _to) = m
              from == chessy_square
            })
          let legal_destinations =
            list.map(piece_moves, fn(m) {
              let chessy_types.Move(_, to) = m
              string.lowercase(question_generator.chessy_square_to_string(to))
            })
          list.contains(legal_destinations, answer)
        }
        Error(_) -> answer == string.lowercase(question.correct_answer)
      }
    }
    option.None -> answer == string.lowercase(question.correct_answer)
  }
}

/// Piece best move: in the base implementation, any legal move is accepted.
fn evaluate_piece_best_move(question: Question, answer: String) -> Bool {
  evaluate_piece_legal_move(question, answer)
}

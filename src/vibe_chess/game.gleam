//// Game entity with state machine.
////
//// Manages the chess square trainer game state including
//// score tracking and the status transition graph.

import gleam/option.{type Option, None, Some}
import vibe_chess/board.{type Board}
import vibe_chess/square.{type Square}

/// Game status with transition graph:
/// Idle -> Active -> Active (loop) -> Finished
/// Terminal: Finished
pub type Status {
  Idle
  Active
  Finished
}

/// A chess square trainer game.
pub type Game {
  Game(
    board: Board,
    score: Int,
    attempts: Int,
    current_square: Option(Square),
    status: Status,
    answers: List(#(Int, Square, String, Bool)),
  )
}

/// Create a new idle game.
pub fn new() -> Game {
  Game(
    board: board.new(),
    score: 0,
    attempts: 0,
    current_square: None,
    status: Idle,
    answers: [],
  )
}

/// Get the game's board.
pub fn get_board(game: Game) -> Board {
  game.board
}

/// Get the game's score.
pub fn get_score(game: Game) -> Int {
  game.score
}

/// Get the game's attempts.
pub fn get_attempts(game: Game) -> Int {
  game.attempts
}

/// Get the current highlighted square.
pub fn get_current_square(game: Game) -> Option(Square) {
  game.current_square
}

/// Get the game status.
pub fn get_status(game: Game) -> Status {
  game.status
}

/// Get the game's answers history.
pub fn get_answers(game: Game) -> List(#(Int, Square, String, Bool)) {
  game.answers
}

/// Compute accuracy as a derived value.
/// Returns 0 when attempts is 0.
pub fn accuracy(game: Game) -> Float {
  case game.attempts > 0 {
    True -> int.to_float(game.score) /. int.to_float(game.attempts)
    False -> 0.0
  }
}

/// Transition: Idle -> Active (StartGame).
/// Sets score=0, attempts=0, highlights first square.
pub fn start(game: Game) -> Result(Game, String) {
  case game.status {
    Idle ->
      Ok(
        Game(
          ..game,
          status: Active,
          score: 0,
          attempts: 0,
          current_square: Some(board.random_square(game.board)),
        ),
      )
    _ -> Error("Cannot start game: not in Idle state")
  }
}

/// Highlight the next random square (Active state only).
pub fn highlight_next(game: Game) -> Result(Game, String) {
  case game.status {
    Active ->
      Ok(Game(..game, current_square: Some(board.random_square(game.board))))
    _ -> Error("Cannot highlight: game not active")
  }
}

/// Submit an answer (Active state, current_square must exist).
/// Returns updated game and whether the answer was correct.
pub fn submit_answer(
  game: Game,
  submitted_name: String,
) -> Result(#(Game, Bool), String) {
  case game.status, game.current_square {
    Active, Some(sq) -> {
      let is_correct = submitted_name == sq.name
      let new_score = case is_correct {
        True -> game.score + 1
        False -> game.score
      }
      let new_attempts = game.attempts + 1
      let answer = #(new_attempts, sq, submitted_name, is_correct)
      let new_game =
        Game(
          ..game,
          score: new_score,
          attempts: new_attempts,
          current_square: Some(board.random_square(game.board)),
          answers: list.append(game.answers, [answer]),
        )
      Ok(#(new_game, is_correct))
    }
    Idle, _ -> Error("Cannot submit answer: game not started")
    Finished, _ -> Error("Cannot submit answer: game finished")
    _, None -> Error("Cannot submit answer: no square highlighted")
  }
}

/// End the game (Active state only).
pub fn end(game: Game) -> Result(Game, String) {
  case game.status {
    Active -> Ok(Game(..game, status: Finished, current_square: None))
    _ -> Error("Cannot end game: not in Active state")
  }
}

import gleam/int
import gleam/list

//// Game entity with state machine.
////
//// Manages the chess square trainer game state including
//// score tracking and the status transition graph.

import gleam/option.{type Option, None, Some}
import vibe_chess/board.{type Board}
import vibe_chess/square.{type HardnessLevel, type Square, Level1}

/// Game mode determines how the player interacts with the board.
pub type GameMode {
  /// Player sees a highlighted square on the board and types its name.
  NameSquare
  /// Player sees a square name displayed and clicks the matching square.
  FindSquare
  /// Player sees a square name and selects if it's black or white.
  ColorSquare
}

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
    mode: GameMode,
    hardness: HardnessLevel,
    answers: List(#(Int, Square, String, Bool)),
  )
}

/// Create a new idle game with the given mode and hardness level.
pub fn new_with_mode_and_hardness(
  mode: GameMode,
  hardness: HardnessLevel,
) -> Game {
  Game(
    board: board.new(),
    score: 0,
    attempts: 0,
    current_square: None,
    status: Idle,
    mode: mode,
    hardness: hardness,
    answers: [],
  )
}

/// Create a new idle game with the given mode (default hardness: Level1).
pub fn new_with_mode(mode: GameMode) -> Game {
  new_with_mode_and_hardness(mode, Level1)
}

/// Create a new idle game in NameSquare mode (default).
pub fn new() -> Game {
  new_with_mode(NameSquare)
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

/// Get the game mode.
pub fn get_mode(game: Game) -> GameMode {
  game.mode
}

/// Get the game's hardness level.
pub fn get_hardness(game: Game) -> HardnessLevel {
  game.hardness
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

/// Pick a random square from a list of squares.
fn random_square_from_list(squares: List(Square)) -> Option(Square) {
  case list.sample(squares, 1) {
    [sq, ..] -> Some(sq)
    [] -> None
  }
}

/// Transition: Idle -> Active (StartGame).
/// Sets score=0, attempts=0, highlights first square.
pub fn start(game: Game) -> Result(Game, String) {
  case game.status {
    Idle -> {
      let level_squares = square.squares_for_level(game.hardness)
      case random_square_from_list(level_squares) {
        Some(sq) ->
          Ok(
            Game(
              ..game,
              status: Active,
              score: 0,
              attempts: 0,
              current_square: Some(sq),
            ),
          )
        None -> Error("No squares available for this level")
      }
    }
    _ -> Error("Cannot start game: not in Idle state")
  }
}

/// Highlight the next random square (Active state only).
pub fn highlight_next(game: Game) -> Result(Game, String) {
  case game.status {
    Active -> {
      let level_squares = square.squares_for_level(game.hardness)
      case random_square_from_list(level_squares) {
        Some(sq) -> Ok(Game(..game, current_square: Some(sq)))
        None -> Error("No squares available for this level")
      }
    }
    _ -> Error("Cannot highlight: game not active")
  }
}

/// Submit an answer via text input (NameSquare mode, Active state).
/// Returns updated game and whether the answer was correct.
pub fn submit_answer(
  game: Game,
  submitted_name: String,
) -> Result(#(Game, Bool), String) {
  case game.status, game.mode, game.current_square {
    Active, NameSquare, Some(sq) -> {
      let is_correct = submitted_name == sq.name
      let new_score = case is_correct {
        True -> game.score + 1
        False -> game.score
      }
      let new_attempts = game.attempts + 1
      let answer = #(new_attempts, sq, submitted_name, is_correct)
      let level_squares = square.squares_for_level(game.hardness)
      case random_square_from_list(level_squares) {
        Some(next_sq) -> {
          let new_game =
            Game(
              ..game,
              score: new_score,
              attempts: new_attempts,
              current_square: Some(next_sq),
              answers: list.append(game.answers, [answer]),
            )
          Ok(#(new_game, is_correct))
        }
        None -> Error("No squares available for this level")
      }
    }
    Idle, _, _ -> Error("Cannot submit answer: game not started")
    Finished, _, _ -> Error("Cannot submit answer: game finished")
    _, FindSquare, _ -> Error("Cannot submit text answer: wrong game mode")
    _, ColorSquare, _ -> Error("Cannot submit text answer: wrong game mode")
    _, _, None -> Error("Cannot submit answer: no square highlighted")
  }
}

/// Submit a square click answer (FindSquare mode, Active state).
/// Returns updated game and whether the clicked square was correct.
pub fn submit_square_click(
  game: Game,
  clicked_square: Square,
) -> Result(#(Game, Bool), String) {
  case game.status, game.mode, game.current_square {
    Active, FindSquare, Some(sq) -> {
      let is_correct = clicked_square.name == sq.name
      let new_score = case is_correct {
        True -> game.score + 1
        False -> game.score
      }
      let new_attempts = game.attempts + 1
      let answer = #(new_attempts, sq, clicked_square.name, is_correct)
      let level_squares = square.squares_for_level(game.hardness)
      case random_square_from_list(level_squares) {
        Some(next_sq) -> {
          let new_game =
            Game(
              ..game,
              score: new_score,
              attempts: new_attempts,
              current_square: Some(next_sq),
              answers: list.append(game.answers, [answer]),
            )
          Ok(#(new_game, is_correct))
        }
        None -> Error("No squares available for this level")
      }
    }
    Idle, _, _ -> Error("Cannot submit click: game not started")
    Finished, _, _ -> Error("Cannot submit click: game finished")
    _, NameSquare, _ -> Error("Cannot submit click: wrong game mode")
    _, ColorSquare, _ -> Error("Cannot submit click: wrong game mode")
    _, _, None -> Error("Cannot submit click: no square highlighted")
  }
}

/// Submit a color answer (ColorSquare mode, Active state).
/// The player selects black or white for the current square.
/// Returns updated game and whether the answer was correct.
/// Does NOT advance to next square — call highlight_next after the delay.
pub fn submit_color_answer(
  game: Game,
  guessed_black: Bool,
) -> Result(#(Game, Bool), String) {
  case game.status, game.mode, game.current_square {
    Active, ColorSquare, Some(sq) -> {
      let is_black = square.is_black(sq)
      let is_correct = guessed_black == is_black
      let new_score = case is_correct {
        True -> game.score + 1
        False -> game.score
      }
      let new_attempts = game.attempts + 1
      let submitted = case guessed_black {
        True -> "Black"
        False -> "White"
      }
      let answer = #(new_attempts, sq, submitted, is_correct)
      let new_game =
        Game(
          ..game,
          score: new_score,
          attempts: new_attempts,
          answers: list.append(game.answers, [answer]),
        )
      Ok(#(new_game, is_correct))
    }
    Idle, _, _ -> Error("Cannot submit color: game not started")
    Finished, _, _ -> Error("Cannot submit color: game finished")
    _, NameSquare, _ -> Error("Cannot submit color: wrong game mode")
    _, FindSquare, _ -> Error("Cannot submit color: wrong game mode")
    _, _, None -> Error("Cannot submit color: no square highlighted")
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

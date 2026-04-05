//// Chess board representation.
////
//// A board contains all 64 squares and provides operations
//// like random square selection for the trainer.

import gleam/list
import vibe_chess/square.{type Square}

/// A chess board with 64 squares.
pub opaque type Board {
  Board(squares: List(Square))
}

/// Create a new board with all 64 squares.
pub fn new() -> Board {
  Board(squares: square.all_squares())
}

/// Get all squares on the board.
pub fn squares(board: Board) -> List(Square) {
  board.squares
}

/// Get the number of squares on the board.
pub fn count(board: Board) -> Int {
  list.length(board.squares)
}

/// Select a random square from the board.
/// Uses JavaScript Math.random via FFI.
@external(javascript, "./board_ffi.mjs", "random_index")
fn random_index(max: Int) -> Int

/// Pick a random square from the board.
pub fn random_square(board: Board) -> Square {
  let idx = random_index(list.length(board.squares))
  let assert Ok(sq) =
    board.squares
    |> list.drop(idx)
    |> list.first
  sq
}

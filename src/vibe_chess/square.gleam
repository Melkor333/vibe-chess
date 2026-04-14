//// Chess board square representation.
////
//// A square is identified by its file (a-h) and rank (1-8),
//// with a computed name like "e4".

import gleam/list
import gleam/string

/// Chess board file (column).
pub type File {
  A
  B
  C
  D
  E
  F
  G
  H
}

/// Chess board rank (row).
pub type Rank {
  R1
  R2
  R3
  R4
  R5
  R6
  R7
  R8
}

/// Square color on the chess board.
pub type SquareColor {
  Black
  Light
}

/// A chess board square.
pub type Square {
  Square(file: File, rank: Rank, name: String)
}

/// Convert a file to its string representation.
pub fn file_to_string(file: File) -> String {
  case file {
    A -> "a"
    B -> "b"
    C -> "c"
    D -> "d"
    E -> "e"
    F -> "f"
    G -> "g"
    H -> "h"
  }
}

/// Convert a rank to its string representation.
pub fn rank_to_string(rank: Rank) -> String {
  case rank {
    R1 -> "1"
    R2 -> "2"
    R3 -> "3"
    R4 -> "4"
    R5 -> "5"
    R6 -> "6"
    R7 -> "7"
    R8 -> "8"
  }
}

/// Convert a file to its 0-based index.
fn file_index(file: File) -> Int {
  case file {
    A -> 0
    B -> 1
    C -> 2
    D -> 3
    E -> 4
    F -> 5
    G -> 6
    H -> 7
  }
}

/// Convert a rank to its 0-based index.
fn rank_index(rank: Rank) -> Int {
  case rank {
    R1 -> 0
    R2 -> 1
    R3 -> 2
    R4 -> 3
    R5 -> 4
    R6 -> 5
    R7 -> 6
    R8 -> 7
  }
}

/// Determine the color of a square on the chess board.
/// A square is light if (file_index + rank_index) is odd, black if even.
/// a1 (0+0=0) is Black.
pub fn color(square: Square) -> SquareColor {
  let sum = file_index(square.file) + rank_index(square.rank)
  case sum % 2 == 0 {
    True -> Black
    False -> Light
  }
}

/// Check if a square is black.
pub fn is_black(square: Square) -> Bool {
  case color(square) {
    Black -> True
    Light -> False
  }
}

/// Check if a square is light.
pub fn is_light(square: Square) -> Bool {
  case color(square) {
    Light -> True
    Black -> False
  }
}

/// Create a square from file and rank. Name is computed automatically.
pub fn new(file: File, rank: Rank) -> Square {
  Square(file:, rank:, name: file_to_string(file) <> rank_to_string(rank))
}

/// All files in order.
pub fn all_files() -> List(File) {
  [A, B, C, D, E, F, G, H]
}

/// All ranks in order.
pub fn all_ranks() -> List(Rank) {
  [R1, R2, R3, R4, R5, R6, R7, R8]
}

/// Generate all 64 squares.
pub fn all_squares() -> List(Square) {
  list.flat_map(all_files(), fn(file) {
    list.map(all_ranks(), fn(rank) { new(file, rank) })
  })
}

/// Generate squares in display order (rank 8 at top, rank 1 at bottom).
/// For use in rendering a chess board grid.
pub fn squares_for_display() -> List(Square) {
  list.flat_map([R8, R7, R6, R5, R4, R3, R2, R1], fn(rank) {
    list.map(all_files(), fn(file) { new(file, rank) })
  })
}

/// Parse a square name like "e4" into a Square.
pub fn from_name(name: String) -> Result(Square, String) {
  case string.to_graphemes(name) {
    [f, r] -> {
      let file_result = case f {
        "a" -> Ok(A)
        "b" -> Ok(B)
        "c" -> Ok(C)
        "d" -> Ok(D)
        "e" -> Ok(E)
        "f" -> Ok(F)
        "g" -> Ok(G)
        "h" -> Ok(H)
        _ -> Error("Invalid file: " <> f)
      }
      let rank_result = case r {
        "1" -> Ok(R1)
        "2" -> Ok(R2)
        "3" -> Ok(R3)
        "4" -> Ok(R4)
        "5" -> Ok(R5)
        "6" -> Ok(R6)
        "7" -> Ok(R7)
        "8" -> Ok(R8)
        _ -> Error("Invalid rank: " <> r)
      }
      case file_result, rank_result {
        Ok(file), Ok(rank) -> Ok(new(file, rank))
        Error(e), _ -> Error(e)
        _, Error(e) -> Error(e)
      }
    }
    _ -> Error("Square name must be exactly 2 characters")
  }
}

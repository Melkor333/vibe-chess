//// Question generator.
//// Implements the deferred spec: QuestionGenerator.generate
//// Produces a question appropriate for the card's exercise_kind and difficulty.

import chessy/board as chessy_board
import chessy/fen as chessy_fen
import chessy/moves as chessy_moves
import chessy/types as chessy_types
import gleam/int
import gleam/list
import gleam/option.{type Option}
import vibe_chess/types.{
  type Card, type CardDifficulty, type PieceType, type Square,
}

/// A generated question's raw data before becoming a Question entity.
pub type GeneratedQuestion {
  GeneratedQuestion(
    square: Square,
    piece_type: Option(PieceType),
    position_fen: Option(String),
    correct_answer: String,
  )
}

/// Generate a question for the given card.
/// Uses a random seed value to pick a square from the zone-filtered set.
pub fn generate(card: Card, random_index: Int) -> GeneratedQuestion {
  let available_squares = types.squares_in_zone(card.difficulty.zone_filter)
  let square = pick_square(available_squares, random_index)

  case card.exercise_kind {
    types.NameTheSquare -> generate_name_the_square(square)
    types.FindTheSquare -> generate_find_the_square(square)
    types.NameTheColor -> generate_name_the_color(square)
    types.PieceLegalMove -> generate_piece_legal_move(square, card.difficulty)
    types.PieceBestMove -> generate_piece_best_move(square, card.difficulty)
  }
}

/// Pick a square from available squares using an index (modulo length).
fn pick_square(squares: List(Square), index: Int) -> Square {
  let len = list.length(squares)
  let safe_index = case len > 0 {
    True -> index % len
    False -> 0
  }
  case list.drop(squares, safe_index) {
    [sq, ..] -> sq
    [] ->
      // Fallback - should never happen with valid inputs
      types.make_square("e", 4)
  }
}

/// Name the square: show the square on the board, ask for its algebraic name.
fn generate_name_the_square(square: Square) -> GeneratedQuestion {
  GeneratedQuestion(
    square: square,
    piece_type: option.None,
    position_fen: option.None,
    correct_answer: square.name,
  )
}

/// Find the square: give the algebraic name, ask the learner to click the square.
fn generate_find_the_square(square: Square) -> GeneratedQuestion {
  GeneratedQuestion(
    square: square,
    piece_type: option.None,
    position_fen: option.None,
    correct_answer: square.name,
  )
}

/// Name the color: show the square, ask whether it's light or dark.
fn generate_name_the_color(square: Square) -> GeneratedQuestion {
  let answer = case square.color {
    types.Light -> "light"
    types.Dark -> "dark"
  }
  GeneratedQuestion(
    square: square,
    piece_type: option.None,
    position_fen: option.None,
    correct_answer: answer,
  )
}

/// Piece legal move: place a piece on a square, ask for any legal destination.
/// Uses chessy to compute legal moves.
fn generate_piece_legal_move(
  square: Square,
  difficulty: CardDifficulty,
) -> GeneratedQuestion {
  let pt = option.unwrap(difficulty.piece_type, types.Knight)
  let chessy_piece_kind = piece_type_to_chessy(pt)

  // Create a position with just a king and the piece on the given square
  let chessy_square = square_to_chessy(square)
  let board =
    chessy_board.empty_board()
    |> chessy_board.set_piece(
      chessy_types.Square(chessy_types.E, 1),
      chessy_types.Piece(chessy_types.King, chessy_types.White),
    )
    |> chessy_board.set_piece(
      chessy_types.Square(chessy_types.E, 8),
      chessy_types.Piece(chessy_types.King, chessy_types.Black),
    )
    |> chessy_board.set_piece(
      chessy_square,
      chessy_types.Piece(chessy_piece_kind, chessy_types.White),
    )

  let position =
    chessy_board.Position(
      board: board,
      active_color: chessy_types.White,
      castling_rights: chessy_types.no_castling_rights(),
      en_passant_target: option.None,
      halfmove_clock: 0,
      fullmove_number: 1,
    )

  let fen = chessy_fen.to_string(position)

  // Get legal moves for the piece
  let legal = chessy_moves.legal_moves(position)
  let piece_moves =
    list.filter(legal, fn(m) {
      let chessy_types.Move(from, _to) = m
      from == chessy_square
    })

  // Pick the first legal destination as the "correct" answer
  // (any legal move is accepted by the evaluator)
  let correct = case piece_moves {
    [chessy_types.Move(_, to), ..] -> chessy_square_to_string(to)
    [] -> square.name
  }

  GeneratedQuestion(
    square: square,
    piece_type: option.Some(pt),
    position_fen: option.Some(fen),
    correct_answer: correct,
  )
}

/// Piece best move: similar to legal move but with a full position.
/// In the base implementation, any legal move is accepted.
fn generate_piece_best_move(
  square: Square,
  difficulty: CardDifficulty,
) -> GeneratedQuestion {
  // For now, reuse the same logic as piece_legal_move
  // The spec notes: "any legal move is accepted in the base implementation"
  generate_piece_legal_move(square, difficulty)
}

// ── Chessy conversion helpers ───────────────────────────────

/// Convert our PieceType to chessy's PieceKind.
pub fn piece_type_to_chessy(pt: PieceType) -> chessy_types.PieceKind {
  case pt {
    types.Pawn -> chessy_types.Pawn
    types.Rook -> chessy_types.Rook
    types.Knight -> chessy_types.Knight
    types.Bishop -> chessy_types.Bishop
    types.Queen -> chessy_types.Queen
    types.King -> chessy_types.King
  }
}

/// Convert our Square to chessy's Square.
pub fn square_to_chessy(square: Square) -> chessy_types.Square {
  let file = case square.file {
    "a" -> chessy_types.A
    "b" -> chessy_types.B
    "c" -> chessy_types.C
    "d" -> chessy_types.D
    "e" -> chessy_types.E
    "f" -> chessy_types.F
    "g" -> chessy_types.G
    "h" -> chessy_types.H
    _ -> chessy_types.A
  }
  chessy_types.Square(file, square.rank)
}

/// Convert chessy's Square to an algebraic name string.
pub fn chessy_square_to_string(sq: chessy_types.Square) -> String {
  chessy_fen.square_to_string(sq)
}

/// Convert chessy's Square to our Square.
pub fn chessy_to_square(sq: chessy_types.Square) -> Square {
  let file_str = chessy_types.file_to_string(sq.file)
  types.make_square(file_str, sq.rank)
}

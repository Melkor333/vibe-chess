//// Core domain types for the chess board memorization platform.
//// Maps directly to the Allium spec's value types, enums, and entities.

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option}

// ── Value Types ─────────────────────────────────────────────

/// A chess board square with algebraic notation.
pub type Square {
  Square(file: String, rank: Int, name: String, color: SquareColor, zone: Zone)
}

pub type SquareColor {
  Light
  Dark
}

pub type Zone {
  Center
  Edge
  Corner
}

// ── Enumerations ────────────────────────────────────────────

pub type ExerciseKind {
  NameTheSquare
  FindTheSquare
  NameTheColor
  PieceLegalMove
  PieceBestMove
}

pub type PieceType {
  Pawn
  Rook
  Knight
  Bishop
  Queen
  King
}

pub type UserRating {
  Easy
  Ok
  Hard
}

// ── Board Orientation ───────────────────────────────────────

pub type Orientation {
  WhiteOrientation
  BlackOrientation
  Rotated90
  Rotated270
}

// ── Card Difficulty ─────────────────────────────────────────

pub type CardDifficulty {
  CardDifficulty(
    orientation: Orientation,
    piece_type: Option(PieceType),
    zone_filter: ZoneFilter,
  )
}

pub type ZoneFilter {
  FilterCenter
  FilterEdge
  FilterCorner
  FilterAny
}

// ── Entity: Card ────────────────────────────────────────────

/// A Card tracks spaced repetition state for one exercise kind + difficulty
/// combination.
pub type Card {
  Card(
    id: String,
    exercise_kind: ExerciseKind,
    difficulty: CardDifficulty,
    due_at: Float,
    interval: Float,
    ease_factor: Float,
    attempt_count: Int,
  )
}

/// Check if a card is due (due_at <= now).
pub fn card_is_due(card: Card, now: Float) -> Bool {
  card.due_at <=. now
}

/// Check if a card is new (attempt_count = 0).
pub fn card_is_new(card: Card) -> Bool {
  card.attempt_count == 0
}

// ── Entity: Question ────────────────────────────────────────

pub type QuestionStatus {
  Unanswered
  Answered
  Skipped
}

pub type Question {
  Question(
    id: String,
    session_id: String,
    card_id: String,
    square: Square,
    piece_type: Option(PieceType),
    position_fen: Option(String),
    correct_answer: String,
    status: QuestionStatus,
    exercise_kind: ExerciseKind,
    difficulty: CardDifficulty,
  )
}

// ── Entity: Attempt ─────────────────────────────────────────

pub type Attempt {
  Attempt(
    id: String,
    question_id: String,
    answer: String,
    elapsed_ms: Int,
    is_correct: Bool,
    user_rating: Option(UserRating),
    submitted_at: Float,
  )
}

// ── Entity: DrillSession ────────────────────────────────────

pub type DrillSession {
  DrillSession(
    id: String,
    started_at: Float,
    completed_at: Option(Float),
    streak_count: Int,
    questions: List(Question),
  )
}

/// Count unanswered questions in a session.
pub fn session_unanswered(session: DrillSession) -> List(Question) {
  list.filter(session.questions, fn(q) { q.status == Unanswered })
}

/// Count answered questions in a session.
pub fn session_answered(session: DrillSession) -> List(Question) {
  list.filter(session.questions, fn(q) { q.status == Answered })
}

/// Count skipped questions in a session.
pub fn session_skipped(session: DrillSession) -> List(Question) {
  list.filter(session.questions, fn(q) { q.status == Skipped })
}

/// Check if session is complete (no unanswered questions).
pub fn session_is_complete(session: DrillSession) -> Bool {
  list.all(session.questions, fn(q) { q.status != Unanswered })
}

// ── Entity: LearningProgress ────────────────────────────────

pub type LearningProgress {
  LearningProgress(
    cards: List(Card),
    sessions: List(DrillSession),
    attempts: List(Attempt),
  )
}

/// Get cards that are currently due.
pub fn due_cards(progress: LearningProgress, now: Float) -> List(Card) {
  list.filter(progress.cards, fn(c) { card_is_due(c, now) })
}

/// Get cards that are new (never attempted).
pub fn new_cards(progress: LearningProgress) -> List(Card) {
  list.filter(progress.cards, fn(c) { card_is_new(c) })
}

/// Total number of answered questions across all sessions.
pub fn total_attempts(progress: LearningProgress) -> Int {
  list.length(progress.attempts)
}

// ── Config ──────────────────────────────────────────────────

pub type Config {
  Config(
    session_question_count: Int,
    new_cards_per_session: Int,
    initial_interval: Float,
    minimum_interval: Float,
    maximum_interval: Float,
    initial_ease_factor: Float,
    ease_adjustment_correct: Float,
    ease_adjustment_incorrect: Float,
    streak_reset_on_incorrect: Bool,
  )
}

/// Default configuration matching the Allium spec.
pub fn default_config() -> Config {
  Config(
    session_question_count: 20,
    new_cards_per_session: 5,
    // Intervals in milliseconds
    initial_interval: 86_400_000.0,
    // 1 day
    minimum_interval: 600_000.0,
    // 10 minutes
    maximum_interval: 2_592_000_000.0,
    // 30 days
    initial_ease_factor: 2.5,
    ease_adjustment_correct: 0.1,
    ease_adjustment_incorrect: 0.2,
    streak_reset_on_incorrect: True,
  )
}

// ── Square helpers ──────────────────────────────────────────

/// Compute the color of a square from file and rank.
pub fn square_color(file: String, rank: Int) -> SquareColor {
  let file_index = case file {
    "a" -> 0
    "b" -> 1
    "c" -> 2
    "d" -> 3
    "e" -> 4
    "f" -> 5
    "g" -> 6
    "h" -> 7
    _ -> 0
  }
  case { file_index + rank } % 2 {
    0 -> Dark
    _ -> Light
  }
}

/// Determine the zone of a square.
pub fn square_zone(file: String, rank: Int) -> Zone {
  let file_index = case file {
    "a" -> 0
    "b" -> 1
    "c" -> 2
    "d" -> 3
    "e" -> 4
    "f" -> 5
    "g" -> 6
    "h" -> 7
    _ -> 0
  }
  let is_edge_file = file_index == 0 || file_index == 7
  let is_edge_rank = rank == 1 || rank == 8
  case is_edge_file, is_edge_rank {
    True, True -> Corner
    True, False | False, True -> Edge
    False, False -> Center
  }
}

/// Create a Square from file string and rank number.
pub fn make_square(file: String, rank: Int) -> Square {
  Square(
    file: file,
    rank: rank,
    name: file <> int.to_string(rank),
    color: square_color(file, rank),
    zone: square_zone(file, rank),
  )
}

/// All 64 squares on the board.
pub fn all_squares() -> List(Square) {
  let files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  let ranks = [1, 2, 3, 4, 5, 6, 7, 8]
  list.flat_map(files, fn(f) { list.map(ranks, fn(r) { make_square(f, r) }) })
}

/// Filter squares by zone.
pub fn squares_in_zone(zone_filter: ZoneFilter) -> List(Square) {
  case zone_filter {
    FilterAny -> all_squares()
    FilterCenter -> list.filter(all_squares(), fn(s) { s.zone == Center })
    FilterEdge -> list.filter(all_squares(), fn(s) { s.zone == Edge })
    FilterCorner -> list.filter(all_squares(), fn(s) { s.zone == Corner })
  }
}

/// Convert ExerciseKind to a display string.
pub fn exercise_kind_to_string(kind: ExerciseKind) -> String {
  case kind {
    NameTheSquare -> "name_the_square"
    FindTheSquare -> "find_the_square"
    NameTheColor -> "name_the_color"
    PieceLegalMove -> "piece_legal_move"
    PieceBestMove -> "piece_best_move"
  }
}

/// Convert display string to ExerciseKind.
pub fn exercise_kind_from_string(s: String) -> ExerciseKind {
  case s {
    "name_the_square" -> NameTheSquare
    "find_the_square" -> FindTheSquare
    "name_the_color" -> NameTheColor
    "piece_legal_move" -> PieceLegalMove
    "piece_best_move" -> PieceBestMove
    _ -> NameTheSquare
  }
}

/// Convert PieceType to a display string.
pub fn piece_type_to_string(pt: PieceType) -> String {
  case pt {
    Pawn -> "pawn"
    Rook -> "rook"
    Knight -> "knight"
    Bishop -> "bishop"
    Queen -> "queen"
    King -> "king"
  }
}

/// Convert display string to PieceType.
pub fn piece_type_from_string(s: String) -> Option(PieceType) {
  case s {
    "pawn" -> option.Some(Pawn)
    "rook" -> option.Some(Rook)
    "knight" -> option.Some(Knight)
    "bishop" -> option.Some(Bishop)
    "queen" -> option.Some(Queen)
    "king" -> option.Some(King)
    _ -> option.None
  }
}

/// Convert Orientation to string.
pub fn orientation_to_string(o: Orientation) -> String {
  case o {
    WhiteOrientation -> "white"
    BlackOrientation -> "black"
    Rotated90 -> "rotated_90"
    Rotated270 -> "rotated_270"
  }
}

/// Convert string to Orientation.
pub fn orientation_from_string(s: String) -> Orientation {
  case s {
    "white" -> WhiteOrientation
    "black" -> BlackOrientation
    "rotated_90" -> Rotated90
    "rotated_270" -> Rotated270
    _ -> WhiteOrientation
  }
}

/// Convert ZoneFilter to string.
pub fn zone_filter_to_string(zf: ZoneFilter) -> String {
  case zf {
    FilterCenter -> "center"
    FilterEdge -> "edge"
    FilterCorner -> "corner"
    FilterAny -> "any"
  }
}

/// Convert string to ZoneFilter.
pub fn zone_filter_from_string(s: String) -> ZoneFilter {
  case s {
    "center" -> FilterCenter
    "edge" -> FilterEdge
    "corner" -> FilterCorner
    _ -> FilterAny
  }
}

/// Convert UserRating to string.
pub fn user_rating_to_string(r: UserRating) -> String {
  case r {
    Easy -> "easy"
    Ok -> "ok"
    Hard -> "hard"
  }
}

/// Convert string to UserRating.
pub fn user_rating_from_string(s: String) -> Option(UserRating) {
  case s {
    "easy" -> option.Some(Easy)
    "ok" -> option.Some(Ok)
    "hard" -> option.Some(Hard)
    _ -> option.None
  }
}

/// Generate a unique ID from a prefix and timestamp.
pub fn generate_id(prefix: String, now: Float) -> String {
  prefix <> "_" <> float.to_string(now)
}

//// Tests for core domain types.

import gleam/list
import gleam/option
import gleeunit
import vibe_chess/types

pub fn main() {
  gleeunit.main()
}

// ── Square tests ────────────────────────────────────────────

pub fn make_square_produces_correct_name_test() {
  let sq = types.make_square("e", 4)
  let assert "e4" = sq.name
}

pub fn square_color_light_test() {
  // e4: file_index=4, rank=4, sum=8, 8%2=0 -> Dark
  let sq = types.make_square("e", 4)
  let assert types.Dark = sq.color
}

pub fn square_color_dark_test() {
  // a1: file_index=0, rank=1, sum=1, 1%2=1 -> Light
  let sq = types.make_square("a", 1)
  let assert types.Light = sq.color
}

pub fn square_zone_center_test() {
  let sq = types.make_square("e", 4)
  let assert types.Center = sq.zone
}

pub fn square_zone_edge_test() {
  let sq = types.make_square("a", 4)
  let assert types.Edge = sq.zone
}

pub fn square_zone_corner_test() {
  let sq = types.make_square("a", 1)
  let assert types.Corner = sq.zone
}

pub fn all_squares_count_test() {
  let squares = types.all_squares()
  let assert 64 = list.length(squares)
}

pub fn squares_in_zone_filter_any_test() {
  let result = types.squares_in_zone(types.FilterAny)
  let assert 64 = list.length(result)
}

pub fn squares_in_zone_filter_center_test() {
  let result = types.squares_in_zone(types.FilterCenter)
  let assert True = list.all(result, fn(s) { s.zone == types.Center })
}

pub fn squares_in_zone_filter_corner_test() {
  let result = types.squares_in_zone(types.FilterCorner)
  let assert 4 = list.length(result)
}

// ── Card tests ──────────────────────────────────────────────

pub fn card_is_due_true_test() {
  let card =
    types.Card(
      id: "1",
      exercise_kind: types.NameTheSquare,
      difficulty: default_diff(),
      due_at: 100.0,
      interval: 1000.0,
      ease_factor: 2.5,
      attempt_count: 0,
    )
  let assert True = types.card_is_due(card, 200.0)
}

pub fn card_is_due_false_test() {
  let card =
    types.Card(
      id: "1",
      exercise_kind: types.NameTheSquare,
      difficulty: default_diff(),
      due_at: 200.0,
      interval: 1000.0,
      ease_factor: 2.5,
      attempt_count: 0,
    )
  let assert False = types.card_is_due(card, 100.0)
}

pub fn card_is_new_true_test() {
  let card =
    types.Card(
      id: "1",
      exercise_kind: types.NameTheSquare,
      difficulty: default_diff(),
      due_at: 0.0,
      interval: 1000.0,
      ease_factor: 2.5,
      attempt_count: 0,
    )
  let assert True = types.card_is_new(card)
}

pub fn card_is_new_false_test() {
  let card =
    types.Card(
      id: "1",
      exercise_kind: types.NameTheSquare,
      difficulty: default_diff(),
      due_at: 0.0,
      interval: 1000.0,
      ease_factor: 2.5,
      attempt_count: 5,
    )
  let assert False = types.card_is_new(card)
}

// ── Session tests ───────────────────────────────────────────

pub fn session_is_complete_true_test() {
  let session =
    types.DrillSession(
      id: "1",
      started_at: 0.0,
      completed_at: option.None,
      streak_count: 0,
      questions: [
        question(status: types.Answered),
        question(status: types.Skipped),
      ],
    )
  let assert True = types.session_is_complete(session)
}

pub fn session_is_complete_false_test() {
  let session =
    types.DrillSession(
      id: "1",
      started_at: 0.0,
      completed_at: option.None,
      streak_count: 0,
      questions: [
        question(status: types.Answered),
        question(status: types.Unanswered),
      ],
    )
  let assert False = types.session_is_complete(session)
}

pub fn session_unanswered_count_test() {
  let session =
    types.DrillSession(
      id: "1",
      started_at: 0.0,
      completed_at: option.None,
      streak_count: 0,
      questions: [
        question(status: types.Unanswered),
        question(status: types.Answered),
        question(status: types.Unanswered),
      ],
    )
  let assert 2 = list.length(types.session_unanswered(session))
}

// ── LearningProgress tests ──────────────────────────────────

pub fn total_attempts_counts_all_test() {
  let progress =
    types.LearningProgress(cards: [], sessions: [], attempts: [
      make_attempt(),
      make_attempt(),
      make_attempt(),
    ])
  let assert 3 = types.total_attempts(progress)
}

// ── Enum conversion tests ───────────────────────────────────

pub fn exercise_kind_roundtrip_test() {
  let kinds = [
    types.NameTheSquare,
    types.FindTheSquare,
    types.NameTheColor,
    types.PieceLegalMove,
    types.PieceBestMove,
  ]
  list.each(kinds, fn(k) {
    let s = types.exercise_kind_to_string(k)
    let back = types.exercise_kind_from_string(s)
    let assert True = k == back
  })
}

pub fn piece_type_roundtrip_test() {
  let pts = [
    types.Pawn,
    types.Rook,
    types.Knight,
    types.Bishop,
    types.Queen,
    types.King,
  ]
  list.each(pts, fn(pt) {
    let s = types.piece_type_to_string(pt)
    let back = types.piece_type_from_string(s)
    let assert option.Some(_pt) = back
  })
}

// ── Helpers ─────────────────────────────────────────────────

fn default_diff() -> types.CardDifficulty {
  types.CardDifficulty(
    orientation: types.WhiteOrientation,
    piece_type: option.None,
    zone_filter: types.FilterAny,
  )
}

fn question(status status: types.QuestionStatus) -> types.Question {
  types.Question(
    id: "q1",
    session_id: "s1",
    card_id: "c1",
    square: types.make_square("e", 4),
    piece_type: option.None,
    position_fen: option.None,
    correct_answer: "e4",
    status: status,
    exercise_kind: types.NameTheSquare,
    difficulty: default_diff(),
  )
}

fn make_attempt() -> types.Attempt {
  types.Attempt(
    id: "a1",
    question_id: "q1",
    answer: "e4",
    elapsed_ms: 3000,
    is_correct: True,
    user_rating: option.None,
    submitted_at: 0.0,
  )
}

//// Browser localStorage persistence for LearningProgress.
//// Implements the spec's requirement for guest progress persistence.

import gleam/dynamic/decode
import gleam/float
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{type Option}
import gleam/result
import gleam/string
import vibe_chess/types.{
  type Attempt, type Card, type CardDifficulty, type DrillSession,
  type LearningProgress, type Question,
}

const storage_key = "vibe_chess_progress"

// ── FFI bindings ────────────────────────────────────────────

@external(javascript, "./storage_ffi.mjs", "get_local_storage")
fn get_local_storage(key: String) -> Result(String, Nil)

@external(javascript, "./storage_ffi.mjs", "set_local_storage")
fn set_local_storage(key: String, value: String) -> Result(Nil, Nil)

@external(javascript, "./storage_ffi.mjs", "now_ms")
pub fn now_ms() -> Float

@external(javascript, "./storage_ffi.mjs", "random_int")
pub fn random_int(max: Int) -> Int

// ── Save ────────────────────────────────────────────────────

/// Save LearningProgress to localStorage.
pub fn save_progress(progress: LearningProgress) -> Result(Nil, Nil) {
  let json_str = progress_to_json(progress) |> json.to_string
  set_local_storage(storage_key, json_str)
}

/// Encode LearningProgress to JSON.
fn progress_to_json(progress: LearningProgress) -> json.Json {
  json.object([
    #("cards", json.array(progress.cards, card_to_json)),
    #("sessions", json.array(progress.sessions, session_to_json)),
    #("attempts", json.array(progress.attempts, attempt_to_json)),
  ])
}

fn card_to_json(card: Card) -> json.Json {
  json.object([
    #("id", json.string(card.id)),
    #(
      "exercise_kind",
      json.string(types.exercise_kind_to_string(card.exercise_kind)),
    ),
    #("difficulty", difficulty_to_json(card.difficulty)),
    #("due_at", json.float(card.due_at)),
    #("interval", json.float(card.interval)),
    #("ease_factor", json.float(card.ease_factor)),
    #("attempt_count", json.int(card.attempt_count)),
  ])
}

fn difficulty_to_json(d: CardDifficulty) -> json.Json {
  json.object([
    #("orientation", json.string(types.orientation_to_string(d.orientation))),
    #("piece_type", case d.piece_type {
      option.Some(pt) -> json.string(types.piece_type_to_string(pt))
      option.None -> json.null()
    }),
    #("zone_filter", json.string(types.zone_filter_to_string(d.zone_filter))),
  ])
}

fn session_to_json(session: DrillSession) -> json.Json {
  json.object([
    #("id", json.string(session.id)),
    #("started_at", json.float(session.started_at)),
    #("completed_at", case session.completed_at {
      option.Some(t) -> json.float(t)
      option.None -> json.null()
    }),
    #("streak_count", json.int(session.streak_count)),
    #("questions", json.array(session.questions, question_to_json)),
  ])
}

fn question_to_json(q: Question) -> json.Json {
  json.object([
    #("id", json.string(q.id)),
    #("session_id", json.string(q.session_id)),
    #("card_id", json.string(q.card_id)),
    #("square_file", json.string(q.square.file)),
    #("square_rank", json.int(q.square.rank)),
    #("piece_type", case q.piece_type {
      option.Some(pt) -> json.string(types.piece_type_to_string(pt))
      option.None -> json.null()
    }),
    #("position_fen", case q.position_fen {
      option.Some(fen) -> json.string(fen)
      option.None -> json.null()
    }),
    #("correct_answer", json.string(q.correct_answer)),
    #("status", json.string(question_status_to_string(q.status))),
    #(
      "exercise_kind",
      json.string(types.exercise_kind_to_string(q.exercise_kind)),
    ),
    #("difficulty", difficulty_to_json(q.difficulty)),
  ])
}

fn attempt_to_json(a: Attempt) -> json.Json {
  json.object([
    #("id", json.string(a.id)),
    #("question_id", json.string(a.question_id)),
    #("answer", json.string(a.answer)),
    #("elapsed_ms", json.int(a.elapsed_ms)),
    #("is_correct", json.bool(a.is_correct)),
    #("user_rating", case a.user_rating {
      option.Some(r) -> json.string(types.user_rating_to_string(r))
      option.None -> json.null()
    }),
    #("submitted_at", json.float(a.submitted_at)),
  ])
}

fn question_status_to_string(s: types.QuestionStatus) -> String {
  case s {
    types.Unanswered -> "unanswered"
    types.Answered -> "answered"
    types.Skipped -> "skipped"
  }
}

// ── Load ────────────────────────────────────────────────────

/// Load LearningProgress from localStorage.
pub fn load_progress() -> LearningProgress {
  case get_local_storage(storage_key) {
    Ok(json_str) -> {
      case json.parse(json_str, progress_decoder()) {
        Ok(progress) -> progress
        Error(_) -> empty_progress()
      }
    }
    Error(_) -> empty_progress()
  }
}

/// Empty progress for a new learner.
pub fn empty_progress() -> LearningProgress {
  types.LearningProgress(cards: [], sessions: [], attempts: [])
}

// ── Decoders ────────────────────────────────────────────────

fn progress_decoder() -> decode.Decoder(LearningProgress) {
  use cards <- decode.field("cards", decode.list(card_decoder()))
  use sessions <- decode.field("sessions", decode.list(session_decoder()))
  use attempts <- decode.field("attempts", decode.list(attempt_decoder()))
  decode.success(types.LearningProgress(
    cards: cards,
    sessions: sessions,
    attempts: attempts,
  ))
}

fn card_decoder() -> decode.Decoder(Card) {
  use id <- decode.field("id", decode.string)
  use exercise_kind <- decode.field("exercise_kind", decode.string)
  use difficulty <- decode.field("difficulty", difficulty_decoder())
  use due_at <- decode.field("due_at", decode.float)
  use interval <- decode.field("interval", decode.float)
  use ease_factor <- decode.field("ease_factor", decode.float)
  use attempt_count <- decode.field("attempt_count", decode.int)
  decode.success(types.Card(
    id: id,
    exercise_kind: types.exercise_kind_from_string(exercise_kind),
    difficulty: difficulty,
    due_at: due_at,
    interval: interval,
    ease_factor: ease_factor,
    attempt_count: attempt_count,
  ))
}

fn difficulty_decoder() -> decode.Decoder(CardDifficulty) {
  use orientation <- decode.field("orientation", decode.string)
  use piece_type <- decode.field("piece_type", decode.optional(decode.string))
  use zone_filter <- decode.field("zone_filter", decode.string)
  decode.success(types.CardDifficulty(
    orientation: types.orientation_from_string(orientation),
    piece_type: option.then(piece_type, types.piece_type_from_string),
    zone_filter: types.zone_filter_from_string(zone_filter),
  ))
}

fn session_decoder() -> decode.Decoder(DrillSession) {
  use id <- decode.field("id", decode.string)
  use started_at <- decode.field("started_at", decode.float)
  use completed_at <- decode.field(
    "completed_at",
    decode.optional(decode.float),
  )
  use streak_count <- decode.field("streak_count", decode.int)
  use questions <- decode.field("questions", decode.list(question_decoder()))
  decode.success(types.DrillSession(
    id: id,
    started_at: started_at,
    completed_at: completed_at,
    streak_count: streak_count,
    questions: questions,
  ))
}

fn question_decoder() -> decode.Decoder(Question) {
  use id <- decode.field("id", decode.string)
  use session_id <- decode.field("session_id", decode.string)
  use card_id <- decode.field("card_id", decode.string)
  use square_file <- decode.field("square_file", decode.string)
  use square_rank <- decode.field("square_rank", decode.int)
  use piece_type <- decode.field("piece_type", decode.optional(decode.string))
  use position_fen <- decode.field(
    "position_fen",
    decode.optional(decode.string),
  )
  use correct_answer <- decode.field("correct_answer", decode.string)
  use status <- decode.field("status", decode.string)
  use exercise_kind <- decode.field("exercise_kind", decode.string)
  use difficulty <- decode.field("difficulty", difficulty_decoder())
  decode.success(types.Question(
    id: id,
    session_id: session_id,
    card_id: card_id,
    square: types.make_square(square_file, square_rank),
    piece_type: option.then(piece_type, types.piece_type_from_string),
    position_fen: position_fen,
    correct_answer: correct_answer,
    status: question_status_from_string(status),
    exercise_kind: types.exercise_kind_from_string(exercise_kind),
    difficulty: difficulty,
  ))
}

fn question_status_from_string(s: String) -> types.QuestionStatus {
  case s {
    "answered" -> types.Answered
    "skipped" -> types.Skipped
    _ -> types.Unanswered
  }
}

fn attempt_decoder() -> decode.Decoder(Attempt) {
  use id <- decode.field("id", decode.string)
  use question_id <- decode.field("question_id", decode.string)
  use answer <- decode.field("answer", decode.string)
  use elapsed_ms <- decode.field("elapsed_ms", decode.int)
  use is_correct <- decode.field("is_correct", decode.bool)
  use user_rating <- decode.field("user_rating", decode.optional(decode.string))
  use submitted_at <- decode.field("submitted_at", decode.float)
  decode.success(types.Attempt(
    id: id,
    question_id: question_id,
    answer: answer,
    elapsed_ms: elapsed_ms,
    is_correct: is_correct,
    user_rating: option.then(user_rating, types.user_rating_from_string),
    submitted_at: submitted_at,
  ))
}

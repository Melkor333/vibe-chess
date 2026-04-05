//// Vibe Chess - Chess board memorization learning platform.
//// Main Lustre application implementing the Allium spec surfaces:
//// ProgressSurface and DrillSessionSurface.

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option}
import gleam/string
import lustre
import lustre/attribute.{type Attribute}
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import vibe_chess/answer_evaluator
import vibe_chess/question_generator
import vibe_chess/sr
import vibe_chess/storage
import vibe_chess/types.{
  type Attempt, type Card, type CardDifficulty, type DrillSession,
  type ExerciseKind, type LearningProgress, type Question, type UserRating,
}

// ── TYPES ───────────────────────────────────────────────────

/// Application page state.
pub type Page {
  ProgressPage
  DrillPage
}

/// The application model.
pub type Model {
  Model(
    progress: LearningProgress,
    config: types.Config,
    page: Page,
    current_session: Option(DrillSession),
    current_question_index: Int,
    answer_input: String,
    last_answer_result: Option(AnswerResult),
    question_start_time: Float,
    now: Float,
  )
}

/// Result of the last submitted answer, for feedback display.
pub type AnswerResult {
  AnswerResult(
    is_correct: Bool,
    given_answer: String,
    correct_answer: String,
    question: Question,
  )
}

/// Messages following the Subject-Verb-Object convention.
pub type Msg {
  // ProgressSurface actions
  UserClickedStartSession
  UserClickedActivateDifficulty(ExerciseKind, CardDifficulty)
  // DrillSessionSurface actions
  UserTypedAnswer(String)
  UserSubmittedAnswer
  UserClickedSkipQuestion
  UserClickedNextQuestion
  UserClickedSquare(String)
  UserRatedAttempt(UserRating)
  // Navigation
  UserClickedBackToProgress
  // Time tick
  TimerTicked(Float)
}

// ── MAIN ────────────────────────────────────────────────────

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

// ── INIT ────────────────────────────────────────────────────

fn init(_flags) -> #(Model, Effect(Msg)) {
  let progress = storage.load_progress()
  let now = storage.now_ms()
  let model =
    Model(
      progress: progress,
      config: types.default_config(),
      page: ProgressPage,
      current_session: option.None,
      current_question_index: 0,
      answer_input: "",
      last_answer_result: option.None,
      question_start_time: now,
      now: now,
    )
  #(model, effect.none())
}

// ── UPDATE ──────────────────────────────────────────────────

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    UserClickedStartSession -> handle_start_session(model)
    UserClickedActivateDifficulty(kind, difficulty) ->
      handle_activate_difficulty(model, kind, difficulty)
    UserTypedAnswer(value) -> #(
      Model(..model, answer_input: value),
      effect.none(),
    )
    UserSubmittedAnswer -> handle_submit_answer(model)
    UserClickedSkipQuestion -> handle_skip_question(model)
    UserClickedNextQuestion -> handle_next_question(model)
    UserClickedSquare(square_name) -> handle_square_click(model, square_name)
    UserRatedAttempt(rating) -> handle_rate_attempt(model, rating)
    UserClickedBackToProgress -> #(
      Model(..model, page: ProgressPage, current_session: option.None),
      effect.none(),
    )
    TimerTicked(now) -> #(Model(..model, now: now), effect.none())
  }
}

// ── Rule: LearnerActivatesDifficulty ────────────────────────

fn handle_activate_difficulty(
  model: Model,
  exercise_kind: ExerciseKind,
  difficulty: CardDifficulty,
) -> #(Model, Effect(Msg)) {
  let now = storage.now_ms()
  // Guard: card must not already exist for this combo
  let already_exists =
    list.any(model.progress.cards, fn(c) {
      c.exercise_kind == exercise_kind
      && c.difficulty.orientation == difficulty.orientation
      && c.difficulty.zone_filter == difficulty.zone_filter
      && c.difficulty.piece_type == difficulty.piece_type
    })

  case already_exists {
    True -> #(model, effect.none())
    False -> {
      let card_id =
        types.exercise_kind_to_string(exercise_kind)
        <> "_"
        <> types.orientation_to_string(difficulty.orientation)
        <> "_"
        <> types.zone_filter_to_string(difficulty.zone_filter)
        <> "_"
        <> float.to_string(now)
      let card =
        types.Card(
          id: card_id,
          exercise_kind: exercise_kind,
          difficulty: difficulty,
          due_at: now,
          interval: model.config.initial_interval,
          ease_factor: model.config.initial_ease_factor,
          attempt_count: 0,
        )
      let new_progress =
        types.LearningProgress(..model.progress, cards: [
          card,
          ..model.progress.cards
        ])
      let new_model = Model(..model, progress: new_progress, now: now)
      #(new_model, save_effect(new_progress))
    }
  }
}

// ── Rule: LearnerStartsDrillSession ─────────────────────────

fn handle_start_session(model: Model) -> #(Model, Effect(Msg)) {
  let now = storage.now_ms()
  let config = model.config

  let due = types.due_cards(model.progress, now)
  let new = types.new_cards(model.progress)

  let due_limit = config.session_question_count - config.new_cards_per_session
  let selected_due = sr.select_due(due, due_limit, now)
  let selected_new = sr.select_new(new, config.new_cards_per_session)
  let all_cards = list.append(selected_due, selected_new)

  case list.length(all_cards) {
    0 -> #(model, effect.none())
    _ -> {
      let session_id = "session_" <> float.to_string(now)

      // Generate questions for each card
      let questions =
        list.index_map(all_cards, fn(card, idx) {
          let random = storage.random_int(64)
          let gen = question_generator.generate(card, random + idx)
          let q_id = "q_" <> int.to_string(idx) <> "_" <> float.to_string(now)
          types.Question(
            id: q_id,
            session_id: session_id,
            card_id: card.id,
            square: gen.square,
            piece_type: gen.piece_type,
            position_fen: gen.position_fen,
            correct_answer: gen.correct_answer,
            status: types.Unanswered,
            exercise_kind: card.exercise_kind,
            difficulty: card.difficulty,
          )
        })

      let session =
        types.DrillSession(
          id: session_id,
          started_at: now,
          completed_at: option.None,
          streak_count: 0,
          questions: questions,
        )

      let new_progress =
        types.LearningProgress(..model.progress, sessions: [
          session,
          ..model.progress.sessions
        ])

      let new_model =
        Model(
          ..model,
          progress: new_progress,
          current_session: option.Some(session),
          current_question_index: 0,
          answer_input: "",
          last_answer_result: option.None,
          question_start_time: now,
          page: DrillPage,
          now: now,
        )

      #(new_model, save_effect(new_progress))
    }
  }
}

// ── Rule: LearnerSubmitsAnswer ──────────────────────────────

fn handle_submit_answer(model: Model) -> #(Model, Effect(Msg)) {
  case model.current_session {
    option.None -> #(model, effect.none())
    option.Some(session) -> {
      let unanswered = types.session_unanswered(session)
      case unanswered {
        [] -> #(model, effect.none())
        [question, ..] -> {
          case question.status {
            types.Unanswered -> {
              let now = storage.now_ms()
              let elapsed_ms = float.round(now -. model.question_start_time)
              let answer = string.trim(model.answer_input)
              let is_correct = answer_evaluator.evaluate(question, answer)

              // Update question status
              let updated_question =
                types.Question(..question, status: types.Answered)

              // Update session questions and streak
              let new_streak = case is_correct {
                True -> session.streak_count + 1
                False ->
                  case model.config.streak_reset_on_incorrect {
                    True -> 0
                    False -> session.streak_count
                  }
              }

              let updated_questions =
                list.map(session.questions, fn(q) {
                  case q.id == question.id {
                    True -> updated_question
                    False -> q
                  }
                })

              let updated_session =
                types.DrillSession(
                  ..session,
                  questions: updated_questions,
                  streak_count: new_streak,
                )

              // Check if session is now complete
              let updated_session = case
                types.session_is_complete(updated_session)
              {
                True ->
                  types.DrillSession(
                    ..updated_session,
                    completed_at: option.Some(now),
                  )
                False -> updated_session
              }

              // Create attempt
              let attempt_id = "att_" <> float.to_string(now)
              let attempt =
                types.Attempt(
                  id: attempt_id,
                  question_id: question.id,
                  answer: answer,
                  elapsed_ms: elapsed_ms,
                  is_correct: is_correct,
                  user_rating: option.None,
                  submitted_at: now,
                )

              // Schedule card (AttemptSchedulesCard rule)
              let updated_cards =
                list.map(model.progress.cards, fn(card) {
                  case card.id == question.card_id {
                    True -> {
                      let new_interval =
                        sr.next_interval(
                          card,
                          is_correct,
                          elapsed_ms,
                          model.config,
                        )
                      let new_ease =
                        sr.next_ease_factor(card, is_correct, model.config)
                      types.Card(
                        ..card,
                        attempt_count: card.attempt_count + 1,
                        interval: new_interval,
                        ease_factor: new_ease,
                        due_at: now +. new_interval,
                      )
                    }
                    False -> card
                  }
                })

              // Update sessions in progress
              let updated_sessions =
                list.map(model.progress.sessions, fn(s) {
                  case s.id == updated_session.id {
                    True -> updated_session
                    False -> s
                  }
                })

              let new_progress =
                types.LearningProgress(
                  cards: updated_cards,
                  sessions: updated_sessions,
                  attempts: [attempt, ..model.progress.attempts],
                )

              let answer_result =
                AnswerResult(
                  is_correct: is_correct,
                  given_answer: answer,
                  correct_answer: question.correct_answer,
                  question: question,
                )

              let new_model =
                Model(
                  ..model,
                  progress: new_progress,
                  current_session: option.Some(updated_session),
                  answer_input: "",
                  last_answer_result: option.Some(answer_result),
                  now: now,
                )

              #(new_model, save_effect(new_progress))
            }
            _ -> #(model, effect.none())
          }
        }
      }
    }
  }
}

// ── Rule: LearnerSkipsQuestion ──────────────────────────────

fn handle_skip_question(model: Model) -> #(Model, Effect(Msg)) {
  case model.current_session {
    option.None -> #(model, effect.none())
    option.Some(session) -> {
      let unanswered = types.session_unanswered(session)
      case unanswered {
        [] -> #(model, effect.none())
        [question, ..] -> {
          case question.status {
            types.Unanswered -> {
              let now = storage.now_ms()
              let updated_questions =
                list.map(session.questions, fn(q) {
                  case q.id == question.id {
                    True -> types.Question(..q, status: types.Skipped)
                    False -> q
                  }
                })
              let updated_session =
                types.DrillSession(..session, questions: updated_questions)

              // Check if session is now complete
              let updated_session = case
                types.session_is_complete(updated_session)
              {
                True ->
                  types.DrillSession(
                    ..updated_session,
                    completed_at: option.Some(now),
                  )
                False -> updated_session
              }

              let updated_sessions =
                list.map(model.progress.sessions, fn(s) {
                  case s.id == updated_session.id {
                    True -> updated_session
                    False -> s
                  }
                })

              let new_progress =
                types.LearningProgress(
                  ..model.progress,
                  sessions: updated_sessions,
                )

              let new_model =
                Model(
                  ..model,
                  progress: new_progress,
                  current_session: option.Some(updated_session),
                  answer_input: "",
                  last_answer_result: option.None,
                  question_start_time: now,
                  now: now,
                )

              #(new_model, save_effect(new_progress))
            }
            _ -> #(model, effect.none())
          }
        }
      }
    }
  }
}

// ── Move to next question ───────────────────────────────────

fn handle_next_question(model: Model) -> #(Model, Effect(Msg)) {
  let now = storage.now_ms()
  #(
    Model(
      ..model,
      last_answer_result: option.None,
      answer_input: "",
      question_start_time: now,
      now: now,
    ),
    effect.none(),
  )
}

// ── Handle square click (for find_the_square and name_the_color) ─

fn handle_square_click(
  model: Model,
  square_name: String,
) -> #(Model, Effect(Msg)) {
  // For find_the_square exercise, clicking a square acts as submitting an answer
  // For name_the_color, the square_name is "light" or "dark"
  case model.current_session {
    option.Some(_session) -> {
      let new_model = Model(..model, answer_input: square_name)
      handle_submit_answer(new_model)
    }
    option.None -> #(model, effect.none())
  }
}

// ── Rule: LearnerRatesAttempt ───────────────────────────────

fn handle_rate_attempt(
  model: Model,
  rating: UserRating,
) -> #(Model, Effect(Msg)) {
  // Find the most recent attempt that has no rating
  case model.progress.attempts {
    [] -> #(model, effect.none())
    [latest, ..rest] -> {
      case latest.user_rating {
        option.None -> {
          let updated_attempt =
            types.Attempt(..latest, user_rating: option.Some(rating))
          let new_progress =
            types.LearningProgress(..model.progress, attempts: [
              updated_attempt,
              ..rest
            ])
          let new_model = Model(..model, progress: new_progress)
          #(new_model, save_effect(new_progress))
        }
        option.Some(_) -> #(model, effect.none())
      }
    }
  }
}

// ── Save effect ─────────────────────────────────────────────

fn save_effect(progress: LearningProgress) -> Effect(Msg) {
  effect.from(fn(_dispatch) {
    let _ = storage.save_progress(progress)
    Nil
  })
}

// ── VIEW ────────────────────────────────────────────────────

fn view(model: Model) -> Element(Msg) {
  html.div([attribute.class("app")], [
    view_header(model),
    html.main([attribute.class("main-content")], [
      case model.page {
        ProgressPage -> view_progress_page(model)
        DrillPage -> view_drill_page(model)
      },
    ]),
  ])
}

// ── Header ──────────────────────────────────────────────────

fn view_header(model: Model) -> Element(Msg) {
  html.header([attribute.class("app-header")], [
    html.h1([], [html.text("Vibe Chess")]),
    html.p([attribute.class("subtitle")], [
      html.text("Chess board memorization trainer"),
    ]),
    case model.page {
      DrillPage ->
        html.button(
          [
            attribute.class("btn btn-secondary"),
            event.on_click(UserClickedBackToProgress),
          ],
          [html.text("Back to Dashboard")],
        )
      ProgressPage -> element.none()
    },
  ])
}

// ── ProgressSurface View ────────────────────────────────────

fn view_progress_page(model: Model) -> Element(Msg) {
  let card_count = list.length(model.progress.cards)
  let due_count = list.length(types.due_cards(model.progress, model.now))
  let total_att = types.total_attempts(model.progress)

  html.div([attribute.class("progress-page")], [
    // Stats overview
    html.div([attribute.class("stats-grid")], [
      view_stat_card("Total Cards", int.to_string(card_count)),
      view_stat_card("Due Now", int.to_string(due_count)),
      view_stat_card("Total Attempts", int.to_string(total_att)),
    ]),
    // Start session button
    html.div([attribute.class("session-start")], [
      html.button(
        [
          attribute.class("btn btn-primary btn-large"),
          event.on_click(UserClickedStartSession),
          attribute.disabled(card_count == 0),
        ],
        [
          html.text(case card_count == 0 {
            True -> "Add exercises first"
            False ->
              "Start Drill Session (" <> int.to_string(due_count) <> " due)"
          }),
        ],
      ),
    ]),
    // Exercise activation
    html.h2([], [html.text("Exercises")]),
    view_exercise_activation(model),
    // Card list
    case model.progress.cards != [] {
      True -> {
        html.div([], [
          html.h2([], [html.text("Your Cards")]),
          view_card_list(model),
        ])
      }
      False -> element.none()
    },
  ])
}

fn view_stat_card(label: String, value: String) -> Element(Msg) {
  html.div([attribute.class("stat-card")], [
    html.div([attribute.class("stat-value")], [html.text(value)]),
    html.div([attribute.class("stat-label")], [html.text(label)]),
  ])
}

fn view_exercise_activation(model: Model) -> Element(Msg) {
  let exercise_kinds = [
    #(
      types.NameTheSquare,
      "Name the Square",
      "See a highlighted square, type its name",
    ),
    #(
      types.FindTheSquare,
      "Find the Square",
      "Given a square name, click it on the board",
    ),
    #(
      types.NameTheColor,
      "Name the Color",
      "See a square, tell if it's light or dark",
    ),
    #(types.PieceLegalMove, "Piece Legal Move", "Find a legal move for a piece"),
  ]

  html.div(
    [attribute.class("exercise-grid")],
    list.map(exercise_kinds, fn(entry) {
      let #(kind, name, description) = entry
      let difficulty =
        types.CardDifficulty(
          orientation: types.WhiteOrientation,
          piece_type: case kind {
            types.PieceLegalMove | types.PieceBestMove ->
              option.Some(types.Knight)
            _ -> option.None
          },
          zone_filter: types.FilterAny,
        )

      let already_exists =
        list.any(model.progress.cards, fn(c) {
          c.exercise_kind == kind
          && c.difficulty.orientation == difficulty.orientation
          && c.difficulty.zone_filter == difficulty.zone_filter
        })

      html.div([attribute.class("exercise-card")], [
        html.h3([], [html.text(name)]),
        html.p([attribute.class("exercise-desc")], [html.text(description)]),
        case already_exists {
          True ->
            html.span([attribute.class("badge badge-active")], [
              html.text("Active"),
            ])
          False ->
            html.button(
              [
                attribute.class("btn btn-primary"),
                event.on_click(UserClickedActivateDifficulty(kind, difficulty)),
              ],
              [html.text("Activate")],
            )
        },
      ])
    }),
  )
}

fn view_card_list(model: Model) -> Element(Msg) {
  html.div(
    [attribute.class("card-list")],
    list.map(model.progress.cards, fn(card) {
      let is_due = types.card_is_due(card, model.now)
      let is_new = types.card_is_new(card)
      html.div(
        [
          attribute.class(
            "card-item"
            <> case is_due {
              True -> " card-due"
              False -> ""
            },
          ),
        ],
        [
          html.div([attribute.class("card-info")], [
            html.span([attribute.class("card-kind")], [
              html.text(exercise_kind_display(card.exercise_kind)),
            ]),
            html.span([attribute.class("card-detail")], [
              html.text(
                types.orientation_to_string(card.difficulty.orientation)
                <> " | "
                <> types.zone_filter_to_string(card.difficulty.zone_filter),
              ),
            ]),
          ]),
          html.div([attribute.class("card-stats")], [
            html.span([], [
              html.text(case is_new {
                True -> "New"
                False -> int.to_string(card.attempt_count) <> " attempts"
              }),
            ]),
            html.span(
              [
                attribute.class(case is_due {
                  True -> "badge badge-due"
                  False -> "badge"
                }),
              ],
              [
                html.text(case is_due {
                  True -> "Due"
                  False -> "Scheduled"
                }),
              ],
            ),
          ]),
        ],
      )
    }),
  )
}

// ── DrillSessionSurface View ────────────────────────────────

fn view_drill_page(model: Model) -> Element(Msg) {
  case model.current_session {
    option.None ->
      html.div([attribute.class("drill-page")], [
        html.p([], [html.text("No active session.")]),
      ])
    option.Some(session) -> {
      let unanswered = types.session_unanswered(session)
      let answered_count = list.length(types.session_answered(session))
      let skipped_count = list.length(types.session_skipped(session))
      let total = list.length(session.questions)

      case types.session_is_complete(session) {
        True -> view_session_complete(session, answered_count, skipped_count)
        False ->
          html.div([attribute.class("drill-page")], [
            // Progress bar
            view_drill_progress(answered_count, skipped_count, total),
            // Streak display
            case session.streak_count > 0 {
              True ->
                html.div([attribute.class("streak-display")], [
                  html.text("Streak: " <> int.to_string(session.streak_count)),
                ])
              False -> element.none()
            },
            // Current question or feedback
            case model.last_answer_result {
              option.Some(result) -> view_answer_feedback(result)
              option.None -> {
                case unanswered {
                  [] -> html.p([], [html.text("All questions completed!")])
                  [question, ..] -> view_question(model, question)
                }
              }
            },
          ])
      }
    }
  }
}

fn view_drill_progress(answered: Int, skipped: Int, total: Int) -> Element(Msg) {
  let completed = answered + skipped
  let pct = case total > 0 {
    True -> { completed * 100 } / total
    False -> 0
  }
  html.div([attribute.class("drill-progress")], [
    html.div([attribute.class("progress-bar")], [
      html.div(
        [
          attribute.class("progress-fill"),
          attribute.style("width", int.to_string(pct) <> "%"),
        ],
        [],
      ),
    ]),
    html.div([attribute.class("progress-text")], [
      html.text(
        int.to_string(answered)
        <> " answered, "
        <> int.to_string(skipped)
        <> " skipped / "
        <> int.to_string(total)
        <> " total",
      ),
    ]),
  ])
}

fn view_session_complete(
  session: DrillSession,
  answered: Int,
  skipped: Int,
) -> Element(Msg) {
  html.div([attribute.class("session-complete")], [
    html.h2([], [html.text("Session Complete!")]),
    html.div([attribute.class("session-stats")], [
      view_stat_card("Answered", int.to_string(answered)),
      view_stat_card("Skipped", int.to_string(skipped)),
      view_stat_card("Final Streak", int.to_string(session.streak_count)),
    ]),
    html.button(
      [
        attribute.class("btn btn-primary btn-large"),
        event.on_click(UserClickedBackToProgress),
      ],
      [html.text("Back to Dashboard")],
    ),
  ])
}

// ── Question Views ──────────────────────────────────────────

fn view_question(model: Model, question: Question) -> Element(Msg) {
  html.div([attribute.class("question-container")], [
    html.div([attribute.class("question-kind")], [
      html.text(exercise_kind_display(question.exercise_kind)),
    ]),
    case question.exercise_kind {
      types.NameTheSquare -> view_name_the_square(model, question)
      types.FindTheSquare -> view_find_the_square(question)
      types.NameTheColor -> view_name_the_color(question)
      types.PieceLegalMove -> view_piece_legal_move(model, question)
      types.PieceBestMove -> view_piece_legal_move(model, question)
    },
    html.div([attribute.class("question-actions")], [
      html.button(
        [
          attribute.class("btn btn-secondary"),
          event.on_click(UserClickedSkipQuestion),
        ],
        [html.text("Skip")],
      ),
    ]),
  ])
}

/// Name the square: show the board with a highlighted square, ask for its name.
fn view_name_the_square(model: Model, question: Question) -> Element(Msg) {
  html.div([attribute.class("exercise-area")], [
    view_board(
      question.difficulty.orientation,
      option.Some(question.square),
      option.None,
    ),
    html.div([attribute.class("answer-area")], [
      html.label([], [html.text("What square is highlighted?")]),
      html.form([event.on_submit(fn(_form_data) { UserSubmittedAnswer })], [
        html.input([
          attribute.type_("text"),
          attribute.class("answer-input"),
          attribute.placeholder("e.g. e4"),
          attribute.value(model.answer_input),
          event.on_input(UserTypedAnswer),
          attribute.autofocus(True),
        ]),
        html.button(
          [attribute.class("btn btn-primary"), attribute.type_("submit")],
          [html.text("Submit")],
        ),
      ]),
    ]),
  ])
}

/// Find the square: show the square name, ask the learner to click it.
fn view_find_the_square(question: Question) -> Element(Msg) {
  html.div([attribute.class("exercise-area")], [
    html.div([attribute.class("target-square-name")], [
      html.text("Click on: "),
      html.strong([], [html.text(string.uppercase(question.correct_answer))]),
    ]),
    view_board(question.difficulty.orientation, option.None, option.None),
  ])
}

/// Name the color: show the square, ask if it's light or dark.
fn view_name_the_color(question: Question) -> Element(Msg) {
  html.div([attribute.class("exercise-area")], [
    view_board(
      question.difficulty.orientation,
      option.Some(question.square),
      option.None,
    ),
    html.div([attribute.class("color-buttons")], [
      html.label([], [html.text("What color is this square?")]),
      html.div([attribute.class("button-group")], [
        html.button(
          [
            attribute.class("btn btn-light-square"),
            event.on_click(UserClickedSquare("light")),
          ],
          [html.text("Light")],
        ),
        html.button(
          [
            attribute.class("btn btn-dark-square"),
            event.on_click(UserClickedSquare("dark")),
          ],
          [html.text("Dark")],
        ),
      ]),
    ]),
  ])
}

/// Piece legal move: show a piece on the board, ask for a legal destination.
fn view_piece_legal_move(model: Model, question: Question) -> Element(Msg) {
  let piece_str = case question.piece_type {
    option.Some(pt) -> types.piece_type_to_string(pt)
    option.None -> "piece"
  }
  html.div([attribute.class("exercise-area")], [
    html.div([attribute.class("piece-prompt")], [
      html.text(
        "Find a legal move for the "
        <> piece_str
        <> " on "
        <> question.square.name,
      ),
    ]),
    view_board(
      question.difficulty.orientation,
      option.Some(question.square),
      question.piece_type,
    ),
    html.div([attribute.class("answer-area")], [
      html.form([event.on_submit(fn(_form_data) { UserSubmittedAnswer })], [
        html.input([
          attribute.type_("text"),
          attribute.class("answer-input"),
          attribute.placeholder("e.g. f3"),
          attribute.value(model.answer_input),
          event.on_input(UserTypedAnswer),
          attribute.autofocus(True),
        ]),
        html.button(
          [attribute.class("btn btn-primary"), attribute.type_("submit")],
          [html.text("Submit")],
        ),
      ]),
    ]),
  ])
}

// ── Answer Feedback ─────────────────────────────────────────

fn view_answer_feedback(result: AnswerResult) -> Element(Msg) {
  html.div(
    [
      attribute.class(case result.is_correct {
        True -> "feedback feedback-correct"
        False -> "feedback feedback-incorrect"
      }),
    ],
    [
      html.div([attribute.class("feedback-icon")], [
        html.text(case result.is_correct {
          True -> "Correct!"
          False -> "Incorrect"
        }),
      ]),
      case result.is_correct {
        True -> element.none()
        False ->
          html.div([attribute.class("feedback-detail")], [
            html.text(
              "Your answer: "
              <> result.given_answer
              <> " | Correct: "
              <> result.correct_answer,
            ),
          ])
      },
      // Rating buttons
      html.div([attribute.class("rating-buttons")], [
        html.p([], [html.text("How did that feel?")]),
        html.div([attribute.class("button-group")], [
          html.button(
            [
              attribute.class("btn btn-easy"),
              event.on_click(UserRatedAttempt(types.Easy)),
            ],
            [html.text("Easy")],
          ),
          html.button(
            [
              attribute.class("btn btn-ok"),
              event.on_click(UserRatedAttempt(types.Ok)),
            ],
            [html.text("OK")],
          ),
          html.button(
            [
              attribute.class("btn btn-hard"),
              event.on_click(UserRatedAttempt(types.Hard)),
            ],
            [html.text("Hard")],
          ),
        ]),
      ]),
      html.button(
        [
          attribute.class("btn btn-primary"),
          event.on_click(UserClickedNextQuestion),
        ],
        [html.text("Next Question")],
      ),
    ],
  )
}

// ── Board Rendering ─────────────────────────────────────────

/// Render a chess board with optional highlighted square and piece.
fn view_board(
  orientation: types.Orientation,
  highlight: Option(types.Square),
  piece_on_highlight: Option(types.PieceType),
) -> Element(Msg) {
  let files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  let ranks = [8, 7, 6, 5, 4, 3, 2, 1]

  // Transform file/rank order based on orientation
  let #(display_files, display_ranks) = case orientation {
    types.WhiteOrientation -> #(files, ranks)
    types.BlackOrientation -> #(list.reverse(files), list.reverse(ranks))
    types.Rotated90 -> #(files, list.reverse(ranks))
    types.Rotated270 -> #(list.reverse(files), ranks)
  }

  html.div([attribute.class("chess-board")], [
    // Board grid
    html.div(
      [attribute.class("board-grid")],
      list.flat_map(display_ranks, fn(rank) {
        list.map(display_files, fn(file) {
          let sq = types.make_square(file, rank)
          let is_highlighted = case highlight {
            option.Some(h) -> h.name == sq.name
            option.None -> False
          }
          let color_class = case sq.color {
            types.Light -> "square-light"
            types.Dark -> "square-dark"
          }
          let highlight_class = case is_highlighted {
            True -> " square-highlighted"
            False -> ""
          }

          let piece_content = case is_highlighted, piece_on_highlight {
            True, option.Some(pt) -> piece_unicode(pt)
            _, _ -> ""
          }

          html.div(
            [
              attribute.class("board-square " <> color_class <> highlight_class),
              event.on_click(UserClickedSquare(sq.name)),
              attribute.attribute("data-square", sq.name),
            ],
            [html.text(piece_content)],
          )
        })
      }),
    ),
    // File labels
    html.div(
      [attribute.class("file-labels")],
      list.map(display_files, fn(f) {
        html.span([attribute.class("file-label")], [html.text(f)])
      }),
    ),
    // Rank labels
    html.div(
      [attribute.class("rank-labels")],
      list.map(display_ranks, fn(r) {
        html.span([attribute.class("rank-label")], [
          html.text(int.to_string(r)),
        ])
      }),
    ),
  ])
}

/// Get Unicode chess piece symbol.
fn piece_unicode(pt: types.PieceType) -> String {
  case pt {
    types.King -> "\u{2654}"
    types.Queen -> "\u{2655}"
    types.Rook -> "\u{2656}"
    types.Bishop -> "\u{2657}"
    types.Knight -> "\u{2658}"
    types.Pawn -> "\u{2659}"
  }
}

/// Display name for exercise kind.
fn exercise_kind_display(kind: ExerciseKind) -> String {
  case kind {
    types.NameTheSquare -> "Name the Square"
    types.FindTheSquare -> "Find the Square"
    types.NameTheColor -> "Name the Color"
    types.PieceLegalMove -> "Piece Legal Move"
    types.PieceBestMove -> "Piece Best Move"
  }
}

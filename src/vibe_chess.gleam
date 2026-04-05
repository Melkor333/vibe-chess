//// Chess Square Trainer - Main Lustre Application
////
//// Interactive web app that quizzes players on chess board squares.

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import lustre
import lustre/attribute.{class, placeholder, type_, value}
import lustre/effect
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import vibe_chess/answer.{type Answer}
import vibe_chess/game.{type Game, Active, Finished, Idle}
import vibe_chess/trainer

// TYPES -----------------------------------------------------------------------

type Model {
  Model(
    game: Game,
    input: String,
    last_correct: Option(Bool),
    show_answer: Bool,
    history: List(Answer),
  )
}

type Msg {
  UserClickedStart
  UserTypedInput(value: String)
  UserSubmittedAnswer
  UserClickedEnd
  UserClickedPlayAgain
}

// MAIN ------------------------------------------------------------------------

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

// INIT ------------------------------------------------------------------------

fn init(_flags) -> #(Model, effect.Effect(Msg)) {
  let model =
    Model(
      game: game.new(),
      input: "",
      last_correct: None,
      show_answer: False,
      history: [],
    )
  #(model, effect.none())
}

// UPDATE ----------------------------------------------------------------------

fn update(model: Model, msg: Msg) -> #(Model, effect.Effect(Msg)) {
  case msg {
    UserClickedStart ->
      case trainer.start_game(model.game) {
        Ok(g) -> #(
          Model(
            ..model,
            game: g,
            input: "",
            last_correct: None,
            show_answer: False,
            history: [],
          ),
          effect.none(),
        )
        Error(_) -> #(model, effect.none())
      }

    UserTypedInput(v) -> #(Model(..model, input: v), effect.none())

    UserSubmittedAnswer ->
      case trainer.submit_answer(model.game, model.input) {
        Ok(result) -> {
          let sq = case game.get_current_square(model.game) {
            Some(s) -> s
            None -> panic as "No current square"
          }
          let a = answer.new(game.get_attempts(result.game), sq, model.input)
          #(
            Model(
              ..model,
              game: result.game,
              input: "",
              last_correct: Some(result.correct),
              show_answer: True,
              history: list.append(model.history, [a]),
            ),
            effect.none(),
          )
        }
        Error(_) -> #(model, effect.none())
      }

    UserClickedEnd ->
      case trainer.end_game(model.game) {
        Ok(g) -> #(
          Model(..model, game: g, input: "", show_answer: False),
          effect.none(),
        )
        Error(_) -> #(model, effect.none())
      }

    UserClickedPlayAgain -> init(Nil)
  }
}

// VIEW ------------------------------------------------------------------------

fn view(model: Model) -> Element(Msg) {
  html.div([class("app")], [
    html.h1([], [html.text("Chess Square Trainer")]),
    case game.get_status(model.game) {
      Idle -> view_idle(model)
      Active -> view_active(model)
      Finished -> view_finished(model)
    },
  ])
}

fn view_idle(_model: Model) -> Element(Msg) {
  html.div([class("idle")], [
    html.p([], [html.text("Test your knowledge of chess board squares!")]),
    html.p([], [html.text("Click Start to begin.")]),
    html.button([event.on_click(UserClickedStart), class("btn btn-primary")], [
      html.text("Start Game"),
    ]),
  ])
}

fn view_active(model: Model) -> Element(Msg) {
  let square_name = case game.get_current_square(model.game) {
    Some(sq) -> sq.name
    None -> "??"
  }

  html.div([class("active")], [
    // Score display
    html.div([class("stats")], [
      html.span([class("stat")], [
        html.text("Score: " <> int.to_string(game.get_score(model.game))),
      ]),
      html.span([class("stat")], [
        html.text("Attempts: " <> int.to_string(game.get_attempts(model.game))),
      ]),
    ]),

    // Feedback from last answer
    case model.show_answer, model.last_correct {
      True, Some(True) ->
        html.div([class("feedback correct")], [html.text("Correct!")])
      True, Some(False) ->
        html.div([class("feedback incorrect")], [
          html.text("Wrong! That was: " <> square_name),
        ])
      _, _ -> html.div([], [])
    },

    // Current square prompt
    html.div([class("square-display")], [
      html.p([], [html.text("What square is this?")]),
      html.div([class("highlighted-square")], [
        html.text(square_name),
      ]),
    ]),

    // Answer input
    html.div([class("input-area")], [
      html.input([
        type_("text"),
        value(model.input),
        placeholder("Enter square name (e.g. e4)"),
        event.on_input(UserTypedInput),
        event.on_keydown(fn(key) {
          case key {
            "Enter" -> UserSubmittedAnswer
            _ -> UserTypedInput(model.input)
          }
        }),
        class("input"),
      ]),
      html.button(
        [event.on_click(UserSubmittedAnswer), class("btn btn-submit")],
        [
          html.text("Submit"),
        ],
      ),
    ]),

    // End game button
    html.button([event.on_click(UserClickedEnd), class("btn btn-end")], [
      html.text("End Game"),
    ]),
  ])
}

fn view_finished(model: Model) -> Element(Msg) {
  let acc = game.accuracy(model.game)

  html.div([class("finished")], [
    html.h2([], [html.text("Game Over!")]),

    html.div([class("final-stats")], [
      html.div([class("stat-box")], [
        html.p([class("stat-value")], [
          html.text(int.to_string(game.get_score(model.game))),
        ]),
        html.p([class("stat-label")], [html.text("Correct")]),
      ]),
      html.div([class("stat-box")], [
        html.p([class("stat-value")], [
          html.text(int.to_string(game.get_attempts(model.game))),
        ]),
        html.p([class("stat-label")], [html.text("Total")]),
      ]),
      html.div([class("stat-box")], [
        html.p([class("stat-value")], [
          html.text(float.to_string(acc *. 100.0) <> "%"),
        ]),
        html.p([class("stat-label")], [html.text("Accuracy")]),
      ]),
    ]),

    // Answer history
    case model.history != [] {
      True ->
        html.div([class("history")], [
          html.h3([], [html.text("Answer History")]),
          html.table([], [
            html.thead([], [
              html.tr([], [
                html.th([], [html.text("#")]),
                html.th([], [html.text("Square")]),
                html.th([], [html.text("Your Answer")]),
                html.th([], [html.text("Result")]),
              ]),
            ]),
            html.tbody([], {
              list.map(model.history, fn(a) {
                let result_class = case answer.is_correct(a) {
                  True -> "correct"
                  False -> "incorrect"
                }
                html.tr([class(result_class)], [
                  html.td([], [html.text(int.to_string(answer.get_round(a)))]),
                  html.td([], [html.text(answer.get_highlighted_square(a).name)]),
                  html.td([], [html.text(answer.get_submitted_name(a))]),
                  html.td([], [
                    html.text(case answer.is_correct(a) {
                      True -> "✓"
                      False -> "✗"
                    }),
                  ]),
                ])
              })
            }),
          ]),
        ])
      False -> html.div([], [])
    },

    html.button(
      [event.on_click(UserClickedPlayAgain), class("btn btn-primary")],
      [
        html.text("Play Again"),
      ],
    ),
  ])
}

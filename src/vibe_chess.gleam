//// Chess2Brain - Main Lustre Application
////
//// Interactive web app that quizzes players on chess board squares.
//// Supports three game modes:
//// - NameSquare: See a highlighted square, type its name
//// - FindSquare: See a square name, click on it
//// - ColorSquare: See a square name, select black or white

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/uri.{type Uri}
import lustre
import lustre/attribute.{attribute, class, placeholder, type_, value}
import lustre/effect
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import modem
import vibe_chess/answer.{type Answer}
import vibe_chess/delay
import vibe_chess/game.{type Game, type GameMode, Active, Finished, Idle}
import vibe_chess/square.{
  type HardnessLevel, type Square, Level1, Level2, Level3, Level4,
}
import vibe_chess/trainer

// TYPES -----------------------------------------------------------------------

type Route {
  Home
  GameModeRoute(game.GameMode)
}

type Model {
  Model(
    game: Game,
    selected_mode: GameMode,
    selected_hardness: HardnessLevel,
    input: String,
    last_correct: Option(Bool),
    show_answer: Bool,
    history: List(Answer),
  )
}

type Msg {
  UserSelectedMode(mode: GameMode)
  UserSelectedHardness(level: HardnessLevel)
  UserClickedStart
  UserTypedInput(value: String)
  UserSubmittedAnswer
  UserClickedSquare(sq: Square)
  UserClickedColor(is_black: Bool)
  DelayedAdvance
  UserClickedEnd
  UserClickedPlayAgain
  UrlChanged(uri: Uri)
}

// MAIN ------------------------------------------------------------------------

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

// INIT ------------------------------------------------------------------------

fn fragment_to_route(fragment: String) -> Route {
  case fragment {
    "#/name-the-square" | "/name-the-square" | "name-the-square" ->
      GameModeRoute(game.NameSquare)
    "#/find-the-square" | "/find-the-square" | "find-the-square" ->
      GameModeRoute(game.FindSquare)
    "#/color-the-square" | "/color-the-square" | "color-the-square" ->
      GameModeRoute(game.ColorSquare)
    _ -> Home
  }
}

fn uri_to_route(uri: Uri) -> Route {
  case uri.fragment {
    Some(f) -> fragment_to_route(f)
    None -> Home
  }
}

fn mode_to_fragment(mode: GameMode) -> String {
  case mode {
    game.NameSquare -> "/name-the-square"
    game.FindSquare -> "/find-the-square"
    game.ColorSquare -> "/color-the-square"
  }
}

fn init(_flags) -> #(Model, effect.Effect(Msg)) {
  let initial_uri = case modem.initial_uri() {
    Ok(u) -> u
    Error(_) ->
      uri.Uri(
        scheme: None,
        userinfo: None,
        host: None,
        port: None,
        path: "/",
        query: None,
        fragment: None,
      )
  }
  let initial_route = uri_to_route(initial_uri)

  let model = case initial_route {
    Home ->
      Model(
        game: game.new(),
        selected_mode: game.NameSquare,
        selected_hardness: Level1,
        input: "",
        last_correct: None,
        show_answer: False,
        history: [],
      )
    GameModeRoute(mode) -> {
      let game_with_mode = game.new_with_mode(mode)
      case trainer.start_game(game_with_mode) {
        Ok(g) ->
          Model(
            game: g,
            selected_mode: mode,
            selected_hardness: Level1,
            input: "",
            last_correct: None,
            show_answer: False,
            history: [],
          )
        Error(_) ->
          Model(
            game: game.new(),
            selected_mode: mode,
            selected_hardness: Level1,
            input: "",
            last_correct: None,
            show_answer: False,
            history: [],
          )
      }
    }
  }

  #(model, modem.init(UrlChanged))
}

// UPDATE ----------------------------------------------------------------------

fn update(model: Model, msg: Msg) -> #(Model, effect.Effect(Msg)) {
  case msg {
    UserSelectedMode(mode) -> {
      #(Model(..model, selected_mode: mode), effect.none())
    }

    UserSelectedHardness(level) -> {
      #(Model(..model, selected_hardness: level), effect.none())
    }

    UserClickedStart -> {
      let game_with_mode =
        game.new_with_mode_and_hardness(
          model.selected_mode,
          model.selected_hardness,
        )
      case trainer.start_game(game_with_mode) {
        Ok(g) -> #(
          Model(
            ..model,
            game: g,
            input: "",
            last_correct: None,
            show_answer: False,
            history: [],
          ),
          effect.batch([
            effect.none(),
            modem.push("", None, Some(mode_to_fragment(model.selected_mode))),
          ]),
        )
        Error(_) -> #(model, effect.none())
      }
    }

    UserTypedInput(v) -> #(Model(..model, input: v), effect.none())

    UserSubmittedAnswer -> {
      let asked_sq = case game.get_current_square(model.game) {
        Some(s) -> s
        None -> panic as "No current square"
      }
      case trainer.submit_answer(model.game, model.input) {
        Ok(result) -> {
          let a =
            answer.new(game.get_attempts(result.game), asked_sq, model.input)
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
    }

    UserClickedSquare(sq) -> {
      let asked = case game.get_current_square(model.game) {
        Some(s) -> s
        None -> panic as "No current square"
      }
      case trainer.submit_square_click(model.game, sq) {
        Ok(result) -> {
          let a =
            answer.new_from_click(game.get_attempts(result.game), asked, sq)
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
    }

    UserClickedColor(is_black) -> {
      let asked = case game.get_current_square(model.game) {
        Some(s) -> s
        None -> panic as "No current square"
      }
      case trainer.submit_color_answer(model.game, is_black) {
        Ok(result) -> {
          let submitted = case is_black {
            True -> "Black"
            False -> "White"
          }
          let a = answer.new(game.get_attempts(result.game), asked, submitted)
          case result.correct {
            // Correct: advance immediately
            True -> {
              let assert Ok(highlighted) =
                trainer.highlight_next_square(result.game)
              #(
                Model(
                  ..model,
                  game: highlighted,
                  last_correct: Some(True),
                  show_answer: True,
                  history: list.append(model.history, [a]),
                ),
                effect.none(),
              )
            }
            // Wrong: show board for 3 seconds, then advance
            False -> #(
              Model(
                ..model,
                game: result.game,
                last_correct: Some(False),
                show_answer: True,
                history: list.append(model.history, [a]),
              ),
              delay.after(3000, DelayedAdvance),
            )
          }
        }
        Error(_) -> #(model, effect.none())
      }
    }

    DelayedAdvance ->
      case trainer.highlight_next_square(model.game) {
        Ok(g) -> #(Model(..model, game: g, show_answer: False), effect.none())
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

    UserClickedPlayAgain -> {
      let #(m, fx) = init(Nil)
      #(m, effect.batch([fx, modem.push("", None, Some("/"))]))
    }

    UrlChanged(uri) -> {
      let route = uri_to_route(uri)
      case route {
        GameModeRoute(mode) -> {
          // Start game if idle
          case game.get_status(model.game) {
            Idle -> {
              let game_with_mode =
                game.new_with_mode_and_hardness(mode, model.selected_hardness)
              case trainer.start_game(game_with_mode) {
                Ok(g) -> #(
                  Model(
                    ..model,
                    game: g,
                    selected_mode: mode,
                    input: "",
                    last_correct: None,
                    show_answer: False,
                    history: [],
                  ),
                  effect.none(),
                )
                Error(_) -> #(model, effect.none())
              }
            }
            _ -> #(model, effect.none())
          }
        }
        Home -> {
          // Reset to idle if game is active or finished
          case game.get_status(model.game) {
            Active | Finished -> #(
              Model(
                ..model,
                game: game.new(),
                input: "",
                last_correct: None,
                show_answer: False,
                history: [],
              ),
              effect.none(),
            )
            _ -> #(model, effect.none())
          }
        }
      }
    }
  }
}

// VIEW ------------------------------------------------------------------------

fn view(model: Model) -> Element(Msg) {
  html.div([class("app")], [
    html.h1([], [html.text("Chess2Brain")]),
    case game.get_status(model.game) {
      Idle -> view_idle(model)
      Active -> view_active(model)
      Finished -> view_finished(model)
    },
  ])
}

fn view_idle(model: Model) -> Element(Msg) {
  html.div([class("idle")], [
    html.p([class("intro")], [
      html.text(
        "Just play d4, Bf4 followed by e3 or... Did you follow? No? These games might actually help you remember the chessboard! You won't learn to play chess here, but you'll learn to analyse games and studies anywhere, with nothing but your imagination.",
      ),
    ]),

    // Mode selector
    html.div([class("mode-selector")], [
      html.div([class("mode-info")], [
        html.p([class("mode-description")], [
          html.text("Learn the names of the fields"),
        ]),
      ]),
      html.button(
        [
          event.on_click(UserSelectedMode(game.NameSquare)),
          class(case model.selected_mode == game.NameSquare {
            True -> "btn btn-mode selected"
            False -> "btn btn-mode"
          }),
          attribute("data-mode", "name-square"),
        ],
        [html.text("Name the Square")],
      ),
    ]),
    html.div([class("mode-selector mode-selector-reverse")], [
      html.button(
        [
          event.on_click(UserSelectedMode(game.FindSquare)),
          class(case model.selected_mode == game.FindSquare {
            True -> "btn btn-mode selected"
            False -> "btn btn-mode"
          }),
          attribute("data-mode", "find-square"),
        ],
        [html.text("Find the Square")],
      ),
      html.div([class("mode-info")], [
        html.p([class("mode-description")], [
          html.text("The opposite - find the field with the name"),
        ]),
      ]),
    ]),
    html.div([class("mode-selector")], [
      html.div([class("mode-info")], [
        html.p([class("mode-description")], [
          html.text("If you know its color, you got it memorized!"),
        ]),
      ]),
      html.button(
        [
          event.on_click(UserSelectedMode(game.ColorSquare)),
          class(case model.selected_mode == game.ColorSquare {
            True -> "btn btn-mode selected"
            False -> "btn btn-mode"
          }),
          attribute("data-mode", "color-square"),
        ],
        [html.text("Black or White")],
      ),
    ]),

    // Hardness selector
    html.div([class("hardness-selector")], [
      html.p([class("hardness-label")], [html.text("Difficulty")]),
      html.div([class("hardness-buttons")], [
        html.button(
          [
            event.on_click(UserSelectedHardness(Level1)),
            class(case model.selected_hardness == Level1 {
              True -> "btn btn-hardness selected"
              False -> "btn btn-hardness"
            }),
            attribute("data-level", "1"),
          ],
          [html.text("1")],
        ),
        html.button(
          [
            event.on_click(UserSelectedHardness(Level2)),
            class(case model.selected_hardness == Level2 {
              True -> "btn btn-hardness selected"
              False -> "btn btn-hardness"
            }),
            attribute("data-level", "2"),
          ],
          [html.text("2")],
        ),
        html.button(
          [
            event.on_click(UserSelectedHardness(Level3)),
            class(case model.selected_hardness == Level3 {
              True -> "btn btn-hardness selected"
              False -> "btn btn-hardness"
            }),
            attribute("data-level", "3"),
          ],
          [html.text("3")],
        ),
        html.button(
          [
            event.on_click(UserSelectedHardness(Level4)),
            class(case model.selected_hardness == Level4 {
              True -> "btn btn-hardness selected"
              False -> "btn btn-hardness"
            }),
            attribute("data-level", "4"),
          ],
          [html.text("4")],
        ),
      ]),
    ]),

    html.button([event.on_click(UserClickedStart), class("btn btn-primary")], [
      html.text("Start Game"),
    ]),
  ])
}

fn view_active(model: Model) -> Element(Msg) {
  html.div([class("active")], [
    // Score display
    html.div([class("stats")], [
      html.span([class("stat")], [
        html.text("Score: " <> int.to_string(game.get_score(model.game))),
      ]),
      html.span([class("stat")], [
        html.text("Attempts: " <> int.to_string(game.get_attempts(model.game))),
      ]),
      html.span([class("stat mode-label")], [
        html.text(case game.get_mode(model.game) {
          game.NameSquare -> "Mode: Name the Square"
          game.FindSquare -> "Mode: Find the Square"
          game.ColorSquare -> "Mode: Black or White"
        }),
      ]),
      html.span([class("stat level-label")], [
        html.text(
          "Level: "
          <> case game.get_hardness(model.game) {
            Level1 -> "1"
            Level2 -> "2"
            Level3 -> "3"
            Level4 -> "4"
          },
        ),
      ]),
    ]),

    // Feedback from last answer
    view_feedback(model),

    // Mode-specific content
    case game.get_mode(model.game) {
      game.NameSquare -> view_name_square_mode(model)
      game.FindSquare -> view_find_square_mode(model)
      game.ColorSquare -> view_color_square_mode(model)
    },

    // End game button
    html.button([event.on_click(UserClickedEnd), class("btn btn-end")], [
      html.text("End Game"),
    ]),
  ])
}

fn view_feedback(model: Model) -> Element(Msg) {
  case model.show_answer, model.last_correct {
    True, Some(True) ->
      html.div([class("feedback correct")], [html.text("Correct!")])
    True, Some(False) -> {
      let asked_name = case list.last(model.history) {
        Ok(a) -> answer.get_highlighted_square(a).name
        Error(_) -> ""
      }
      case game.get_mode(model.game) {
        game.NameSquare -> {
          let submitted = case list.last(model.history) {
            Ok(a) -> answer.get_submitted_name(a)
            Error(_) -> ""
          }
          html.div(
            [
              class("feedback incorrect"),
              attribute("data-asked-square", asked_name),
              attribute("data-submitted-answer", submitted),
            ],
            [
              html.text(
                "Wrong! You said " <> submitted <> ", that was " <> asked_name,
              ),
            ],
          )
        }
        game.FindSquare -> {
          let clicked = case list.last(model.history) {
            Ok(a) -> answer.get_submitted_name(a)
            Error(_) -> ""
          }
          html.div(
            [
              class("feedback incorrect"),
              attribute("data-asked-square", asked_name),
              attribute("data-submitted-answer", clicked),
            ],
            [
              html.text(
                "You clicked on " <> clicked <> " instead of " <> asked_name,
              ),
            ],
          )
        }
        game.ColorSquare -> {
          let submitted = case list.last(model.history) {
            Ok(a) -> answer.get_submitted_name(a)
            Error(_) -> ""
          }
          let actual_color = case game.get_current_square(model.game) {
            Some(sq) ->
              case square.is_black(sq) {
                True -> "black"
                False -> "white"
              }
            None -> "unknown"
          }
          html.div(
            [
              class("feedback incorrect"),
              attribute("data-asked-square", asked_name),
              attribute("data-submitted-answer", submitted),
            ],
            [
              html.text(
                asked_name <> " is " <> actual_color <> ", not " <> submitted,
              ),
            ],
          )
        }
      }
    }
    _, _ -> html.div([], [])
  }
}

fn view_name_square_mode(model: Model) -> Element(Msg) {
  html.div([class("square-display")], [
    html.p([], [html.text("What square is this?")]),
    view_board(model.game),
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
        [html.text("Submit")],
      ),
    ]),
  ])
}

fn view_find_square_mode(model: Model) -> Element(Msg) {
  let square_name = case game.get_current_square(model.game) {
    Some(sq) -> sq.name
    None -> "??"
  }

  html.div([class("find-square-mode")], [
    html.p([], [html.text("Click on this square:")]),
    html.div([class("highlighted-square")], [html.text(square_name)]),
    view_board_clickable(model.game),
  ])
}

fn view_color_square_mode(model: Model) -> Element(Msg) {
  let square_name = case game.get_current_square(model.game) {
    Some(sq) -> sq.name
    None -> "??"
  }

  // Show board with highlighted square after wrong answer (3s flash)
  let show_board_flash = model.show_answer && model.last_correct == Some(False)

  html.div([class("color-square-mode")], [
    html.p([], [html.text("What color is this square?")]),
    html.div([class("highlighted-square")], [
      html.text(square_name),
    ]),
    html.div([class("color-buttons")], [
      html.button(
        [event.on_click(UserClickedColor(True)), class("btn btn-color-black")],
        [html.text("Black")],
      ),
      html.button(
        [event.on_click(UserClickedColor(False)), class("btn btn-color-white")],
        [html.text("White")],
      ),
    ]),
    case show_board_flash {
      True ->
        html.div([], [
          view_board(model.game),
          html.button(
            [event.on_click(DelayedAdvance), class("btn btn-continue")],
            [
              html.text("Continue"),
            ],
          ),
        ])
      False -> html.div([], [])
    },
  ])
}

fn view_board(g: Game) -> Element(Msg) {
  let current = game.get_current_square(g)
  let display_squares = square.squares_for_display()

  html.div([class("chessboard")], {
    list.map(display_squares, fn(sq) {
      let is_highlighted = case current {
        Some(c) -> c.name == sq.name
        None -> False
      }
      let attrs = [
        class(case is_highlighted {
          True -> "board-square highlighted"
          False -> "board-square"
        }),
        attribute("data-square", sq.name),
      ]
      html.div(attrs, [])
    })
  })
}

fn view_board_clickable(_g: Game) -> Element(Msg) {
  let display_squares = square.squares_for_display()

  html.div([class("chessboard")], {
    list.map(display_squares, fn(sq) {
      html.div(
        [
          class("board-square clickable"),
          attribute("data-square", sq.name),
          event.on_click(UserClickedSquare(sq)),
        ],
        [],
      )
    })
  })
}

fn view_finished(model: Model) -> Element(Msg) {
  let acc = game.accuracy(model.game)

  html.div([class("finished")], [
    html.h2([], [html.text("Game Over!")]),

    // Show which mode was played
    html.p([class("mode-played")], [
      html.text(case game.get_mode(model.game) {
        game.NameSquare -> "Mode: Name the Square"
        game.FindSquare -> "Mode: Find the Square"
        game.ColorSquare -> "Mode: Black or White"
      }),
    ]),

    html.p([class("level-played")], [
      html.text(
        "Level: "
        <> case game.get_hardness(model.game) {
          Level1 -> "1 (Center)"
          Level2 -> "2 (Inner)"
          Level3 -> "3 (Outer)"
          Level4 -> "4 (Full Board)"
        },
      ),
    ]),

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
    html.div([class("history")], [
      html.h3([], [html.text("Answer History")]),
      case model.history == [] {
        True ->
          html.p([class("no-answers")], [html.text("No answers recorded")])
        False ->
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
                  html.td([], [
                    html.text(answer.get_highlighted_square(a).name),
                  ]),
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
          ])
      },
    ]),

    html.button(
      [event.on_click(UserClickedPlayAgain), class("btn btn-primary")],
      [html.text("Play Again")],
    ),
  ])
}

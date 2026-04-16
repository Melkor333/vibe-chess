import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $uri from "../gleam_stdlib/gleam/uri.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attribute from "../lustre/lustre/attribute.mjs";
import { attribute, class$, placeholder, type_, value } from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $modem from "../modem/modem.mjs";
import { Ok, toList, CustomType as $CustomType, makeError, isEqual } from "./gleam.mjs";
import * as $answer from "./vibe_chess/answer.mjs";
import * as $delay from "./vibe_chess/delay.mjs";
import * as $game from "./vibe_chess/game.mjs";
import { Active, Finished, Idle } from "./vibe_chess/game.mjs";
import * as $square from "./vibe_chess/square.mjs";
import { Level1, Level2, Level3, Level4 } from "./vibe_chess/square.mjs";
import * as $trainer from "./vibe_chess/trainer.mjs";

const FILEPATH = "src/vibe_chess.gleam";

class Home extends $CustomType {}

class GameModeRoute extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

class Model extends $CustomType {
  constructor(game, selected_mode, selected_hardness, input, last_correct, show_answer, history) {
    super();
    this.game = game;
    this.selected_mode = selected_mode;
    this.selected_hardness = selected_hardness;
    this.input = input;
    this.last_correct = last_correct;
    this.show_answer = show_answer;
    this.history = history;
  }
}

class UserSelectedMode extends $CustomType {
  constructor(mode) {
    super();
    this.mode = mode;
  }
}

class UserSelectedHardness extends $CustomType {
  constructor(level) {
    super();
    this.level = level;
  }
}

class UserClickedStart extends $CustomType {}

class UserTypedInput extends $CustomType {
  constructor(value) {
    super();
    this.value = value;
  }
}

class UserSubmittedAnswer extends $CustomType {}

class UserClickedSquare extends $CustomType {
  constructor(sq) {
    super();
    this.sq = sq;
  }
}

class UserClickedColor extends $CustomType {
  constructor(is_black) {
    super();
    this.is_black = is_black;
  }
}

class DelayedAdvance extends $CustomType {}

class UserClickedEnd extends $CustomType {}

class UserClickedPlayAgain extends $CustomType {}

class UrlChanged extends $CustomType {
  constructor(uri) {
    super();
    this.uri = uri;
  }
}

function fragment_to_route(fragment) {
  if (fragment === "#/name-the-square") {
    return new GameModeRoute(new $game.NameSquare());
  } else if (fragment === "/name-the-square") {
    return new GameModeRoute(new $game.NameSquare());
  } else if (fragment === "name-the-square") {
    return new GameModeRoute(new $game.NameSquare());
  } else if (fragment === "#/find-the-square") {
    return new GameModeRoute(new $game.FindSquare());
  } else if (fragment === "/find-the-square") {
    return new GameModeRoute(new $game.FindSquare());
  } else if (fragment === "find-the-square") {
    return new GameModeRoute(new $game.FindSquare());
  } else if (fragment === "#/color-the-square") {
    return new GameModeRoute(new $game.ColorSquare());
  } else if (fragment === "/color-the-square") {
    return new GameModeRoute(new $game.ColorSquare());
  } else if (fragment === "color-the-square") {
    return new GameModeRoute(new $game.ColorSquare());
  } else {
    return new Home();
  }
}

function uri_to_route(uri) {
  let $ = uri.fragment;
  if ($ instanceof Some) {
    let f = $[0];
    return fragment_to_route(f);
  } else {
    return new Home();
  }
}

function mode_to_fragment(mode) {
  if (mode instanceof $game.NameSquare) {
    return "/name-the-square";
  } else if (mode instanceof $game.FindSquare) {
    return "/find-the-square";
  } else {
    return "/color-the-square";
  }
}

function init(_) {
  let _block;
  let $ = $modem.initial_uri();
  if ($ instanceof Ok) {
    let u = $[0];
    _block = u;
  } else {
    _block = new $uri.Uri(
      new None(),
      new None(),
      new None(),
      new None(),
      "/",
      new None(),
      new None(),
    );
  }
  let initial_uri = _block;
  let initial_route = uri_to_route(initial_uri);
  let _block$1;
  if (initial_route instanceof Home) {
    _block$1 = new Model(
      $game.new$(),
      new $game.NameSquare(),
      new Level1(),
      "",
      new None(),
      false,
      toList([]),
    );
  } else {
    let mode = initial_route[0];
    let game_with_mode = $game.new_with_mode(mode);
    let $1 = $trainer.start_game(game_with_mode);
    if ($1 instanceof Ok) {
      let g = $1[0];
      _block$1 = new Model(
        g,
        mode,
        new Level1(),
        "",
        new None(),
        false,
        toList([]),
      );
    } else {
      _block$1 = new Model(
        $game.new$(),
        mode,
        new Level1(),
        "",
        new None(),
        false,
        toList([]),
      );
    }
  }
  let model = _block$1;
  return [model, $modem.init((var0) => { return new UrlChanged(var0); })];
}

function update(model, msg) {
  if (msg instanceof UserSelectedMode) {
    let mode = msg.mode;
    return [
      new Model(
        model.game,
        mode,
        model.selected_hardness,
        model.input,
        model.last_correct,
        model.show_answer,
        model.history,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserSelectedHardness) {
    let level = msg.level;
    return [
      new Model(
        model.game,
        model.selected_mode,
        level,
        model.input,
        model.last_correct,
        model.show_answer,
        model.history,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserClickedStart) {
    let game_with_mode = $game.new_with_mode_and_hardness(
      model.selected_mode,
      model.selected_hardness,
    );
    let $ = $trainer.start_game(game_with_mode);
    if ($ instanceof Ok) {
      let g = $[0];
      return [
        new Model(
          g,
          model.selected_mode,
          model.selected_hardness,
          "",
          new None(),
          false,
          toList([]),
        ),
        $effect.batch(
          toList([
            $effect.none(),
            $modem.push(
              "",
              new None(),
              new Some(mode_to_fragment(model.selected_mode)),
            ),
          ]),
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserTypedInput) {
    let v = msg.value;
    return [
      new Model(
        model.game,
        model.selected_mode,
        model.selected_hardness,
        v,
        model.last_correct,
        model.show_answer,
        model.history,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserSubmittedAnswer) {
    let $ = $trainer.submit_answer(model.game, model.input);
    if ($ instanceof Ok) {
      let result = $[0];
      let _block;
      let $1 = $game.get_current_square(model.game);
      if ($1 instanceof Some) {
        let s = $1[0];
        _block = s;
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "vibe_chess",
          200,
          "update",
          "No current square",
          {}
        )
      }
      let sq = _block;
      let a = $answer.new$($game.get_attempts(result.game), sq, model.input);
      return [
        new Model(
          result.game,
          model.selected_mode,
          model.selected_hardness,
          "",
          new Some(result.correct),
          true,
          $list.append(model.history, toList([a])),
        ),
        $effect.none(),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserClickedSquare) {
    let sq = msg.sq;
    let $ = $trainer.submit_square_click(model.game, sq);
    if ($ instanceof Ok) {
      let result = $[0];
      let _block;
      let $1 = $game.get_current_square(model.game);
      if ($1 instanceof Some) {
        let s = $1[0];
        _block = s;
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "vibe_chess",
          223,
          "update",
          "No current square",
          {}
        )
      }
      let asked = _block;
      let a = $answer.new_from_click($game.get_attempts(result.game), asked, sq);
      return [
        new Model(
          result.game,
          model.selected_mode,
          model.selected_hardness,
          "",
          new Some(result.correct),
          true,
          $list.append(model.history, toList([a])),
        ),
        $effect.none(),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserClickedColor) {
    let is_black = msg.is_black;
    let $ = $trainer.submit_color_answer(model.game, is_black);
    if ($ instanceof Ok) {
      let result = $[0];
      let _block;
      let $1 = $game.get_current_square(model.game);
      if ($1 instanceof Some) {
        let s = $1[0];
        _block = s;
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "vibe_chess",
          247,
          "update",
          "No current square",
          {}
        )
      }
      let asked = _block;
      let _block$1;
      if (is_black) {
        _block$1 = "Black";
      } else {
        _block$1 = "White";
      }
      let submitted = _block$1;
      let a = $answer.new$($game.get_attempts(result.game), asked, submitted);
      let $2 = result.correct;
      if ($2) {
        let $3 = $trainer.highlight_next_square(result.game);
        let highlighted;
        if ($3 instanceof Ok) {
          highlighted = $3[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "vibe_chess",
            257,
            "update",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $3,
              start: 6990,
              end: 7077,
              pattern_start: 7001,
              pattern_end: 7016
            }
          )
        }
        return [
          new Model(
            highlighted,
            model.selected_mode,
            model.selected_hardness,
            model.input,
            new Some(true),
            true,
            $list.append(model.history, toList([a])),
          ),
          $effect.none(),
        ];
      } else {
        return [
          new Model(
            result.game,
            model.selected_mode,
            model.selected_hardness,
            model.input,
            new Some(false),
            true,
            $list.append(model.history, toList([a])),
          ),
          $delay.after(3000, new DelayedAdvance()),
        ];
      }
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof DelayedAdvance) {
    let $ = $trainer.highlight_next_square(model.game);
    if ($ instanceof Ok) {
      let g = $[0];
      return [
        new Model(
          g,
          model.selected_mode,
          model.selected_hardness,
          model.input,
          model.last_correct,
          false,
          model.history,
        ),
        $effect.none(),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserClickedEnd) {
    let $ = $trainer.end_game(model.game);
    if ($ instanceof Ok) {
      let g = $[0];
      return [
        new Model(
          g,
          model.selected_mode,
          model.selected_hardness,
          "",
          model.last_correct,
          false,
          model.history,
        ),
        $effect.none(),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserClickedPlayAgain) {
    let $ = init(undefined);
    let m;
    let fx;
    m = $[0];
    fx = $[1];
    return [
      m,
      $effect.batch(toList([fx, $modem.push("", new None(), new Some("/"))])),
    ];
  } else {
    let uri = msg.uri;
    let route = uri_to_route(uri);
    if (route instanceof Home) {
      let $ = $game.get_status(model.game);
      if ($ instanceof Active) {
        return [
          new Model(
            $game.new$(),
            model.selected_mode,
            model.selected_hardness,
            "",
            new None(),
            false,
            toList([]),
          ),
          $effect.none(),
        ];
      } else if ($ instanceof Finished) {
        return [
          new Model(
            $game.new$(),
            model.selected_mode,
            model.selected_hardness,
            "",
            new None(),
            false,
            toList([]),
          ),
          $effect.none(),
        ];
      } else {
        return [model, $effect.none()];
      }
    } else {
      let mode = route[0];
      let $ = $game.get_status(model.game);
      if ($ instanceof Idle) {
        let game_with_mode = $game.new_with_mode_and_hardness(
          mode,
          model.selected_hardness,
        );
        let $1 = $trainer.start_game(game_with_mode);
        if ($1 instanceof Ok) {
          let g = $1[0];
          return [
            new Model(
              g,
              mode,
              model.selected_hardness,
              "",
              new None(),
              false,
              toList([]),
            ),
            $effect.none(),
          ];
        } else {
          return [model, $effect.none()];
        }
      } else {
        return [model, $effect.none()];
      }
    }
  }
}

function view_idle(model) {
  return $html.div(
    toList([class$("idle")]),
    toList([
      $html.p(
        toList([class$("intro")]),
        toList([
          $html.text(
            "Just play d4, Bf4 followed by e3 or... Did you follow? No? These games might actually help you remember the chessboard! You won't learn to play chess here, but you'll learn to analyse games and studies anywhere, with nothing but your imagination.",
          ),
        ]),
      ),
      $html.div(
        toList([class$("mode-selector")]),
        toList([
          $html.div(
            toList([class$("mode-info")]),
            toList([
              $html.p(
                toList([class$("mode-description")]),
                toList([$html.text("Learn the names of the fields")]),
              ),
            ]),
          ),
          $html.button(
            toList([
              $event.on_click(new UserSelectedMode(new $game.NameSquare())),
              class$(
                (() => {
                  let $ = model.selected_mode instanceof $game.NameSquare;
                  if ($) {
                    return "btn btn-mode selected";
                  } else {
                    return "btn btn-mode";
                  }
                })(),
              ),
              attribute("data-mode", "name-square"),
            ]),
            toList([$html.text("Name the Square")]),
          ),
        ]),
      ),
      $html.div(
        toList([class$("mode-selector mode-selector-reverse")]),
        toList([
          $html.button(
            toList([
              $event.on_click(new UserSelectedMode(new $game.FindSquare())),
              class$(
                (() => {
                  let $ = model.selected_mode instanceof $game.FindSquare;
                  if ($) {
                    return "btn btn-mode selected";
                  } else {
                    return "btn btn-mode";
                  }
                })(),
              ),
              attribute("data-mode", "find-square"),
            ]),
            toList([$html.text("Find the Square")]),
          ),
          $html.div(
            toList([class$("mode-info")]),
            toList([
              $html.p(
                toList([class$("mode-description")]),
                toList([
                  $html.text("The opposite - find the field with the name"),
                ]),
              ),
            ]),
          ),
        ]),
      ),
      $html.div(
        toList([class$("mode-selector")]),
        toList([
          $html.div(
            toList([class$("mode-info")]),
            toList([
              $html.p(
                toList([class$("mode-description")]),
                toList([
                  $html.text("If you know its color, you got it memorized!"),
                ]),
              ),
            ]),
          ),
          $html.button(
            toList([
              $event.on_click(new UserSelectedMode(new $game.ColorSquare())),
              class$(
                (() => {
                  let $ = model.selected_mode instanceof $game.ColorSquare;
                  if ($) {
                    return "btn btn-mode selected";
                  } else {
                    return "btn btn-mode";
                  }
                })(),
              ),
              attribute("data-mode", "color-square"),
            ]),
            toList([$html.text("Black or White")]),
          ),
        ]),
      ),
      $html.div(
        toList([class$("hardness-selector")]),
        toList([
          $html.p(
            toList([class$("hardness-label")]),
            toList([$html.text("Difficulty")]),
          ),
          $html.div(
            toList([class$("hardness-buttons")]),
            toList([
              $html.button(
                toList([
                  $event.on_click(new UserSelectedHardness(new Level1())),
                  class$(
                    (() => {
                      let $ = model.selected_hardness instanceof Level1;
                      if ($) {
                        return "btn btn-hardness selected";
                      } else {
                        return "btn btn-hardness";
                      }
                    })(),
                  ),
                  attribute("data-level", "1"),
                ]),
                toList([$html.text("1")]),
              ),
              $html.button(
                toList([
                  $event.on_click(new UserSelectedHardness(new Level2())),
                  class$(
                    (() => {
                      let $ = model.selected_hardness instanceof Level2;
                      if ($) {
                        return "btn btn-hardness selected";
                      } else {
                        return "btn btn-hardness";
                      }
                    })(),
                  ),
                  attribute("data-level", "2"),
                ]),
                toList([$html.text("2")]),
              ),
              $html.button(
                toList([
                  $event.on_click(new UserSelectedHardness(new Level3())),
                  class$(
                    (() => {
                      let $ = model.selected_hardness instanceof Level3;
                      if ($) {
                        return "btn btn-hardness selected";
                      } else {
                        return "btn btn-hardness";
                      }
                    })(),
                  ),
                  attribute("data-level", "3"),
                ]),
                toList([$html.text("3")]),
              ),
              $html.button(
                toList([
                  $event.on_click(new UserSelectedHardness(new Level4())),
                  class$(
                    (() => {
                      let $ = model.selected_hardness instanceof Level4;
                      if ($) {
                        return "btn btn-hardness selected";
                      } else {
                        return "btn btn-hardness";
                      }
                    })(),
                  ),
                  attribute("data-level", "4"),
                ]),
                toList([$html.text("4")]),
              ),
            ]),
          ),
        ]),
      ),
      $html.button(
        toList([
          $event.on_click(new UserClickedStart()),
          class$("btn btn-primary"),
        ]),
        toList([$html.text("Start Game")]),
      ),
    ]),
  );
}

function view_feedback(model) {
  let $ = model.show_answer;
  let $1 = model.last_correct;
  if ($ && $1 instanceof Some) {
    let $2 = $1[0];
    if ($2) {
      return $html.div(
        toList([class$("feedback correct")]),
        toList([$html.text("Correct!")]),
      );
    } else {
      let _block;
      let $3 = $list.last(model.history);
      if ($3 instanceof Ok) {
        let a = $3[0];
        _block = $answer.get_highlighted_square(a).name;
      } else {
        _block = "";
      }
      let asked_name = _block;
      let $4 = $game.get_mode(model.game);
      if ($4 instanceof $game.NameSquare) {
        let _block$1;
        let $5 = $list.last(model.history);
        if ($5 instanceof Ok) {
          let a = $5[0];
          _block$1 = $answer.get_submitted_name(a);
        } else {
          _block$1 = "";
        }
        let submitted = _block$1;
        return $html.div(
          toList([
            class$("feedback incorrect"),
            attribute("data-asked-square", asked_name),
            attribute("data-submitted-answer", submitted),
          ]),
          toList([
            $html.text(
              (("Wrong! You said " + submitted) + ", that was ") + asked_name,
            ),
          ]),
        );
      } else if ($4 instanceof $game.FindSquare) {
        let _block$1;
        let $5 = $list.last(model.history);
        if ($5 instanceof Ok) {
          let a = $5[0];
          _block$1 = $answer.get_submitted_name(a);
        } else {
          _block$1 = "";
        }
        let clicked = _block$1;
        return $html.div(
          toList([
            class$("feedback incorrect"),
            attribute("data-asked-square", asked_name),
            attribute("data-submitted-answer", clicked),
          ]),
          toList([
            $html.text(
              (("You clicked on " + clicked) + " instead of ") + asked_name,
            ),
          ]),
        );
      } else {
        let _block$1;
        let $5 = $list.last(model.history);
        if ($5 instanceof Ok) {
          let a = $5[0];
          _block$1 = $answer.get_submitted_name(a);
        } else {
          _block$1 = "";
        }
        let submitted = _block$1;
        let _block$2;
        let $6 = $game.get_current_square(model.game);
        if ($6 instanceof Some) {
          let sq = $6[0];
          let $7 = $square.is_black(sq);
          if ($7) {
            _block$2 = "black";
          } else {
            _block$2 = "white";
          }
        } else {
          _block$2 = "unknown";
        }
        let actual_color = _block$2;
        return $html.div(
          toList([
            class$("feedback incorrect"),
            attribute("data-asked-square", asked_name),
            attribute("data-submitted-answer", submitted),
          ]),
          toList([
            $html.text(
              (((asked_name + " is ") + actual_color) + ", not ") + submitted,
            ),
          ]),
        );
      }
    }
  } else {
    return $html.div(toList([]), toList([]));
  }
}

function view_board(g) {
  let current = $game.get_current_square(g);
  let display_squares = $square.squares_for_display();
  return $html.div(
    toList([class$("chessboard")]),
    $list.map(
      display_squares,
      (sq) => {
        let _block;
        if (current instanceof Some) {
          let c = current[0];
          _block = c.name === sq.name;
        } else {
          _block = false;
        }
        let is_highlighted = _block;
        let attrs = toList([
          class$(
            (() => {
              if (is_highlighted) {
                return "board-square highlighted";
              } else {
                return "board-square";
              }
            })(),
          ),
          attribute("data-square", sq.name),
        ]);
        return $html.div(attrs, toList([]));
      },
    ),
  );
}

function view_name_square_mode(model) {
  return $html.div(
    toList([class$("square-display")]),
    toList([
      $html.p(toList([]), toList([$html.text("What square is this?")])),
      view_board(model.game),
      $html.div(
        toList([class$("input-area")]),
        toList([
          $html.input(
            toList([
              type_("text"),
              value(model.input),
              placeholder("Enter square name (e.g. e4)"),
              $event.on_input((var0) => { return new UserTypedInput(var0); }),
              $event.on_keydown(
                (key) => {
                  if (key === "Enter") {
                    return new UserSubmittedAnswer();
                  } else {
                    return new UserTypedInput(model.input);
                  }
                },
              ),
              class$("input"),
            ]),
          ),
          $html.button(
            toList([
              $event.on_click(new UserSubmittedAnswer()),
              class$("btn btn-submit"),
            ]),
            toList([$html.text("Submit")]),
          ),
        ]),
      ),
    ]),
  );
}

function view_color_square_mode(model) {
  let _block;
  let $ = $game.get_current_square(model.game);
  if ($ instanceof Some) {
    let sq = $[0];
    _block = sq.name;
  } else {
    _block = "??";
  }
  let square_name = _block;
  let show_board_flash = model.show_answer && (isEqual(
    model.last_correct,
    new Some(false)
  ));
  return $html.div(
    toList([class$("color-square-mode")]),
    toList([
      $html.p(toList([]), toList([$html.text("What color is this square?")])),
      $html.div(
        toList([class$("highlighted-square")]),
        toList([$html.text(square_name)]),
      ),
      $html.div(
        toList([class$("color-buttons")]),
        toList([
          $html.button(
            toList([
              $event.on_click(new UserClickedColor(true)),
              class$("btn btn-color-black"),
            ]),
            toList([$html.text("Black")]),
          ),
          $html.button(
            toList([
              $event.on_click(new UserClickedColor(false)),
              class$("btn btn-color-white"),
            ]),
            toList([$html.text("White")]),
          ),
        ]),
      ),
      (() => {
        if (show_board_flash) {
          return $html.div(
            toList([]),
            toList([
              view_board(model.game),
              $html.button(
                toList([
                  $event.on_click(new DelayedAdvance()),
                  class$("btn btn-continue"),
                ]),
                toList([$html.text("Continue")]),
              ),
            ]),
          );
        } else {
          return $html.div(toList([]), toList([]));
        }
      })(),
    ]),
  );
}

function view_board_clickable(_) {
  let display_squares = $square.squares_for_display();
  return $html.div(
    toList([class$("chessboard")]),
    $list.map(
      display_squares,
      (sq) => {
        return $html.div(
          toList([
            class$("board-square clickable"),
            attribute("data-square", sq.name),
            $event.on_click(new UserClickedSquare(sq)),
          ]),
          toList([]),
        );
      },
    ),
  );
}

function view_find_square_mode(model) {
  let _block;
  let $ = $game.get_current_square(model.game);
  if ($ instanceof Some) {
    let sq = $[0];
    _block = sq.name;
  } else {
    _block = "??";
  }
  let square_name = _block;
  return $html.div(
    toList([class$("find-square-mode")]),
    toList([
      $html.p(toList([]), toList([$html.text("Click on this square:")])),
      $html.div(
        toList([class$("highlighted-square")]),
        toList([$html.text(square_name)]),
      ),
      view_board_clickable(model.game),
    ]),
  );
}

function view_active(model) {
  return $html.div(
    toList([class$("active")]),
    toList([
      $html.div(
        toList([class$("stats")]),
        toList([
          $html.span(
            toList([class$("stat")]),
            toList([
              $html.text(
                "Score: " + $int.to_string($game.get_score(model.game)),
              ),
            ]),
          ),
          $html.span(
            toList([class$("stat")]),
            toList([
              $html.text(
                "Attempts: " + $int.to_string($game.get_attempts(model.game)),
              ),
            ]),
          ),
          $html.span(
            toList([class$("stat mode-label")]),
            toList([
              $html.text(
                (() => {
                  let $ = $game.get_mode(model.game);
                  if ($ instanceof $game.NameSquare) {
                    return "Mode: Name the Square";
                  } else if ($ instanceof $game.FindSquare) {
                    return "Mode: Find the Square";
                  } else {
                    return "Mode: Black or White";
                  }
                })(),
              ),
            ]),
          ),
          $html.span(
            toList([class$("stat level-label")]),
            toList([
              $html.text(
                "Level: " + (() => {
                  let $ = $game.get_hardness(model.game);
                  if ($ instanceof Level1) {
                    return "1";
                  } else if ($ instanceof Level2) {
                    return "2";
                  } else if ($ instanceof Level3) {
                    return "3";
                  } else {
                    return "4";
                  }
                })(),
              ),
            ]),
          ),
        ]),
      ),
      view_feedback(model),
      (() => {
        let $ = $game.get_mode(model.game);
        if ($ instanceof $game.NameSquare) {
          return view_name_square_mode(model);
        } else if ($ instanceof $game.FindSquare) {
          return view_find_square_mode(model);
        } else {
          return view_color_square_mode(model);
        }
      })(),
      $html.button(
        toList([$event.on_click(new UserClickedEnd()), class$("btn btn-end")]),
        toList([$html.text("End Game")]),
      ),
    ]),
  );
}

function view_finished(model) {
  let acc = $game.accuracy(model.game);
  return $html.div(
    toList([class$("finished")]),
    toList([
      $html.h2(toList([]), toList([$html.text("Game Over!")])),
      $html.p(
        toList([class$("mode-played")]),
        toList([
          $html.text(
            (() => {
              let $ = $game.get_mode(model.game);
              if ($ instanceof $game.NameSquare) {
                return "Mode: Name the Square";
              } else if ($ instanceof $game.FindSquare) {
                return "Mode: Find the Square";
              } else {
                return "Mode: Black or White";
              }
            })(),
          ),
        ]),
      ),
      $html.p(
        toList([class$("level-played")]),
        toList([
          $html.text(
            "Level: " + (() => {
              let $ = $game.get_hardness(model.game);
              if ($ instanceof Level1) {
                return "1 (Center)";
              } else if ($ instanceof Level2) {
                return "2 (Inner)";
              } else if ($ instanceof Level3) {
                return "3 (Outer)";
              } else {
                return "4 (Full Board)";
              }
            })(),
          ),
        ]),
      ),
      $html.div(
        toList([class$("final-stats")]),
        toList([
          $html.div(
            toList([class$("stat-box")]),
            toList([
              $html.p(
                toList([class$("stat-value")]),
                toList([$html.text($int.to_string($game.get_score(model.game)))]),
              ),
              $html.p(
                toList([class$("stat-label")]),
                toList([$html.text("Correct")]),
              ),
            ]),
          ),
          $html.div(
            toList([class$("stat-box")]),
            toList([
              $html.p(
                toList([class$("stat-value")]),
                toList([
                  $html.text($int.to_string($game.get_attempts(model.game))),
                ]),
              ),
              $html.p(
                toList([class$("stat-label")]),
                toList([$html.text("Total")]),
              ),
            ]),
          ),
          $html.div(
            toList([class$("stat-box")]),
            toList([
              $html.p(
                toList([class$("stat-value")]),
                toList([$html.text($float.to_string(acc * 100.0) + "%")]),
              ),
              $html.p(
                toList([class$("stat-label")]),
                toList([$html.text("Accuracy")]),
              ),
            ]),
          ),
        ]),
      ),
      $html.div(
        toList([class$("history")]),
        toList([
          $html.h3(toList([]), toList([$html.text("Answer History")])),
          (() => {
            let $ = isEqual(model.history, toList([]));
            if ($) {
              return $html.p(
                toList([class$("no-answers")]),
                toList([$html.text("No answers recorded")]),
              );
            } else {
              return $html.table(
                toList([]),
                toList([
                  $html.thead(
                    toList([]),
                    toList([
                      $html.tr(
                        toList([]),
                        toList([
                          $html.th(toList([]), toList([$html.text("#")])),
                          $html.th(toList([]), toList([$html.text("Square")])),
                          $html.th(
                            toList([]),
                            toList([$html.text("Your Answer")]),
                          ),
                          $html.th(toList([]), toList([$html.text("Result")])),
                        ]),
                      ),
                    ]),
                  ),
                  $html.tbody(
                    toList([]),
                    $list.map(
                      model.history,
                      (a) => {
                        let _block;
                        let $1 = $answer.is_correct(a);
                        if ($1) {
                          _block = "correct";
                        } else {
                          _block = "incorrect";
                        }
                        let result_class = _block;
                        return $html.tr(
                          toList([class$(result_class)]),
                          toList([
                            $html.td(
                              toList([]),
                              toList([
                                $html.text($int.to_string($answer.get_round(a))),
                              ]),
                            ),
                            $html.td(
                              toList([]),
                              toList([
                                $html.text(
                                  $answer.get_highlighted_square(a).name,
                                ),
                              ]),
                            ),
                            $html.td(
                              toList([]),
                              toList([$html.text($answer.get_submitted_name(a))]),
                            ),
                            $html.td(
                              toList([]),
                              toList([
                                $html.text(
                                  (() => {
                                    let $2 = $answer.is_correct(a);
                                    if ($2) {
                                      return "✓";
                                    } else {
                                      return "✗";
                                    }
                                  })(),
                                ),
                              ]),
                            ),
                          ]),
                        );
                      },
                    ),
                  ),
                ]),
              );
            }
          })(),
        ]),
      ),
      $html.button(
        toList([
          $event.on_click(new UserClickedPlayAgain()),
          class$("btn btn-primary"),
        ]),
        toList([$html.text("Play Again")]),
      ),
    ]),
  );
}

function view(model) {
  return $html.div(
    toList([class$("app")]),
    toList([
      $html.h1(toList([]), toList([$html.text("Chess2Brain")])),
      (() => {
        let $ = $game.get_status(model.game);
        if ($ instanceof Idle) {
          return view_idle(model);
        } else if ($ instanceof Active) {
          return view_active(model);
        } else {
          return view_finished(model);
        }
      })(),
    ]),
  );
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess",
      66,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1725,
        end: 1774,
        pattern_start: 1736,
        pattern_end: 1741
      }
    )
  }
  return undefined;
}

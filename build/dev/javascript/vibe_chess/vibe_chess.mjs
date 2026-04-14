import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attribute from "../lustre/lustre/attribute.mjs";
import { attribute, class$, placeholder, type_, value } from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import { Ok, toList, CustomType as $CustomType, makeError, isEqual } from "./gleam.mjs";
import * as $answer from "./vibe_chess/answer.mjs";
import * as $delay from "./vibe_chess/delay.mjs";
import * as $game from "./vibe_chess/game.mjs";
import { Active, Finished, Idle } from "./vibe_chess/game.mjs";
import * as $square from "./vibe_chess/square.mjs";
import * as $trainer from "./vibe_chess/trainer.mjs";

const FILEPATH = "src/vibe_chess.gleam";

class Model extends $CustomType {
  constructor(game, selected_mode, input, last_correct, show_answer, history) {
    super();
    this.game = game;
    this.selected_mode = selected_mode;
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

function init(_) {
  let model = new Model(
    $game.new$(),
    new $game.NameSquare(),
    "",
    new None(),
    false,
    toList([]),
  );
  return [model, $effect.none()];
}

function update(model, msg) {
  if (msg instanceof UserSelectedMode) {
    let mode = msg.mode;
    return [
      new Model(
        model.game,
        mode,
        model.input,
        model.last_correct,
        model.show_answer,
        model.history,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserClickedStart) {
    let game_with_mode = $game.new_with_mode(model.selected_mode);
    let $ = $trainer.start_game(game_with_mode);
    if ($ instanceof Ok) {
      let g = $[0];
      return [
        new Model(g, model.selected_mode, "", new None(), false, toList([])),
        $effect.none(),
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
          106,
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
          129,
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
          153,
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
            163,
            "update",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $3,
              start: 4652,
              end: 4739,
              pattern_start: 4663,
              pattern_end: 4678
            }
          )
        }
        return [
          new Model(
            highlighted,
            model.selected_mode,
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
  } else {
    return init(undefined);
  }
}

function view_idle(model) {
  return $html.div(
    toList([class$("idle")]),
    toList([
      $html.p(
        toList([]),
        toList([$html.text("Test your knowledge of chess board squares!")]),
      ),
      $html.p(
        toList([]),
        toList([$html.text("Choose a mode and click Start to begin.")]),
      ),
      $html.div(
        toList([class$("mode-selector")]),
        toList([
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
          $html.p(
            toList([class$("mode-description")]),
            toList([$html.text("A square is highlighted — type its name")]),
          ),
        ]),
      ),
      $html.div(
        toList([class$("mode-selector")]),
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
          $html.p(
            toList([class$("mode-description")]),
            toList([$html.text("A name is shown — click the matching square")]),
          ),
        ]),
      ),
      $html.div(
        toList([class$("mode-selector")]),
        toList([
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
          $html.p(
            toList([class$("mode-description")]),
            toList([
              $html.text(
                "A name is shown — select if the square is black or white",
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
        toList([class$("highlighted-square color-prompt")]),
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
      (() => {
        let $ = !isEqual(model.history, toList([]));
        if ($) {
          return $html.div(
            toList([class$("history")]),
            toList([
              $html.h3(toList([]), toList([$html.text("Answer History")])),
              $html.table(
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
              ),
            ]),
          );
        } else {
          return $html.div(toList([]), toList([]));
        }
      })(),
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
      $html.h1(toList([]), toList([$html.text("Chess Square Trainer")])),
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
      54,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1476,
        end: 1525,
        pattern_start: 1487,
        pattern_end: 1492
      }
    )
  }
  return undefined;
}

import * as $float from "../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  CustomType as $CustomType,
  divideFloat,
} from "../gleam.mjs";
import * as $board from "../vibe_chess/board.mjs";
import * as $square from "../vibe_chess/square.mjs";
import { Level1 } from "../vibe_chess/square.mjs";

export class NameSquare extends $CustomType {}
export const GameMode$NameSquare = () => new NameSquare();
export const GameMode$isNameSquare = (value) => value instanceof NameSquare;

export class FindSquare extends $CustomType {}
export const GameMode$FindSquare = () => new FindSquare();
export const GameMode$isFindSquare = (value) => value instanceof FindSquare;

export class ColorSquare extends $CustomType {}
export const GameMode$ColorSquare = () => new ColorSquare();
export const GameMode$isColorSquare = (value) => value instanceof ColorSquare;

export class Idle extends $CustomType {}
export const Status$Idle = () => new Idle();
export const Status$isIdle = (value) => value instanceof Idle;

export class Active extends $CustomType {}
export const Status$Active = () => new Active();
export const Status$isActive = (value) => value instanceof Active;

export class Finished extends $CustomType {}
export const Status$Finished = () => new Finished();
export const Status$isFinished = (value) => value instanceof Finished;

export class Game extends $CustomType {
  constructor(board, score, attempts, current_square, status, mode, hardness, answers) {
    super();
    this.board = board;
    this.score = score;
    this.attempts = attempts;
    this.current_square = current_square;
    this.status = status;
    this.mode = mode;
    this.hardness = hardness;
    this.answers = answers;
  }
}
export const Game$Game = (board, score, attempts, current_square, status, mode, hardness, answers) =>
  new Game(board,
  score,
  attempts,
  current_square,
  status,
  mode,
  hardness,
  answers);
export const Game$isGame = (value) => value instanceof Game;
export const Game$Game$board = (value) => value.board;
export const Game$Game$0 = (value) => value.board;
export const Game$Game$score = (value) => value.score;
export const Game$Game$1 = (value) => value.score;
export const Game$Game$attempts = (value) => value.attempts;
export const Game$Game$2 = (value) => value.attempts;
export const Game$Game$current_square = (value) => value.current_square;
export const Game$Game$3 = (value) => value.current_square;
export const Game$Game$status = (value) => value.status;
export const Game$Game$4 = (value) => value.status;
export const Game$Game$mode = (value) => value.mode;
export const Game$Game$5 = (value) => value.mode;
export const Game$Game$hardness = (value) => value.hardness;
export const Game$Game$6 = (value) => value.hardness;
export const Game$Game$answers = (value) => value.answers;
export const Game$Game$7 = (value) => value.answers;

/**
 * Create a new idle game with the given mode and hardness level.
 */
export function new_with_mode_and_hardness(mode, hardness) {
  return new Game(
    $board.new$(),
    0,
    0,
    new None(),
    new Idle(),
    mode,
    hardness,
    toList([]),
  );
}

/**
 * Create a new idle game with the given mode (default hardness: Level1).
 */
export function new_with_mode(mode) {
  return new_with_mode_and_hardness(mode, new Level1());
}

/**
 * Create a new idle game in NameSquare mode (default).
 */
export function new$() {
  return new_with_mode(new NameSquare());
}

/**
 * Get the game's board.
 */
export function get_board(game) {
  return game.board;
}

/**
 * Get the game's score.
 */
export function get_score(game) {
  return game.score;
}

/**
 * Get the game's attempts.
 */
export function get_attempts(game) {
  return game.attempts;
}

/**
 * Get the current highlighted square.
 */
export function get_current_square(game) {
  return game.current_square;
}

/**
 * Get the game status.
 */
export function get_status(game) {
  return game.status;
}

/**
 * Get the game mode.
 */
export function get_mode(game) {
  return game.mode;
}

/**
 * Get the game's hardness level.
 */
export function get_hardness(game) {
  return game.hardness;
}

/**
 * Get the game's answers history.
 */
export function get_answers(game) {
  return game.answers;
}

/**
 * Compute accuracy as a derived value.
 * Returns 0 when attempts is 0.
 * Rounded to one decimal place.
 */
export function accuracy(game) {
  let $ = game.attempts > 0;
  if ($) {
    let raw = divideFloat(
      $int.to_float(game.score),
      $int.to_float(game.attempts)
    );
    return $int.to_float($float.round(raw * 10.0)) / 10.0;
  } else {
    return 0.0;
  }
}

/**
 * Pick a random square from a list of squares.
 * 
 * @ignore
 */
function random_square_from_list(squares) {
  let $ = $list.sample(squares, 1);
  if ($ instanceof $Empty) {
    return new None();
  } else {
    let sq = $.head;
    return new Some(sq);
  }
}

/**
 * Pick a random square different from the excluded square.
 * Falls back to allowing same if only one square in level.
 * 
 * @ignore
 */
function random_square_different_from(squares, exclude) {
  let filtered = $list.filter(
    squares,
    (sq) => { return sq.name !== exclude.name; },
  );
  let $ = $list.sample(filtered, 1);
  if ($ instanceof $Empty) {
    let $1 = $list.sample(squares, 1);
    if ($1 instanceof $Empty) {
      return new None();
    } else {
      let sq = $1.head;
      return new Some(sq);
    }
  } else {
    let sq = $.head;
    return new Some(sq);
  }
}

/**
 * Transition: Idle -> Active (StartGame).
 * Sets score=0, attempts=0, highlights first square.
 */
export function start(game) {
  let $ = game.status;
  if ($ instanceof Idle) {
    let level_squares = $square.squares_for_level(game.hardness);
    let $1 = random_square_from_list(level_squares);
    if ($1 instanceof Some) {
      let sq = $1[0];
      return new Ok(
        new Game(
          game.board,
          0,
          0,
          new Some(sq),
          new Active(),
          game.mode,
          game.hardness,
          game.answers,
        ),
      );
    } else {
      return new Error("No squares available for this level");
    }
  } else {
    return new Error("Cannot start game: not in Idle state");
  }
}

/**
 * Highlight the next random square (Active state only).
 * Avoids repeating the current square when possible.
 */
export function highlight_next(game) {
  let $ = game.status;
  if ($ instanceof Active) {
    let level_squares = $square.squares_for_level(game.hardness);
    let _block;
    let $1 = game.current_square;
    if ($1 instanceof Some) {
      let sq = $1[0];
      _block = random_square_different_from(level_squares, sq);
    } else {
      _block = random_square_from_list(level_squares);
    }
    let picked = _block;
    if (picked instanceof Some) {
      let sq = picked[0];
      return new Ok(
        new Game(
          game.board,
          game.score,
          game.attempts,
          new Some(sq),
          game.status,
          game.mode,
          game.hardness,
          game.answers,
        ),
      );
    } else {
      return new Error("No squares available for this level");
    }
  } else {
    return new Error("Cannot highlight: game not active");
  }
}

/**
 * Submit an answer via text input (NameSquare mode, Active state).
 * Returns updated game and whether the answer was correct.
 */
export function submit_answer(game, submitted_name) {
  let $ = game.status;
  let $1 = game.mode;
  let $2 = game.current_square;
  if ($2 instanceof Some) {
    if ($ instanceof Idle) {
      return new Error("Cannot submit answer: game not started");
    } else if ($ instanceof Active) {
      if ($1 instanceof NameSquare) {
        let sq = $2[0];
        let is_correct = submitted_name === sq.name;
        let _block;
        if (is_correct) {
          _block = game.score + 1;
        } else {
          _block = game.score;
        }
        let new_score = _block;
        let new_attempts = game.attempts + 1;
        let answer = [new_attempts, sq, submitted_name, is_correct];
        let level_squares = $square.squares_for_level(game.hardness);
        let $3 = random_square_different_from(level_squares, sq);
        if ($3 instanceof Some) {
          let next_sq = $3[0];
          let new_game = new Game(
            game.board,
            new_score,
            new_attempts,
            new Some(next_sq),
            game.status,
            game.mode,
            game.hardness,
            $list.append(game.answers, toList([answer])),
          );
          return new Ok([new_game, is_correct]);
        } else {
          return new Error("No squares available for this level");
        }
      } else if ($1 instanceof FindSquare) {
        return new Error("Cannot submit text answer: wrong game mode");
      } else {
        return new Error("Cannot submit text answer: wrong game mode");
      }
    } else {
      return new Error("Cannot submit answer: game finished");
    }
  } else if ($ instanceof Idle) {
    return new Error("Cannot submit answer: game not started");
  } else if ($ instanceof Finished) {
    return new Error("Cannot submit answer: game finished");
  } else if ($1 instanceof FindSquare) {
    return new Error("Cannot submit text answer: wrong game mode");
  } else if ($1 instanceof ColorSquare) {
    return new Error("Cannot submit text answer: wrong game mode");
  } else {
    return new Error("Cannot submit answer: no square highlighted");
  }
}

/**
 * Submit a square click answer (FindSquare mode, Active state).
 * Returns updated game and whether the clicked square was correct.
 */
export function submit_square_click(game, clicked_square) {
  let $ = game.status;
  let $1 = game.mode;
  let $2 = game.current_square;
  if ($2 instanceof Some) {
    if ($ instanceof Idle) {
      return new Error("Cannot submit click: game not started");
    } else if ($ instanceof Active) {
      if ($1 instanceof NameSquare) {
        return new Error("Cannot submit click: wrong game mode");
      } else if ($1 instanceof FindSquare) {
        let sq = $2[0];
        let is_correct = clicked_square.name === sq.name;
        let _block;
        if (is_correct) {
          _block = game.score + 1;
        } else {
          _block = game.score;
        }
        let new_score = _block;
        let new_attempts = game.attempts + 1;
        let answer = [new_attempts, sq, clicked_square.name, is_correct];
        let level_squares = $square.squares_for_level(game.hardness);
        let $3 = random_square_different_from(level_squares, sq);
        if ($3 instanceof Some) {
          let next_sq = $3[0];
          let new_game = new Game(
            game.board,
            new_score,
            new_attempts,
            new Some(next_sq),
            game.status,
            game.mode,
            game.hardness,
            $list.append(game.answers, toList([answer])),
          );
          return new Ok([new_game, is_correct]);
        } else {
          return new Error("No squares available for this level");
        }
      } else {
        return new Error("Cannot submit click: wrong game mode");
      }
    } else {
      return new Error("Cannot submit click: game finished");
    }
  } else if ($ instanceof Idle) {
    return new Error("Cannot submit click: game not started");
  } else if ($ instanceof Finished) {
    return new Error("Cannot submit click: game finished");
  } else if ($1 instanceof NameSquare) {
    return new Error("Cannot submit click: wrong game mode");
  } else if ($1 instanceof ColorSquare) {
    return new Error("Cannot submit click: wrong game mode");
  } else {
    return new Error("Cannot submit click: no square highlighted");
  }
}

/**
 * Submit a color answer (ColorSquare mode, Active state).
 * The player selects black or white for the current square.
 * Returns updated game and whether the answer was correct.
 * Does NOT advance to next square — call highlight_next after the delay.
 */
export function submit_color_answer(game, guessed_black) {
  let $ = game.status;
  let $1 = game.mode;
  let $2 = game.current_square;
  if ($2 instanceof Some) {
    if ($ instanceof Idle) {
      return new Error("Cannot submit color: game not started");
    } else if ($ instanceof Active) {
      if ($1 instanceof NameSquare) {
        return new Error("Cannot submit color: wrong game mode");
      } else if ($1 instanceof FindSquare) {
        return new Error("Cannot submit color: wrong game mode");
      } else {
        let sq = $2[0];
        let is_black = $square.is_black(sq);
        let is_correct = guessed_black === is_black;
        let _block;
        if (is_correct) {
          _block = game.score + 1;
        } else {
          _block = game.score;
        }
        let new_score = _block;
        let new_attempts = game.attempts + 1;
        let _block$1;
        if (guessed_black) {
          _block$1 = "Black";
        } else {
          _block$1 = "White";
        }
        let submitted = _block$1;
        let answer = [new_attempts, sq, submitted, is_correct];
        let new_game = new Game(
          game.board,
          new_score,
          new_attempts,
          game.current_square,
          game.status,
          game.mode,
          game.hardness,
          $list.append(game.answers, toList([answer])),
        );
        return new Ok([new_game, is_correct]);
      }
    } else {
      return new Error("Cannot submit color: game finished");
    }
  } else if ($ instanceof Idle) {
    return new Error("Cannot submit color: game not started");
  } else if ($ instanceof Finished) {
    return new Error("Cannot submit color: game finished");
  } else if ($1 instanceof NameSquare) {
    return new Error("Cannot submit color: wrong game mode");
  } else if ($1 instanceof FindSquare) {
    return new Error("Cannot submit color: wrong game mode");
  } else {
    return new Error("Cannot submit color: no square highlighted");
  }
}

/**
 * End the game (Active state only).
 */
export function end(game) {
  let $ = game.status;
  if ($ instanceof Active) {
    return new Ok(
      new Game(
        game.board,
        game.score,
        game.attempts,
        new None(),
        new Finished(),
        game.mode,
        game.hardness,
        game.answers,
      ),
    );
  } else {
    return new Error("Cannot end game: not in Active state");
  }
}

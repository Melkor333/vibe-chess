import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import { Ok, Error, toList, CustomType as $CustomType, divideFloat } from "../gleam.mjs";
import * as $board from "../vibe_chess/board.mjs";
import * as $square from "../vibe_chess/square.mjs";

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
  constructor(board, score, attempts, current_square, status, answers) {
    super();
    this.board = board;
    this.score = score;
    this.attempts = attempts;
    this.current_square = current_square;
    this.status = status;
    this.answers = answers;
  }
}
export const Game$Game = (board, score, attempts, current_square, status, answers) =>
  new Game(board, score, attempts, current_square, status, answers);
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
export const Game$Game$answers = (value) => value.answers;
export const Game$Game$5 = (value) => value.answers;

/**
 * Create a new idle game.
 */
export function new$() {
  return new Game($board.new$(), 0, 0, new None(), new Idle(), toList([]));
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
 * Get the game's answers history.
 */
export function get_answers(game) {
  return game.answers;
}

/**
 * Compute accuracy as a derived value.
 * Returns 0 when attempts is 0.
 */
export function accuracy(game) {
  let $ = game.attempts > 0;
  if ($) {
    return divideFloat($int.to_float(game.score), $int.to_float(game.attempts));
  } else {
    return 0.0;
  }
}

/**
 * Transition: Idle -> Active (StartGame).
 * Sets score=0, attempts=0, highlights first square.
 */
export function start(game) {
  let $ = game.status;
  if ($ instanceof Idle) {
    return new Ok(
      new Game(
        game.board,
        0,
        0,
        new Some($board.random_square(game.board)),
        new Active(),
        game.answers,
      ),
    );
  } else {
    return new Error("Cannot start game: not in Idle state");
  }
}

/**
 * Highlight the next random square (Active state only).
 */
export function highlight_next(game) {
  let $ = game.status;
  if ($ instanceof Active) {
    return new Ok(
      new Game(
        game.board,
        game.score,
        game.attempts,
        new Some($board.random_square(game.board)),
        game.status,
        game.answers,
      ),
    );
  } else {
    return new Error("Cannot highlight: game not active");
  }
}

/**
 * Submit an answer (Active state, current_square must exist).
 * Returns updated game and whether the answer was correct.
 */
export function submit_answer(game, submitted_name) {
  let $ = game.status;
  let $1 = game.current_square;
  if ($1 instanceof Some) {
    if ($ instanceof Idle) {
      return new Error("Cannot submit answer: game not started");
    } else if ($ instanceof Active) {
      let sq = $1[0];
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
      let new_game = new Game(
        game.board,
        new_score,
        new_attempts,
        new Some($board.random_square(game.board)),
        game.status,
        $list.append(game.answers, toList([answer])),
      );
      return new Ok([new_game, is_correct]);
    } else {
      return new Error("Cannot submit answer: game finished");
    }
  } else if ($ instanceof Idle) {
    return new Error("Cannot submit answer: game not started");
  } else if ($ instanceof Finished) {
    return new Error("Cannot submit answer: game finished");
  } else {
    return new Error("Cannot submit answer: no square highlighted");
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
        game.answers,
      ),
    );
  } else {
    return new Error("Cannot end game: not in Active state");
  }
}

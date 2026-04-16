import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import { Ok, Error, CustomType as $CustomType } from "../gleam.mjs";
import * as $game from "../vibe_chess/game.mjs";
import * as $square from "../vibe_chess/square.mjs";

export class AnswerResult extends $CustomType {
  constructor(game, correct) {
    super();
    this.game = game;
    this.correct = correct;
  }
}
export const AnswerResult$AnswerResult = (game, correct) =>
  new AnswerResult(game, correct);
export const AnswerResult$isAnswerResult = (value) =>
  value instanceof AnswerResult;
export const AnswerResult$AnswerResult$game = (value) => value.game;
export const AnswerResult$AnswerResult$0 = (value) => value.game;
export const AnswerResult$AnswerResult$correct = (value) => value.correct;
export const AnswerResult$AnswerResult$1 = (value) => value.correct;

/**
 * Rule: StartGame
 * Requires: game.status = Idle
 * Ensures: status=Active, score=0, attempts=0, highlights next square
 */
export function start_game(game) {
  return $game.start(game);
}

/**
 * Rule: HighlightNextSquare
 * Requires: game.status = Active
 * Ensures: game.current_square = random square
 */
export function highlight_next_square(game) {
  return $game.highlight_next(game);
}

/**
 * Rule: SubmitAnswer (NameSquare mode)
 * Requires: game.status = Active, game.mode = NameSquare, game.current_square != null
 * Ensures: attempts+1, score+1 if correct, creates Answer, returns AnswerResult
 */
export function submit_answer(game, submitted_name) {
  let $ = $game.submit_answer(game, submitted_name);
  if ($ instanceof Ok) {
    let updated = $[0][0];
    let is_correct = $[0][1];
    return new Ok(new AnswerResult(updated, is_correct));
  } else {
    return $;
  }
}

/**
 * Rule: SubmitSquareClick (FindSquare mode)
 * Requires: game.status = Active, game.mode = FindSquare, game.current_square != null
 * Ensures: attempts+1, score+1 if correct, creates Answer, returns AnswerResult
 */
export function submit_square_click(game, clicked_square) {
  let $ = $game.submit_square_click(game, clicked_square);
  if ($ instanceof Ok) {
    let updated = $[0][0];
    let is_correct = $[0][1];
    return new Ok(new AnswerResult(updated, is_correct));
  } else {
    return $;
  }
}

/**
 * Rule: SubmitColorAnswer (ColorSquare mode)
 * Requires: game.status = Active, game.mode = ColorSquare, game.current_square != null
 * Ensures: attempts+1, score+1 if correct, returns AnswerResult
 * Note: does NOT advance to next square — call highlight_next_square after delay.
 */
export function submit_color_answer(game, guessed_black) {
  let $ = $game.submit_color_answer(game, guessed_black);
  if ($ instanceof Ok) {
    let updated = $[0][0];
    let is_correct = $[0][1];
    return new Ok(new AnswerResult(updated, is_correct));
  } else {
    return $;
  }
}

/**
 * Rule: ContinueAfterAnswer
 * Triggered by AnswerResult, requires active
 * Ensures: highlights next square (already done in submit_answer/submit_square_click)
 */
export function continue_after_answer(game) {
  let $ = $game.get_status(game);
  if ($ instanceof $game.Active) {
    return new Ok(game);
  } else {
    return new Error("Cannot continue: game not active");
  }
}

/**
 * Rule: EndGame
 * Requires: game.status = Active
 * Ensures: status=Finished, current_square=null
 */
export function end_game(game) {
  return $game.end(game);
}

/**
 * Get the current highlighted square name for display.
 * Returns None if no square is highlighted or game not active,
 * or if the mode is NameSquare (per spec: name hidden in that mode).
 */
export function get_highlighted_square_name(game) {
  let $ = $game.get_mode(game);
  if ($ instanceof $game.NameSquare) {
    return new None();
  } else {
    let $1 = $game.get_status(game);
    let $2 = $game.get_current_square(game);
    if ($2 instanceof Some && $1 instanceof $game.Active) {
      let sq = $2[0];
      return new Some(sq.name);
    } else {
      return new None();
    }
  }
}

/**
 * Get the current game mode.
 */
export function get_game_mode(game) {
  return $game.get_mode(game);
}

/**
 * Get accuracy when game is finished.
 * Returns None if game not finished.
 */
export function get_accuracy(game) {
  let $ = $game.get_status(game);
  if ($ instanceof $game.Finished) {
    return new Some($game.accuracy(game));
  } else {
    return new None();
  }
}

/**
 * Get the current hardness level.
 */
export function get_hardness_level(game) {
  return $game.get_hardness(game);
}

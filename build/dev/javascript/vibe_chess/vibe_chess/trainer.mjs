import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import { Ok, Error, CustomType as $CustomType } from "../gleam.mjs";
import * as $game from "../vibe_chess/game.mjs";

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
 * Rule: SubmitAnswer
 * Requires: game.status = Active, game.current_square != null
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
 * Rule: ContinueAfterAnswer
 * Triggered by AnswerResult, requires active
 * Ensures: highlights next square (already done in submit_answer)
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
 * Returns None if no square is highlighted or game not active.
 */
export function get_highlighted_square_name(game) {
  let $ = $game.get_status(game);
  let $1 = $game.get_current_square(game);
  if ($1 instanceof Some && $ instanceof $game.Active) {
    let sq = $1[0];
    return new Some(sq.name);
  } else {
    return new None();
  }
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

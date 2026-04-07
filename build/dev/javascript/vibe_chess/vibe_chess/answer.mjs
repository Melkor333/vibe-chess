import { CustomType as $CustomType } from "../gleam.mjs";
import * as $square from "../vibe_chess/square.mjs";

export class Answer extends $CustomType {
  constructor(round, highlighted_square, submitted_name, correct) {
    super();
    this.round = round;
    this.highlighted_square = highlighted_square;
    this.submitted_name = submitted_name;
    this.correct = correct;
  }
}
export const Answer$Answer = (round, highlighted_square, submitted_name, correct) =>
  new Answer(round, highlighted_square, submitted_name, correct);
export const Answer$isAnswer = (value) => value instanceof Answer;
export const Answer$Answer$round = (value) => value.round;
export const Answer$Answer$0 = (value) => value.round;
export const Answer$Answer$highlighted_square = (value) =>
  value.highlighted_square;
export const Answer$Answer$1 = (value) => value.highlighted_square;
export const Answer$Answer$submitted_name = (value) => value.submitted_name;
export const Answer$Answer$2 = (value) => value.submitted_name;
export const Answer$Answer$correct = (value) => value.correct;
export const Answer$Answer$3 = (value) => value.correct;

/**
 * Create a new answer.
 */
export function new$(round, highlighted_square, submitted_name) {
  return new Answer(
    round,
    highlighted_square,
    submitted_name,
    submitted_name === highlighted_square.name,
  );
}

/**
 * Get the round number.
 */
export function get_round(answer) {
  return answer.round;
}

/**
 * Get the highlighted square.
 */
export function get_highlighted_square(answer) {
  return answer.highlighted_square;
}

/**
 * Get the submitted name.
 */
export function get_submitted_name(answer) {
  return answer.submitted_name;
}

/**
 * Check if the answer was correct.
 */
export function is_correct(answer) {
  return answer.correct;
}

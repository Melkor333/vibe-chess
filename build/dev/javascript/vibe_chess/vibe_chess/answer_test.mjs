import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { makeError } from "../gleam.mjs";
import * as $answer from "../vibe_chess/answer.mjs";
import * as $square from "../vibe_chess/square.mjs";
import { A, C, D, E, H, R1, R3, R4, R5, R8 } from "../vibe_chess/square.mjs";

const FILEPATH = "test/vibe_chess/answer_test.gleam";

export function main() {
  return $gleeunit.main();
}

export function correct_answer_test() {
  let sq = $square.new$(new E(), new R4());
  let a = $answer.new$(1, sq, "e4");
  let $ = $answer.is_correct(a);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      12,
      "correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 236, end: 274, pattern_start: 247, pattern_end: 251 }
    )
  }
  return $;
}

export function wrong_answer_test() {
  let sq = $square.new$(new E(), new R4());
  let a = $answer.new$(1, sq, "d4");
  let $ = $answer.is_correct(a);
  if (!(!$)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      18,
      "wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 372, end: 411, pattern_start: 383, pattern_end: 388 }
    )
  }
  return $;
}

export function answer_round_test() {
  let sq = $square.new$(new A(), new R1());
  let a = $answer.new$(5, sq, "a1");
  let $ = $answer.get_round(a);
  if (!($ === 5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      24,
      "answer_round_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 509, end: 543, pattern_start: 520, pattern_end: 521 }
    )
  }
  return $;
}

export function answer_highlighted_square_test() {
  let sq = $square.new$(new H(), new R8());
  let a = $answer.new$(1, sq, "h8");
  let $ = $answer.get_highlighted_square(a).file;
  if (!($ instanceof H)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      30,
      "answer_highlighted_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 654, end: 706, pattern_start: 665, pattern_end: 666 }
    )
  }
  let $1 = $answer.get_highlighted_square(a).rank;
  if (!($1 instanceof R8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      31,
      "answer_highlighted_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 709, end: 762, pattern_start: 720, pattern_end: 722 }
    )
  }
  return $1;
}

export function answer_submitted_name_test() {
  let sq = $square.new$(new C(), new R3());
  let a = $answer.new$(1, sq, "c3");
  let $ = $answer.get_submitted_name(a);
  if (!($ === "c3")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      37,
      "answer_submitted_name_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 869, end: 915, pattern_start: 880, pattern_end: 884 }
    )
  }
  return $;
}

export function case_sensitive_answer_test() {
  let sq = $square.new$(new E(), new R4());
  let a = $answer.new$(1, sq, "E4");
  let $ = $answer.is_correct(a);
  if (!(!$)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      43,
      "case_sensitive_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1022,
        end: 1061,
        pattern_start: 1033,
        pattern_end: 1038
      }
    )
  }
  return $;
}

export function empty_answer_test() {
  let sq = $square.new$(new D(), new R5());
  let a = $answer.new$(1, sq, "");
  let $ = $answer.is_correct(a);
  if (!(!$)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      49,
      "empty_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1157,
        end: 1196,
        pattern_start: 1168,
        pattern_end: 1173
      }
    )
  }
  return $;
}

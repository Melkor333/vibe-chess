import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
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
      15,
      "correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 309, end: 347, pattern_start: 320, pattern_end: 324 }
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
      21,
      "wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 445, end: 484, pattern_start: 456, pattern_end: 461 }
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
      27,
      "answer_round_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 582, end: 616, pattern_start: 593, pattern_end: 594 }
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
      33,
      "answer_highlighted_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 727, end: 779, pattern_start: 738, pattern_end: 739 }
    )
  }
  let $1 = $answer.get_highlighted_square(a).rank;
  if (!($1 instanceof R8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      34,
      "answer_highlighted_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 782, end: 835, pattern_start: 793, pattern_end: 795 }
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
      40,
      "answer_submitted_name_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 942, end: 988, pattern_start: 953, pattern_end: 957 }
    )
  }
  return $;
}

export function text_answer_has_no_submitted_square_test() {
  let sq = $square.new$(new E(), new R4());
  let a = $answer.new$(1, sq, "e4");
  let $ = $answer.get_submitted_square(a);
  if (!($ instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      46,
      "text_answer_has_no_submitted_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1109,
        end: 1157,
        pattern_start: 1120,
        pattern_end: 1124
      }
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
      52,
      "case_sensitive_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1264,
        end: 1303,
        pattern_start: 1275,
        pattern_end: 1280
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
      58,
      "empty_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1399,
        end: 1438,
        pattern_start: 1410,
        pattern_end: 1415
      }
    )
  }
  return $;
}

export function correct_click_answer_test() {
  let asked = $square.new$(new E(), new R4());
  let clicked = $square.new$(new E(), new R4());
  let a = $answer.new_from_click(1, asked, clicked);
  let $ = $answer.is_correct(a);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      67,
      "correct_click_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1639,
        end: 1677,
        pattern_start: 1650,
        pattern_end: 1654
      }
    )
  }
  return $;
}

export function wrong_click_answer_test() {
  let asked = $square.new$(new E(), new R4());
  let clicked = $square.new$(new D(), new R4());
  let a = $answer.new_from_click(1, asked, clicked);
  let $ = $answer.is_correct(a);
  if (!(!$)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      74,
      "wrong_click_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1835,
        end: 1874,
        pattern_start: 1846,
        pattern_end: 1851
      }
    )
  }
  return $;
}

export function click_answer_round_test() {
  let asked = $square.new$(new A(), new R1());
  let clicked = $square.new$(new A(), new R1());
  let a = $answer.new_from_click(3, asked, clicked);
  let $ = $answer.get_round(a);
  if (!($ === 3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      81,
      "click_answer_round_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2032,
        end: 2066,
        pattern_start: 2043,
        pattern_end: 2044
      }
    )
  }
  return $;
}

export function click_answer_highlighted_square_test() {
  let asked = $square.new$(new H(), new R8());
  let clicked = $square.new$(new H(), new R8());
  let a = $answer.new_from_click(1, asked, clicked);
  let $ = $answer.get_highlighted_square(a).file;
  if (!($ instanceof H)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      88,
      "click_answer_highlighted_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2237,
        end: 2289,
        pattern_start: 2248,
        pattern_end: 2249
      }
    )
  }
  let $1 = $answer.get_highlighted_square(a).rank;
  if (!($1 instanceof R8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      89,
      "click_answer_highlighted_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2292,
        end: 2345,
        pattern_start: 2303,
        pattern_end: 2305
      }
    )
  }
  return $1;
}

export function click_answer_submitted_name_is_clicked_square_test() {
  let asked = $square.new$(new E(), new R4());
  let clicked = $square.new$(new D(), new R4());
  let a = $answer.new_from_click(1, asked, clicked);
  let $ = $answer.get_submitted_name(a);
  if (!($ === "d4")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      96,
      "click_answer_submitted_name_is_clicked_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2530,
        end: 2576,
        pattern_start: 2541,
        pattern_end: 2545
      }
    )
  }
  return $;
}

export function click_answer_has_submitted_square_test() {
  let asked = $square.new$(new E(), new R4());
  let clicked = $square.new$(new D(), new R4());
  let a = $answer.new_from_click(1, asked, clicked);
  let $ = $answer.get_submitted_square(a);
  let sq;
  if ($ instanceof Some) {
    sq = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      103,
      "click_answer_has_submitted_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2749,
        end: 2801,
        pattern_start: 2760,
        pattern_end: 2768
      }
    )
  }
  let $1 = sq.file;
  if (!($1 instanceof D)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      104,
      "click_answer_has_submitted_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2804,
        end: 2826,
        pattern_start: 2815,
        pattern_end: 2816
      }
    )
  }
  let $2 = sq.rank;
  if (!($2 instanceof R4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/answer_test",
      105,
      "click_answer_has_submitted_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2829,
        end: 2852,
        pattern_start: 2840,
        pattern_end: 2842
      }
    )
  }
  return $2;
}

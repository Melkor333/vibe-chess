import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { Ok, Error, makeError } from "../gleam.mjs";
import * as $game from "../vibe_chess/game.mjs";
import { Active, Finished, Idle } from "../vibe_chess/game.mjs";

const FILEPATH = "test/vibe_chess/game_test.gleam";

export function main() {
  return $gleeunit.main();
}

export function new_game_is_idle_test() {
  let g = $game.new$();
  let $ = $game.get_status(g);
  if (!($ instanceof Idle)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      12,
      "new_game_is_idle_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 209, end: 245, pattern_start: 220, pattern_end: 224 }
    )
  }
  return $;
}

export function new_game_has_zero_score_test() {
  let g = $game.new$();
  let $ = $game.get_score(g);
  if (!($ === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      17,
      "new_game_has_zero_score_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 312, end: 344, pattern_start: 323, pattern_end: 324 }
    )
  }
  return $;
}

export function new_game_has_zero_attempts_test() {
  let g = $game.new$();
  let $ = $game.get_attempts(g);
  if (!($ === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      22,
      "new_game_has_zero_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 414, end: 449, pattern_start: 425, pattern_end: 426 }
    )
  }
  return $;
}

export function new_game_no_current_square_test() {
  let g = $game.new$();
  let $ = $game.get_current_square(g);
  if (!($ instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      27,
      "new_game_no_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 519, end: 563, pattern_start: 530, pattern_end: 534 }
    )
  }
  return $;
}

export function new_game_accuracy_zero_test() {
  let g = $game.new$();
  let $ = $game.accuracy(g);
  if (!($ === 0.0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      32,
      "new_game_accuracy_zero_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 629, end: 662, pattern_start: 640, pattern_end: 643 }
    )
  }
  return $;
}

export function start_game_transitions_to_active_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      37,
      "start_game_transitions_to_active_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 738, end: 776, pattern_start: 749, pattern_end: 760 }
    )
  }
  let $1 = $game.get_status(started);
  if (!($1 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      38,
      "start_game_transitions_to_active_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 779, end: 823, pattern_start: 790, pattern_end: 796 }
    )
  }
  return $1;
}

export function start_game_sets_score_zero_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      43,
      "start_game_sets_score_zero_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 893, end: 931, pattern_start: 904, pattern_end: 915 }
    )
  }
  let $1 = $game.get_score(started);
  if (!($1 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      44,
      "start_game_sets_score_zero_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 934, end: 972, pattern_start: 945, pattern_end: 946 }
    )
  }
  return $1;
}

export function start_game_sets_attempts_zero_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      49,
      "start_game_sets_attempts_zero_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1045,
        end: 1083,
        pattern_start: 1056,
        pattern_end: 1067
      }
    )
  }
  let $1 = $game.get_attempts(started);
  if (!($1 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      50,
      "start_game_sets_attempts_zero_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1086,
        end: 1127,
        pattern_start: 1097,
        pattern_end: 1098
      }
    )
  }
  return $1;
}

export function start_game_highlights_square_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      55,
      "start_game_highlights_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1199,
        end: 1237,
        pattern_start: 1210,
        pattern_end: 1221
      }
    )
  }
  let $1 = $game.get_current_square(started);
  if (!($1 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      56,
      "start_game_highlights_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1240,
        end: 1293,
        pattern_start: 1251,
        pattern_end: 1258
      }
    )
  }
  return $1;
}

export function start_active_game_fails_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      61,
      "start_active_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1360,
        end: 1398,
        pattern_start: 1371,
        pattern_end: 1382
      }
    )
  }
  let $1 = $game.start(started);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      62,
      "start_active_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1401,
        end: 1442,
        pattern_start: 1412,
        pattern_end: 1420
      }
    )
  }
  return $1;
}

export function start_finished_game_fails_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      67,
      "start_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1511,
        end: 1549,
        pattern_start: 1522,
        pattern_end: 1533
      }
    )
  }
  let $1 = $game.end(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      68,
      "start_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1552,
        end: 1592,
        pattern_start: 1563,
        pattern_end: 1572
      }
    )
  }
  let $2 = $game.start(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      69,
      "start_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1595,
        end: 1634,
        pattern_start: 1606,
        pattern_end: 1614
      }
    )
  }
  return $2;
}

export function highlight_next_in_active_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      74,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1702,
        end: 1740,
        pattern_start: 1713,
        pattern_end: 1724
      }
    )
  }
  let $1 = $game.highlight_next(started);
  let highlighted;
  if ($1 instanceof Ok) {
    highlighted = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      75,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1743,
        end: 1800,
        pattern_start: 1754,
        pattern_end: 1769
      }
    )
  }
  let $2 = $game.get_status(highlighted);
  if (!($2 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      76,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1803,
        end: 1851,
        pattern_start: 1814,
        pattern_end: 1820
      }
    )
  }
  let $3 = $game.get_current_square(highlighted);
  if (!($3 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      77,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 1854,
        end: 1911,
        pattern_start: 1865,
        pattern_end: 1872
      }
    )
  }
  return $3;
}

export function highlight_next_in_idle_fails_test() {
  let g = $game.new$();
  let $ = $game.highlight_next(g);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      82,
      "highlight_next_in_idle_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1983,
        end: 2027,
        pattern_start: 1994,
        pattern_end: 2002
      }
    )
  }
  return $;
}

export function submit_correct_answer_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      87,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2092,
        end: 2130,
        pattern_start: 2103,
        pattern_end: 2114
      }
    )
  }
  let $1 = $game.get_current_square(started);
  let sq;
  if ($1 instanceof Some) {
    sq = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      88,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2133,
        end: 2187,
        pattern_start: 2144,
        pattern_end: 2152
      }
    )
  }
  let $2 = $game.submit_answer(started, sq.name);
  let updated;
  if ($2 instanceof Ok) {
    let $3 = $2[0][1];
    if ($3) {
      updated = $2[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        89,
        "submit_correct_answer_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $2,
          start: 2190,
          end: 2260,
          pattern_start: 2201,
          pattern_end: 2221
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      89,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2190,
        end: 2260,
        pattern_start: 2201,
        pattern_end: 2221
      }
    )
  }
  let $4 = $game.get_score(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      90,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 2263,
        end: 2301,
        pattern_start: 2274,
        pattern_end: 2275
      }
    )
  }
  let $5 = $game.get_attempts(updated);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      91,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 2304,
        end: 2345,
        pattern_start: 2315,
        pattern_end: 2316
      }
    )
  }
  return $5;
}

export function submit_wrong_answer_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      96,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2408,
        end: 2446,
        pattern_start: 2419,
        pattern_end: 2430
      }
    )
  }
  let $1 = $game.submit_answer(started, "zz");
  let updated;
  if ($1 instanceof Ok) {
    let $2 = $1[0][1];
    if (!$2) {
      updated = $1[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        97,
        "submit_wrong_answer_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $1,
          start: 2449,
          end: 2517,
          pattern_start: 2460,
          pattern_end: 2481
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      97,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2449,
        end: 2517,
        pattern_start: 2460,
        pattern_end: 2481
      }
    )
  }
  let $3 = $game.get_score(updated);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      98,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 2520,
        end: 2558,
        pattern_start: 2531,
        pattern_end: 2532
      }
    )
  }
  let $4 = $game.get_attempts(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      99,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 2561,
        end: 2602,
        pattern_start: 2572,
        pattern_end: 2573
      }
    )
  }
  return $4;
}

export function submit_answer_in_idle_fails_test() {
  let g = $game.new$();
  let $ = $game.submit_answer(g, "e4");
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      104,
      "submit_answer_in_idle_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2673,
        end: 2722,
        pattern_start: 2684,
        pattern_end: 2692
      }
    )
  }
  return $;
}

export function submit_answer_in_finished_fails_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      109,
      "submit_answer_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2797,
        end: 2835,
        pattern_start: 2808,
        pattern_end: 2819
      }
    )
  }
  let $1 = $game.end(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      110,
      "submit_answer_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2838,
        end: 2878,
        pattern_start: 2849,
        pattern_end: 2858
      }
    )
  }
  let $2 = $game.submit_answer(ended, "e4");
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      111,
      "submit_answer_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2881,
        end: 2934,
        pattern_start: 2892,
        pattern_end: 2900
      }
    )
  }
  return $2;
}

export function submit_answer_highlights_next_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      116,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3007,
        end: 3045,
        pattern_start: 3018,
        pattern_end: 3029
      }
    )
  }
  let $1 = $game.get_current_square(started);
  let sq1;
  if ($1 instanceof Some) {
    sq1 = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      117,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3048,
        end: 3103,
        pattern_start: 3059,
        pattern_end: 3068
      }
    )
  }
  let $2 = $game.submit_answer(started, sq1.name);
  let updated;
  if ($2 instanceof Ok) {
    updated = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      118,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3106,
        end: 3174,
        pattern_start: 3117,
        pattern_end: 3134
      }
    )
  }
  let $3 = $game.get_current_square(updated);
  if (!($3 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      119,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 3177,
        end: 3230,
        pattern_start: 3188,
        pattern_end: 3195
      }
    )
  }
  return $3;
}

export function end_game_transitions_to_finished_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      124,
      "end_game_transitions_to_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3306,
        end: 3344,
        pattern_start: 3317,
        pattern_end: 3328
      }
    )
  }
  let $1 = $game.end(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      125,
      "end_game_transitions_to_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3347,
        end: 3387,
        pattern_start: 3358,
        pattern_end: 3367
      }
    )
  }
  let $2 = $game.get_status(ended);
  if (!($2 instanceof Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      126,
      "end_game_transitions_to_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3390,
        end: 3434,
        pattern_start: 3401,
        pattern_end: 3409
      }
    )
  }
  return $2;
}

export function end_game_clears_current_square_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      131,
      "end_game_clears_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3508,
        end: 3546,
        pattern_start: 3519,
        pattern_end: 3530
      }
    )
  }
  let $1 = $game.end(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      132,
      "end_game_clears_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3549,
        end: 3589,
        pattern_start: 3560,
        pattern_end: 3569
      }
    )
  }
  let $2 = $game.get_current_square(ended);
  if (!($2 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      133,
      "end_game_clears_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3592,
        end: 3640,
        pattern_start: 3603,
        pattern_end: 3607
      }
    )
  }
  return $2;
}

export function end_idle_game_fails_test() {
  let g = $game.new$();
  let $ = $game.end(g);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      138,
      "end_idle_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3703,
        end: 3736,
        pattern_start: 3714,
        pattern_end: 3722
      }
    )
  }
  return $;
}

export function end_finished_game_fails_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      143,
      "end_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3803,
        end: 3841,
        pattern_start: 3814,
        pattern_end: 3825
      }
    )
  }
  let $1 = $game.end(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      144,
      "end_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3844,
        end: 3884,
        pattern_start: 3855,
        pattern_end: 3864
      }
    )
  }
  let $2 = $game.end(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      145,
      "end_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3887,
        end: 3924,
        pattern_start: 3898,
        pattern_end: 3906
      }
    )
  }
  return $2;
}

export function accuracy_with_attempts_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      150,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3990,
        end: 4028,
        pattern_start: 4001,
        pattern_end: 4012
      }
    )
  }
  let $1 = $game.get_current_square(started);
  let sq;
  if ($1 instanceof Some) {
    sq = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      151,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4031,
        end: 4085,
        pattern_start: 4042,
        pattern_end: 4050
      }
    )
  }
  let $2 = $game.submit_answer(started, sq.name);
  let g1;
  if ($2 instanceof Ok) {
    g1 = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      152,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4088,
        end: 4150,
        pattern_start: 4099,
        pattern_end: 4111
      }
    )
  }
  let $3 = $game.submit_answer(g1, "zz");
  let g2;
  if ($3 instanceof Ok) {
    g2 = $3[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      153,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 4153,
        end: 4207,
        pattern_start: 4164,
        pattern_end: 4176
      }
    )
  }
  let $4 = $game.accuracy(g2);
  if (!($4 === 0.5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      154,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 4210,
        end: 4244,
        pattern_start: 4221,
        pattern_end: 4224
      }
    )
  }
  return $4;
}

export function full_game_scenario_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let g1;
  if ($ instanceof Ok) {
    g1 = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      159,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4306,
        end: 4339,
        pattern_start: 4317,
        pattern_end: 4323
      }
    )
  }
  let $1 = $game.get_status(g1);
  if (!($1 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      160,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4342,
        end: 4381,
        pattern_start: 4353,
        pattern_end: 4359
      }
    )
  }
  let $2 = $game.submit_answer(g1, "wrong");
  let g2;
  if ($2 instanceof Ok) {
    g2 = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      162,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4385,
        end: 4442,
        pattern_start: 4396,
        pattern_end: 4408
      }
    )
  }
  let $3 = $game.get_score(g2);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      163,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 4445,
        end: 4478,
        pattern_start: 4456,
        pattern_end: 4457
      }
    )
  }
  let $4 = $game.get_attempts(g2);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      164,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 4481,
        end: 4517,
        pattern_start: 4492,
        pattern_end: 4493
      }
    )
  }
  let $5 = $game.get_current_square(g2);
  let sq;
  if ($5 instanceof Some) {
    sq = $5[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      166,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 4521,
        end: 4570,
        pattern_start: 4532,
        pattern_end: 4540
      }
    )
  }
  let $6 = $game.submit_answer(g2, sq.name);
  let g3;
  if ($6 instanceof Ok) {
    g3 = $6[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      167,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $6,
        start: 4573,
        end: 4630,
        pattern_start: 4584,
        pattern_end: 4596
      }
    )
  }
  let $7 = $game.get_score(g3);
  if (!($7 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      168,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $7,
        start: 4633,
        end: 4666,
        pattern_start: 4644,
        pattern_end: 4645
      }
    )
  }
  let $8 = $game.get_attempts(g3);
  if (!($8 === 2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      169,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $8,
        start: 4669,
        end: 4705,
        pattern_start: 4680,
        pattern_end: 4681
      }
    )
  }
  let $9 = $game.end(g3);
  let g4;
  if ($9 instanceof Ok) {
    g4 = $9[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      171,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $9,
        start: 4709,
        end: 4741,
        pattern_start: 4720,
        pattern_end: 4726
      }
    )
  }
  let $10 = $game.get_status(g4);
  if (!($10 instanceof Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      172,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $10,
        start: 4744,
        end: 4785,
        pattern_start: 4755,
        pattern_end: 4763
      }
    )
  }
  let $11 = $game.get_current_square(g4);
  if (!($11 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      173,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $11,
        start: 4788,
        end: 4833,
        pattern_start: 4799,
        pattern_end: 4803
      }
    )
  }
  let $12 = $game.accuracy(g4);
  if (!($12 === 0.5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      174,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $12,
        start: 4836,
        end: 4870,
        pattern_start: 4847,
        pattern_end: 4850
      }
    )
  }
  return $12;
}

export function answers_history_test() {
  let g = $game.new$();
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      179,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4929,
        end: 4967,
        pattern_start: 4940,
        pattern_end: 4951
      }
    )
  }
  let $1 = $game.get_current_square(started);
  let sq;
  if ($1 instanceof Some) {
    sq = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      180,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4970,
        end: 5024,
        pattern_start: 4981,
        pattern_end: 4989
      }
    )
  }
  let $2 = $game.submit_answer(started, sq.name);
  let updated;
  if ($2 instanceof Ok) {
    updated = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      181,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5027,
        end: 5094,
        pattern_start: 5038,
        pattern_end: 5055
      }
    )
  }
  let $3 = $list.length($game.get_answers(updated));
  if (!($3 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      182,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 5097,
        end: 5150,
        pattern_start: 5108,
        pattern_end: 5109
      }
    )
  }
  return $3;
}

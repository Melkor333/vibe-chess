import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { Ok, Error, makeError } from "../gleam.mjs";
import * as $game from "../vibe_chess/game.mjs";
import * as $trainer from "../vibe_chess/trainer.mjs";

const FILEPATH = "test/vibe_chess/trainer_test.gleam";

export function main() {
  return $gleeunit.main();
}

export function start_game_success_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      14,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 219, end: 265, pattern_start: 230, pattern_end: 241 }
    )
  }
  let $1 = $game.get_status(started);
  if (!($1 instanceof $game.Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      15,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 268, end: 317, pattern_start: 279, pattern_end: 290 }
    )
  }
  let $2 = $game.get_score(started);
  if (!($2 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      16,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $2, start: 320, end: 358, pattern_start: 331, pattern_end: 332 }
    )
  }
  let $3 = $game.get_attempts(started);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      17,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $3, start: 361, end: 402, pattern_start: 372, pattern_end: 373 }
    )
  }
  let $4 = $game.get_current_square(started);
  if (!($4 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      18,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $4, start: 405, end: 458, pattern_start: 416, pattern_end: 423 }
    )
  }
  return $4;
}

export function start_game_requires_idle_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      23,
      "start_game_requires_idle_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 526, end: 572, pattern_start: 537, pattern_end: 548 }
    )
  }
  let $1 = $trainer.start_game(started);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      24,
      "start_game_requires_idle_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 575, end: 624, pattern_start: 586, pattern_end: 594 }
    )
  }
  return $1;
}

export function start_game_finished_fails_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      29,
      "start_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 693, end: 739, pattern_start: 704, pattern_end: 715 }
    )
  }
  let $1 = $trainer.end_game(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      30,
      "start_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 742, end: 790, pattern_start: 753, pattern_end: 762 }
    )
  }
  let $2 = $trainer.start_game(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      31,
      "start_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $2, start: 793, end: 840, pattern_start: 804, pattern_end: 812 }
    )
  }
  return $2;
}

export function highlight_next_square_success_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      38,
      "highlight_next_square_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 948, end: 994, pattern_start: 959, pattern_end: 970 }
    )
  }
  let $1 = $trainer.highlight_next_square(started);
  let highlighted;
  if ($1 instanceof Ok) {
    highlighted = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      39,
      "highlight_next_square_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 997,
        end: 1064,
        pattern_start: 1008,
        pattern_end: 1023
      }
    )
  }
  let $2 = $game.get_current_square(highlighted);
  if (!($2 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      40,
      "highlight_next_square_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1067,
        end: 1124,
        pattern_start: 1078,
        pattern_end: 1085
      }
    )
  }
  return $2;
}

export function highlight_next_square_requires_active_test() {
  let g = $game.new$();
  let $ = $trainer.highlight_next_square(g);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      45,
      "highlight_next_square_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1205,
        end: 1259,
        pattern_start: 1216,
        pattern_end: 1224
      }
    )
  }
  return $;
}

export function submit_correct_answer_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      52,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1352,
        end: 1398,
        pattern_start: 1363,
        pattern_end: 1374
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
      "vibe_chess/trainer_test",
      53,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1401,
        end: 1455,
        pattern_start: 1412,
        pattern_end: 1420
      }
    )
  }
  let $2 = $trainer.submit_answer(started, sq.name);
  let result;
  if ($2 instanceof Ok) {
    result = $2[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      54,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1458,
        end: 1521,
        pattern_start: 1469,
        pattern_end: 1479
      }
    )
  }
  let $3 = result.correct;
  if (!($3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      55,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 1524,
        end: 1556,
        pattern_start: 1535,
        pattern_end: 1539
      }
    )
  }
  let $4 = $game.get_score(result.game);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      56,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 1559,
        end: 1601,
        pattern_start: 1570,
        pattern_end: 1571
      }
    )
  }
  let $5 = $game.get_attempts(result.game);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      57,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 1604,
        end: 1649,
        pattern_start: 1615,
        pattern_end: 1616
      }
    )
  }
  return $5;
}

export function submit_wrong_answer_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      62,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1712,
        end: 1758,
        pattern_start: 1723,
        pattern_end: 1734
      }
    )
  }
  let $1 = $trainer.submit_answer(started, "zz");
  let result;
  if ($1 instanceof Ok) {
    result = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      63,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1761,
        end: 1821,
        pattern_start: 1772,
        pattern_end: 1782
      }
    )
  }
  let $2 = result.correct;
  if (!(!$2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      64,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1824,
        end: 1857,
        pattern_start: 1835,
        pattern_end: 1840
      }
    )
  }
  let $3 = $game.get_score(result.game);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      65,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 1860,
        end: 1902,
        pattern_start: 1871,
        pattern_end: 1872
      }
    )
  }
  let $4 = $game.get_attempts(result.game);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      66,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 1905,
        end: 1950,
        pattern_start: 1916,
        pattern_end: 1917
      }
    )
  }
  return $4;
}

export function submit_answer_requires_active_test() {
  let g = $game.new$();
  let $ = $trainer.submit_answer(g, "e4");
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      71,
      "submit_answer_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2023,
        end: 2075,
        pattern_start: 2034,
        pattern_end: 2042
      }
    )
  }
  return $;
}

export function submit_answer_finished_fails_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      76,
      "submit_answer_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2147,
        end: 2193,
        pattern_start: 2158,
        pattern_end: 2169
      }
    )
  }
  let $1 = $trainer.end_game(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      77,
      "submit_answer_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2196,
        end: 2244,
        pattern_start: 2207,
        pattern_end: 2216
      }
    )
  }
  let $2 = $trainer.submit_answer(ended, "e4");
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      78,
      "submit_answer_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2247,
        end: 2303,
        pattern_start: 2258,
        pattern_end: 2266
      }
    )
  }
  return $2;
}

export function continue_after_answer_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      85,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2403,
        end: 2449,
        pattern_start: 2414,
        pattern_end: 2425
      }
    )
  }
  let $1 = $trainer.submit_answer(started, "wrong");
  let result;
  if ($1 instanceof Ok) {
    result = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      86,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2452,
        end: 2515,
        pattern_start: 2463,
        pattern_end: 2473
      }
    )
  }
  let $2 = $trainer.continue_after_answer(result.game);
  let cont;
  if ($2 instanceof Ok) {
    cont = $2[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      87,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2518,
        end: 2582,
        pattern_start: 2529,
        pattern_end: 2537
      }
    )
  }
  let $3 = $game.get_status(cont);
  if (!($3 instanceof $game.Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      88,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 2585,
        end: 2631,
        pattern_start: 2596,
        pattern_end: 2607
      }
    )
  }
  return $3;
}

export function continue_after_answer_requires_active_test() {
  let g = $game.new$();
  let $ = $trainer.continue_after_answer(g);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      93,
      "continue_after_answer_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2712,
        end: 2766,
        pattern_start: 2723,
        pattern_end: 2731
      }
    )
  }
  return $;
}

export function end_game_success_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      100,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2849,
        end: 2895,
        pattern_start: 2860,
        pattern_end: 2871
      }
    )
  }
  let $1 = $trainer.end_game(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      101,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2898,
        end: 2946,
        pattern_start: 2909,
        pattern_end: 2918
      }
    )
  }
  let $2 = $game.get_status(ended);
  if (!($2 instanceof $game.Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      102,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2949,
        end: 2998,
        pattern_start: 2960,
        pattern_end: 2973
      }
    )
  }
  let $3 = $game.get_current_square(ended);
  if (!($3 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      103,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 3001,
        end: 3049,
        pattern_start: 3012,
        pattern_end: 3016
      }
    )
  }
  return $3;
}

export function end_game_requires_active_test() {
  let g = $game.new$();
  let $ = $trainer.end_game(g);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      108,
      "end_game_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3117,
        end: 3158,
        pattern_start: 3128,
        pattern_end: 3136
      }
    )
  }
  return $;
}

export function end_game_finished_fails_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      113,
      "end_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3225,
        end: 3271,
        pattern_start: 3236,
        pattern_end: 3247
      }
    )
  }
  let $1 = $trainer.end_game(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      114,
      "end_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3274,
        end: 3322,
        pattern_start: 3285,
        pattern_end: 3294
      }
    )
  }
  let $2 = $trainer.end_game(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      115,
      "end_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3325,
        end: 3370,
        pattern_start: 3336,
        pattern_end: 3344
      }
    )
  }
  return $2;
}

export function get_highlighted_square_name_active_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      122,
      "get_highlighted_square_name_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3474,
        end: 3520,
        pattern_start: 3485,
        pattern_end: 3496
      }
    )
  }
  let $1 = $trainer.get_highlighted_square_name(started);
  let name;
  if ($1 instanceof Some) {
    name = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      123,
      "get_highlighted_square_name_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3523,
        end: 3591,
        pattern_start: 3534,
        pattern_end: 3544
      }
    )
  }
  let $2 = $string.length(name) === 2;
  if (!($2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      124,
      "get_highlighted_square_name_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3594,
        end: 3636,
        pattern_start: 3605,
        pattern_end: 3609
      }
    )
  }
  return $2;
}

export function get_highlighted_square_name_idle_test() {
  let g = $game.new$();
  let $ = $trainer.get_highlighted_square_name(g);
  if (!($ instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      129,
      "get_highlighted_square_name_idle_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3712,
        end: 3768,
        pattern_start: 3723,
        pattern_end: 3727
      }
    )
  }
  return $;
}

export function get_highlighted_square_name_finished_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      134,
      "get_highlighted_square_name_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3848,
        end: 3894,
        pattern_start: 3859,
        pattern_end: 3870
      }
    )
  }
  let $1 = $trainer.end_game(started);
  let ended;
  if ($1 instanceof Ok) {
    ended = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      135,
      "get_highlighted_square_name_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3897,
        end: 3945,
        pattern_start: 3908,
        pattern_end: 3917
      }
    )
  }
  let $2 = $trainer.get_highlighted_square_name(ended);
  if (!($2 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      136,
      "get_highlighted_square_name_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3948,
        end: 4008,
        pattern_start: 3959,
        pattern_end: 3963
      }
    )
  }
  return $2;
}

export function get_accuracy_finished_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      141,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4073,
        end: 4119,
        pattern_start: 4084,
        pattern_end: 4095
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
      "vibe_chess/trainer_test",
      142,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4122,
        end: 4176,
        pattern_start: 4133,
        pattern_end: 4141
      }
    )
  }
  let $2 = $trainer.submit_answer(started, sq.name);
  let result;
  if ($2 instanceof Ok) {
    result = $2[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      143,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4179,
        end: 4242,
        pattern_start: 4190,
        pattern_end: 4200
      }
    )
  }
  let $3 = $trainer.end_game(result.game);
  let ended;
  if ($3 instanceof Ok) {
    ended = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      144,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 4245,
        end: 4297,
        pattern_start: 4256,
        pattern_end: 4265
      }
    )
  }
  let $4 = $trainer.get_accuracy(ended);
  let acc;
  if ($4 instanceof Some) {
    acc = $4[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      145,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 4300,
        end: 4350,
        pattern_start: 4311,
        pattern_end: 4320
      }
    )
  }
  if (!(acc === 1.0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      146,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: acc,
        start: 4353,
        end: 4373,
        pattern_start: 4364,
        pattern_end: 4367
      }
    )
  }
  return acc;
}

export function get_accuracy_active_test() {
  let g = $game.new$();
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      151,
      "get_accuracy_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4436,
        end: 4482,
        pattern_start: 4447,
        pattern_end: 4458
      }
    )
  }
  let $1 = $trainer.get_accuracy(started);
  if (!($1 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      152,
      "get_accuracy_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4485,
        end: 4532,
        pattern_start: 4496,
        pattern_end: 4500
      }
    )
  }
  return $1;
}

export function get_accuracy_idle_test() {
  let g = $game.new$();
  let $ = $trainer.get_accuracy(g);
  if (!($ instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      157,
      "get_accuracy_idle_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4593,
        end: 4634,
        pattern_start: 4604,
        pattern_end: 4608
      }
    )
  }
  return $;
}

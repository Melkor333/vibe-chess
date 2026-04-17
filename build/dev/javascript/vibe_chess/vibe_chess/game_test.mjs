import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { Ok, Error, makeError } from "../gleam.mjs";
import * as $game from "../vibe_chess/game.mjs";
import { Active, Finished, Idle } from "../vibe_chess/game.mjs";
import * as $square from "../vibe_chess/square.mjs";

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
      13,
      "new_game_is_idle_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 234, end: 270, pattern_start: 245, pattern_end: 249 }
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
      18,
      "new_game_has_zero_score_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 337, end: 369, pattern_start: 348, pattern_end: 349 }
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
      23,
      "new_game_has_zero_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 439, end: 474, pattern_start: 450, pattern_end: 451 }
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
      28,
      "new_game_no_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 544, end: 588, pattern_start: 555, pattern_end: 559 }
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
      33,
      "new_game_accuracy_zero_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 654, end: 687, pattern_start: 665, pattern_end: 668 }
    )
  }
  return $;
}

export function new_game_default_mode_is_name_square_test() {
  let g = $game.new$();
  let $ = $game.get_mode(g);
  if (!($ instanceof $game.NameSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      38,
      "new_game_default_mode_is_name_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 767, end: 812, pattern_start: 778, pattern_end: 793 }
    )
  }
  return $;
}

export function new_game_with_mode_find_square_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.get_mode(g);
  if (!($ instanceof $game.FindSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      43,
      "new_game_with_mode_find_square_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 911, end: 956, pattern_start: 922, pattern_end: 937 }
    )
  }
  return $;
}

export function new_game_with_mode_name_square_test() {
  let g = $game.new_with_mode(new $game.NameSquare());
  let $ = $game.get_mode(g);
  if (!($ instanceof $game.NameSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      48,
      "new_game_with_mode_name_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1055,
        end: 1100,
        pattern_start: 1066,
        pattern_end: 1081
      }
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
      53,
      "start_game_transitions_to_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1176,
        end: 1214,
        pattern_start: 1187,
        pattern_end: 1198
      }
    )
  }
  let $1 = $game.get_status(started);
  if (!($1 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      54,
      "start_game_transitions_to_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1217,
        end: 1261,
        pattern_start: 1228,
        pattern_end: 1234
      }
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
      59,
      "start_game_sets_score_zero_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1331,
        end: 1369,
        pattern_start: 1342,
        pattern_end: 1353
      }
    )
  }
  let $1 = $game.get_score(started);
  if (!($1 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      60,
      "start_game_sets_score_zero_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1372,
        end: 1410,
        pattern_start: 1383,
        pattern_end: 1384
      }
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
      65,
      "start_game_sets_attempts_zero_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1483,
        end: 1521,
        pattern_start: 1494,
        pattern_end: 1505
      }
    )
  }
  let $1 = $game.get_attempts(started);
  if (!($1 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      66,
      "start_game_sets_attempts_zero_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1524,
        end: 1565,
        pattern_start: 1535,
        pattern_end: 1536
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
      71,
      "start_game_highlights_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1637,
        end: 1675,
        pattern_start: 1648,
        pattern_end: 1659
      }
    )
  }
  let $1 = $game.get_current_square(started);
  if (!($1 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      72,
      "start_game_highlights_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1678,
        end: 1731,
        pattern_start: 1689,
        pattern_end: 1696
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
      77,
      "start_active_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1798,
        end: 1836,
        pattern_start: 1809,
        pattern_end: 1820
      }
    )
  }
  let $1 = $game.start(started);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      78,
      "start_active_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1839,
        end: 1880,
        pattern_start: 1850,
        pattern_end: 1858
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
      83,
      "start_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1949,
        end: 1987,
        pattern_start: 1960,
        pattern_end: 1971
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
      84,
      "start_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1990,
        end: 2030,
        pattern_start: 2001,
        pattern_end: 2010
      }
    )
  }
  let $2 = $game.start(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      85,
      "start_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2033,
        end: 2072,
        pattern_start: 2044,
        pattern_end: 2052
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
      90,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2140,
        end: 2178,
        pattern_start: 2151,
        pattern_end: 2162
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
      91,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2181,
        end: 2238,
        pattern_start: 2192,
        pattern_end: 2207
      }
    )
  }
  let $2 = $game.get_status(highlighted);
  if (!($2 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      92,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2241,
        end: 2289,
        pattern_start: 2252,
        pattern_end: 2258
      }
    )
  }
  let $3 = $game.get_current_square(highlighted);
  if (!($3 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      93,
      "highlight_next_in_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 2292,
        end: 2349,
        pattern_start: 2303,
        pattern_end: 2310
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
      98,
      "highlight_next_in_idle_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2421,
        end: 2465,
        pattern_start: 2432,
        pattern_end: 2440
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
      103,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2530,
        end: 2568,
        pattern_start: 2541,
        pattern_end: 2552
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
      104,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2571,
        end: 2625,
        pattern_start: 2582,
        pattern_end: 2590
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
        105,
        "submit_correct_answer_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $2,
          start: 2628,
          end: 2698,
          pattern_start: 2639,
          pattern_end: 2659
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      105,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2628,
        end: 2698,
        pattern_start: 2639,
        pattern_end: 2659
      }
    )
  }
  let $4 = $game.get_score(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      106,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 2701,
        end: 2739,
        pattern_start: 2712,
        pattern_end: 2713
      }
    )
  }
  let $5 = $game.get_attempts(updated);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      107,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 2742,
        end: 2783,
        pattern_start: 2753,
        pattern_end: 2754
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
      112,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2846,
        end: 2884,
        pattern_start: 2857,
        pattern_end: 2868
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
        113,
        "submit_wrong_answer_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $1,
          start: 2887,
          end: 2955,
          pattern_start: 2898,
          pattern_end: 2919
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      113,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2887,
        end: 2955,
        pattern_start: 2898,
        pattern_end: 2919
      }
    )
  }
  let $3 = $game.get_score(updated);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      114,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 2958,
        end: 2996,
        pattern_start: 2969,
        pattern_end: 2970
      }
    )
  }
  let $4 = $game.get_attempts(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      115,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 2999,
        end: 3040,
        pattern_start: 3010,
        pattern_end: 3011
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
      120,
      "submit_answer_in_idle_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3111,
        end: 3160,
        pattern_start: 3122,
        pattern_end: 3130
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
      125,
      "submit_answer_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3235,
        end: 3273,
        pattern_start: 3246,
        pattern_end: 3257
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
      126,
      "submit_answer_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3276,
        end: 3316,
        pattern_start: 3287,
        pattern_end: 3296
      }
    )
  }
  let $2 = $game.submit_answer(ended, "e4");
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      127,
      "submit_answer_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3319,
        end: 3372,
        pattern_start: 3330,
        pattern_end: 3338
      }
    )
  }
  return $2;
}

export function submit_answer_in_find_square_mode_fails_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      132,
      "submit_answer_in_find_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3480,
        end: 3518,
        pattern_start: 3491,
        pattern_end: 3502
      }
    )
  }
  let $1 = $game.submit_answer(started, "e4");
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      133,
      "submit_answer_in_find_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3521,
        end: 3576,
        pattern_start: 3532,
        pattern_end: 3540
      }
    )
  }
  return $1;
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
      138,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3649,
        end: 3687,
        pattern_start: 3660,
        pattern_end: 3671
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
      139,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3690,
        end: 3745,
        pattern_start: 3701,
        pattern_end: 3710
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
      140,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3748,
        end: 3816,
        pattern_start: 3759,
        pattern_end: 3776
      }
    )
  }
  let $3 = $game.get_current_square(updated);
  if (!($3 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      141,
      "submit_answer_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 3819,
        end: 3872,
        pattern_start: 3830,
        pattern_end: 3837
      }
    )
  }
  return $3;
}

export function submit_correct_square_click_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      148,
      "submit_correct_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3994,
        end: 4032,
        pattern_start: 4005,
        pattern_end: 4016
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
      149,
      "submit_correct_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4035,
        end: 4089,
        pattern_start: 4046,
        pattern_end: 4054
      }
    )
  }
  let $2 = $game.submit_square_click(started, sq);
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
        150,
        "submit_correct_square_click_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $2,
          start: 4092,
          end: 4163,
          pattern_start: 4103,
          pattern_end: 4123
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      150,
      "submit_correct_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4092,
        end: 4163,
        pattern_start: 4103,
        pattern_end: 4123
      }
    )
  }
  let $4 = $game.get_score(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      151,
      "submit_correct_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 4166,
        end: 4204,
        pattern_start: 4177,
        pattern_end: 4178
      }
    )
  }
  let $5 = $game.get_attempts(updated);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      152,
      "submit_correct_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 4207,
        end: 4248,
        pattern_start: 4218,
        pattern_end: 4219
      }
    )
  }
  return $5;
}

export function submit_wrong_square_click_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      157,
      "submit_wrong_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4342,
        end: 4380,
        pattern_start: 4353,
        pattern_end: 4364
      }
    )
  }
  let wrong_sq = $square.new$(new $square.H(), new $square.R8());
  let $1 = $game.submit_square_click(started, wrong_sq);
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
        159,
        "submit_wrong_square_click_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $1,
          start: 4432,
          end: 4510,
          pattern_start: 4443,
          pattern_end: 4464
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      159,
      "submit_wrong_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4432,
        end: 4510,
        pattern_start: 4443,
        pattern_end: 4464
      }
    )
  }
  let $3 = $game.get_score(updated);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      160,
      "submit_wrong_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 4513,
        end: 4551,
        pattern_start: 4524,
        pattern_end: 4525
      }
    )
  }
  let $4 = $game.get_attempts(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      161,
      "submit_wrong_square_click_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 4554,
        end: 4595,
        pattern_start: 4565,
        pattern_end: 4566
      }
    )
  }
  return $4;
}

export function submit_square_click_in_idle_fails_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let sq = $square.new$(new $square.A(), new $square.R1());
  let $ = $game.submit_square_click(g, sq);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      167,
      "submit_square_click_in_idle_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4740,
        end: 4793,
        pattern_start: 4751,
        pattern_end: 4759
      }
    )
  }
  return $;
}

export function submit_square_click_in_finished_fails_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      172,
      "submit_square_click_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4899,
        end: 4937,
        pattern_start: 4910,
        pattern_end: 4921
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
      173,
      "submit_square_click_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4940,
        end: 4980,
        pattern_start: 4951,
        pattern_end: 4960
      }
    )
  }
  let sq = $square.new$(new $square.A(), new $square.R1());
  let $2 = $game.submit_square_click(ended, sq);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      175,
      "submit_square_click_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5026,
        end: 5083,
        pattern_start: 5037,
        pattern_end: 5045
      }
    )
  }
  return $2;
}

export function submit_square_click_in_name_square_mode_fails_test() {
  let g = $game.new_with_mode(new $game.NameSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      180,
      "submit_square_click_in_name_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5197,
        end: 5235,
        pattern_start: 5208,
        pattern_end: 5219
      }
    )
  }
  let sq = $square.new$(new $square.A(), new $square.R1());
  let $1 = $game.submit_square_click(started, sq);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      182,
      "submit_square_click_in_name_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5281,
        end: 5340,
        pattern_start: 5292,
        pattern_end: 5300
      }
    )
  }
  return $1;
}

export function submit_square_click_highlights_next_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      187,
      "submit_square_click_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5444,
        end: 5482,
        pattern_start: 5455,
        pattern_end: 5466
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
      188,
      "submit_square_click_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5485,
        end: 5539,
        pattern_start: 5496,
        pattern_end: 5504
      }
    )
  }
  let $2 = $game.submit_square_click(started, sq);
  let updated;
  if ($2 instanceof Ok) {
    updated = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      189,
      "submit_square_click_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5542,
        end: 5610,
        pattern_start: 5553,
        pattern_end: 5570
      }
    )
  }
  let $3 = $game.get_current_square(updated);
  if (!($3 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      190,
      "submit_square_click_highlights_next_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 5613,
        end: 5666,
        pattern_start: 5624,
        pattern_end: 5631
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
      197,
      "end_game_transitions_to_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5761,
        end: 5799,
        pattern_start: 5772,
        pattern_end: 5783
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
      198,
      "end_game_transitions_to_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5802,
        end: 5842,
        pattern_start: 5813,
        pattern_end: 5822
      }
    )
  }
  let $2 = $game.get_status(ended);
  if (!($2 instanceof Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      199,
      "end_game_transitions_to_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5845,
        end: 5889,
        pattern_start: 5856,
        pattern_end: 5864
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
      204,
      "end_game_clears_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5963,
        end: 6001,
        pattern_start: 5974,
        pattern_end: 5985
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
      205,
      "end_game_clears_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 6004,
        end: 6044,
        pattern_start: 6015,
        pattern_end: 6024
      }
    )
  }
  let $2 = $game.get_current_square(ended);
  if (!($2 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      206,
      "end_game_clears_current_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 6047,
        end: 6095,
        pattern_start: 6058,
        pattern_end: 6062
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
      211,
      "end_idle_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6158,
        end: 6191,
        pattern_start: 6169,
        pattern_end: 6177
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
      216,
      "end_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6258,
        end: 6296,
        pattern_start: 6269,
        pattern_end: 6280
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
      217,
      "end_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 6299,
        end: 6339,
        pattern_start: 6310,
        pattern_end: 6319
      }
    )
  }
  let $2 = $game.end(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      218,
      "end_finished_game_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 6342,
        end: 6379,
        pattern_start: 6353,
        pattern_end: 6361
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
      223,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6445,
        end: 6483,
        pattern_start: 6456,
        pattern_end: 6467
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
      224,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 6486,
        end: 6540,
        pattern_start: 6497,
        pattern_end: 6505
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
      225,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 6543,
        end: 6605,
        pattern_start: 6554,
        pattern_end: 6566
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
      226,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 6608,
        end: 6662,
        pattern_start: 6619,
        pattern_end: 6631
      }
    )
  }
  let $4 = $game.accuracy(g2);
  if (!($4 === 0.5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      227,
      "accuracy_with_attempts_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 6665,
        end: 6699,
        pattern_start: 6676,
        pattern_end: 6679
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
      232,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6761,
        end: 6794,
        pattern_start: 6772,
        pattern_end: 6778
      }
    )
  }
  let $1 = $game.get_status(g1);
  if (!($1 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      233,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 6797,
        end: 6836,
        pattern_start: 6808,
        pattern_end: 6814
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
      235,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 6840,
        end: 6897,
        pattern_start: 6851,
        pattern_end: 6863
      }
    )
  }
  let $3 = $game.get_score(g2);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      236,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 6900,
        end: 6933,
        pattern_start: 6911,
        pattern_end: 6912
      }
    )
  }
  let $4 = $game.get_attempts(g2);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      237,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 6936,
        end: 6972,
        pattern_start: 6947,
        pattern_end: 6948
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
      239,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 6976,
        end: 7025,
        pattern_start: 6987,
        pattern_end: 6995
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
      240,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $6,
        start: 7028,
        end: 7085,
        pattern_start: 7039,
        pattern_end: 7051
      }
    )
  }
  let $7 = $game.get_score(g3);
  if (!($7 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      241,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $7,
        start: 7088,
        end: 7121,
        pattern_start: 7099,
        pattern_end: 7100
      }
    )
  }
  let $8 = $game.get_attempts(g3);
  if (!($8 === 2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      242,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $8,
        start: 7124,
        end: 7160,
        pattern_start: 7135,
        pattern_end: 7136
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
      244,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $9,
        start: 7164,
        end: 7196,
        pattern_start: 7175,
        pattern_end: 7181
      }
    )
  }
  let $10 = $game.get_status(g4);
  if (!($10 instanceof Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      245,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $10,
        start: 7199,
        end: 7240,
        pattern_start: 7210,
        pattern_end: 7218
      }
    )
  }
  let $11 = $game.get_current_square(g4);
  if (!($11 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      246,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $11,
        start: 7243,
        end: 7288,
        pattern_start: 7254,
        pattern_end: 7258
      }
    )
  }
  let $12 = $game.accuracy(g4);
  if (!($12 === 0.5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      247,
      "full_game_scenario_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $12,
        start: 7291,
        end: 7325,
        pattern_start: 7302,
        pattern_end: 7305
      }
    )
  }
  return $12;
}

export function full_find_square_game_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let g1;
  if ($ instanceof Ok) {
    g1 = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      252,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 7415,
        end: 7448,
        pattern_start: 7426,
        pattern_end: 7432
      }
    )
  }
  let $1 = $game.get_status(g1);
  if (!($1 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      253,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 7451,
        end: 7490,
        pattern_start: 7462,
        pattern_end: 7468
      }
    )
  }
  let $2 = $game.get_mode(g1);
  if (!($2 instanceof $game.FindSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      254,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 7493,
        end: 7539,
        pattern_start: 7504,
        pattern_end: 7519
      }
    )
  }
  let $3 = $game.get_current_square(g1);
  let sq;
  if ($3 instanceof Some) {
    sq = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      256,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 7543,
        end: 7592,
        pattern_start: 7554,
        pattern_end: 7562
      }
    )
  }
  let $4 = $game.submit_square_click(g1, sq);
  let g2;
  if ($4 instanceof Ok) {
    let $5 = $4[0][1];
    if ($5) {
      g2 = $4[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        257,
        "full_find_square_game_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $4,
          start: 7595,
          end: 7656,
          pattern_start: 7606,
          pattern_end: 7621
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      257,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 7595,
        end: 7656,
        pattern_start: 7606,
        pattern_end: 7621
      }
    )
  }
  let $6 = $game.get_score(g2);
  if (!($6 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      258,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $6,
        start: 7659,
        end: 7692,
        pattern_start: 7670,
        pattern_end: 7671
      }
    )
  }
  let wrong_sq = $square.new$(new $square.A(), new $square.R1());
  let $7 = $game.submit_square_click(g2, wrong_sq);
  let g3;
  if ($7 instanceof Ok) {
    let $8 = $7[0][1];
    if (!$8) {
      g3 = $7[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        261,
        "full_find_square_game_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $7,
          start: 7745,
          end: 7813,
          pattern_start: 7756,
          pattern_end: 7772
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      261,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $7,
        start: 7745,
        end: 7813,
        pattern_start: 7756,
        pattern_end: 7772
      }
    )
  }
  let $9 = $game.get_score(g3);
  if (!($9 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      262,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $9,
        start: 7816,
        end: 7849,
        pattern_start: 7827,
        pattern_end: 7828
      }
    )
  }
  let $10 = $game.get_attempts(g3);
  if (!($10 === 2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      263,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $10,
        start: 7852,
        end: 7888,
        pattern_start: 7863,
        pattern_end: 7864
      }
    )
  }
  let $11 = $game.end(g3);
  let g4;
  if ($11 instanceof Ok) {
    g4 = $11[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      265,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $11,
        start: 7892,
        end: 7924,
        pattern_start: 7903,
        pattern_end: 7909
      }
    )
  }
  let $12 = $game.get_status(g4);
  if (!($12 instanceof Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      266,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $12,
        start: 7927,
        end: 7968,
        pattern_start: 7938,
        pattern_end: 7946
      }
    )
  }
  let $13 = $game.accuracy(g4);
  if (!($13 === 0.5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      267,
      "full_find_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $13,
        start: 7971,
        end: 8005,
        pattern_start: 7982,
        pattern_end: 7985
      }
    )
  }
  return $13;
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
      272,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 8064,
        end: 8102,
        pattern_start: 8075,
        pattern_end: 8086
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
      273,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 8105,
        end: 8159,
        pattern_start: 8116,
        pattern_end: 8124
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
      274,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 8162,
        end: 8229,
        pattern_start: 8173,
        pattern_end: 8190
      }
    )
  }
  let $3 = $list.length($game.get_answers(updated));
  if (!($3 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      275,
      "answers_history_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 8232,
        end: 8285,
        pattern_start: 8243,
        pattern_end: 8244
      }
    )
  }
  return $3;
}

export function new_game_with_mode_color_square_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.get_mode(g);
  if (!($ instanceof $game.ColorSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      282,
      "new_game_with_mode_color_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 8413,
        end: 8459,
        pattern_start: 8424,
        pattern_end: 8440
      }
    )
  }
  return $;
}

export function submit_correct_color_answer_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      287,
      "submit_correct_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 8556,
        end: 8594,
        pattern_start: 8567,
        pattern_end: 8578
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
      288,
      "submit_correct_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 8597,
        end: 8651,
        pattern_start: 8608,
        pattern_end: 8616
      }
    )
  }
  let is_black = $square.is_black(sq);
  let $2 = $game.submit_color_answer(started, is_black);
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
        290,
        "submit_correct_color_answer_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $2,
          start: 8691,
          end: 8768,
          pattern_start: 8702,
          pattern_end: 8722
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      290,
      "submit_correct_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 8691,
        end: 8768,
        pattern_start: 8702,
        pattern_end: 8722
      }
    )
  }
  let $4 = $game.get_score(updated);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      291,
      "submit_correct_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 8771,
        end: 8809,
        pattern_start: 8782,
        pattern_end: 8783
      }
    )
  }
  let $5 = $game.get_attempts(updated);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      292,
      "submit_correct_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 8812,
        end: 8853,
        pattern_start: 8823,
        pattern_end: 8824
      }
    )
  }
  return $5;
}

export function submit_wrong_color_answer_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      297,
      "submit_wrong_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 8948,
        end: 8986,
        pattern_start: 8959,
        pattern_end: 8970
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
      298,
      "submit_wrong_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 8989,
        end: 9043,
        pattern_start: 9000,
        pattern_end: 9008
      }
    )
  }
  let is_black = $square.is_black(sq);
  let $2 = $game.submit_color_answer(started, !is_black);
  let updated;
  if ($2 instanceof Ok) {
    let $3 = $2[0][1];
    if (!$3) {
      updated = $2[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        300,
        "submit_wrong_color_answer_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $2,
          start: 9083,
          end: 9166,
          pattern_start: 9094,
          pattern_end: 9115
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      300,
      "submit_wrong_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 9083,
        end: 9166,
        pattern_start: 9094,
        pattern_end: 9115
      }
    )
  }
  let $4 = $game.get_score(updated);
  if (!($4 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      302,
      "submit_wrong_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 9169,
        end: 9207,
        pattern_start: 9180,
        pattern_end: 9181
      }
    )
  }
  let $5 = $game.get_attempts(updated);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      303,
      "submit_wrong_color_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 9210,
        end: 9251,
        pattern_start: 9221,
        pattern_end: 9222
      }
    )
  }
  return $5;
}

export function submit_color_in_idle_fails_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.submit_color_answer(g, true);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      308,
      "submit_color_in_idle_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 9347,
        end: 9402,
        pattern_start: 9358,
        pattern_end: 9366
      }
    )
  }
  return $;
}

export function submit_color_in_finished_fails_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      313,
      "submit_color_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 9502,
        end: 9540,
        pattern_start: 9513,
        pattern_end: 9524
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
      314,
      "submit_color_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 9543,
        end: 9583,
        pattern_start: 9554,
        pattern_end: 9563
      }
    )
  }
  let $2 = $game.submit_color_answer(ended, true);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      315,
      "submit_color_in_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 9586,
        end: 9645,
        pattern_start: 9597,
        pattern_end: 9605
      }
    )
  }
  return $2;
}

export function submit_color_in_name_square_mode_fails_test() {
  let g = $game.new_with_mode(new $game.NameSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      320,
      "submit_color_in_name_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 9752,
        end: 9790,
        pattern_start: 9763,
        pattern_end: 9774
      }
    )
  }
  let $1 = $game.submit_color_answer(started, true);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      321,
      "submit_color_in_name_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 9793,
        end: 9854,
        pattern_start: 9804,
        pattern_end: 9812
      }
    )
  }
  return $1;
}

export function submit_color_in_find_square_mode_fails_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      326,
      "submit_color_in_find_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 9961,
        end: 9999,
        pattern_start: 9972,
        pattern_end: 9983
      }
    )
  }
  let $1 = $game.submit_color_answer(started, true);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      327,
      "submit_color_in_find_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 10002,
        end: 10063,
        pattern_start: 10013,
        pattern_end: 10021
      }
    )
  }
  return $1;
}

export function submit_color_does_not_advance_square_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      332,
      "submit_color_does_not_advance_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 10169,
        end: 10207,
        pattern_start: 10180,
        pattern_end: 10191
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
      333,
      "submit_color_does_not_advance_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 10210,
        end: 10264,
        pattern_start: 10221,
        pattern_end: 10229
      }
    )
  }
  let is_black = $square.is_black(sq);
  let $2 = $game.submit_color_answer(started, is_black);
  let updated;
  if ($2 instanceof Ok) {
    updated = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      335,
      "submit_color_does_not_advance_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 10304,
        end: 10378,
        pattern_start: 10315,
        pattern_end: 10332
      }
    )
  }
  let $3 = $game.get_current_square(updated);
  let sq2;
  if ($3 instanceof Some) {
    sq2 = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      337,
      "submit_color_does_not_advance_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 10436,
        end: 10491,
        pattern_start: 10447,
        pattern_end: 10456
      }
    )
  }
  let $4 = sq.name === sq2.name;
  if (!($4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      338,
      "submit_color_does_not_advance_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 10494,
        end: 10531,
        pattern_start: 10505,
        pattern_end: 10509
      }
    )
  }
  return $4;
}

export function full_color_square_game_test() {
  let g = $game.new_with_mode(new $game.ColorSquare());
  let $ = $game.start(g);
  let g1;
  if ($ instanceof Ok) {
    g1 = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      343,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 10623,
        end: 10656,
        pattern_start: 10634,
        pattern_end: 10640
      }
    )
  }
  let $1 = $game.get_status(g1);
  if (!($1 instanceof Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      344,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 10659,
        end: 10698,
        pattern_start: 10670,
        pattern_end: 10676
      }
    )
  }
  let $2 = $game.get_mode(g1);
  if (!($2 instanceof $game.ColorSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      345,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 10701,
        end: 10748,
        pattern_start: 10712,
        pattern_end: 10728
      }
    )
  }
  let $3 = $game.get_current_square(g1);
  let sq;
  if ($3 instanceof Some) {
    sq = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      347,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 10752,
        end: 10801,
        pattern_start: 10763,
        pattern_end: 10771
      }
    )
  }
  let is_black = $square.is_black(sq);
  let $4 = $game.submit_color_answer(g1, is_black);
  let g2;
  if ($4 instanceof Ok) {
    let $5 = $4[0][1];
    if ($5) {
      g2 = $4[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        349,
        "full_color_square_game_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $4,
          start: 10841,
          end: 10908,
          pattern_start: 10852,
          pattern_end: 10867
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      349,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 10841,
        end: 10908,
        pattern_start: 10852,
        pattern_end: 10867
      }
    )
  }
  let $6 = $game.get_score(g2);
  if (!($6 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      350,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $6,
        start: 10911,
        end: 10944,
        pattern_start: 10922,
        pattern_end: 10923
      }
    )
  }
  let $7 = $game.highlight_next(g2);
  let g3;
  if ($7 instanceof Ok) {
    g3 = $7[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      353,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $7,
        start: 10968,
        end: 11011,
        pattern_start: 10979,
        pattern_end: 10985
      }
    )
  }
  let $8 = $game.get_current_square(g3);
  let sq2;
  if ($8 instanceof Some) {
    sq2 = $8[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      354,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $8,
        start: 11014,
        end: 11064,
        pattern_start: 11025,
        pattern_end: 11034
      }
    )
  }
  let is_black2 = $square.is_black(sq2);
  let $9 = $game.submit_color_answer(g3, !is_black2);
  let g4;
  if ($9 instanceof Ok) {
    let $10 = $9[0][1];
    if (!$10) {
      g4 = $9[0][0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "vibe_chess/game_test",
        357,
        "full_color_square_game_test",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $9,
          start: 11131,
          end: 11201,
          pattern_start: 11142,
          pattern_end: 11158
        }
      )
    }
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      357,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $9,
        start: 11131,
        end: 11201,
        pattern_start: 11142,
        pattern_end: 11158
      }
    )
  }
  let $11 = $game.get_score(g4);
  if (!($11 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      358,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $11,
        start: 11204,
        end: 11237,
        pattern_start: 11215,
        pattern_end: 11216
      }
    )
  }
  let $12 = $game.get_attempts(g4);
  if (!($12 === 2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      359,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $12,
        start: 11240,
        end: 11276,
        pattern_start: 11251,
        pattern_end: 11252
      }
    )
  }
  let $13 = $game.end(g4);
  let g5;
  if ($13 instanceof Ok) {
    g5 = $13[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      361,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $13,
        start: 11280,
        end: 11312,
        pattern_start: 11291,
        pattern_end: 11297
      }
    )
  }
  let $14 = $game.get_status(g5);
  if (!($14 instanceof Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      362,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $14,
        start: 11315,
        end: 11356,
        pattern_start: 11326,
        pattern_end: 11334
      }
    )
  }
  let $15 = $game.accuracy(g5);
  if (!($15 === 0.5)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      363,
      "full_color_square_game_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $15,
        start: 11359,
        end: 11393,
        pattern_start: 11370,
        pattern_end: 11373
      }
    )
  }
  return $15;
}

export function default_hardness_is_level1_test() {
  let g = $game.new$();
  let $ = $game.get_hardness(g);
  if (!($ instanceof $square.Level1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      370,
      "default_hardness_is_level1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 11488,
        end: 11535,
        pattern_start: 11499,
        pattern_end: 11512
      }
    )
  }
  return $;
}

export function new_with_mode_and_hardness_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.FindSquare(),
    new $square.Level3(),
  );
  let $ = $game.get_mode(g);
  if (!($ instanceof $game.FindSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      375,
      "new_with_mode_and_hardness_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 11658,
        end: 11703,
        pattern_start: 11669,
        pattern_end: 11684
      }
    )
  }
  let $1 = $game.get_hardness(g);
  if (!($1 instanceof $square.Level3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      376,
      "new_with_mode_and_hardness_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 11706,
        end: 11753,
        pattern_start: 11717,
        pattern_end: 11730
      }
    )
  }
  return $1;
}

export function start_preserves_hardness_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level2(),
  );
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      381,
      "start_preserves_hardness_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 11874,
        end: 11912,
        pattern_start: 11885,
        pattern_end: 11896
      }
    )
  }
  let $1 = $game.get_hardness(started);
  if (!($1 instanceof $square.Level2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      382,
      "start_preserves_hardness_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 11915,
        end: 11968,
        pattern_start: 11926,
        pattern_end: 11939
      }
    )
  }
  return $1;
}

export function level1_game_square_in_level1_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level1(),
  );
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      387,
      "level1_game_square_in_level1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 12093,
        end: 12131,
        pattern_start: 12104,
        pattern_end: 12115
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
      388,
      "level1_game_square_in_level1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 12134,
        end: 12188,
        pattern_start: 12145,
        pattern_end: 12153
      }
    )
  }
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level1());
  _block = $list.map(_pipe, (s) => { return s.name; });
  let level1_names = _block;
  let $2 = $list.contains(level1_names, sq.name);
  if (!($2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      391,
      "level1_game_square_in_level1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 12286,
        end: 12340,
        pattern_start: 12297,
        pattern_end: 12301
      }
    )
  }
  return $2;
}

export function level4_game_square_in_all_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level4(),
  );
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      396,
      "level4_game_square_in_all_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 12462,
        end: 12500,
        pattern_start: 12473,
        pattern_end: 12484
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
      397,
      "level4_game_square_in_all_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 12503,
        end: 12557,
        pattern_start: 12514,
        pattern_end: 12522
      }
    )
  }
  let _block;
  let _pipe = $square.all_squares();
  _block = $list.map(_pipe, (s) => { return s.name; });
  let all_names = _block;
  let $2 = $list.contains(all_names, sq.name);
  if (!($2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      399,
      "level4_game_square_in_all_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 12629,
        end: 12680,
        pattern_start: 12640,
        pattern_end: 12644
      }
    )
  }
  return $2;
}

export function highlight_next_never_repeats_square_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level2(),
  );
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      406,
      "highlight_next_never_repeats_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 12863,
        end: 12901,
        pattern_start: 12874,
        pattern_end: 12885
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
      407,
      "highlight_next_never_repeats_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 12904,
        end: 12959,
        pattern_start: 12915,
        pattern_end: 12924
      }
    )
  }
  let $2 = $game.highlight_next(started);
  let g2;
  if ($2 instanceof Ok) {
    g2 = $2[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      408,
      "highlight_next_never_repeats_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 12962,
        end: 13010,
        pattern_start: 12973,
        pattern_end: 12979
      }
    )
  }
  let $3 = $game.get_current_square(g2);
  let sq2;
  if ($3 instanceof Some) {
    sq2 = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      409,
      "highlight_next_never_repeats_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 13013,
        end: 13063,
        pattern_start: 13024,
        pattern_end: 13033
      }
    )
  }
  let $4 = sq1.name !== sq2.name;
  if (!($4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      410,
      "highlight_next_never_repeats_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 13066,
        end: 13104,
        pattern_start: 13077,
        pattern_end: 13081
      }
    )
  }
  return $4;
}

export function submit_answer_highlights_different_square_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level2(),
  );
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      415,
      "submit_answer_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 13242,
        end: 13280,
        pattern_start: 13253,
        pattern_end: 13264
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
      416,
      "submit_answer_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 13283,
        end: 13338,
        pattern_start: 13294,
        pattern_end: 13303
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
      417,
      "submit_answer_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 13341,
        end: 13409,
        pattern_start: 13352,
        pattern_end: 13369
      }
    )
  }
  let $3 = $game.get_current_square(updated);
  let sq2;
  if ($3 instanceof Some) {
    sq2 = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      418,
      "submit_answer_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 13412,
        end: 13467,
        pattern_start: 13423,
        pattern_end: 13432
      }
    )
  }
  let $4 = sq1.name !== sq2.name;
  if (!($4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      419,
      "submit_answer_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 13470,
        end: 13508,
        pattern_start: 13481,
        pattern_end: 13485
      }
    )
  }
  return $4;
}

export function submit_square_click_highlights_different_square_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.FindSquare(),
    new $square.Level2(),
  );
  let $ = $game.start(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      424,
      "submit_square_click_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 13652,
        end: 13690,
        pattern_start: 13663,
        pattern_end: 13674
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
      425,
      "submit_square_click_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 13693,
        end: 13748,
        pattern_start: 13704,
        pattern_end: 13713
      }
    )
  }
  let $2 = $game.submit_square_click(started, sq1);
  let updated;
  if ($2 instanceof Ok) {
    updated = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      426,
      "submit_square_click_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 13751,
        end: 13820,
        pattern_start: 13762,
        pattern_end: 13779
      }
    )
  }
  let $3 = $game.get_current_square(updated);
  let sq2;
  if ($3 instanceof Some) {
    sq2 = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      427,
      "submit_square_click_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 13823,
        end: 13878,
        pattern_start: 13834,
        pattern_end: 13843
      }
    )
  }
  let $4 = sq1.name !== sq2.name;
  if (!($4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      428,
      "submit_square_click_highlights_different_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 13881,
        end: 13919,
        pattern_start: 13892,
        pattern_end: 13896
      }
    )
  }
  return $4;
}

export function accuracy_rounded_to_one_decimal_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level2(),
  );
  let $ = $game.start(g);
  let g1;
  if ($ instanceof Ok) {
    g1 = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      435,
      "accuracy_rounded_to_one_decimal_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 14086,
        end: 14119,
        pattern_start: 14097,
        pattern_end: 14103
      }
    )
  }
  let $1 = $game.get_current_square(g1);
  let sq1;
  if ($1 instanceof Some) {
    sq1 = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      437,
      "accuracy_rounded_to_one_decimal_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 14162,
        end: 14212,
        pattern_start: 14173,
        pattern_end: 14182
      }
    )
  }
  let $2 = $game.submit_answer(g1, sq1.name);
  let g2;
  if ($2 instanceof Ok) {
    g2 = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      438,
      "accuracy_rounded_to_one_decimal_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 14215,
        end: 14273,
        pattern_start: 14226,
        pattern_end: 14238
      }
    )
  }
  let $3 = $game.submit_answer(g2, "zz");
  let g3;
  if ($3 instanceof Ok) {
    g3 = $3[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      439,
      "accuracy_rounded_to_one_decimal_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 14276,
        end: 14330,
        pattern_start: 14287,
        pattern_end: 14299
      }
    )
  }
  let $4 = $game.submit_answer(g3, "zz");
  let g4;
  if ($4 instanceof Ok) {
    g4 = $4[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      440,
      "accuracy_rounded_to_one_decimal_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 14333,
        end: 14387,
        pattern_start: 14344,
        pattern_end: 14356
      }
    )
  }
  let $5 = $game.accuracy(g4);
  if (!($5 === 0.3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      442,
      "accuracy_rounded_to_one_decimal_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 14430,
        end: 14464,
        pattern_start: 14441,
        pattern_end: 14444
      }
    )
  }
  return $5;
}

export function accuracy_rounded_up_test() {
  let g = $game.new_with_mode_and_hardness(
    new $game.NameSquare(),
    new $square.Level2(),
  );
  let $ = $game.start(g);
  let g1;
  if ($ instanceof Ok) {
    g1 = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      447,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 14580,
        end: 14613,
        pattern_start: 14591,
        pattern_end: 14597
      }
    )
  }
  let $1 = $game.get_current_square(g1);
  let sq1;
  if ($1 instanceof Some) {
    sq1 = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      449,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 14656,
        end: 14706,
        pattern_start: 14667,
        pattern_end: 14676
      }
    )
  }
  let $2 = $game.submit_answer(g1, sq1.name);
  let g2;
  if ($2 instanceof Ok) {
    g2 = $2[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      450,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 14709,
        end: 14767,
        pattern_start: 14720,
        pattern_end: 14732
      }
    )
  }
  let $3 = $game.get_current_square(g2);
  let sq2;
  if ($3 instanceof Some) {
    sq2 = $3[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      451,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 14770,
        end: 14820,
        pattern_start: 14781,
        pattern_end: 14790
      }
    )
  }
  let $4 = $game.submit_answer(g2, sq2.name);
  let g3;
  if ($4 instanceof Ok) {
    g3 = $4[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      452,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 14823,
        end: 14881,
        pattern_start: 14834,
        pattern_end: 14846
      }
    )
  }
  let $5 = $game.submit_answer(g3, "zz");
  let g4;
  if ($5 instanceof Ok) {
    g4 = $5[0][0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      453,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 14884,
        end: 14938,
        pattern_start: 14895,
        pattern_end: 14907
      }
    )
  }
  let $6 = $game.accuracy(g4);
  if (!($6 === 0.7)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/game_test",
      455,
      "accuracy_rounded_up_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $6,
        start: 14981,
        end: 15015,
        pattern_start: 14992,
        pattern_end: 14995
      }
    )
  }
  return $6;
}

import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { Ok, Error, makeError } from "../gleam.mjs";
import * as $game from "../vibe_chess/game.mjs";
import * as $square from "../vibe_chess/square.mjs";
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
      15,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 244, end: 290, pattern_start: 255, pattern_end: 266 }
    )
  }
  let $1 = $game.get_status(started);
  if (!($1 instanceof $game.Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      16,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 293, end: 342, pattern_start: 304, pattern_end: 315 }
    )
  }
  let $2 = $game.get_score(started);
  if (!($2 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      17,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $2, start: 345, end: 383, pattern_start: 356, pattern_end: 357 }
    )
  }
  let $3 = $game.get_attempts(started);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      18,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $3, start: 386, end: 427, pattern_start: 397, pattern_end: 398 }
    )
  }
  let $4 = $game.get_current_square(started);
  if (!($4 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      19,
      "start_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $4, start: 430, end: 483, pattern_start: 441, pattern_end: 448 }
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
      24,
      "start_game_requires_idle_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 551, end: 597, pattern_start: 562, pattern_end: 573 }
    )
  }
  let $1 = $trainer.start_game(started);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      25,
      "start_game_requires_idle_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 600, end: 649, pattern_start: 611, pattern_end: 619 }
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
      30,
      "start_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 718, end: 764, pattern_start: 729, pattern_end: 740 }
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
      31,
      "start_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 767, end: 815, pattern_start: 778, pattern_end: 787 }
    )
  }
  let $2 = $trainer.start_game(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      32,
      "start_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $2, start: 818, end: 865, pattern_start: 829, pattern_end: 837 }
    )
  }
  return $2;
}

export function start_game_preserves_mode_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      37,
      "start_game_preserves_mode_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 959, end: 1005, pattern_start: 970, pattern_end: 981 }
    )
  }
  let $1 = $trainer.get_game_mode(started);
  if (!($1 instanceof $game.FindSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      38,
      "start_game_preserves_mode_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1008,
        end: 1067,
        pattern_start: 1019,
        pattern_end: 1034
      }
    )
  }
  return $1;
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
      45,
      "highlight_next_square_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1175,
        end: 1221,
        pattern_start: 1186,
        pattern_end: 1197
      }
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
      46,
      "highlight_next_square_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1224,
        end: 1291,
        pattern_start: 1235,
        pattern_end: 1250
      }
    )
  }
  let $2 = $game.get_current_square(highlighted);
  if (!($2 instanceof Some)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      47,
      "highlight_next_square_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1294,
        end: 1351,
        pattern_start: 1305,
        pattern_end: 1312
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
      52,
      "highlight_next_square_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1432,
        end: 1486,
        pattern_start: 1443,
        pattern_end: 1451
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
      59,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1597,
        end: 1643,
        pattern_start: 1608,
        pattern_end: 1619
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
      60,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1646,
        end: 1700,
        pattern_start: 1657,
        pattern_end: 1665
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
      61,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1703,
        end: 1766,
        pattern_start: 1714,
        pattern_end: 1724
      }
    )
  }
  let $3 = result.correct;
  if (!($3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      62,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 1769,
        end: 1801,
        pattern_start: 1780,
        pattern_end: 1784
      }
    )
  }
  let $4 = $game.get_score(result.game);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      63,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 1804,
        end: 1846,
        pattern_start: 1815,
        pattern_end: 1816
      }
    )
  }
  let $5 = $game.get_attempts(result.game);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      64,
      "submit_correct_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 1849,
        end: 1894,
        pattern_start: 1860,
        pattern_end: 1861
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
      69,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1957,
        end: 2003,
        pattern_start: 1968,
        pattern_end: 1979
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
      70,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2006,
        end: 2066,
        pattern_start: 2017,
        pattern_end: 2027
      }
    )
  }
  let $2 = result.correct;
  if (!(!$2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      71,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2069,
        end: 2102,
        pattern_start: 2080,
        pattern_end: 2085
      }
    )
  }
  let $3 = $game.get_score(result.game);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      72,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 2105,
        end: 2147,
        pattern_start: 2116,
        pattern_end: 2117
      }
    )
  }
  let $4 = $game.get_attempts(result.game);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      73,
      "submit_wrong_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 2150,
        end: 2195,
        pattern_start: 2161,
        pattern_end: 2162
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
      78,
      "submit_answer_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2268,
        end: 2320,
        pattern_start: 2279,
        pattern_end: 2287
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
      83,
      "submit_answer_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2392,
        end: 2438,
        pattern_start: 2403,
        pattern_end: 2414
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
      84,
      "submit_answer_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2441,
        end: 2489,
        pattern_start: 2452,
        pattern_end: 2461
      }
    )
  }
  let $2 = $trainer.submit_answer(ended, "e4");
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      85,
      "submit_answer_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2492,
        end: 2548,
        pattern_start: 2503,
        pattern_end: 2511
      }
    )
  }
  return $2;
}

export function submit_square_click_correct_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      92,
      "submit_square_click_correct_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2695,
        end: 2741,
        pattern_start: 2706,
        pattern_end: 2717
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
      93,
      "submit_square_click_correct_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 2744,
        end: 2798,
        pattern_start: 2755,
        pattern_end: 2763
      }
    )
  }
  let $2 = $trainer.submit_square_click(started, sq);
  let result;
  if ($2 instanceof Ok) {
    result = $2[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      94,
      "submit_square_click_correct_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 2801,
        end: 2865,
        pattern_start: 2812,
        pattern_end: 2822
      }
    )
  }
  let $3 = result.correct;
  if (!($3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      95,
      "submit_square_click_correct_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 2868,
        end: 2900,
        pattern_start: 2879,
        pattern_end: 2883
      }
    )
  }
  let $4 = $game.get_score(result.game);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      96,
      "submit_square_click_correct_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 2903,
        end: 2945,
        pattern_start: 2914,
        pattern_end: 2915
      }
    )
  }
  let $5 = $game.get_attempts(result.game);
  if (!($5 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      97,
      "submit_square_click_correct_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $5,
        start: 2948,
        end: 2993,
        pattern_start: 2959,
        pattern_end: 2960
      }
    )
  }
  return $5;
}

export function submit_square_click_wrong_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      102,
      "submit_square_click_wrong_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3087,
        end: 3133,
        pattern_start: 3098,
        pattern_end: 3109
      }
    )
  }
  let wrong = $square.new$(new $square.H(), new $square.R8());
  let $1 = $trainer.submit_square_click(started, wrong);
  let result;
  if ($1 instanceof Ok) {
    result = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      104,
      "submit_square_click_wrong_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3182,
        end: 3249,
        pattern_start: 3193,
        pattern_end: 3203
      }
    )
  }
  let $2 = result.correct;
  if (!(!$2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      105,
      "submit_square_click_wrong_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 3252,
        end: 3285,
        pattern_start: 3263,
        pattern_end: 3268
      }
    )
  }
  let $3 = $game.get_score(result.game);
  if (!($3 === 0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      106,
      "submit_square_click_wrong_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 3288,
        end: 3330,
        pattern_start: 3299,
        pattern_end: 3300
      }
    )
  }
  let $4 = $game.get_attempts(result.game);
  if (!($4 === 1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      107,
      "submit_square_click_wrong_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 3333,
        end: 3378,
        pattern_start: 3344,
        pattern_end: 3345
      }
    )
  }
  return $4;
}

export function submit_square_click_requires_active_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let sq = $square.new$(new $square.A(), new $square.R1());
  let $ = $trainer.submit_square_click(g, sq);
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      113,
      "submit_square_click_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3525,
        end: 3581,
        pattern_start: 3536,
        pattern_end: 3544
      }
    )
  }
  return $;
}

export function submit_square_click_name_square_mode_fails_test() {
  let g = $game.new_with_mode(new $game.NameSquare());
  let $ = $trainer.start_game(g);
  let started;
  if ($ instanceof Ok) {
    started = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      118,
      "submit_square_click_name_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3692,
        end: 3738,
        pattern_start: 3703,
        pattern_end: 3714
      }
    )
  }
  let sq = $square.new$(new $square.A(), new $square.R1());
  let $1 = $trainer.submit_square_click(started, sq);
  if (!($1 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      120,
      "submit_square_click_name_square_mode_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3784,
        end: 3846,
        pattern_start: 3795,
        pattern_end: 3803
      }
    )
  }
  return $1;
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
      127,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3946,
        end: 3992,
        pattern_start: 3957,
        pattern_end: 3968
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
      128,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3995,
        end: 4058,
        pattern_start: 4006,
        pattern_end: 4016
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
      129,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4061,
        end: 4125,
        pattern_start: 4072,
        pattern_end: 4080
      }
    )
  }
  let $3 = $game.get_status(cont);
  if (!($3 instanceof $game.Active)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      130,
      "continue_after_answer_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 4128,
        end: 4174,
        pattern_start: 4139,
        pattern_end: 4150
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
      135,
      "continue_after_answer_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4255,
        end: 4309,
        pattern_start: 4266,
        pattern_end: 4274
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
      142,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4392,
        end: 4438,
        pattern_start: 4403,
        pattern_end: 4414
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
      143,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4441,
        end: 4489,
        pattern_start: 4452,
        pattern_end: 4461
      }
    )
  }
  let $2 = $game.get_status(ended);
  if (!($2 instanceof $game.Finished)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      144,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4492,
        end: 4541,
        pattern_start: 4503,
        pattern_end: 4516
      }
    )
  }
  let $3 = $game.get_current_square(ended);
  if (!($3 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      145,
      "end_game_success_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 4544,
        end: 4592,
        pattern_start: 4555,
        pattern_end: 4559
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
      150,
      "end_game_requires_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4660,
        end: 4701,
        pattern_start: 4671,
        pattern_end: 4679
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
      155,
      "end_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4768,
        end: 4814,
        pattern_start: 4779,
        pattern_end: 4790
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
      156,
      "end_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4817,
        end: 4865,
        pattern_start: 4828,
        pattern_end: 4837
      }
    )
  }
  let $2 = $trainer.end_game(ended);
  if (!($2 instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      157,
      "end_game_finished_fails_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 4868,
        end: 4913,
        pattern_start: 4879,
        pattern_end: 4887
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
      164,
      "get_highlighted_square_name_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5017,
        end: 5063,
        pattern_start: 5028,
        pattern_end: 5039
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
      165,
      "get_highlighted_square_name_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5066,
        end: 5134,
        pattern_start: 5077,
        pattern_end: 5087
      }
    )
  }
  let $2 = $string.length(name) === 2;
  if (!($2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      166,
      "get_highlighted_square_name_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5137,
        end: 5179,
        pattern_start: 5148,
        pattern_end: 5152
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
      171,
      "get_highlighted_square_name_idle_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5255,
        end: 5311,
        pattern_start: 5266,
        pattern_end: 5270
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
      176,
      "get_highlighted_square_name_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5391,
        end: 5437,
        pattern_start: 5402,
        pattern_end: 5413
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
      177,
      "get_highlighted_square_name_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5440,
        end: 5488,
        pattern_start: 5451,
        pattern_end: 5460
      }
    )
  }
  let $2 = $trainer.get_highlighted_square_name(ended);
  if (!($2 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      178,
      "get_highlighted_square_name_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5491,
        end: 5551,
        pattern_start: 5502,
        pattern_end: 5506
      }
    )
  }
  return $2;
}

export function get_game_mode_name_square_test() {
  let g = $game.new_with_mode(new $game.NameSquare());
  let $ = $trainer.get_game_mode(g);
  if (!($ instanceof $game.NameSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      183,
      "get_game_mode_name_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5645,
        end: 5698,
        pattern_start: 5656,
        pattern_end: 5671
      }
    )
  }
  return $;
}

export function get_game_mode_find_square_test() {
  let g = $game.new_with_mode(new $game.FindSquare());
  let $ = $trainer.get_game_mode(g);
  if (!($ instanceof $game.FindSquare)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      188,
      "get_game_mode_find_square_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5792,
        end: 5845,
        pattern_start: 5803,
        pattern_end: 5818
      }
    )
  }
  return $;
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
      193,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5910,
        end: 5956,
        pattern_start: 5921,
        pattern_end: 5932
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
      194,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5959,
        end: 6013,
        pattern_start: 5970,
        pattern_end: 5978
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
      195,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 6016,
        end: 6079,
        pattern_start: 6027,
        pattern_end: 6037
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
      196,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 6082,
        end: 6134,
        pattern_start: 6093,
        pattern_end: 6102
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
      197,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $4,
        start: 6137,
        end: 6187,
        pattern_start: 6148,
        pattern_end: 6157
      }
    )
  }
  if (!(acc === 1.0)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      198,
      "get_accuracy_finished_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: acc,
        start: 6190,
        end: 6210,
        pattern_start: 6201,
        pattern_end: 6204
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
      203,
      "get_accuracy_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6273,
        end: 6319,
        pattern_start: 6284,
        pattern_end: 6295
      }
    )
  }
  let $1 = $trainer.get_accuracy(started);
  if (!($1 instanceof None)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/trainer_test",
      204,
      "get_accuracy_active_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 6322,
        end: 6369,
        pattern_start: 6333,
        pattern_end: 6337
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
      209,
      "get_accuracy_idle_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6430,
        end: 6471,
        pattern_start: 6441,
        pattern_end: 6445
      }
    )
  }
  return $;
}

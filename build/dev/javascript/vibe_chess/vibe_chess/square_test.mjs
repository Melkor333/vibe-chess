import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { Ok, Error, Empty as $Empty, makeError } from "../gleam.mjs";
import * as $square from "../vibe_chess/square.mjs";
import { A, E, H, R1, R4, R8 } from "../vibe_chess/square.mjs";

const FILEPATH = "test/vibe_chess/square_test.gleam";

export function main() {
  return $gleeunit.main();
}

export function square_name_invariant_test() {
  let s = $square.new$(new E(), new R4());
  let $ = s.name;
  if (!($ === "e4")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      11,
      "square_name_invariant_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 187, end: 211, pattern_start: 198, pattern_end: 202 }
    )
  }
  return $;
}

export function square_name_a1_test() {
  let s = $square.new$(new A(), new R1());
  let $ = s.name;
  if (!($ === "a1")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      16,
      "square_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 276, end: 300, pattern_start: 287, pattern_end: 291 }
    )
  }
  return $;
}

export function square_name_h8_test() {
  let s = $square.new$(new H(), new R8());
  let $ = s.name;
  if (!($ === "h8")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      21,
      "square_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 365, end: 389, pattern_start: 376, pattern_end: 380 }
    )
  }
  return $;
}

export function all_squares_count_test() {
  let _block;
  let _pipe = $square.all_squares();
  _block = $list.length(_pipe);
  let $ = _block;
  if (!($ === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      25,
      "all_squares_count_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 429, end: 480, pattern_start: 440, pattern_end: 442 }
    )
  }
  return $;
}

export function all_squares_unique_names_test() {
  let _block;
  let _pipe = $square.all_squares();
  _block = $list.map(_pipe, (s) => { return s.name; });
  let names = _block;
  let _block$1;
  let _pipe$1 = names;
  _block$1 = $list.unique(_pipe$1);
  let unique = _block$1;
  let _block$2;
  let _pipe$2 = unique;
  _block$2 = $list.length(_pipe$2);
  let $ = _block$2;
  if (!($ === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      31,
      "all_squares_unique_names_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 628, end: 665, pattern_start: 639, pattern_end: 641 }
    )
  }
  return $;
}

export function all_squares_covers_all_files_test() {
  let _block;
  let _pipe = $square.all_squares();
  let _pipe$1 = $list.map(_pipe, (s) => { return s.file; });
  _block = $list.unique(_pipe$1);
  let files = _block;
  let _block$1;
  let _pipe$2 = files;
  _block$1 = $list.length(_pipe$2);
  let $ = _block$1;
  if (!($ === 8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      39,
      "all_squares_covers_all_files_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 808, end: 843, pattern_start: 819, pattern_end: 820 }
    )
  }
  return $;
}

export function all_squares_covers_all_ranks_test() {
  let _block;
  let _pipe = $square.all_squares();
  let _pipe$1 = $list.map(_pipe, (s) => { return s.rank; });
  _block = $list.unique(_pipe$1);
  let ranks = _block;
  let _block$1;
  let _pipe$2 = ranks;
  _block$1 = $list.length(_pipe$2);
  let $ = _block$1;
  if (!($ === 8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      47,
      "all_squares_covers_all_ranks_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 986, end: 1021, pattern_start: 997, pattern_end: 998 }
    )
  }
  return $;
}

export function from_name_valid_test() {
  let $ = $square.from_name("e4");
  let s;
  if ($ instanceof Ok) {
    s = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      51,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1059,
        end: 1100,
        pattern_start: 1070,
        pattern_end: 1075
      }
    )
  }
  let $1 = s.file;
  if (!($1 instanceof E)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      52,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1103,
        end: 1124,
        pattern_start: 1114,
        pattern_end: 1115
      }
    )
  }
  let $2 = s.rank;
  if (!($2 instanceof R4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      53,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1127,
        end: 1149,
        pattern_start: 1138,
        pattern_end: 1140
      }
    )
  }
  let $3 = s.name;
  if (!($3 === "e4")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      54,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 1152,
        end: 1176,
        pattern_start: 1163,
        pattern_end: 1167
      }
    )
  }
  return $3;
}

export function from_name_a1_test() {
  let $ = $square.from_name("a1");
  let s;
  if ($ instanceof Ok) {
    s = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      58,
      "from_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1211,
        end: 1252,
        pattern_start: 1222,
        pattern_end: 1227
      }
    )
  }
  let $1 = s.file;
  if (!($1 instanceof A)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      59,
      "from_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1255,
        end: 1276,
        pattern_start: 1266,
        pattern_end: 1267
      }
    )
  }
  let $2 = s.rank;
  if (!($2 instanceof R1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      60,
      "from_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1279,
        end: 1301,
        pattern_start: 1290,
        pattern_end: 1292
      }
    )
  }
  return $2;
}

export function from_name_h8_test() {
  let $ = $square.from_name("h8");
  let s;
  if ($ instanceof Ok) {
    s = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      64,
      "from_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1336,
        end: 1377,
        pattern_start: 1347,
        pattern_end: 1352
      }
    )
  }
  let $1 = s.file;
  if (!($1 instanceof H)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      65,
      "from_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1380,
        end: 1401,
        pattern_start: 1391,
        pattern_end: 1392
      }
    )
  }
  let $2 = s.rank;
  if (!($2 instanceof R8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      66,
      "from_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1404,
        end: 1426,
        pattern_start: 1415,
        pattern_end: 1417
      }
    )
  }
  return $2;
}

export function from_name_invalid_file_test() {
  let $ = $square.from_name("z1");
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      70,
      "from_name_invalid_file_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1471,
        end: 1515,
        pattern_start: 1482,
        pattern_end: 1490
      }
    )
  }
  return $;
}

export function from_name_invalid_rank_test() {
  let $ = $square.from_name("a9");
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      74,
      "from_name_invalid_rank_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1560,
        end: 1604,
        pattern_start: 1571,
        pattern_end: 1579
      }
    )
  }
  return $;
}

export function from_name_too_long_test() {
  let $ = $square.from_name("e44");
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      78,
      "from_name_too_long_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1645,
        end: 1690,
        pattern_start: 1656,
        pattern_end: 1664
      }
    )
  }
  return $;
}

export function from_name_too_short_test() {
  let $ = $square.from_name("e");
  if (!($ instanceof Error)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      82,
      "from_name_too_short_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1732,
        end: 1775,
        pattern_start: 1743,
        pattern_end: 1751
      }
    )
  }
  return $;
}

export function file_to_string_test() {
  let $ = $square.file_to_string(new A());
  if (!($ === "a")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      86,
      "file_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1812,
        end: 1853,
        pattern_start: 1823,
        pattern_end: 1826
      }
    )
  }
  let $1 = $square.file_to_string(new H());
  if (!($1 === "h")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      87,
      "file_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1856,
        end: 1897,
        pattern_start: 1867,
        pattern_end: 1870
      }
    )
  }
  return $1;
}

export function rank_to_string_test() {
  let $ = $square.rank_to_string(new R1());
  if (!($ === "1")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      91,
      "rank_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1934,
        end: 1976,
        pattern_start: 1945,
        pattern_end: 1948
      }
    )
  }
  let $1 = $square.rank_to_string(new R8());
  if (!($1 === "8")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      92,
      "rank_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1979,
        end: 2021,
        pattern_start: 1990,
        pattern_end: 1993
      }
    )
  }
  return $1;
}

export function squares_for_display_count_test() {
  let _block;
  let _pipe = $square.squares_for_display();
  _block = $list.length(_pipe);
  let $ = _block;
  if (!($ === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      96,
      "squares_for_display_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2069,
        end: 2128,
        pattern_start: 2080,
        pattern_end: 2082
      }
    )
  }
  return $;
}

export function squares_for_display_starts_with_a8_test() {
  let _block;
  let _pipe = $square.squares_for_display();
  _block = $list.first(_pipe);
  let first = _block;
  let sq;
  if (first instanceof Ok) {
    sq = first[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      101,
      "squares_for_display_starts_with_a8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: first,
        start: 2242,
        end: 2267,
        pattern_start: 2253,
        pattern_end: 2259
      }
    )
  }
  let $ = sq.name;
  if (!($ === "a8")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      102,
      "squares_for_display_starts_with_a8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2270,
        end: 2295,
        pattern_start: 2281,
        pattern_end: 2285
      }
    )
  }
  return $;
}

export function squares_for_display_ends_with_h1_test() {
  let _block;
  let _pipe = $square.squares_for_display();
  _block = $list.reverse(_pipe);
  let reversed = _block;
  let _block$1;
  let _pipe$1 = reversed;
  _block$1 = $list.first(_pipe$1);
  let last = _block$1;
  let sq;
  if (last instanceof Ok) {
    sq = last[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      108,
      "squares_for_display_ends_with_h1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: last,
        start: 2448,
        end: 2472,
        pattern_start: 2459,
        pattern_end: 2465
      }
    )
  }
  let $ = sq.name;
  if (!($ === "h1")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      109,
      "squares_for_display_ends_with_h1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2475,
        end: 2500,
        pattern_start: 2486,
        pattern_end: 2490
      }
    )
  }
  return $;
}

export function squares_for_display_unique_test() {
  let _block;
  let _pipe = $square.squares_for_display();
  _block = $list.map(_pipe, (s) => { return s.name; });
  let names = _block;
  let _block$1;
  let _pipe$1 = names;
  _block$1 = $list.unique(_pipe$1);
  let unique = _block$1;
  let _block$2;
  let _pipe$2 = unique;
  _block$2 = $list.length(_pipe$2);
  let $ = _block$2;
  if (!($ === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      115,
      "squares_for_display_unique_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2658,
        end: 2695,
        pattern_start: 2669,
        pattern_end: 2671
      }
    )
  }
  return $;
}

export function squares_for_display_rank_order_test() {
  let display = $square.squares_for_display();
  let _block;
  let _pipe = display;
  _block = $list.take(_pipe, 8);
  let first_eight = _block;
  let _block$1;
  let _pipe$1 = first_eight;
  _block$1 = $list.map(_pipe$1, (s) => { return s.name; });
  let names = _block$1;
  let $ = $list.length(names);
  if (!($ === 8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      122,
      "squares_for_display_rank_order_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2893,
        end: 2926,
        pattern_start: 2904,
        pattern_end: 2905
      }
    )
  }
  if (names instanceof $Empty) {
    throw makeError(
      "panic",
      FILEPATH,
      "vibe_chess/square_test",
      129,
      "squares_for_display_rank_order_test",
      "Expected 8 names",
      {}
    )
  } else {
    let $1 = names.tail;
    if ($1 instanceof $Empty) {
      throw makeError(
        "panic",
        FILEPATH,
        "vibe_chess/square_test",
        129,
        "squares_for_display_rank_order_test",
        "Expected 8 names",
        {}
      )
    } else {
      let $2 = $1.tail;
      if ($2 instanceof $Empty) {
        throw makeError(
          "panic",
          FILEPATH,
          "vibe_chess/square_test",
          129,
          "squares_for_display_rank_order_test",
          "Expected 8 names",
          {}
        )
      } else {
        let $3 = $2.tail;
        if ($3 instanceof $Empty) {
          throw makeError(
            "panic",
            FILEPATH,
            "vibe_chess/square_test",
            129,
            "squares_for_display_rank_order_test",
            "Expected 8 names",
            {}
          )
        } else {
          let $4 = $3.tail;
          if ($4 instanceof $Empty) {
            throw makeError(
              "panic",
              FILEPATH,
              "vibe_chess/square_test",
              129,
              "squares_for_display_rank_order_test",
              "Expected 8 names",
              {}
            )
          } else {
            let $5 = $4.tail;
            if ($5 instanceof $Empty) {
              throw makeError(
                "panic",
                FILEPATH,
                "vibe_chess/square_test",
                129,
                "squares_for_display_rank_order_test",
                "Expected 8 names",
                {}
              )
            } else {
              let $6 = $5.tail;
              if ($6 instanceof $Empty) {
                throw makeError(
                  "panic",
                  FILEPATH,
                  "vibe_chess/square_test",
                  129,
                  "squares_for_display_rank_order_test",
                  "Expected 8 names",
                  {}
                )
              } else {
                let $7 = $6.tail;
                if ($7 instanceof $Empty) {
                  throw makeError(
                    "panic",
                    FILEPATH,
                    "vibe_chess/square_test",
                    129,
                    "squares_for_display_rank_order_test",
                    "Expected 8 names",
                    {}
                  )
                } else {
                  let $8 = $7.tail;
                  if ($8 instanceof $Empty) {
                    let a = names.head;
                    let b = $1.head;
                    let h = $7.head;
                    if (!(a === "a8")) {
                      throw makeError(
                        "let_assert",
                        FILEPATH,
                        "vibe_chess/square_test",
                        125,
                        "squares_for_display_rank_order_test",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: a,
                          start: 2987,
                          end: 3006,
                          pattern_start: 2998,
                          pattern_end: 3002
                        }
                      )
                    }
                    if (!(b === "b8")) {
                      throw makeError(
                        "let_assert",
                        FILEPATH,
                        "vibe_chess/square_test",
                        126,
                        "squares_for_display_rank_order_test",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: b,
                          start: 3013,
                          end: 3032,
                          pattern_start: 3024,
                          pattern_end: 3028
                        }
                      )
                    }
                    if (!(h === "h8")) {
                      throw makeError(
                        "let_assert",
                        FILEPATH,
                        "vibe_chess/square_test",
                        127,
                        "squares_for_display_rank_order_test",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: h,
                          start: 3039,
                          end: 3058,
                          pattern_start: 3050,
                          pattern_end: 3054
                        }
                      )
                    }
                    return h;
                  } else {
                    throw makeError(
                      "panic",
                      FILEPATH,
                      "vibe_chess/square_test",
                      129,
                      "squares_for_display_rank_order_test",
                      "Expected 8 names",
                      {}
                    )
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export function a1_is_black_test() {
  let s = $square.new$(new A(), new R1());
  let $ = $square.is_black(s);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      137,
      "a1_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3190,
        end: 3226,
        pattern_start: 3201,
        pattern_end: 3205
      }
    )
  }
  let $1 = $square.is_light(s);
  if (!(!$1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      138,
      "a1_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3229,
        end: 3266,
        pattern_start: 3240,
        pattern_end: 3245
      }
    )
  }
  return $1;
}

export function a2_is_light_test() {
  let s = $square.new$(new A(), new $square.R2());
  let $ = $square.is_light(s);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      143,
      "a2_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3335,
        end: 3371,
        pattern_start: 3346,
        pattern_end: 3350
      }
    )
  }
  let $1 = $square.is_black(s);
  if (!(!$1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      144,
      "a2_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3374,
        end: 3411,
        pattern_start: 3385,
        pattern_end: 3390
      }
    )
  }
  return $1;
}

export function h1_is_light_test() {
  let s = $square.new$(new H(), new R1());
  let $ = $square.is_light(s);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      149,
      "h1_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3473,
        end: 3509,
        pattern_start: 3484,
        pattern_end: 3488
      }
    )
  }
  return $;
}

export function h8_is_black_test() {
  let s = $square.new$(new H(), new R8());
  let $ = $square.is_black(s);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      154,
      "h8_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3571,
        end: 3607,
        pattern_start: 3582,
        pattern_end: 3586
      }
    )
  }
  return $;
}

export function e4_is_light_test() {
  let s = $square.new$(new E(), new R4());
  let $ = $square.is_light(s);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      159,
      "e4_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3669,
        end: 3705,
        pattern_start: 3680,
        pattern_end: 3684
      }
    )
  }
  return $;
}

export function d4_is_black_test() {
  let s = $square.new$(new $square.D(), new R4());
  let $ = $square.is_black(s);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      164,
      "d4_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3774,
        end: 3810,
        pattern_start: 3785,
        pattern_end: 3789
      }
    )
  }
  return $;
}

export function color_32_black_32_light_test() {
  let all = $square.all_squares();
  let blacks = $list.filter(all, $square.is_black);
  let lights = $list.filter(all, $square.is_light);
  let $ = $list.length(blacks);
  if (!($ === 32)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      171,
      "color_32_black_32_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3987,
        end: 4022,
        pattern_start: 3998,
        pattern_end: 4000
      }
    )
  }
  let $1 = $list.length(lights);
  if (!($1 === 32)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      172,
      "color_32_black_32_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4025,
        end: 4060,
        pattern_start: 4036,
        pattern_end: 4038
      }
    )
  }
  return $1;
}

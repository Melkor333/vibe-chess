import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { Ok, Error, Empty as $Empty, makeError, isEqual } from "../gleam.mjs";
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
      12,
      "square_name_invariant_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 207, end: 231, pattern_start: 218, pattern_end: 222 }
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
      17,
      "square_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 296, end: 320, pattern_start: 307, pattern_end: 311 }
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
      22,
      "square_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 385, end: 409, pattern_start: 396, pattern_end: 400 }
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
      26,
      "all_squares_count_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 449, end: 500, pattern_start: 460, pattern_end: 462 }
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
      32,
      "all_squares_unique_names_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 648, end: 685, pattern_start: 659, pattern_end: 661 }
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
      40,
      "all_squares_covers_all_files_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 828, end: 863, pattern_start: 839, pattern_end: 840 }
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
      48,
      "all_squares_covers_all_ranks_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1006,
        end: 1041,
        pattern_start: 1017,
        pattern_end: 1018
      }
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
      52,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1079,
        end: 1120,
        pattern_start: 1090,
        pattern_end: 1095
      }
    )
  }
  let $1 = s.file;
  if (!($1 instanceof E)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      53,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1123,
        end: 1144,
        pattern_start: 1134,
        pattern_end: 1135
      }
    )
  }
  let $2 = s.rank;
  if (!($2 instanceof R4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      54,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1147,
        end: 1169,
        pattern_start: 1158,
        pattern_end: 1160
      }
    )
  }
  let $3 = s.name;
  if (!($3 === "e4")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      55,
      "from_name_valid_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 1172,
        end: 1196,
        pattern_start: 1183,
        pattern_end: 1187
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
      59,
      "from_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1231,
        end: 1272,
        pattern_start: 1242,
        pattern_end: 1247
      }
    )
  }
  let $1 = s.file;
  if (!($1 instanceof A)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      60,
      "from_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1275,
        end: 1296,
        pattern_start: 1286,
        pattern_end: 1287
      }
    )
  }
  let $2 = s.rank;
  if (!($2 instanceof R1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      61,
      "from_name_a1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1299,
        end: 1321,
        pattern_start: 1310,
        pattern_end: 1312
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
      65,
      "from_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1356,
        end: 1397,
        pattern_start: 1367,
        pattern_end: 1372
      }
    )
  }
  let $1 = s.file;
  if (!($1 instanceof H)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      66,
      "from_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1400,
        end: 1421,
        pattern_start: 1411,
        pattern_end: 1412
      }
    )
  }
  let $2 = s.rank;
  if (!($2 instanceof R8)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      67,
      "from_name_h8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 1424,
        end: 1446,
        pattern_start: 1435,
        pattern_end: 1437
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
      71,
      "from_name_invalid_file_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1491,
        end: 1535,
        pattern_start: 1502,
        pattern_end: 1510
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
      75,
      "from_name_invalid_rank_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1580,
        end: 1624,
        pattern_start: 1591,
        pattern_end: 1599
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
      79,
      "from_name_too_long_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1665,
        end: 1710,
        pattern_start: 1676,
        pattern_end: 1684
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
      83,
      "from_name_too_short_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1752,
        end: 1795,
        pattern_start: 1763,
        pattern_end: 1771
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
      87,
      "file_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1832,
        end: 1873,
        pattern_start: 1843,
        pattern_end: 1846
      }
    )
  }
  let $1 = $square.file_to_string(new H());
  if (!($1 === "h")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      88,
      "file_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1876,
        end: 1917,
        pattern_start: 1887,
        pattern_end: 1890
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
      92,
      "rank_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1954,
        end: 1996,
        pattern_start: 1965,
        pattern_end: 1968
      }
    )
  }
  let $1 = $square.rank_to_string(new R8());
  if (!($1 === "8")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      93,
      "rank_to_string_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 1999,
        end: 2041,
        pattern_start: 2010,
        pattern_end: 2013
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
      97,
      "squares_for_display_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2089,
        end: 2148,
        pattern_start: 2100,
        pattern_end: 2102
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
      102,
      "squares_for_display_starts_with_a8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: first,
        start: 2262,
        end: 2287,
        pattern_start: 2273,
        pattern_end: 2279
      }
    )
  }
  let $ = sq.name;
  if (!($ === "a8")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      103,
      "squares_for_display_starts_with_a8_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2290,
        end: 2315,
        pattern_start: 2301,
        pattern_end: 2305
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
      109,
      "squares_for_display_ends_with_h1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: last,
        start: 2468,
        end: 2492,
        pattern_start: 2479,
        pattern_end: 2485
      }
    )
  }
  let $ = sq.name;
  if (!($ === "h1")) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      110,
      "squares_for_display_ends_with_h1_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2495,
        end: 2520,
        pattern_start: 2506,
        pattern_end: 2510
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
      116,
      "squares_for_display_unique_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2678,
        end: 2715,
        pattern_start: 2689,
        pattern_end: 2691
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
      123,
      "squares_for_display_rank_order_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 2913,
        end: 2946,
        pattern_start: 2924,
        pattern_end: 2925
      }
    )
  }
  if (names instanceof $Empty) {
    throw makeError(
      "panic",
      FILEPATH,
      "vibe_chess/square_test",
      130,
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
        130,
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
          130,
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
            130,
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
              130,
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
                130,
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
                  130,
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
                    130,
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
                        126,
                        "squares_for_display_rank_order_test",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: a,
                          start: 3007,
                          end: 3026,
                          pattern_start: 3018,
                          pattern_end: 3022
                        }
                      )
                    }
                    if (!(b === "b8")) {
                      throw makeError(
                        "let_assert",
                        FILEPATH,
                        "vibe_chess/square_test",
                        127,
                        "squares_for_display_rank_order_test",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: b,
                          start: 3033,
                          end: 3052,
                          pattern_start: 3044,
                          pattern_end: 3048
                        }
                      )
                    }
                    if (!(h === "h8")) {
                      throw makeError(
                        "let_assert",
                        FILEPATH,
                        "vibe_chess/square_test",
                        128,
                        "squares_for_display_rank_order_test",
                        "Pattern match failed, no pattern matched the value.",
                        {
                          value: h,
                          start: 3059,
                          end: 3078,
                          pattern_start: 3070,
                          pattern_end: 3074
                        }
                      )
                    }
                    return h;
                  } else {
                    throw makeError(
                      "panic",
                      FILEPATH,
                      "vibe_chess/square_test",
                      130,
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
      138,
      "a1_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3210,
        end: 3246,
        pattern_start: 3221,
        pattern_end: 3225
      }
    )
  }
  let $1 = $square.is_light(s);
  if (!(!$1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      139,
      "a1_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3249,
        end: 3286,
        pattern_start: 3260,
        pattern_end: 3265
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
      144,
      "a2_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3355,
        end: 3391,
        pattern_start: 3366,
        pattern_end: 3370
      }
    )
  }
  let $1 = $square.is_black(s);
  if (!(!$1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      145,
      "a2_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 3394,
        end: 3431,
        pattern_start: 3405,
        pattern_end: 3410
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
      150,
      "h1_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3493,
        end: 3529,
        pattern_start: 3504,
        pattern_end: 3508
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
      155,
      "h8_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3591,
        end: 3627,
        pattern_start: 3602,
        pattern_end: 3606
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
      160,
      "e4_is_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3689,
        end: 3725,
        pattern_start: 3700,
        pattern_end: 3704
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
      165,
      "d4_is_black_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3794,
        end: 3830,
        pattern_start: 3805,
        pattern_end: 3809
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
      172,
      "color_32_black_32_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4007,
        end: 4042,
        pattern_start: 4018,
        pattern_end: 4020
      }
    )
  }
  let $1 = $list.length(lights);
  if (!($1 === 32)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      173,
      "color_32_black_32_light_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 4045,
        end: 4080,
        pattern_start: 4056,
        pattern_end: 4058
      }
    )
  }
  return $1;
}

export function level1_square_count_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level1());
  _block = $list.length(_pipe);
  let $ = _block;
  if (!($ === 4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      179,
      "level1_square_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4147,
        end: 4216,
        pattern_start: 4158,
        pattern_end: 4159
      }
    )
  }
  return $;
}

export function level2_square_count_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level2());
  _block = $list.length(_pipe);
  let $ = _block;
  if (!($ === 16)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      183,
      "level2_square_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4258,
        end: 4328,
        pattern_start: 4269,
        pattern_end: 4271
      }
    )
  }
  return $;
}

export function level3_square_count_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level3());
  _block = $list.length(_pipe);
  let $ = _block;
  if (!($ === 36)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      187,
      "level3_square_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4370,
        end: 4440,
        pattern_start: 4381,
        pattern_end: 4383
      }
    )
  }
  return $;
}

export function level4_square_count_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level4());
  _block = $list.length(_pipe);
  let $ = _block;
  if (!($ === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      191,
      "level4_square_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4482,
        end: 4552,
        pattern_start: 4493,
        pattern_end: 4495
      }
    )
  }
  return $;
}

export function level4_equals_all_squares_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level4());
  let _pipe$1 = $list.map(_pipe, (s) => { return s.name; });
  _block = $list.sort(_pipe$1, $string.compare);
  let level4 = _block;
  let _block$1;
  let _pipe$2 = $square.all_squares();
  let _pipe$3 = $list.map(_pipe$2, (s) => { return s.name; });
  _block$1 = $list.sort(_pipe$3, $string.compare);
  let all = _block$1;
  let $ = isEqual(level4, all);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      203,
      "level4_equals_all_squares_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4830,
        end: 4861,
        pattern_start: 4841,
        pattern_end: 4845
      }
    )
  }
  return $;
}

export function level1_contains_d4_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level1());
  _block = $list.map(_pipe, (s) => { return s.name; });
  let names = _block;
  let $ = $list.contains(names, "d4");
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      209,
      "level1_contains_d4_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 4990,
        end: 5034,
        pattern_start: 5001,
        pattern_end: 5005
      }
    )
  }
  let $1 = $list.contains(names, "d5");
  if (!($1)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      210,
      "level1_contains_d4_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 5037,
        end: 5081,
        pattern_start: 5048,
        pattern_end: 5052
      }
    )
  }
  let $2 = $list.contains(names, "e4");
  if (!($2)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      211,
      "level1_contains_d4_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 5084,
        end: 5128,
        pattern_start: 5095,
        pattern_end: 5099
      }
    )
  }
  let $3 = $list.contains(names, "e5");
  if (!($3)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      212,
      "level1_contains_d4_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 5131,
        end: 5175,
        pattern_start: 5142,
        pattern_end: 5146
      }
    )
  }
  return $3;
}

export function level1_subset_of_level2_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level1());
  let _pipe$1 = $list.map(_pipe, (s) => { return s.name; });
  _block = $list.sort(_pipe$1, $string.compare);
  let l1 = _block;
  let _block$1;
  let _pipe$2 = $square.squares_for_level(new $square.Level2());
  let _pipe$3 = $list.map(_pipe$2, (s) => { return s.name; });
  _block$1 = $list.sort(_pipe$3, $string.compare);
  let l2 = _block$1;
  let $ = $list.all(l1, (name) => { return $list.contains(l2, name); });
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      224,
      "level1_subset_of_level2_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5465,
        end: 5533,
        pattern_start: 5476,
        pattern_end: 5480
      }
    )
  }
  return $;
}

export function level2_subset_of_level3_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level2());
  let _pipe$1 = $list.map(_pipe, (s) => { return s.name; });
  _block = $list.sort(_pipe$1, $string.compare);
  let l2 = _block;
  let _block$1;
  let _pipe$2 = $square.squares_for_level(new $square.Level3());
  let _pipe$3 = $list.map(_pipe$2, (s) => { return s.name; });
  _block$1 = $list.sort(_pipe$3, $string.compare);
  let l3 = _block$1;
  let $ = $list.all(l2, (name) => { return $list.contains(l3, name); });
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      236,
      "level2_subset_of_level3_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5823,
        end: 5891,
        pattern_start: 5834,
        pattern_end: 5838
      }
    )
  }
  return $;
}

export function level3_subset_of_level4_test() {
  let _block;
  let _pipe = $square.squares_for_level(new $square.Level3());
  let _pipe$1 = $list.map(_pipe, (s) => { return s.name; });
  _block = $list.sort(_pipe$1, $string.compare);
  let l3 = _block;
  let _block$1;
  let _pipe$2 = $square.squares_for_level(new $square.Level4());
  let _pipe$3 = $list.map(_pipe$2, (s) => { return s.name; });
  _block$1 = $list.sort(_pipe$3, $string.compare);
  let l4 = _block$1;
  let $ = $list.all(l3, (name) => { return $list.contains(l4, name); });
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      248,
      "level3_subset_of_level4_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6181,
        end: 6249,
        pattern_start: 6192,
        pattern_end: 6196
      }
    )
  }
  return $;
}

export function level_count_test() {
  let $ = $square.level_count(new $square.Level1());
  if (!($ === 4)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      252,
      "level_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 6283,
        end: 6331,
        pattern_start: 6294,
        pattern_end: 6295
      }
    )
  }
  let $1 = $square.level_count(new $square.Level2());
  if (!($1 === 16)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      253,
      "level_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $1,
        start: 6334,
        end: 6383,
        pattern_start: 6345,
        pattern_end: 6347
      }
    )
  }
  let $2 = $square.level_count(new $square.Level3());
  if (!($2 === 36)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      254,
      "level_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $2,
        start: 6386,
        end: 6435,
        pattern_start: 6397,
        pattern_end: 6399
      }
    )
  }
  let $3 = $square.level_count(new $square.Level4());
  if (!($3 === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/square_test",
      255,
      "level_count_test",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $3,
        start: 6438,
        end: 6487,
        pattern_start: 6449,
        pattern_end: 6451
      }
    )
  }
  return $3;
}

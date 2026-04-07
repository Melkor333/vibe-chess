import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $gleeunit from "../../gleeunit/gleeunit.mjs";
import { makeError } from "../gleam.mjs";
import * as $board from "../vibe_chess/board.mjs";

const FILEPATH = "test/vibe_chess/board_test.gleam";

export function main() {
  return $gleeunit.main();
}

export function board_has_64_squares_test() {
  let b = $board.new$();
  let $ = $board.count(b);
  if (!($ === 64)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/board_test",
      10,
      "board_has_64_squares_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 139, end: 169, pattern_start: 150, pattern_end: 152 }
    )
  }
  return $;
}

export function board_squares_unique_test() {
  let b = $board.new$();
  let _block;
  let _pipe = $board.squares(b);
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
      "vibe_chess/board_test",
      17,
      "board_squares_unique_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 331, end: 368, pattern_start: 342, pattern_end: 344 }
    )
  }
  return $;
}

export function random_square_valid_test() {
  let b = $board.new$();
  let sq = $board.random_square(b);
  let _block;
  let _pipe = $board.squares(b);
  _block = $list.map(_pipe, (s) => { return s.name; });
  let all_names = _block;
  let $ = $list.contains(all_names, sq.name);
  if (!($)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/board_test",
      24,
      "random_square_valid_test",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 531, end: 582, pattern_start: 542, pattern_end: 546 }
    )
  }
  return $;
}

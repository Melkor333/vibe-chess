import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import { Ok, CustomType as $CustomType, makeError } from "../gleam.mjs";
import * as $square from "../vibe_chess/square.mjs";
import { random_index } from "./board_ffi.mjs";

const FILEPATH = "src/vibe_chess/board.gleam";

class Board extends $CustomType {
  constructor(squares) {
    super();
    this.squares = squares;
  }
}

/**
 * Create a new board with all 64 squares.
 */
export function new$() {
  return new Board($square.all_squares());
}

/**
 * Get all squares on the board.
 */
export function squares(board) {
  return board.squares;
}

/**
 * Get the number of squares on the board.
 */
export function count(board) {
  return $list.length(board.squares);
}

/**
 * Pick a random square from the board.
 */
export function random_square(board) {
  let idx = random_index($list.length(board.squares));
  let _block;
  let _pipe = board.squares;
  let _pipe$1 = $list.drop(_pipe, idx);
  _block = $list.first(_pipe$1);
  let $ = _block;
  let sq;
  if ($ instanceof Ok) {
    sq = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "vibe_chess/board",
      37,
      "random_square",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 942, end: 1019, pattern_start: 953, pattern_end: 959 }
    )
  }
  return sq;
}

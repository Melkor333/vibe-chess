import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import { Ok, Error, toList, Empty as $Empty, CustomType as $CustomType } from "../gleam.mjs";

export class A extends $CustomType {}
export const File$A = () => new A();
export const File$isA = (value) => value instanceof A;

export class B extends $CustomType {}
export const File$B = () => new B();
export const File$isB = (value) => value instanceof B;

export class C extends $CustomType {}
export const File$C = () => new C();
export const File$isC = (value) => value instanceof C;

export class D extends $CustomType {}
export const File$D = () => new D();
export const File$isD = (value) => value instanceof D;

export class E extends $CustomType {}
export const File$E = () => new E();
export const File$isE = (value) => value instanceof E;

export class F extends $CustomType {}
export const File$F = () => new F();
export const File$isF = (value) => value instanceof F;

export class G extends $CustomType {}
export const File$G = () => new G();
export const File$isG = (value) => value instanceof G;

export class H extends $CustomType {}
export const File$H = () => new H();
export const File$isH = (value) => value instanceof H;

export class R1 extends $CustomType {}
export const Rank$R1 = () => new R1();
export const Rank$isR1 = (value) => value instanceof R1;

export class R2 extends $CustomType {}
export const Rank$R2 = () => new R2();
export const Rank$isR2 = (value) => value instanceof R2;

export class R3 extends $CustomType {}
export const Rank$R3 = () => new R3();
export const Rank$isR3 = (value) => value instanceof R3;

export class R4 extends $CustomType {}
export const Rank$R4 = () => new R4();
export const Rank$isR4 = (value) => value instanceof R4;

export class R5 extends $CustomType {}
export const Rank$R5 = () => new R5();
export const Rank$isR5 = (value) => value instanceof R5;

export class R6 extends $CustomType {}
export const Rank$R6 = () => new R6();
export const Rank$isR6 = (value) => value instanceof R6;

export class R7 extends $CustomType {}
export const Rank$R7 = () => new R7();
export const Rank$isR7 = (value) => value instanceof R7;

export class R8 extends $CustomType {}
export const Rank$R8 = () => new R8();
export const Rank$isR8 = (value) => value instanceof R8;

export class Black extends $CustomType {}
export const SquareColor$Black = () => new Black();
export const SquareColor$isBlack = (value) => value instanceof Black;

export class Light extends $CustomType {}
export const SquareColor$Light = () => new Light();
export const SquareColor$isLight = (value) => value instanceof Light;

export class Level1 extends $CustomType {}
export const HardnessLevel$Level1 = () => new Level1();
export const HardnessLevel$isLevel1 = (value) => value instanceof Level1;

export class Level2 extends $CustomType {}
export const HardnessLevel$Level2 = () => new Level2();
export const HardnessLevel$isLevel2 = (value) => value instanceof Level2;

export class Level3 extends $CustomType {}
export const HardnessLevel$Level3 = () => new Level3();
export const HardnessLevel$isLevel3 = (value) => value instanceof Level3;

export class Level4 extends $CustomType {}
export const HardnessLevel$Level4 = () => new Level4();
export const HardnessLevel$isLevel4 = (value) => value instanceof Level4;

export class Square extends $CustomType {
  constructor(file, rank, name) {
    super();
    this.file = file;
    this.rank = rank;
    this.name = name;
  }
}
export const Square$Square = (file, rank, name) => new Square(file, rank, name);
export const Square$isSquare = (value) => value instanceof Square;
export const Square$Square$file = (value) => value.file;
export const Square$Square$0 = (value) => value.file;
export const Square$Square$rank = (value) => value.rank;
export const Square$Square$1 = (value) => value.rank;
export const Square$Square$name = (value) => value.name;
export const Square$Square$2 = (value) => value.name;

/**
 * Convert a file to its string representation.
 */
export function file_to_string(file) {
  if (file instanceof A) {
    return "a";
  } else if (file instanceof B) {
    return "b";
  } else if (file instanceof C) {
    return "c";
  } else if (file instanceof D) {
    return "d";
  } else if (file instanceof E) {
    return "e";
  } else if (file instanceof F) {
    return "f";
  } else if (file instanceof G) {
    return "g";
  } else {
    return "h";
  }
}

/**
 * Convert a rank to its string representation.
 */
export function rank_to_string(rank) {
  if (rank instanceof R1) {
    return "1";
  } else if (rank instanceof R2) {
    return "2";
  } else if (rank instanceof R3) {
    return "3";
  } else if (rank instanceof R4) {
    return "4";
  } else if (rank instanceof R5) {
    return "5";
  } else if (rank instanceof R6) {
    return "6";
  } else if (rank instanceof R7) {
    return "7";
  } else {
    return "8";
  }
}

/**
 * Convert a file to its 0-based index.
 * 
 * @ignore
 */
function file_index(file) {
  if (file instanceof A) {
    return 0;
  } else if (file instanceof B) {
    return 1;
  } else if (file instanceof C) {
    return 2;
  } else if (file instanceof D) {
    return 3;
  } else if (file instanceof E) {
    return 4;
  } else if (file instanceof F) {
    return 5;
  } else if (file instanceof G) {
    return 6;
  } else {
    return 7;
  }
}

/**
 * Convert a rank to its 0-based index.
 * 
 * @ignore
 */
function rank_index(rank) {
  if (rank instanceof R1) {
    return 0;
  } else if (rank instanceof R2) {
    return 1;
  } else if (rank instanceof R3) {
    return 2;
  } else if (rank instanceof R4) {
    return 3;
  } else if (rank instanceof R5) {
    return 4;
  } else if (rank instanceof R6) {
    return 5;
  } else if (rank instanceof R7) {
    return 6;
  } else {
    return 7;
  }
}

/**
 * Determine the color of a square on the chess board.
 * A square is light if (file_index + rank_index) is odd, black if even.
 * a1 (0+0=0) is Black.
 */
export function color(square) {
  let sum = file_index(square.file) + rank_index(square.rank);
  let $ = (sum % 2) === 0;
  if ($) {
    return new Black();
  } else {
    return new Light();
  }
}

/**
 * Check if a square is black.
 */
export function is_black(square) {
  let $ = color(square);
  if ($ instanceof Black) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if a square is light.
 */
export function is_light(square) {
  let $ = color(square);
  if ($ instanceof Black) {
    return false;
  } else {
    return true;
  }
}

/**
 * Create a square from file and rank. Name is computed automatically.
 */
export function new$(file, rank) {
  return new Square(file, rank, file_to_string(file) + rank_to_string(rank));
}

/**
 * All files in order.
 */
export function all_files() {
  return toList([
    new A(),
    new B(),
    new C(),
    new D(),
    new E(),
    new F(),
    new G(),
    new H(),
  ]);
}

/**
 * All ranks in order.
 */
export function all_ranks() {
  return toList([
    new R1(),
    new R2(),
    new R3(),
    new R4(),
    new R5(),
    new R6(),
    new R7(),
    new R8(),
  ]);
}

/**
 * Get the squares available for a given hardness level.
 * Each level is a superset of the previous one.
 */
export function squares_for_level(level) {
  let _block;
  if (level instanceof Level1) {
    _block = toList([new D(), new E()]);
  } else if (level instanceof Level2) {
    _block = toList([new C(), new D(), new E(), new F()]);
  } else if (level instanceof Level3) {
    _block = toList([new B(), new C(), new D(), new E(), new F(), new G()]);
  } else {
    _block = all_files();
  }
  let files = _block;
  let _block$1;
  if (level instanceof Level1) {
    _block$1 = toList([new R4(), new R5()]);
  } else if (level instanceof Level2) {
    _block$1 = toList([new R3(), new R4(), new R5(), new R6()]);
  } else if (level instanceof Level3) {
    _block$1 = toList([
      new R2(),
      new R3(),
      new R4(),
      new R5(),
      new R6(),
      new R7(),
    ]);
  } else {
    _block$1 = all_ranks();
  }
  let ranks = _block$1;
  return $list.flat_map(
    files,
    (file) => {
      return $list.map(ranks, (rank) => { return new$(file, rank); });
    },
  );
}

/**
 * Get the number of squares for a hardness level.
 */
export function level_count(level) {
  return $list.length(squares_for_level(level));
}

/**
 * Generate all 64 squares.
 */
export function all_squares() {
  return $list.flat_map(
    all_files(),
    (file) => {
      return $list.map(all_ranks(), (rank) => { return new$(file, rank); });
    },
  );
}

/**
 * Generate squares in display order (rank 8 at top, rank 1 at bottom).
 * For use in rendering a chess board grid.
 */
export function squares_for_display() {
  return $list.flat_map(
    toList([
      new R8(),
      new R7(),
      new R6(),
      new R5(),
      new R4(),
      new R3(),
      new R2(),
      new R1(),
    ]),
    (rank) => {
      return $list.map(all_files(), (file) => { return new$(file, rank); });
    },
  );
}

/**
 * Parse a square name like "e4" into a Square.
 */
export function from_name(name) {
  let $ = $string.to_graphemes(name);
  if ($ instanceof $Empty) {
    return new Error("Square name must be exactly 2 characters");
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      return new Error("Square name must be exactly 2 characters");
    } else {
      let $2 = $1.tail;
      if ($2 instanceof $Empty) {
        let f = $.head;
        let r = $1.head;
        let _block;
        if (f === "a") {
          _block = new Ok(new A());
        } else if (f === "b") {
          _block = new Ok(new B());
        } else if (f === "c") {
          _block = new Ok(new C());
        } else if (f === "d") {
          _block = new Ok(new D());
        } else if (f === "e") {
          _block = new Ok(new E());
        } else if (f === "f") {
          _block = new Ok(new F());
        } else if (f === "g") {
          _block = new Ok(new G());
        } else if (f === "h") {
          _block = new Ok(new H());
        } else {
          _block = new Error("Invalid file: " + f);
        }
        let file_result = _block;
        let _block$1;
        if (r === "1") {
          _block$1 = new Ok(new R1());
        } else if (r === "2") {
          _block$1 = new Ok(new R2());
        } else if (r === "3") {
          _block$1 = new Ok(new R3());
        } else if (r === "4") {
          _block$1 = new Ok(new R4());
        } else if (r === "5") {
          _block$1 = new Ok(new R5());
        } else if (r === "6") {
          _block$1 = new Ok(new R6());
        } else if (r === "7") {
          _block$1 = new Ok(new R7());
        } else if (r === "8") {
          _block$1 = new Ok(new R8());
        } else {
          _block$1 = new Error("Invalid rank: " + r);
        }
        let rank_result = _block$1;
        if (file_result instanceof Ok) {
          if (rank_result instanceof Ok) {
            let file = file_result[0];
            let rank = rank_result[0];
            return new Ok(new$(file, rank));
          } else {
            return rank_result;
          }
        } else {
          return file_result;
        }
      } else {
        return new Error("Square name must be exactly 2 characters");
      }
    }
  }
}

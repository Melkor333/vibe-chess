import gleam/list
import gleeunit
import vibe_chess/square.{A, E, H, R1, R4, R8}

pub fn main() {
  gleeunit.main()
}

pub fn square_name_invariant_test() {
  let s = square.new(E, R4)
  let assert "e4" = s.name
}

pub fn square_name_a1_test() {
  let s = square.new(A, R1)
  let assert "a1" = s.name
}

pub fn square_name_h8_test() {
  let s = square.new(H, R8)
  let assert "h8" = s.name
}

pub fn all_squares_count_test() {
  let assert 64 = square.all_squares() |> list.length
}

pub fn all_squares_unique_names_test() {
  let names = square.all_squares() |> list.map(fn(s) { s.name })
  let unique = names |> list.unique
  let assert 64 = unique |> list.length
}

pub fn all_squares_covers_all_files_test() {
  let files =
    square.all_squares()
    |> list.map(fn(s) { s.file })
    |> list.unique
  let assert 8 = files |> list.length
}

pub fn all_squares_covers_all_ranks_test() {
  let ranks =
    square.all_squares()
    |> list.map(fn(s) { s.rank })
    |> list.unique
  let assert 8 = ranks |> list.length
}

pub fn from_name_valid_test() {
  let assert Ok(s) = square.from_name("e4")
  let assert E = s.file
  let assert R4 = s.rank
  let assert "e4" = s.name
}

pub fn from_name_a1_test() {
  let assert Ok(s) = square.from_name("a1")
  let assert A = s.file
  let assert R1 = s.rank
}

pub fn from_name_h8_test() {
  let assert Ok(s) = square.from_name("h8")
  let assert H = s.file
  let assert R8 = s.rank
}

pub fn from_name_invalid_file_test() {
  let assert Error(_) = square.from_name("z1")
}

pub fn from_name_invalid_rank_test() {
  let assert Error(_) = square.from_name("a9")
}

pub fn from_name_too_long_test() {
  let assert Error(_) = square.from_name("e44")
}

pub fn from_name_too_short_test() {
  let assert Error(_) = square.from_name("e")
}

pub fn file_to_string_test() {
  let assert "a" = square.file_to_string(A)
  let assert "h" = square.file_to_string(H)
}

pub fn rank_to_string_test() {
  let assert "1" = square.rank_to_string(R1)
  let assert "8" = square.rank_to_string(R8)
}

pub fn squares_for_display_count_test() {
  let assert 64 = square.squares_for_display() |> list.length
}

pub fn squares_for_display_starts_with_a8_test() {
  let first = square.squares_for_display() |> list.first
  let assert Ok(sq) = first
  let assert "a8" = sq.name
}

pub fn squares_for_display_ends_with_h1_test() {
  let reversed = square.squares_for_display() |> list.reverse
  let last = reversed |> list.first
  let assert Ok(sq) = last
  let assert "h1" = sq.name
}

pub fn squares_for_display_unique_test() {
  let names = square.squares_for_display() |> list.map(fn(s) { s.name })
  let unique = names |> list.unique
  let assert 64 = unique |> list.length
}

pub fn squares_for_display_rank_order_test() {
  let display = square.squares_for_display()
  let first_eight = display |> list.take(8)
  let names = first_eight |> list.map(fn(s) { s.name })
  let assert 8 = list.length(names)
  case names {
    [a, b, _c, _d, _e, _f, _g, h] -> {
      let assert "a8" = a
      let assert "b8" = b
      let assert "h8" = h
    }
    _ -> panic as "Expected 8 names"
  }
}

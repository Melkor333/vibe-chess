import gleam/list
import gleam/string
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

// Square color tests

pub fn a1_is_black_test() {
  let s = square.new(A, R1)
  let assert True = square.is_black(s)
  let assert False = square.is_light(s)
}

pub fn a2_is_light_test() {
  let s = square.new(A, square.R2)
  let assert True = square.is_light(s)
  let assert False = square.is_black(s)
}

pub fn h1_is_light_test() {
  let s = square.new(H, R1)
  let assert True = square.is_light(s)
}

pub fn h8_is_black_test() {
  let s = square.new(H, R8)
  let assert True = square.is_black(s)
}

pub fn e4_is_light_test() {
  let s = square.new(E, R4)
  let assert True = square.is_light(s)
}

pub fn d4_is_black_test() {
  let s = square.new(square.D, R4)
  let assert True = square.is_black(s)
}

pub fn color_32_black_32_light_test() {
  let all = square.all_squares()
  let blacks = list.filter(all, square.is_black)
  let lights = list.filter(all, square.is_light)
  let assert 32 = list.length(blacks)
  let assert 32 = list.length(lights)
}

// Hardness level tests

pub fn level1_square_count_test() {
  let assert 4 = square.squares_for_level(square.Level1) |> list.length
}

pub fn level2_square_count_test() {
  let assert 16 = square.squares_for_level(square.Level2) |> list.length
}

pub fn level3_square_count_test() {
  let assert 36 = square.squares_for_level(square.Level3) |> list.length
}

pub fn level4_square_count_test() {
  let assert 64 = square.squares_for_level(square.Level4) |> list.length
}

pub fn level4_equals_all_squares_test() {
  let level4 =
    square.squares_for_level(square.Level4)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let all =
    square.all_squares()
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let assert True = level4 == all
}

pub fn level1_contains_d4_test() {
  let names =
    square.squares_for_level(square.Level1) |> list.map(fn(s) { s.name })
  let assert True = list.contains(names, "d4")
  let assert True = list.contains(names, "d5")
  let assert True = list.contains(names, "e4")
  let assert True = list.contains(names, "e5")
}

pub fn level1_subset_of_level2_test() {
  let l1 =
    square.squares_for_level(square.Level1)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let l2 =
    square.squares_for_level(square.Level2)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let assert True = list.all(l1, fn(name) { list.contains(l2, name) })
}

pub fn level2_subset_of_level3_test() {
  let l2 =
    square.squares_for_level(square.Level2)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let l3 =
    square.squares_for_level(square.Level3)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let assert True = list.all(l2, fn(name) { list.contains(l3, name) })
}

pub fn level3_subset_of_level4_test() {
  let l3 =
    square.squares_for_level(square.Level3)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let l4 =
    square.squares_for_level(square.Level4)
    |> list.map(fn(s) { s.name })
    |> list.sort(string.compare)
  let assert True = list.all(l3, fn(name) { list.contains(l4, name) })
}

pub fn level_count_test() {
  let assert 4 = square.level_count(square.Level1)
  let assert 16 = square.level_count(square.Level2)
  let assert 36 = square.level_count(square.Level3)
  let assert 64 = square.level_count(square.Level4)
}

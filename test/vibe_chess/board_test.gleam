import gleeunit
import vibe_chess/board

pub fn main() {
  gleeunit.main()
}

pub fn board_has_64_squares_test() {
  let b = board.new()
  let assert 64 = board.count(b)
}

pub fn board_squares_unique_test() {
  let b = board.new()
  let names = board.squares(b) |> list.map(fn(s) { s.name })
  let unique = names |> list.unique
  let assert 64 = unique |> list.length
}

pub fn random_square_valid_test() {
  let b = board.new()
  let sq = board.random_square(b)
  let all_names = board.squares(b) |> list.map(fn(s) { s.name })
  let assert True = list.contains(all_names, sq.name)
}

import gleam/list

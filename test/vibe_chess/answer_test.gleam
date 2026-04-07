import gleam/option.{None, Some}
import gleeunit
import vibe_chess/answer
import vibe_chess/square.{A, C, D, E, H, R1, R3, R4, R5, R8}

pub fn main() {
  gleeunit.main()
}

// Text answer tests (NameSquare mode)

pub fn correct_answer_test() {
  let sq = square.new(E, R4)
  let a = answer.new(1, sq, "e4")
  let assert True = answer.is_correct(a)
}

pub fn wrong_answer_test() {
  let sq = square.new(E, R4)
  let a = answer.new(1, sq, "d4")
  let assert False = answer.is_correct(a)
}

pub fn answer_round_test() {
  let sq = square.new(A, R1)
  let a = answer.new(5, sq, "a1")
  let assert 5 = answer.get_round(a)
}

pub fn answer_highlighted_square_test() {
  let sq = square.new(H, R8)
  let a = answer.new(1, sq, "h8")
  let assert H = answer.get_highlighted_square(a).file
  let assert R8 = answer.get_highlighted_square(a).rank
}

pub fn answer_submitted_name_test() {
  let sq = square.new(C, R3)
  let a = answer.new(1, sq, "c3")
  let assert "c3" = answer.get_submitted_name(a)
}

pub fn text_answer_has_no_submitted_square_test() {
  let sq = square.new(E, R4)
  let a = answer.new(1, sq, "e4")
  let assert None = answer.get_submitted_square(a)
}

pub fn case_sensitive_answer_test() {
  let sq = square.new(E, R4)
  let a = answer.new(1, sq, "E4")
  let assert False = answer.is_correct(a)
}

pub fn empty_answer_test() {
  let sq = square.new(D, R5)
  let a = answer.new(1, sq, "")
  let assert False = answer.is_correct(a)
}

// Click answer tests (FindSquare mode)

pub fn correct_click_answer_test() {
  let asked = square.new(E, R4)
  let clicked = square.new(E, R4)
  let a = answer.new_from_click(1, asked, clicked)
  let assert True = answer.is_correct(a)
}

pub fn wrong_click_answer_test() {
  let asked = square.new(E, R4)
  let clicked = square.new(D, R4)
  let a = answer.new_from_click(1, asked, clicked)
  let assert False = answer.is_correct(a)
}

pub fn click_answer_round_test() {
  let asked = square.new(A, R1)
  let clicked = square.new(A, R1)
  let a = answer.new_from_click(3, asked, clicked)
  let assert 3 = answer.get_round(a)
}

pub fn click_answer_highlighted_square_test() {
  let asked = square.new(H, R8)
  let clicked = square.new(H, R8)
  let a = answer.new_from_click(1, asked, clicked)
  let assert H = answer.get_highlighted_square(a).file
  let assert R8 = answer.get_highlighted_square(a).rank
}

pub fn click_answer_submitted_name_is_clicked_square_test() {
  let asked = square.new(E, R4)
  let clicked = square.new(D, R4)
  let a = answer.new_from_click(1, asked, clicked)
  let assert "d4" = answer.get_submitted_name(a)
}

pub fn click_answer_has_submitted_square_test() {
  let asked = square.new(E, R4)
  let clicked = square.new(D, R4)
  let a = answer.new_from_click(1, asked, clicked)
  let assert Some(sq) = answer.get_submitted_square(a)
  let assert D = sq.file
  let assert R4 = sq.rank
}

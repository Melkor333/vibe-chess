import gleeunit
import vibe_chess/answer
import vibe_chess/square.{A, C, D, E, H, R1, R3, R4, R5, R8}

pub fn main() {
  gleeunit.main()
}

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

import gleam/list
import gleam/option.{None, Some}
import gleeunit
import vibe_chess/game.{Active, Finished, Idle}
import vibe_chess/square

pub fn main() {
  gleeunit.main()
}

pub fn new_game_is_idle_test() {
  let g = game.new()
  let assert Idle = game.get_status(g)
}

pub fn new_game_has_zero_score_test() {
  let g = game.new()
  let assert 0 = game.get_score(g)
}

pub fn new_game_has_zero_attempts_test() {
  let g = game.new()
  let assert 0 = game.get_attempts(g)
}

pub fn new_game_no_current_square_test() {
  let g = game.new()
  let assert None = game.get_current_square(g)
}

pub fn new_game_accuracy_zero_test() {
  let g = game.new()
  let assert 0.0 = game.accuracy(g)
}

pub fn new_game_default_mode_is_name_square_test() {
  let g = game.new()
  let assert game.NameSquare = game.get_mode(g)
}

pub fn new_game_with_mode_find_square_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert game.FindSquare = game.get_mode(g)
}

pub fn new_game_with_mode_name_square_test() {
  let g = game.new_with_mode(game.NameSquare)
  let assert game.NameSquare = game.get_mode(g)
}

pub fn start_game_transitions_to_active_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Active = game.get_status(started)
}

pub fn start_game_sets_score_zero_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert 0 = game.get_score(started)
}

pub fn start_game_sets_attempts_zero_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert 0 = game.get_attempts(started)
}

pub fn start_game_highlights_square_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(_) = game.get_current_square(started)
}

pub fn start_active_game_fails_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Error(_) = game.start(started)
}

pub fn start_finished_game_fails_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let assert Error(_) = game.start(ended)
}

pub fn highlight_next_in_active_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(highlighted) = game.highlight_next(started)
  let assert Active = game.get_status(highlighted)
  let assert Some(_) = game.get_current_square(highlighted)
}

pub fn highlight_next_in_idle_fails_test() {
  let g = game.new()
  let assert Error(_) = game.highlight_next(g)
}

pub fn submit_correct_answer_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(#(updated, True)) = game.submit_answer(started, sq.name)
  let assert 1 = game.get_score(updated)
  let assert 1 = game.get_attempts(updated)
}

pub fn submit_wrong_answer_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(#(updated, False)) = game.submit_answer(started, "zz")
  let assert 0 = game.get_score(updated)
  let assert 1 = game.get_attempts(updated)
}

pub fn submit_answer_in_idle_fails_test() {
  let g = game.new()
  let assert Error(_) = game.submit_answer(g, "e4")
}

pub fn submit_answer_in_finished_fails_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let assert Error(_) = game.submit_answer(ended, "e4")
}

pub fn submit_answer_in_find_square_mode_fails_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = game.start(g)
  let assert Error(_) = game.submit_answer(started, "e4")
}

pub fn submit_answer_highlights_next_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(sq1) = game.get_current_square(started)
  let assert Ok(#(updated, _)) = game.submit_answer(started, sq1.name)
  let assert Some(_) = game.get_current_square(updated)
}

// FindSquare mode tests

pub fn submit_correct_square_click_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(#(updated, True)) = game.submit_square_click(started, sq)
  let assert 1 = game.get_score(updated)
  let assert 1 = game.get_attempts(updated)
}

pub fn submit_wrong_square_click_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = game.start(g)
  let wrong_sq = square.new(square.H, square.R8)
  let assert Ok(#(updated, False)) = game.submit_square_click(started, wrong_sq)
  let assert 0 = game.get_score(updated)
  let assert 1 = game.get_attempts(updated)
}

pub fn submit_square_click_in_idle_fails_test() {
  let g = game.new_with_mode(game.FindSquare)
  let sq = square.new(square.A, square.R1)
  let assert Error(_) = game.submit_square_click(g, sq)
}

pub fn submit_square_click_in_finished_fails_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let sq = square.new(square.A, square.R1)
  let assert Error(_) = game.submit_square_click(ended, sq)
}

pub fn submit_square_click_in_name_square_mode_fails_test() {
  let g = game.new_with_mode(game.NameSquare)
  let assert Ok(started) = game.start(g)
  let sq = square.new(square.A, square.R1)
  let assert Error(_) = game.submit_square_click(started, sq)
}

pub fn submit_square_click_highlights_next_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(#(updated, _)) = game.submit_square_click(started, sq)
  let assert Some(_) = game.get_current_square(updated)
}

// End game tests

pub fn end_game_transitions_to_finished_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let assert Finished = game.get_status(ended)
}

pub fn end_game_clears_current_square_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let assert None = game.get_current_square(ended)
}

pub fn end_idle_game_fails_test() {
  let g = game.new()
  let assert Error(_) = game.end(g)
}

pub fn end_finished_game_fails_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let assert Error(_) = game.end(ended)
}

pub fn accuracy_with_attempts_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(#(g1, _)) = game.submit_answer(started, sq.name)
  let assert Ok(#(g2, _)) = game.submit_answer(g1, "zz")
  let assert 0.5 = game.accuracy(g2)
}

pub fn full_game_scenario_test() {
  let g = game.new()
  let assert Ok(g1) = game.start(g)
  let assert Active = game.get_status(g1)

  let assert Ok(#(g2, _)) = game.submit_answer(g1, "wrong")
  let assert 0 = game.get_score(g2)
  let assert 1 = game.get_attempts(g2)

  let assert Some(sq) = game.get_current_square(g2)
  let assert Ok(#(g3, _)) = game.submit_answer(g2, sq.name)
  let assert 1 = game.get_score(g3)
  let assert 2 = game.get_attempts(g3)

  let assert Ok(g4) = game.end(g3)
  let assert Finished = game.get_status(g4)
  let assert None = game.get_current_square(g4)
  let assert 0.5 = game.accuracy(g4)
}

pub fn full_find_square_game_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(g1) = game.start(g)
  let assert Active = game.get_status(g1)
  let assert game.FindSquare = game.get_mode(g1)

  let assert Some(sq) = game.get_current_square(g1)
  let assert Ok(#(g2, True)) = game.submit_square_click(g1, sq)
  let assert 1 = game.get_score(g2)

  let wrong_sq = square.new(square.A, square.R1)
  let assert Ok(#(g3, False)) = game.submit_square_click(g2, wrong_sq)
  let assert 1 = game.get_score(g3)
  let assert 2 = game.get_attempts(g3)

  let assert Ok(g4) = game.end(g3)
  let assert Finished = game.get_status(g4)
  let assert 0.5 = game.accuracy(g4)
}

pub fn answers_history_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(#(updated, _)) = game.submit_answer(started, sq.name)
  let assert 1 = list.length(game.get_answers(updated))
}

// ColorSquare mode tests

pub fn new_game_with_mode_color_square_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert game.ColorSquare = game.get_mode(g)
}

pub fn submit_correct_color_answer_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let is_black = square.is_black(sq)
  let assert Ok(#(updated, True)) = game.submit_color_answer(started, is_black)
  let assert 1 = game.get_score(updated)
  let assert 1 = game.get_attempts(updated)
}

pub fn submit_wrong_color_answer_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let is_black = square.is_black(sq)
  let assert Ok(#(updated, False)) =
    game.submit_color_answer(started, !is_black)
  let assert 0 = game.get_score(updated)
  let assert 1 = game.get_attempts(updated)
}

pub fn submit_color_in_idle_fails_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Error(_) = game.submit_color_answer(g, True)
}

pub fn submit_color_in_finished_fails_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Ok(started) = game.start(g)
  let assert Ok(ended) = game.end(started)
  let assert Error(_) = game.submit_color_answer(ended, True)
}

pub fn submit_color_in_name_square_mode_fails_test() {
  let g = game.new_with_mode(game.NameSquare)
  let assert Ok(started) = game.start(g)
  let assert Error(_) = game.submit_color_answer(started, True)
}

pub fn submit_color_in_find_square_mode_fails_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = game.start(g)
  let assert Error(_) = game.submit_color_answer(started, True)
}

pub fn submit_color_does_not_advance_square_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let is_black = square.is_black(sq)
  let assert Ok(#(updated, _)) = game.submit_color_answer(started, is_black)
  // Square should still be the same (no auto-advance)
  let assert Some(sq2) = game.get_current_square(updated)
  let assert True = sq.name == sq2.name
}

pub fn full_color_square_game_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Ok(g1) = game.start(g)
  let assert Active = game.get_status(g1)
  let assert game.ColorSquare = game.get_mode(g1)

  let assert Some(sq) = game.get_current_square(g1)
  let is_black = square.is_black(sq)
  let assert Ok(#(g2, True)) = game.submit_color_answer(g1, is_black)
  let assert 1 = game.get_score(g2)

  // Manual advance
  let assert Ok(g3) = game.highlight_next(g2)
  let assert Some(sq2) = game.get_current_square(g3)
  let is_black2 = square.is_black(sq2)
  // Submit wrong answer
  let assert Ok(#(g4, False)) = game.submit_color_answer(g3, !is_black2)
  let assert 1 = game.get_score(g4)
  let assert 2 = game.get_attempts(g4)

  let assert Ok(g5) = game.end(g4)
  let assert Finished = game.get_status(g5)
  let assert 0.5 = game.accuracy(g5)
}

// Hardness level tests

pub fn default_hardness_is_level1_test() {
  let g = game.new()
  let assert square.Level1 = game.get_hardness(g)
}

pub fn new_with_mode_and_hardness_test() {
  let g = game.new_with_mode_and_hardness(game.FindSquare, square.Level3)
  let assert game.FindSquare = game.get_mode(g)
  let assert square.Level3 = game.get_hardness(g)
}

pub fn start_preserves_hardness_test() {
  let g = game.new_with_mode_and_hardness(game.NameSquare, square.Level2)
  let assert Ok(started) = game.start(g)
  let assert square.Level2 = game.get_hardness(started)
}

pub fn level1_game_square_in_level1_test() {
  let g = game.new_with_mode_and_hardness(game.NameSquare, square.Level1)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let level1_names =
    square.squares_for_level(square.Level1) |> list.map(fn(s) { s.name })
  let assert True = list.contains(level1_names, sq.name)
}

pub fn level4_game_square_in_all_test() {
  let g = game.new_with_mode_and_hardness(game.NameSquare, square.Level4)
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let all_names = square.all_squares() |> list.map(fn(s) { s.name })
  let assert True = list.contains(all_names, sq.name)
}

import gleam/list
import gleam/option.{None, Some}
import gleeunit
import vibe_chess/game.{Active, Finished, Idle}

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

pub fn submit_answer_highlights_next_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(sq1) = game.get_current_square(started)
  let assert Ok(#(updated, _)) = game.submit_answer(started, sq1.name)
  let assert Some(_) = game.get_current_square(updated)
}

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

pub fn answers_history_test() {
  let g = game.new()
  let assert Ok(started) = game.start(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(#(updated, _)) = game.submit_answer(started, sq.name)
  let assert 1 = list.length(game.get_answers(updated))
}

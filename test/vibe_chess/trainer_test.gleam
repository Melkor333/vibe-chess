import gleam/option.{None, Some}
import gleeunit
import vibe_chess/game
import vibe_chess/square
import vibe_chess/trainer

pub fn main() {
  gleeunit.main()
}

// StartGame rule tests

pub fn start_game_success_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert game.Active = game.get_status(started)
  let assert 0 = game.get_score(started)
  let assert 0 = game.get_attempts(started)
  let assert Some(_) = game.get_current_square(started)
}

pub fn start_game_requires_idle_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Error(_) = trainer.start_game(started)
}

pub fn start_game_finished_fails_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(ended) = trainer.end_game(started)
  let assert Error(_) = trainer.start_game(ended)
}

pub fn start_game_preserves_mode_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = trainer.start_game(g)
  let assert game.FindSquare = trainer.get_game_mode(started)
}

// HighlightNextSquare rule tests

pub fn highlight_next_square_success_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(highlighted) = trainer.highlight_next_square(started)
  let assert Some(_) = game.get_current_square(highlighted)
}

pub fn highlight_next_square_requires_active_test() {
  let g = game.new()
  let assert Error(_) = trainer.highlight_next_square(g)
}

// SubmitAnswer rule tests (NameSquare mode)

pub fn submit_correct_answer_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(result) = trainer.submit_answer(started, sq.name)
  let assert True = result.correct
  let assert 1 = game.get_score(result.game)
  let assert 1 = game.get_attempts(result.game)
}

pub fn submit_wrong_answer_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(result) = trainer.submit_answer(started, "zz")
  let assert False = result.correct
  let assert 0 = game.get_score(result.game)
  let assert 1 = game.get_attempts(result.game)
}

pub fn submit_answer_requires_active_test() {
  let g = game.new()
  let assert Error(_) = trainer.submit_answer(g, "e4")
}

pub fn submit_answer_finished_fails_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(ended) = trainer.end_game(started)
  let assert Error(_) = trainer.submit_answer(ended, "e4")
}

// SubmitSquareClick rule tests (FindSquare mode)

pub fn submit_square_click_correct_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = trainer.start_game(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(result) = trainer.submit_square_click(started, sq)
  let assert True = result.correct
  let assert 1 = game.get_score(result.game)
  let assert 1 = game.get_attempts(result.game)
}

pub fn submit_square_click_wrong_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = trainer.start_game(g)
  let wrong = square.new(square.H, square.R8)
  let assert Ok(result) = trainer.submit_square_click(started, wrong)
  let assert False = result.correct
  let assert 0 = game.get_score(result.game)
  let assert 1 = game.get_attempts(result.game)
}

pub fn submit_square_click_requires_active_test() {
  let g = game.new_with_mode(game.FindSquare)
  let sq = square.new(square.A, square.R1)
  let assert Error(_) = trainer.submit_square_click(g, sq)
}

pub fn submit_square_click_name_square_mode_fails_test() {
  let g = game.new_with_mode(game.NameSquare)
  let assert Ok(started) = trainer.start_game(g)
  let sq = square.new(square.A, square.R1)
  let assert Error(_) = trainer.submit_square_click(started, sq)
}

// ContinueAfterAnswer rule tests

pub fn continue_after_answer_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(result) = trainer.submit_answer(started, "wrong")
  let assert Ok(cont) = trainer.continue_after_answer(result.game)
  let assert game.Active = game.get_status(cont)
}

pub fn continue_after_answer_requires_active_test() {
  let g = game.new()
  let assert Error(_) = trainer.continue_after_answer(g)
}

// EndGame rule tests

pub fn end_game_success_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(ended) = trainer.end_game(started)
  let assert game.Finished = game.get_status(ended)
  let assert None = game.get_current_square(ended)
}

pub fn end_game_requires_active_test() {
  let g = game.new()
  let assert Error(_) = trainer.end_game(g)
}

pub fn end_game_finished_fails_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(ended) = trainer.end_game(started)
  let assert Error(_) = trainer.end_game(ended)
}

// Helper function tests

pub fn get_highlighted_square_name_active_test() {
  // NameSquare mode: returns None (name hidden per spec)
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert None = trainer.get_highlighted_square_name(started)
}

pub fn get_highlighted_square_name_find_square_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert Ok(started) = trainer.start_game(g)
  let assert Some(name) = trainer.get_highlighted_square_name(started)
  let assert True = string.length(name) == 2
}

pub fn get_highlighted_square_name_color_square_test() {
  let g = game.new_with_mode(game.ColorSquare)
  let assert Ok(started) = trainer.start_game(g)
  let assert Some(name) = trainer.get_highlighted_square_name(started)
  let assert True = string.length(name) == 2
}

pub fn get_highlighted_square_name_idle_test() {
  let g = game.new()
  let assert None = trainer.get_highlighted_square_name(g)
}

pub fn get_highlighted_square_name_finished_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Ok(ended) = trainer.end_game(started)
  let assert None = trainer.get_highlighted_square_name(ended)
}

pub fn get_game_mode_name_square_test() {
  let g = game.new_with_mode(game.NameSquare)
  let assert game.NameSquare = trainer.get_game_mode(g)
}

pub fn get_game_mode_find_square_test() {
  let g = game.new_with_mode(game.FindSquare)
  let assert game.FindSquare = trainer.get_game_mode(g)
}

pub fn get_accuracy_finished_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert Some(sq) = game.get_current_square(started)
  let assert Ok(result) = trainer.submit_answer(started, sq.name)
  let assert Ok(ended) = trainer.end_game(result.game)
  let assert Some(acc) = trainer.get_accuracy(ended)
  let assert 1.0 = acc
}

pub fn get_accuracy_active_test() {
  let g = game.new()
  let assert Ok(started) = trainer.start_game(g)
  let assert None = trainer.get_accuracy(started)
}

pub fn get_accuracy_idle_test() {
  let g = game.new()
  let assert None = trainer.get_accuracy(g)
}

// Hardness level tests

pub fn start_game_preserves_hardness_test() {
  let g = game.new_with_mode_and_hardness(game.NameSquare, square.Level3)
  let assert Ok(started) = trainer.start_game(g)
  let assert square.Level3 = trainer.get_hardness_level(started)
}

pub fn get_hardness_level_default_test() {
  let g = game.new()
  let assert square.Level1 = trainer.get_hardness_level(g)
}

import gleam/string

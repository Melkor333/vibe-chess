//// Tests for the spaced repetition algorithm.

import gleam/list
import gleam/option
import gleeunit
import vibe_chess/sr
import vibe_chess/types

pub fn main() {
  gleeunit.main()
}

// ── select_due tests ────────────────────────────────────────

pub fn select_due_prioritizes_most_overdue_test() {
  let now = 1000.0
  let card_a = types.Card(..default_card(), id: "a", due_at: 800.0)
  let card_b = types.Card(..default_card(), id: "b", due_at: 500.0)
  let card_c = types.Card(..default_card(), id: "c", due_at: 900.0)

  let result = sr.select_due([card_a, card_b, card_c], 2, now)

  let assert [first, second] = result
  let assert "b" = first.id
  let assert "a" = second.id
}

pub fn select_due_respects_limit_test() {
  let now = 1000.0
  let cards = [
    types.Card(..default_card(), id: "1", due_at: 100.0),
    types.Card(..default_card(), id: "2", due_at: 200.0),
    types.Card(..default_card(), id: "3", due_at: 300.0),
  ]

  let result = sr.select_due(cards, 1, now)
  let assert [c] = result
  let assert "1" = c.id
}

pub fn select_due_empty_list_test() {
  let result = sr.select_due([], 5, 1000.0)
  let assert [] = result
}

// ── select_new tests ────────────────────────────────────────

pub fn select_new_picks_new_cards_test() {
  let new_c = types.Card(..default_card(), id: "new1", attempt_count: 0)
  let old_c = types.Card(..default_card(), id: "old1", attempt_count: 3)

  let result = sr.select_new([new_c, old_c], 5)
  let assert [c] = result
  let assert "new1" = c.id
}

pub fn select_new_respects_limit_test() {
  let cards = [
    types.Card(..default_card(), id: "1", attempt_count: 0),
    types.Card(..default_card(), id: "2", attempt_count: 0),
    types.Card(..default_card(), id: "3", attempt_count: 0),
  ]

  let result = sr.select_new(cards, 2)
  let assert 2 = list.length(result)
}

// ── next_interval tests ─────────────────────────────────────

pub fn next_interval_incorrect_resets_to_minimum_test() {
  let config = types.default_config()
  let c =
    types.Card(..default_card(), id: "t", interval: 100_000.0, ease_factor: 2.5)

  let result = sr.next_interval(c, False, 5000, config)
  let expected = config.minimum_interval
  let assert True = result == expected
}

pub fn next_interval_correct_multiplies_by_ease_test() {
  let config = types.default_config()
  // Use interval above minimum_interval (600_000ms) so it doesn't get clamped
  let c =
    types.Card(
      ..default_card(),
      id: "t",
      interval: 1_000_000.0,
      ease_factor: 2.0,
    )

  let result = sr.next_interval(c, True, 3000, config)
  // 1_000_000 * 2.0 * 1.0 (fast) = 2_000_000
  let assert 2_000_000.0 = result
}

pub fn next_interval_slow_correct_shortens_interval_test() {
  let config = types.default_config()
  // Use interval above minimum_interval so it doesn't get clamped
  let c =
    types.Card(
      ..default_card(),
      id: "t",
      interval: 1_000_000.0,
      ease_factor: 2.0,
    )

  let result = sr.next_interval(c, True, 15_000, config)
  // 1_000_000 * 2.0 * 0.8 (slow) = 1_600_000
  let assert 1_600_000.0 = result
}

pub fn next_interval_clamped_to_minimum_test() {
  let config = types.default_config()
  let c =
    types.Card(..default_card(), id: "t", interval: 100.0, ease_factor: 1.5)

  let result = sr.next_interval(c, False, 5000, config)
  let min_val = config.minimum_interval
  let assert True = result >=. min_val
}

pub fn next_interval_clamped_to_maximum_test() {
  let config = types.default_config()
  let c =
    types.Card(
      ..default_card(),
      id: "t",
      interval: 1_000_000_000.0,
      ease_factor: 3.0,
    )

  let result = sr.next_interval(c, True, 1000, config)
  let max_val = config.maximum_interval
  let assert True = result <=. max_val
}

// ── next_ease_factor tests ──────────────────────────────────

pub fn next_ease_factor_increases_on_correct_test() {
  let config = types.default_config()
  let c = types.Card(..default_card(), id: "t", ease_factor: 2.5)

  let result = sr.next_ease_factor(c, True, config)
  let assert 2.6 = result
}

pub fn next_ease_factor_decreases_on_incorrect_test() {
  let config = types.default_config()
  let c = types.Card(..default_card(), id: "t", ease_factor: 2.5)

  let result = sr.next_ease_factor(c, False, config)
  let assert 2.3 = result
}

pub fn next_ease_factor_capped_at_3_test() {
  let config = types.default_config()
  let c = types.Card(..default_card(), id: "t", ease_factor: 2.95)

  let result = sr.next_ease_factor(c, True, config)
  let assert 3.0 = result
}

pub fn next_ease_factor_minimum_1_3_test() {
  let config = types.default_config()
  let c = types.Card(..default_card(), id: "t", ease_factor: 1.4)

  let result = sr.next_ease_factor(c, False, config)
  let assert 1.3 = result
}

// ── Helpers ─────────────────────────────────────────────────

fn default_card() -> types.Card {
  types.Card(
    id: "default",
    exercise_kind: types.NameTheSquare,
    difficulty: default_diff(),
    due_at: 0.0,
    interval: 1000.0,
    ease_factor: 2.5,
    attempt_count: 0,
  )
}

fn default_diff() -> types.CardDifficulty {
  types.CardDifficulty(
    orientation: types.WhiteOrientation,
    piece_type: option.None,
    zone_filter: types.FilterAny,
  )
}

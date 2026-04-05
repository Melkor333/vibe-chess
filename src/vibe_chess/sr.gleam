//// Spaced repetition algorithm (SM-2 derivative).
//// Implements the deferred specs: SR.select_due, SR.select_new,
//// SR.next_interval, SR.next_ease_factor.

import gleam/float
import gleam/list
import vibe_chess/types.{type Card, type Config}

/// Select due cards prioritized by most overdue first, up to limit.
pub fn select_due(due_cards: List(Card), limit: Int, now: Float) -> List(Card) {
  due_cards
  |> list.sort(fn(a, b) {
    // More overdue = smaller due_at relative to now = larger overdue amount
    let overdue_a = now -. a.due_at
    let overdue_b = now -. b.due_at
    float.compare(overdue_b, overdue_a)
  })
  |> list.take(limit)
}

/// Select new cards (attempt_count = 0), up to limit.
pub fn select_new(cards: List(Card), limit: Int) -> List(Card) {
  cards
  |> list.filter(fn(c) { c.attempt_count == 0 })
  |> list.take(limit)
}

/// Calculate the next interval after an attempt.
/// Slow-but-correct answers shorten the interval relative to fast-and-correct.
pub fn next_interval(
  card: Card,
  is_correct: Bool,
  elapsed_ms: Int,
  config: Config,
) -> Float {
  case is_correct {
    False -> {
      // On incorrect: reset to minimum interval
      config.minimum_interval
    }
    True -> {
      // Base new interval = current interval * ease_factor
      let base = card.interval *. card.ease_factor

      // Apply speed penalty: if response time > 10 seconds, shorten interval
      // This implements "slow-but-correct answers should shorten the next interval"
      let speed_factor = case elapsed_ms > 10_000 {
        True -> 0.8
        False ->
          case elapsed_ms > 5000 {
            True -> 0.9
            False -> 1.0
          }
      }

      let adjusted = base *. speed_factor

      // Clamp to bounds
      adjusted
      |> float.max(config.minimum_interval)
      |> float.min(config.maximum_interval)
    }
  }
}

/// Calculate the next ease factor after an attempt.
pub fn next_ease_factor(card: Card, is_correct: Bool, config: Config) -> Float {
  case is_correct {
    True -> {
      let new_ef = card.ease_factor +. config.ease_adjustment_correct
      float.min(new_ef, 3.0)
    }
    False -> {
      let new_ef = card.ease_factor -. config.ease_adjustment_incorrect
      float.max(new_ef, 1.3)
    }
  }
}

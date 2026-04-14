//// Delay effect for dispatching messages after a timeout.

import lustre/effect

@external(javascript, "./delay_ffi.mjs", "delay")
fn delay_impl(_ms: Int, _msg: msg) -> effect.Effect(msg)

/// Create an effect that dispatches `msg` after `ms` milliseconds.
pub fn after(ms: Int, msg: msg) -> effect.Effect(msg) {
  delay_impl(ms, msg)
}

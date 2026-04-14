import lustre/effect

@external(javascript, "./delay_ffi.mjs", "delay")
fn delay_impl(_ms: Int, _msg: msg, _dispatch: fn(msg) -> Nil) -> Nil

pub fn after(ms: Int, msg: msg) -> effect.Effect(msg) {
  effect.from(fn(dispatch) { delay_impl(ms, msg, dispatch) })
}

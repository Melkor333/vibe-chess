import * as $effect from "../../lustre/lustre/effect.mjs";
import { delay as delay_impl } from "./delay_ffi.mjs";

/**
 * Create an Effect that dispatches `msg` after `ms` milliseconds.
 */
export function after(ms, msg) {
  return $effect.from((dispatch) => { return delay_impl(ms, msg, dispatch); });
}

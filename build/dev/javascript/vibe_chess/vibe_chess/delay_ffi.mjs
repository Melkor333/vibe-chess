export function delay(ms, msg, dispatch) {
  setTimeout(() => dispatch(msg), ms);
}

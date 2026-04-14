export function delay(ms, msg) {
  return (dispatch) => {
    setTimeout(() => dispatch(msg), ms);
  };
}

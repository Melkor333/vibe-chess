// FFI for browser localStorage and time/random utilities

export function get_local_storage(key) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return { type: "Error", 0: undefined };
    return { type: "Ok", 0: value };
  } catch (e) {
    return { type: "Error", 0: undefined };
  }
}

export function set_local_storage(key, value) {
  try {
    localStorage.setItem(key, value);
    return { type: "Ok", 0: undefined };
  } catch (e) {
    return { type: "Error", 0: undefined };
  }
}

export function now_ms() {
  return Date.now();
}

export function random_int(max) {
  return Math.floor(Math.random() * max);
}

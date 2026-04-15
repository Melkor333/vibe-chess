import * as $bool from "../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $uri from "../gleam_stdlib/gleam/uri.mjs";
import { Uri } from "../gleam_stdlib/gleam/uri.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $query from "../lustre/lustre/dev/query.mjs";
import * as $lustre_simulate from "../lustre/lustre/dev/simulate.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $vattr from "../lustre/lustre/vdom/vattr.mjs";
import { Attribute } from "../lustre/lustre/vdom/vattr.mjs";
import * as $vnode from "../lustre/lustre/vdom/vnode.mjs";
import { Element } from "../lustre/lustre/vdom/vnode.mjs";
import { Ok, Error, CustomType as $CustomType } from "./gleam.mjs";
import {
  do_initial_uri as initial_uri,
  do_init,
  do_init as do_advanced,
  do_push,
  do_replace,
  do_load,
  do_forward,
  do_back,
} from "./modem.ffi.mjs";

export { initial_uri };

export class Options extends $CustomType {
  constructor(handle_internal_links, handle_external_links) {
    super();
    this.handle_internal_links = handle_internal_links;
    this.handle_external_links = handle_external_links;
  }
}
export const Options$Options = (handle_internal_links, handle_external_links) =>
  new Options(handle_internal_links, handle_external_links);
export const Options$isOptions = (value) => value instanceof Options;
export const Options$Options$handle_internal_links = (value) =>
  value.handle_internal_links;
export const Options$Options$0 = (value) => value.handle_internal_links;
export const Options$Options$handle_external_links = (value) =>
  value.handle_external_links;
export const Options$Options$1 = (value) => value.handle_external_links;

const relative = /* @__PURE__ */ new Uri(
  /* @__PURE__ */ new None(),
  /* @__PURE__ */ new None(),
  /* @__PURE__ */ new None(),
  /* @__PURE__ */ new None(),
  "",
  /* @__PURE__ */ new None(),
  /* @__PURE__ */ new None(),
);

/**
 * Initialise a simple modem that intercepts internal links and sends them to
 * your update function through the provided handler.
 *
 * > **Note**: internal links are any links on the same origin as your app. If
 * > you need to navigate users somewhere else on the same origin you can use
 * > the [`load`](#load) effect.
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function init(handler) {
  return $effect.from(
    (dispatch) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => {
          return do_init(
            (uri) => {
              let _pipe = uri;
              let _pipe$1 = handler(_pipe);
              return dispatch(_pipe$1);
            },
          );
        },
      );
    },
  );
}

/**
 * Initialise an advanced modem that lets you configure what types of links to
 * intercept. Take a look at the [`Options`](#options) type for info on what
 * can be configured.
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function advanced(options, handler) {
  return $effect.from(
    (dispatch) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => {
          return ((_capture) => { return do_advanced(_capture, options); })(
            (uri) => {
              let _pipe = uri;
              let _pipe$1 = handler(_pipe);
              return dispatch(_pipe$1);
            },
          );
        },
      );
    },
  );
}

/**
 * Load a new uri. This will always trigger a full page reload even if the uri
 * is relative or the same as the current page.
 *
 * **Note**: if you load a new uri while the user has navigated using the back
 * or forward buttons, you will clear any forward history in the stack!
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function load(uri) {
  return $effect.from(
    (_) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => { return do_load(uri); },
      );
    },
  );
}

/**
 * The browser maintains a history stack of all the url's the user has visited.
 * This function lets you move forward the given number of steps in that stack.
 * If you reach the end of the stack, further attempts to go forward will do
 * nothing (unfortunately time travel is not quite possible yet).
 *
 * **Note**: you can go _too far forward_ and end up navigating the user off your
 * app if you're not careful.
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function forward(steps) {
  return $effect.from(
    (_) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => { return do_forward(steps); },
      );
    },
  );
}

/**
 * The browser maintains a history stack of all the url's the user has visited.
 * This function lets you move back the given number of steps in that stack.
 * If you reach the beginning of the stack, further attempts to go back will do
 * nothing (unfortunately time travel is not quite possible yet).
 *
 * **Note**: if you navigate back and then [`push`](#push) a new url, you will
 * clear the forward history of the stack.
 *
 * **Note**: you can go _too far back_ and end up navigating the user off your
 * app if you're not careful.
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function back(steps) {
  return $effect.from(
    (_) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => { return do_back(steps); },
      );
    },
  );
}

/**
 * Simulate a click on a link in the browser that would trigger a navigation.
 * This will dispatch a message to the simulated application if the link's `href`
 * is valid and would cause an internal navigation.
 *
 * The base URL is necessary to resolve relative links. It should be a full
 * complete URL, typically the one you would use for the live version of your app.
 * For example:
 *
 * - `https://lustre.build`
 *
 * - `http://localhost:1234`
 *
 * - `https://gleam.run/news`
 *
 * Modem can simulate links that are relative to that base URL such as `./wibble`,
 * absolute paths like `/wobble`, or full URLs **as long as their origin matches
 * the base URL**.
 *
 * External links will log a problem in the simulation's history. Links with an
 * empty `href` attribute will be ignored.
 */
export function simulate(simulation, query, route, handler) {
  let result = $result.try$(
    $result.replace_error(
      $uri.parse(route),
      $lustre_simulate.problem(
        simulation,
        "ModemInvalidBaseURL",
        ("`" + route) + "` is not a valid base URL",
      ),
    ),
    (base) => {
      return $result.try$(
        $result.replace_error(
          $uri.origin(base),
          $lustre_simulate.problem(
            simulation,
            "ModemInvalidBaseURL",
            ("`" + route) + "` is not a valid base URL",
          ),
        ),
        (origin) => {
          return $result.try$(
            $result.replace_error(
              $query.find($lustre_simulate.view(simulation), query),
              $lustre_simulate.problem(
                simulation,
                "EventTargetNotFound",
                "No element matching " + $query.to_readable_string(query),
              ),
            ),
            (target) => {
              return $result.try$(
                (() => {
                  if (target instanceof Element) {
                    let $ = target.tag;
                    if ($ === "a") {
                      let attributes = target.attributes;
                      return new Ok(attributes);
                    } else {
                      return new Error(
                        $lustre_simulate.problem(
                          simulation,
                          "ModemInvalidTarget",
                          "Target must be an <a> tag",
                        ),
                      );
                    }
                  } else {
                    return new Error(
                      $lustre_simulate.problem(
                        simulation,
                        "ModemInvalidTarget",
                        "Target must be an <a> tag",
                      ),
                    );
                  }
                })(),
                (attributes) => {
                  return $result.try$(
                    $result.replace_error(
                      $list.find_map(
                        attributes,
                        (attribute) => {
                          if (attribute instanceof Attribute) {
                            let $ = attribute.name;
                            if ($ === "href") {
                              let value = attribute.value;
                              return new Ok(value);
                            } else {
                              return new Error(undefined);
                            }
                          } else {
                            return new Error(undefined);
                          }
                        },
                      ),
                      $lustre_simulate.problem(
                        simulation,
                        "ModemMissingHref",
                        "Target must have an `href` attribute",
                      ),
                    ),
                    (href) => {
                      return $result.try$(
                        $result.replace_error(
                          $uri.parse(href),
                          $lustre_simulate.problem(
                            simulation,
                            "ModemInvalidHref",
                            ("`" + href) + "` is not a valid URL",
                          ),
                        ),
                        (relative) => {
                          return $result.try$(
                            (() => {
                              let $ = $uri.origin(relative);
                              if ($ instanceof Ok) {
                                let relative_origin = $[0];
                                if (origin !== relative_origin) {
                                  return new Error(
                                    $lustre_simulate.problem(
                                      simulation,
                                      "ModemExternalUrl",
                                      ("`" + href) + "` is an external URL and cannot be simulated",
                                    ),
                                  );
                                } else {
                                  return new Ok(undefined);
                                }
                              } else {
                                return new Ok(undefined);
                              }
                            })(),
                            (_) => {
                              return $result.try$(
                                $result.replace_error(
                                  $uri.merge(base, relative),
                                  $lustre_simulate.problem(
                                    simulation,
                                    "ModemInvalidBaseURL",
                                    ("`" + route) + "` is not a valid base URL",
                                  ),
                                ),
                                (resolved) => {
                                  return new Ok(
                                    $lustre_simulate.message(
                                      simulation,
                                      handler(resolved),
                                    ),
                                  );
                                },
                              );
                            },
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
  if (result instanceof Ok) {
    let simulation$1 = result[0];
    return simulation$1;
  } else {
    let problem = result[0];
    return problem;
  }
}

function non_empty(string) {
  if (string === "") {
    return new None();
  } else {
    return new Some(string);
  }
}

/**
 * Push a new relative route onto the browser's history stack. This will not
 * trigger a full page reload.
 *
 * **Note**: if you push a new uri while the user has navigated using the back
 * or forward buttons, you will clear any forward history in the stack!
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function push(path, query, fragment) {
  return $effect.from(
    (_) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => {
          return do_push(
            new Uri(
              relative.scheme,
              relative.userinfo,
              relative.host,
              relative.port,
              path,
              $option.then$(query, non_empty),
              $option.then$(fragment, non_empty),
            ),
          );
        },
      );
    },
  );
}

/**
 * Replace the current uri in the browser's history stack with a new relative
 * route. This will not trigger a full page reload.
 *
 * > **Note**: this effect is only meaningful in the browser. When executed in
 * > a backend JavaScript environment or in Erlang this effect will always be
 * > equivalent to `effect.none()`
 */
export function replace(path, query, fragment) {
  return $effect.from(
    (_) => {
      return $bool.guard(
        !$lustre.is_browser(),
        undefined,
        () => {
          return do_replace(
            new Uri(
              relative.scheme,
              relative.userinfo,
              relative.host,
              relative.port,
              path,
              $option.then$(query, non_empty),
              $option.then$(fragment, non_empty),
            ),
          );
        },
      );
    },
  );
}

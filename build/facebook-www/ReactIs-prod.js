/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @preventMunge
 * @preserve-invariant-messages
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
require("lowPriorityWarning");
function typeOf(object) {
  if ("object" === typeof object && null !== object) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (((object = object.type), object)) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return object;
          default:
            switch (((object = object && object.$$typeof), object)) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return object;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
exports.typeOf = typeOf;
exports.AsyncMode = REACT_ASYNC_MODE_TYPE;
exports.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
exports.ContextConsumer = REACT_CONTEXT_TYPE;
exports.ContextProvider = REACT_PROVIDER_TYPE;
exports.Element = REACT_ELEMENT_TYPE;
exports.ForwardRef = REACT_FORWARD_REF_TYPE;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Lazy = REACT_LAZY_TYPE;
exports.Memo = REACT_MEMO_TYPE;
exports.Portal = REACT_PORTAL_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.isValidElementType = function(type) {
  return (
    "string" === typeof type ||
    "function" === typeof type ||
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_CONCURRENT_MODE_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    ("object" === typeof type &&
      null !== type &&
      (type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_PROVIDER_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE))
  );
};
exports.isAsyncMode = function(object) {
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
};
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = function(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
};
exports.isContextProvider = function(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
};
exports.isElement = function(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
};
exports.isForwardRef = function(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
};
exports.isFragment = function(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
};
exports.isLazy = function(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
};
exports.isMemo = function(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
};
exports.isPortal = function(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
};
exports.isProfiler = function(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
};
exports.isStrictMode = function(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
};
exports.isSuspense = function(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
};

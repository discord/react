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
var invariant = require("invariant");
function reactProdInvariant(code) {
  for (
    var argCount = arguments.length - 1,
      url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      argIdx = 0;
    argIdx < argCount;
    argIdx++
  )
    url += "&args[]=" + encodeURIComponent(arguments[argIdx + 1]);
  invariant(
    !1,
    "Minified React error #" +
      code +
      "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
    url
  );
}
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
function captureAssertion(fn) {
  try {
    fn();
  } catch (error) {
    return {
      pass: !1,
      message: function() {
        return error.message;
      }
    };
  }
  return { pass: !0 };
}
function assertYieldsWereCleared(root) {
  0 !== root.unstable_clearYields().length ? reactProdInvariant("296") : void 0;
}
function unstable_toFlushAndYield(root, expectedYields) {
  assertYieldsWereCleared(root);
  var actualYields = root.unstable_flushAll();
  return captureAssertion(function() {
    expect(actualYields).toEqual(expectedYields);
  });
}
function jsonChildToJSXChild(jsonChild) {
  if (null === jsonChild || "string" === typeof jsonChild) return jsonChild;
  var jsxChildren = jsonChildrenToJSXChildren(jsonChild.children);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: jsonChild.type,
    key: null,
    ref: null,
    props:
      null === jsxChildren
        ? jsonChild.props
        : Object.assign({}, jsonChild.props, { children: jsxChildren }),
    _owner: null,
    _store: void 0
  };
}
function jsonChildrenToJSXChildren(jsonChildren) {
  if (null !== jsonChildren) {
    if (1 === jsonChildren.length) return jsonChildToJSXChild(jsonChildren[0]);
    if (1 < jsonChildren.length) {
      for (
        var jsxChildren = [],
          allJSXChildrenAreStrings = !0,
          jsxChildrenString = "",
          i = 0;
        i < jsonChildren.length;
        i++
      ) {
        var jsxChild = jsonChildToJSXChild(jsonChildren[i]);
        jsxChildren.push(jsxChild);
        allJSXChildrenAreStrings &&
          ("string" === typeof jsxChild
            ? (jsxChildrenString += jsxChild)
            : null !== jsxChild && (allJSXChildrenAreStrings = !1));
      }
      return allJSXChildrenAreStrings ? jsxChildrenString : jsxChildren;
    }
  }
  return null;
}
exports.unstable_toFlushAndYield = unstable_toFlushAndYield;
exports.unstable_toFlushAndYieldThrough = function(root, expectedYields) {
  assertYieldsWereCleared(root);
  var actualYields = root.unstable_flushNumberOfYields(expectedYields.length);
  return captureAssertion(function() {
    expect(actualYields).toEqual(expectedYields);
  });
};
exports.unstable_toFlushWithoutYielding = function(root) {
  return unstable_toFlushAndYield(root, []);
};
exports.unstable_toHaveYielded = function(ReactTestRenderer, expectedYields) {
  return captureAssertion(function() {
    (null !== ReactTestRenderer &&
      "object" === typeof ReactTestRenderer &&
      "function" === typeof ReactTestRenderer.unstable_setNowImplementation) ||
      reactProdInvariant("297");
    var actualYields = ReactTestRenderer.unstable_clearYields();
    expect(actualYields).toEqual(expectedYields);
  });
};
exports.unstable_toFlushAndThrow = function(root) {
  for (
    var _len = arguments.length,
      rest = Array(1 < _len ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  )
    rest[_key - 1] = arguments[_key];
  assertYieldsWereCleared(root);
  return captureAssertion(function() {
    var _expect;
    (_expect = expect(function() {
      root.unstable_flushAll();
    })).toThrow.apply(_expect, rest);
  });
};
exports.unstable_toMatchRenderedOutput = function(root, expectedJSX) {
  assertYieldsWereCleared(root);
  root = root.toJSON();
  var actualJSX = void 0;
  null === root || "string" === typeof root
    ? (actualJSX = root)
    : Array.isArray(root)
      ? 0 === root.length
        ? (actualJSX = null)
        : 1 === root.length
          ? (actualJSX = jsonChildToJSXChild(root[0]))
          : ((root = jsonChildrenToJSXChildren(root)),
            (actualJSX =
              null === root || "string" === typeof root
                ? root
                : {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: REACT_FRAGMENT_TYPE,
                    key: null,
                    ref: null,
                    props: { children: root },
                    _owner: null,
                    _store: void 0
                  }))
      : (actualJSX = jsonChildToJSXChild(root));
  return captureAssertion(function() {
    expect(actualJSX).toEqual(expectedJSX);
  });
};

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

'use strict';

if (__DEV__) {
  (function() {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var invariant = require("invariant");

// Relying on the `invariant()` implementation lets us
// preserve the format and params in the www builds.

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === "function" && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;

var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;

function captureAssertion(fn) {
  // Trick to use a Jest matcher inside another Jest matcher. `fn` contains an
  // assertion; if it throws, we capture the error and return it, so the stack
  // trace presented to the user points to the original assertion in the
  // test file.
  try {
    fn();
  } catch (error) {
    return {
      pass: false,
      message: function() {
        return error.message;
      }
    };
  }
  return { pass: true };
}

function assertYieldsWereCleared(root) {
  var actualYields = root.unstable_clearYields();
  !(actualYields.length === 0)
    ? invariant(
        false,
        "Log of yielded values is not empty. Call expect(ReactTestRenderer).unstable_toHaveYielded(...) first."
      )
    : void 0;
}

function unstable_toFlushAndYield(root, expectedYields) {
  assertYieldsWereCleared(root);
  var actualYields = root.unstable_flushAll();
  return captureAssertion(function() {
    expect(actualYields).toEqual(expectedYields);
  });
}

function unstable_toFlushAndYieldThrough(root, expectedYields) {
  assertYieldsWereCleared(root);
  var actualYields = root.unstable_flushNumberOfYields(expectedYields.length);
  return captureAssertion(function() {
    expect(actualYields).toEqual(expectedYields);
  });
}

function unstable_toFlushWithoutYielding(root) {
  return unstable_toFlushAndYield(root, []);
}

function unstable_toHaveYielded(ReactTestRenderer, expectedYields) {
  return captureAssertion(function() {
    if (
      ReactTestRenderer === null ||
      typeof ReactTestRenderer !== "object" ||
      typeof ReactTestRenderer.unstable_setNowImplementation !== "function"
    ) {
      invariant(
        false,
        "The matcher `unstable_toHaveYielded` expects an instance of React Test Renderer.\n\nTry: expect(ReactTestRenderer).unstable_toHaveYielded(expectedYields)"
      );
    }
    var actualYields = ReactTestRenderer.unstable_clearYields();
    expect(actualYields).toEqual(expectedYields);
  });
}

function unstable_toFlushAndThrow(root) {
  for (
    var _len = arguments.length,
      rest = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    rest[_key - 1] = arguments[_key];
  }

  assertYieldsWereCleared(root);
  return captureAssertion(function() {
    var _expect;

    (_expect = expect(function() {
      root.unstable_flushAll();
    })).toThrow.apply(_expect, rest);
  });
}

function unstable_toMatchRenderedOutput(root, expectedJSX) {
  assertYieldsWereCleared(root);
  var actualJSON = root.toJSON();

  var actualJSX = void 0;
  if (actualJSON === null || typeof actualJSON === "string") {
    actualJSX = actualJSON;
  } else if (Array.isArray(actualJSON)) {
    if (actualJSON.length === 0) {
      actualJSX = null;
    } else if (actualJSON.length === 1) {
      actualJSX = jsonChildToJSXChild(actualJSON[0]);
    } else {
      var actualJSXChildren = jsonChildrenToJSXChildren(actualJSON);
      if (actualJSXChildren === null || typeof actualJSXChildren === "string") {
        actualJSX = actualJSXChildren;
      } else {
        actualJSX = {
          $$typeof: REACT_ELEMENT_TYPE,
          type: REACT_FRAGMENT_TYPE,
          key: null,
          ref: null,
          props: {
            children: actualJSXChildren
          },
          _owner: null,
          _store: {}
        };
      }
    }
  } else {
    actualJSX = jsonChildToJSXChild(actualJSON);
  }

  return captureAssertion(function() {
    expect(actualJSX).toEqual(expectedJSX);
  });
}

function jsonChildToJSXChild(jsonChild) {
  if (jsonChild === null || typeof jsonChild === "string") {
    return jsonChild;
  } else {
    var jsxChildren = jsonChildrenToJSXChildren(jsonChild.children);
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: jsonChild.type,
      key: null,
      ref: null,
      props:
        jsxChildren === null
          ? jsonChild.props
          : Object.assign({}, jsonChild.props, { children: jsxChildren }),
      _owner: null,
      _store: {}
    };
  }
}

function jsonChildrenToJSXChildren(jsonChildren) {
  if (jsonChildren !== null) {
    if (jsonChildren.length === 1) {
      return jsonChildToJSXChild(jsonChildren[0]);
    } else if (jsonChildren.length > 1) {
      var jsxChildren = [];
      var allJSXChildrenAreStrings = true;
      var jsxChildrenString = "";
      for (var i = 0; i < jsonChildren.length; i++) {
        var jsxChild = jsonChildToJSXChild(jsonChildren[i]);
        jsxChildren.push(jsxChild);
        if (allJSXChildrenAreStrings) {
          if (typeof jsxChild === "string") {
            jsxChildrenString += jsxChild;
          } else if (jsxChild !== null) {
            allJSXChildrenAreStrings = false;
          }
        }
      }
      return allJSXChildrenAreStrings ? jsxChildrenString : jsxChildren;
    }
  }
  return null;
}

exports.unstable_toFlushAndYield = unstable_toFlushAndYield;
exports.unstable_toFlushAndYieldThrough = unstable_toFlushAndYieldThrough;
exports.unstable_toFlushWithoutYielding = unstable_toFlushWithoutYielding;
exports.unstable_toHaveYielded = unstable_toHaveYielded;
exports.unstable_toFlushAndThrow = unstable_toFlushAndThrow;
exports.unstable_toMatchRenderedOutput = unstable_toMatchRenderedOutput;

  })();
}

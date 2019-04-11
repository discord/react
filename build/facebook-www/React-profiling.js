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
var assign = require("object-assign"),
  hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator,
  invariant = require("invariant");
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
require("lowPriorityWarning");
require("warning");
var ReactNoopUpdateQueue = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
  },
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function(partialState, callback) {
  "object" !== typeof partialState &&
  "function" !== typeof partialState &&
  null != partialState
    ? reactProdInvariant("85")
    : void 0;
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var ReactCurrentDispatcher = require("ReactCurrentDispatcher"),
  ReactCurrentOwner = require("ReactCurrentOwner"),
  ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentOwner: ReactCurrentOwner,
    assign: assign
  },
  hasOwnProperty = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = { key: !0, ref: !0, __self: !0, __source: !0 };
function createElement(type, config, children) {
  var propName = void 0,
    props = {},
    key = null,
    ref = null;
  if (null != config)
    for (propName in (void 0 !== config.ref && (ref = config.ref),
    void 0 !== config.key && (key = "" + config.key),
    config))
      hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName) &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: ReactCurrentOwner.current
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
    _owner: oldElement._owner
  };
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    ("" + key).replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g,
  traverseContextPool = [];
function getPooledTraverseContext(
  mapResult,
  keyPrefix,
  mapFunction,
  mapContext
) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  }
  return {
    result: mapResult,
    keyPrefix: keyPrefix,
    func: mapFunction,
    context: mapContext,
    count: 0
  };
}
function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  10 > traverseContextPool.length && traverseContextPool.push(traverseContext);
}
function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext
) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;
  else
    switch (type) {
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
        }
    }
  if (invokeCallback)
    return (
      callback(
        traverseContext,
        children,
        "" === nameSoFar ? "." + getComponentKey(children, 0) : nameSoFar
      ),
      1
    );
  invokeCallback = 0;
  nameSoFar = "" === nameSoFar ? "." : nameSoFar + ":";
  if (Array.isArray(children))
    for (var i = 0; i < children.length; i++) {
      type = children[i];
      var nextName = nameSoFar + getComponentKey(type, i);
      invokeCallback += traverseAllChildrenImpl(
        type,
        nextName,
        callback,
        traverseContext
      );
    }
  else if (
    (null === children || "object" !== typeof children
      ? (nextName = null)
      : ((nextName =
          (MAYBE_ITERATOR_SYMBOL && children[MAYBE_ITERATOR_SYMBOL]) ||
          children["@@iterator"]),
        (nextName = "function" === typeof nextName ? nextName : null)),
    "function" === typeof nextName)
  )
    for (
      children = nextName.call(children), i = 0;
      !(type = children.next()).done;

    )
      (type = type.value),
        (nextName = nameSoFar + getComponentKey(type, i++)),
        (invokeCallback += traverseAllChildrenImpl(
          type,
          nextName,
          callback,
          traverseContext
        ));
  else
    "object" === type &&
      ((callback = "" + children),
      reactProdInvariant(
        "31",
        "[object Object]" === callback
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : callback,
        ""
      ));
  return invokeCallback;
}
function traverseAllChildren(children, callback, traverseContext) {
  return null == children
    ? 0
    : traverseAllChildrenImpl(children, "", callback, traverseContext);
}
function getComponentKey(component, index) {
  return "object" === typeof component &&
    null !== component &&
    null != component.key
    ? escape(component.key)
    : index.toString(36);
}
function forEachSingleChild(bookKeeping, child) {
  bookKeeping.func.call(bookKeeping.context, child, bookKeeping.count++);
}
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
    keyPrefix = bookKeeping.keyPrefix;
  bookKeeping = bookKeeping.func.call(
    bookKeeping.context,
    child,
    bookKeeping.count++
  );
  Array.isArray(bookKeeping)
    ? mapIntoWithKeyPrefixInternal(bookKeeping, result, childKey, function(c) {
        return c;
      })
    : null != bookKeeping &&
      (isValidElement(bookKeeping) &&
        (bookKeeping = cloneAndReplaceKey(
          bookKeeping,
          keyPrefix +
            (!bookKeeping.key || (child && child.key === bookKeeping.key)
              ? ""
              : ("" + bookKeeping.key).replace(
                  userProvidedKeyEscapeRegex,
                  "$&/"
                ) + "/") +
            childKey
        )),
      result.push(bookKeeping));
}
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = "";
  null != prefix &&
    (escapedPrefix =
      ("" + prefix).replace(userProvidedKeyEscapeRegex, "$&/") + "/");
  array = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, array);
  releaseTraverseContext(array);
}
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  null === dispatcher ? reactProdInvariant("321") : void 0;
  return dispatcher;
}
require("ReactFeatureFlags");
var React = {
    Children: {
      map: function(children, func, context) {
        if (null == children) return children;
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
      },
      forEach: function(children, forEachFunc, forEachContext) {
        if (null == children) return children;
        forEachFunc = getPooledTraverseContext(
          null,
          null,
          forEachFunc,
          forEachContext
        );
        traverseAllChildren(children, forEachSingleChild, forEachFunc);
        releaseTraverseContext(forEachFunc);
      },
      count: function(children) {
        return traverseAllChildren(
          children,
          function() {
            return null;
          },
          null
        );
      },
      toArray: function(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
          return child;
        });
        return result;
      },
      only: function(children) {
        isValidElement(children) ? void 0 : reactProdInvariant("143");
        return children;
      }
    },
    createRef: function() {
      return { current: null };
    },
    Component: Component,
    PureComponent: PureComponent,
    createContext: function(defaultValue, calculateChangedBits) {
      void 0 === calculateChangedBits && (calculateChangedBits = null);
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: defaultValue
      };
      return (defaultValue.Consumer = defaultValue);
    },
    forwardRef: function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
    },
    lazy: function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _ctor: ctor,
        _status: -1,
        _result: null
      };
    },
    memo: function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: void 0 === compare ? null : compare
      };
    },
    useCallback: function(callback, inputs) {
      return resolveDispatcher().useCallback(callback, inputs);
    },
    useContext: function(Context, unstable_observedBits) {
      return resolveDispatcher().useContext(Context, unstable_observedBits);
    },
    useEffect: function(create, inputs) {
      return resolveDispatcher().useEffect(create, inputs);
    },
    useImperativeHandle: function(ref, create, inputs) {
      return resolveDispatcher().useImperativeHandle(ref, create, inputs);
    },
    useDebugValue: function() {},
    useLayoutEffect: function(create, inputs) {
      return resolveDispatcher().useLayoutEffect(create, inputs);
    },
    useMemo: function(create, inputs) {
      return resolveDispatcher().useMemo(create, inputs);
    },
    useReducer: function(reducer, initialArg, init) {
      return resolveDispatcher().useReducer(reducer, initialArg, init);
    },
    useRef: function(initialValue) {
      return resolveDispatcher().useRef(initialValue);
    },
    useState: function(initialState) {
      return resolveDispatcher().useState(initialState);
    },
    Fragment: REACT_FRAGMENT_TYPE,
    StrictMode: REACT_STRICT_MODE_TYPE,
    Suspense: REACT_SUSPENSE_TYPE,
    createElement: createElement,
    cloneElement: function(element, config, children) {
      null === element || void 0 === element
        ? reactProdInvariant("267", element)
        : void 0;
      var propName = void 0,
        props = Object.assign({}, element.props),
        key = element.key,
        ref = element.ref,
        owner = element._owner;
      if (null != config) {
        void 0 !== config.ref &&
          ((ref = config.ref), (owner = ReactCurrentOwner.current));
        void 0 !== config.key && (key = "" + config.key);
        var defaultProps = void 0;
        element.type &&
          element.type.defaultProps &&
          (defaultProps = element.type.defaultProps);
        for (propName in config)
          hasOwnProperty.call(config, propName) &&
            !RESERVED_PROPS.hasOwnProperty(propName) &&
            (props[propName] =
              void 0 === config[propName] && void 0 !== defaultProps
                ? defaultProps[propName]
                : config[propName]);
      }
      propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        defaultProps = Array(propName);
        for (var i = 0; i < propName; i++) defaultProps[i] = arguments[i + 2];
        props.children = defaultProps;
      }
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: element.type,
        key: key,
        ref: ref,
        props: props,
        _owner: owner
      };
    },
    createFactory: function(type) {
      var factory = createElement.bind(null, type);
      factory.type = type;
      return factory;
    },
    isValidElement: isValidElement,
    version: "16.8.6",
    unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
    unstable_Profiler: REACT_PROFILER_TYPE,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
  },
  React$2 = { default: React },
  React$3 = (React$2 && React) || React$2;
module.exports = React$3.default || React$3;

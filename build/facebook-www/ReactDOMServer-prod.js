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
var React = require("react"),
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
require("warning");
var hasSymbol = "function" === typeof Symbol && Symbol.for,
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
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return "ConcurrentMode";
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";
      case REACT_PROVIDER_TYPE:
        return "Context.Provider";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return (
          type.displayName ||
          ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef")
        );
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        if ((type = 1 === type._status ? type._result : null))
          return getComponentName(type);
    }
  return null;
}
require("lowPriorityWarning");
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
require("ReactFeatureFlags");
var emptyObject = {};
function validateContextBounds(context, threadID) {
  for (var i = context._threadCount | 0; i <= threadID; i++)
    (context[i] = context._currentValue2), (context._threadCount = i + 1);
}
function processContext(type, context, threadID) {
  var contextType = type.contextType;
  if ("object" === typeof contextType && null !== contextType)
    return validateContextBounds(contextType, threadID), contextType[threadID];
  if ((type = type.contextTypes)) {
    threadID = {};
    for (var contextName in type) threadID[contextName] = context[contextName];
    context = threadID;
  } else context = emptyObject;
  return context;
}
for (var nextAvailableThreadIDs = new Uint16Array(16), i = 0; 15 > i; i++)
  nextAvailableThreadIDs[i] = i + 1;
nextAvailableThreadIDs[15] = 0;
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty$1 = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty$1.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty$1.call(illegalAttributeNameCache, attributeName))
    return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function shouldRemoveAttributeWithWarning(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
  switch (typeof value) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (isCustomComponentTag) return !1;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return !1;
  }
}
function shouldRemoveAttribute(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (
    null === value ||
    "undefined" === typeof value ||
    shouldRemoveAttributeWithWarning(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    )
  )
    return !0;
  if (isCustomComponentTag) return !1;
  if (null !== propertyInfo)
    switch (propertyInfo.type) {
      case 3:
        return !value;
      case 4:
        return !1 === value;
      case 5:
        return isNaN(value);
      case 6:
        return isNaN(value) || 1 > value;
    }
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
}
var properties = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(name, 0, !1, name, null);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null
  );
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, null);
  });
"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      "http://www.w3.org/1999/xlink"
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function(attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(
    name,
    1,
    !1,
    attributeName,
    "http://www.w3.org/XML/1998/namespace"
  );
});
["tabIndex", "crossOrigin"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null
  );
});
var matchHtmlRegExp = /["'&<>]/;
function escapeTextForBrowser(text) {
  if ("boolean" === typeof text || "number" === typeof text) return "" + text;
  text = "" + text;
  var match = matchHtmlRegExp.exec(text);
  if (match) {
    var html = "",
      index,
      lastIndex = 0;
    for (index = match.index; index < text.length; index++) {
      switch (text.charCodeAt(index)) {
        case 34:
          match = "&quot;";
          break;
        case 38:
          match = "&amp;";
          break;
        case 39:
          match = "&#x27;";
          break;
        case 60:
          match = "&lt;";
          break;
        case 62:
          match = "&gt;";
          break;
        default:
          continue;
      }
      lastIndex !== index && (html += text.substring(lastIndex, index));
      lastIndex = index + 1;
      html += match;
    }
    text = lastIndex !== index ? html + text.substring(lastIndex, index) : html;
  }
  return text;
}
var currentlyRenderingComponent = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  isReRender = !1,
  didScheduleRenderPhaseUpdate = !1,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function resolveCurrentlyRenderingComponent() {
  null === currentlyRenderingComponent ? reactProdInvariant("321") : void 0;
  return currentlyRenderingComponent;
}
function createHook() {
  0 < numberOfReRenders && reactProdInvariant("312");
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook() {
  null === workInProgressHook
    ? null === firstWorkInProgressHook
      ? ((isReRender = !1),
        (firstWorkInProgressHook = workInProgressHook = createHook()))
      : ((isReRender = !0), (workInProgressHook = firstWorkInProgressHook))
    : null === workInProgressHook.next
      ? ((isReRender = !1),
        (workInProgressHook = workInProgressHook.next = createHook()))
      : ((isReRender = !0), (workInProgressHook = workInProgressHook.next));
  return workInProgressHook;
}
function finishHooks(Component, props, children, refOrContext) {
  for (; didScheduleRenderPhaseUpdate; )
    (didScheduleRenderPhaseUpdate = !1),
      (numberOfReRenders += 1),
      (workInProgressHook = null),
      (children = Component(props, refOrContext));
  firstWorkInProgressHook = currentlyRenderingComponent = null;
  numberOfReRenders = 0;
  workInProgressHook = renderPhaseUpdates = null;
  return children;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function useReducer(reducer, initialArg, init) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    var _queue = workInProgressHook.queue;
    initialArg = _queue.dispatch;
    if (
      null !== renderPhaseUpdates &&
      ((init = renderPhaseUpdates.get(_queue)), void 0 !== init)
    ) {
      renderPhaseUpdates.delete(_queue);
      _queue = workInProgressHook.memoizedState;
      do (_queue = reducer(_queue, init.action)), (init = init.next);
      while (null !== init);
      workInProgressHook.memoizedState = _queue;
      return [_queue, initialArg];
    }
    return [workInProgressHook.memoizedState, initialArg];
  }
  reducer =
    reducer === basicStateReducer
      ? "function" === typeof initialArg
        ? initialArg()
        : initialArg
      : void 0 !== init
        ? init(initialArg)
        : initialArg;
  workInProgressHook.memoizedState = reducer;
  reducer = workInProgressHook.queue = { last: null, dispatch: null };
  reducer = reducer.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingComponent,
    reducer
  );
  return [workInProgressHook.memoizedState, reducer];
}
function dispatchAction(componentIdentity, queue, action) {
  25 > numberOfReRenders ? void 0 : reactProdInvariant("301");
  if (componentIdentity === currentlyRenderingComponent)
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (componentIdentity = { action: action, next: null }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, componentIdentity);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = componentIdentity;
    }
}
function noop() {}
var currentThreadID = 0,
  Dispatcher = {
    readContext: function(context) {
      var threadID = currentThreadID;
      validateContextBounds(context, threadID);
      return context[threadID];
    },
    useContext: function(context) {
      resolveCurrentlyRenderingComponent();
      var threadID = currentThreadID;
      validateContextBounds(context, threadID);
      return context[threadID];
    },
    useMemo: function(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var prevState = workInProgressHook.memoizedState;
        if (null !== prevState && null !== deps) {
          a: {
            var JSCompiler_inline_result = prevState[1];
            if (null === JSCompiler_inline_result)
              JSCompiler_inline_result = !1;
            else {
              for (
                var i = 0;
                i < JSCompiler_inline_result.length && i < deps.length;
                i++
              ) {
                var x = deps[i],
                  y = JSCompiler_inline_result[i];
                if (
                  (x !== y || (0 === x && 1 / x !== 1 / y)) &&
                  (x === x || y === y)
                ) {
                  JSCompiler_inline_result = !1;
                  break a;
                }
              }
              JSCompiler_inline_result = !0;
            }
          }
          if (JSCompiler_inline_result) return prevState[0];
        }
      }
      nextCreate = nextCreate();
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: useReducer,
    useRef: function(initialValue) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      var previousRef = workInProgressHook.memoizedState;
      return null === previousRef
        ? ((initialValue = { current: initialValue }),
          (workInProgressHook.memoizedState = initialValue))
        : previousRef;
    },
    useState: function(initialState) {
      return useReducer(basicStateReducer, initialState);
    },
    useLayoutEffect: function() {},
    useCallback: function(callback) {
      return callback;
    },
    useImperativeHandle: noop,
    useEffect: noop,
    useDebugValue: noop
  },
  Namespaces = {
    html: "http://www.w3.org/1999/xhtml",
    mathml: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg"
  };
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
var omittedCloseTags = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  },
  voidElementTags = Object.assign({ menuitem: !0 }, omittedCloseTags),
  isUnitlessNumber = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
var uppercasePattern = /([A-Z])/g,
  msPattern = /^ms-/,
  toArray = React.Children.toArray,
  ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  newlineEatingTags = { listing: !0, pre: !0, textarea: !0 },
  VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
  validatedTagCache = {},
  styleNameCache = {};
function flattenOptionChildren(children) {
  if (void 0 === children || null === children) return children;
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
var hasOwnProperty = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = {
    children: null,
    dangerouslySetInnerHTML: null,
    suppressContentEditableWarning: null,
    suppressHydrationWarning: null
  };
function validateRenderResult(child, type) {
  void 0 === child &&
    reactProdInvariant("152", getComponentName(type) || "Component");
}
function resolve(child, context, threadID) {
  function processChild(element, Component) {
    var publicContext = processContext(Component, context, threadID),
      queue = [],
      replace = !1,
      updater = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function() {
          if (null === queue) return null;
        },
        enqueueReplaceState: function(publicInstance, completeState) {
          replace = !0;
          queue = [completeState];
        },
        enqueueSetState: function(publicInstance, currentPartialState) {
          if (null === queue) return null;
          queue.push(currentPartialState);
        }
      },
      inst = void 0;
    if (Component.prototype && Component.prototype.isReactComponent) {
      if (
        ((inst = new Component(element.props, publicContext, updater)),
        "function" === typeof Component.getDerivedStateFromProps)
      ) {
        var partialState = Component.getDerivedStateFromProps.call(
          null,
          element.props,
          inst.state
        );
        null != partialState &&
          (inst.state = Object.assign({}, inst.state, partialState));
      }
    } else if (
      ((currentlyRenderingComponent = {}),
      (inst = Component(element.props, publicContext, updater)),
      (inst = finishHooks(Component, element.props, inst, publicContext)),
      null == inst || null == inst.render)
    ) {
      child = inst;
      validateRenderResult(child, Component);
      return;
    }
    inst.props = element.props;
    inst.context = publicContext;
    inst.updater = updater;
    updater = inst.state;
    void 0 === updater && (inst.state = updater = null);
    if (
      "function" === typeof inst.UNSAFE_componentWillMount ||
      "function" === typeof inst.componentWillMount
    )
      if (
        ("function" === typeof inst.componentWillMount &&
          "function" !== typeof Component.getDerivedStateFromProps &&
          inst.componentWillMount(),
        "function" === typeof inst.UNSAFE_componentWillMount &&
          "function" !== typeof Component.getDerivedStateFromProps &&
          inst.UNSAFE_componentWillMount(),
        queue.length)
      ) {
        updater = queue;
        var oldReplace = replace;
        queue = null;
        replace = !1;
        if (oldReplace && 1 === updater.length) inst.state = updater[0];
        else {
          partialState = oldReplace ? updater[0] : inst.state;
          var dontMutate = !0;
          for (
            oldReplace = oldReplace ? 1 : 0;
            oldReplace < updater.length;
            oldReplace++
          ) {
            var partial = updater[oldReplace];
            partial =
              "function" === typeof partial
                ? partial.call(inst, partialState, element.props, publicContext)
                : partial;
            null != partial &&
              (dontMutate
                ? ((dontMutate = !1),
                  (partialState = Object.assign({}, partialState, partial)))
                : Object.assign(partialState, partial));
          }
          inst.state = partialState;
        }
      } else queue = null;
    child = inst.render();
    validateRenderResult(child, Component);
    element = void 0;
    if (
      "function" === typeof inst.getChildContext &&
      ((publicContext = Component.childContextTypes),
      "object" === typeof publicContext)
    ) {
      element = inst.getChildContext();
      for (var contextKey in element)
        contextKey in publicContext
          ? void 0
          : reactProdInvariant(
              "108",
              getComponentName(Component) || "Unknown",
              contextKey
            );
    }
    element && (context = Object.assign({}, context, element));
  }
  for (; React.isValidElement(child); ) {
    var element$jscomp$0 = child,
      Component$jscomp$0 = element$jscomp$0.type;
    if ("function" !== typeof Component$jscomp$0) break;
    processChild(element$jscomp$0, Component$jscomp$0);
  }
  return { child: child, context: context };
}
var ReactDOMServerRenderer = (function() {
    function ReactDOMServerRenderer(children, makeStaticMarkup) {
      if (!(this instanceof ReactDOMServerRenderer))
        throw new TypeError("Cannot call a class as a function");
      React.isValidElement(children)
        ? children.type !== REACT_FRAGMENT_TYPE
          ? (children = [children])
          : ((children = children.props.children),
            (children = React.isValidElement(children)
              ? [children]
              : toArray(children)))
        : (children = toArray(children));
      children = {
        type: null,
        domNamespace: Namespaces.html,
        children: children,
        childIndex: 0,
        context: emptyObject,
        footer: ""
      };
      var JSCompiler_inline_result = nextAvailableThreadIDs[0];
      if (0 === JSCompiler_inline_result) {
        var oldArray = nextAvailableThreadIDs;
        JSCompiler_inline_result = oldArray.length;
        var newSize = 2 * JSCompiler_inline_result;
        65536 >= newSize ? void 0 : reactProdInvariant("304");
        var newArray = new Uint16Array(newSize);
        newArray.set(oldArray);
        nextAvailableThreadIDs = newArray;
        nextAvailableThreadIDs[0] = JSCompiler_inline_result + 1;
        for (
          oldArray = JSCompiler_inline_result;
          oldArray < newSize - 1;
          oldArray++
        )
          nextAvailableThreadIDs[oldArray] = oldArray + 1;
        nextAvailableThreadIDs[newSize - 1] = 0;
      } else
        nextAvailableThreadIDs[0] =
          nextAvailableThreadIDs[JSCompiler_inline_result];
      this.threadID = JSCompiler_inline_result;
      this.stack = [children];
      this.exhausted = !1;
      this.currentSelectValue = null;
      this.previousWasTextNode = !1;
      this.makeStaticMarkup = makeStaticMarkup;
      this.suspenseDepth = 0;
      this.contextIndex = -1;
      this.contextStack = [];
      this.contextValueStack = [];
    }
    ReactDOMServerRenderer.prototype.destroy = function() {
      if (!this.exhausted) {
        this.exhausted = !0;
        this.clearProviders();
        var id = this.threadID;
        nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
        nextAvailableThreadIDs[0] = id;
      }
    };
    ReactDOMServerRenderer.prototype.pushProvider = function(provider) {
      var index = ++this.contextIndex,
        context = provider.type._context,
        threadID = this.threadID;
      validateContextBounds(context, threadID);
      var previousValue = context[threadID];
      this.contextStack[index] = context;
      this.contextValueStack[index] = previousValue;
      context[threadID] = provider.props.value;
    };
    ReactDOMServerRenderer.prototype.popProvider = function() {
      var index = this.contextIndex,
        context = this.contextStack[index],
        previousValue = this.contextValueStack[index];
      this.contextStack[index] = null;
      this.contextValueStack[index] = null;
      this.contextIndex--;
      context[this.threadID] = previousValue;
    };
    ReactDOMServerRenderer.prototype.clearProviders = function() {
      for (var index = this.contextIndex; 0 <= index; index--)
        this.contextStack[index][this.threadID] = this.contextValueStack[index];
    };
    ReactDOMServerRenderer.prototype.read = function(bytes) {
      if (this.exhausted) return null;
      var prevThreadID = currentThreadID;
      currentThreadID = this.threadID;
      var prevDispatcher = ReactCurrentDispatcher.current;
      ReactCurrentDispatcher.current = Dispatcher;
      try {
        for (var out = [""], suspended = !1; out[0].length < bytes; ) {
          if (0 === this.stack.length) {
            this.exhausted = !0;
            var id = this.threadID;
            nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
            nextAvailableThreadIDs[0] = id;
            break;
          }
          var frame = this.stack[this.stack.length - 1];
          if (suspended || frame.childIndex >= frame.children.length) {
            var _footer = frame.footer;
            "" !== _footer && (this.previousWasTextNode = !1);
            this.stack.pop();
            if ("select" === frame.type) this.currentSelectValue = null;
            else if (
              null != frame.type &&
              null != frame.type.type &&
              frame.type.type.$$typeof === REACT_PROVIDER_TYPE
            )
              this.popProvider(frame.type);
            else if (frame.type === REACT_SUSPENSE_TYPE) {
              this.suspenseDepth--;
              var buffered = out.pop();
              if (suspended) {
                suspended = !1;
                var _fallbackFrame = frame.fallbackFrame;
                _fallbackFrame ? void 0 : reactProdInvariant("303");
                this.stack.push(_fallbackFrame);
                continue;
              } else out[this.suspenseDepth] += buffered;
            }
            out[this.suspenseDepth] += _footer;
          } else {
            var child = frame.children[frame.childIndex++],
              outBuffer = "";
            try {
              outBuffer += this.render(
                child,
                frame.context,
                frame.domNamespace
              );
            } catch (err) {
              if ("function" === typeof err.then) suspended = !0;
              else throw err;
            } finally {
            }
            out.length <= this.suspenseDepth && out.push("");
            out[this.suspenseDepth] += outBuffer;
          }
        }
        return out[0];
      } finally {
        (ReactCurrentDispatcher.current = prevDispatcher),
          (currentThreadID = prevThreadID);
      }
    };
    ReactDOMServerRenderer.prototype.render = function(
      child,
      context,
      parentNamespace
    ) {
      if ("string" === typeof child || "number" === typeof child) {
        parentNamespace = "" + child;
        if ("" === parentNamespace) return "";
        if (this.makeStaticMarkup) return escapeTextForBrowser(parentNamespace);
        if (this.previousWasTextNode)
          return "\x3c!-- --\x3e" + escapeTextForBrowser(parentNamespace);
        this.previousWasTextNode = !0;
        return escapeTextForBrowser(parentNamespace);
      }
      context = resolve(child, context, this.threadID);
      child = context.child;
      context = context.context;
      if (null === child || !1 === child) return "";
      if (!React.isValidElement(child)) {
        if (null != child && null != child.$$typeof) {
          var $$typeof = child.$$typeof;
          $$typeof === REACT_PORTAL_TYPE ? reactProdInvariant("257") : void 0;
          reactProdInvariant("258", $$typeof.toString());
        }
        child = toArray(child);
        this.stack.push({
          type: null,
          domNamespace: parentNamespace,
          children: child,
          childIndex: 0,
          context: context,
          footer: ""
        });
        return "";
      }
      $$typeof = child.type;
      if ("string" === typeof $$typeof)
        return this.renderDOM(child, context, parentNamespace);
      switch ($$typeof) {
        case REACT_STRICT_MODE_TYPE:
        case REACT_CONCURRENT_MODE_TYPE:
        case REACT_PROFILER_TYPE:
        case REACT_FRAGMENT_TYPE:
          return (
            (child = toArray(child.props.children)),
            this.stack.push({
              type: null,
              domNamespace: parentNamespace,
              children: child,
              childIndex: 0,
              context: context,
              footer: ""
            }),
            ""
          );
        case REACT_SUSPENSE_TYPE:
          $$typeof = child.props.fallback;
          if (void 0 === $$typeof)
            return (
              (child = toArray(child.props.children)),
              this.stack.push({
                type: null,
                domNamespace: parentNamespace,
                children: child,
                childIndex: 0,
                context: context,
                footer: ""
              }),
              ""
            );
          $$typeof = toArray($$typeof);
          child = toArray(child.props.children);
          this.stack.push({
            fallbackFrame: {
              type: null,
              domNamespace: parentNamespace,
              children: $$typeof,
              childIndex: 0,
              context: context,
              footer: "",
              out: ""
            },
            type: REACT_SUSPENSE_TYPE,
            domNamespace: parentNamespace,
            children: child,
            childIndex: 0,
            context: context,
            footer: "\x3c!--/$--\x3e"
          });
          this.suspenseDepth++;
          return "\x3c!--$--\x3e";
      }
      if ("object" === typeof $$typeof && null !== $$typeof)
        switch ($$typeof.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            currentlyRenderingComponent = {};
            var _nextChildren4 = $$typeof.render(child.props, child.ref);
            _nextChildren4 = finishHooks(
              $$typeof.render,
              child.props,
              _nextChildren4,
              child.ref
            );
            _nextChildren4 = toArray(_nextChildren4);
            this.stack.push({
              type: null,
              domNamespace: parentNamespace,
              children: _nextChildren4,
              childIndex: 0,
              context: context,
              footer: ""
            });
            return "";
          case REACT_MEMO_TYPE:
            return (
              (child = [
                React.createElement(
                  $$typeof.type,
                  Object.assign({ ref: child.ref }, child.props)
                )
              ]),
              this.stack.push({
                type: null,
                domNamespace: parentNamespace,
                children: child,
                childIndex: 0,
                context: context,
                footer: ""
              }),
              ""
            );
          case REACT_PROVIDER_TYPE:
            return (
              ($$typeof = toArray(child.props.children)),
              (parentNamespace = {
                type: child,
                domNamespace: parentNamespace,
                children: $$typeof,
                childIndex: 0,
                context: context,
                footer: ""
              }),
              this.pushProvider(child),
              this.stack.push(parentNamespace),
              ""
            );
          case REACT_CONTEXT_TYPE:
            $$typeof = child.type;
            _nextChildren4 = child.props;
            var threadID = this.threadID;
            validateContextBounds($$typeof, threadID);
            $$typeof = toArray(_nextChildren4.children($$typeof[threadID]));
            this.stack.push({
              type: child,
              domNamespace: parentNamespace,
              children: $$typeof,
              childIndex: 0,
              context: context,
              footer: ""
            });
            return "";
          case REACT_LAZY_TYPE:
            reactProdInvariant("295");
        }
      reactProdInvariant(
        "130",
        null == $$typeof ? $$typeof : typeof $$typeof,
        ""
      );
    };
    ReactDOMServerRenderer.prototype.renderDOM = function(
      element,
      context,
      parentNamespace
    ) {
      var tag = element.type.toLowerCase();
      parentNamespace === Namespaces.html && getIntrinsicNamespace(tag);
      validatedTagCache.hasOwnProperty(tag) ||
        (VALID_TAG_REGEX.test(tag) ? void 0 : reactProdInvariant("65", tag),
        (validatedTagCache[tag] = !0));
      var props = element.props;
      if ("input" === tag)
        props = Object.assign({ type: void 0 }, props, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: null != props.value ? props.value : props.defaultValue,
          checked: null != props.checked ? props.checked : props.defaultChecked
        });
      else if ("textarea" === tag) {
        var initialValue = props.value;
        if (null == initialValue) {
          initialValue = props.defaultValue;
          var textareaChildren = props.children;
          null != textareaChildren &&
            (null != initialValue ? reactProdInvariant("92") : void 0,
            Array.isArray(textareaChildren) &&
              (1 >= textareaChildren.length ? void 0 : reactProdInvariant("93"),
              (textareaChildren = textareaChildren[0])),
            (initialValue = "" + textareaChildren));
          null == initialValue && (initialValue = "");
        }
        props = Object.assign({}, props, {
          value: void 0,
          children: "" + initialValue
        });
      } else if ("select" === tag)
        (this.currentSelectValue =
          null != props.value ? props.value : props.defaultValue),
          (props = Object.assign({}, props, { value: void 0 }));
      else if ("option" === tag) {
        textareaChildren = this.currentSelectValue;
        var optionChildren = flattenOptionChildren(props.children);
        if (null != textareaChildren) {
          var value = null != props.value ? props.value + "" : optionChildren;
          initialValue = !1;
          if (Array.isArray(textareaChildren))
            for (var j = 0; j < textareaChildren.length; j++) {
              if ("" + textareaChildren[j] === value) {
                initialValue = !0;
                break;
              }
            }
          else initialValue = "" + textareaChildren === value;
          props = Object.assign({ selected: void 0, children: void 0 }, props, {
            selected: initialValue,
            children: optionChildren
          });
        }
      }
      if ((initialValue = props))
        voidElementTags[tag] &&
          (null != initialValue.children ||
          null != initialValue.dangerouslySetInnerHTML
            ? reactProdInvariant("137", tag, "")
            : void 0),
          null != initialValue.dangerouslySetInnerHTML &&
            (null != initialValue.children ? reactProdInvariant("60") : void 0,
            "object" === typeof initialValue.dangerouslySetInnerHTML &&
            "__html" in initialValue.dangerouslySetInnerHTML
              ? void 0
              : reactProdInvariant("61")),
          null != initialValue.style && "object" !== typeof initialValue.style
            ? reactProdInvariant("62", "")
            : void 0;
      initialValue = props;
      textareaChildren = this.makeStaticMarkup;
      optionChildren = 1 === this.stack.length;
      value = "<" + element.type;
      for (out in initialValue)
        if (hasOwnProperty.call(initialValue, out)) {
          var propValue = initialValue[out];
          if (null != propValue) {
            if ("style" === out) {
              j = void 0;
              var serialized = "",
                delimiter = "";
              for (j in propValue)
                if (propValue.hasOwnProperty(j)) {
                  var isCustomProperty = 0 === j.indexOf("--"),
                    styleValue = propValue[j];
                  if (null != styleValue) {
                    var JSCompiler_inline_result = j;
                    if (styleNameCache.hasOwnProperty(JSCompiler_inline_result))
                      JSCompiler_inline_result =
                        styleNameCache[JSCompiler_inline_result];
                    else {
                      var result = JSCompiler_inline_result.replace(
                        uppercasePattern,
                        "-$1"
                      )
                        .toLowerCase()
                        .replace(msPattern, "-ms-");
                      JSCompiler_inline_result = styleNameCache[
                        JSCompiler_inline_result
                      ] = result;
                    }
                    serialized += delimiter + JSCompiler_inline_result + ":";
                    delimiter = j;
                    isCustomProperty =
                      null == styleValue ||
                      "boolean" === typeof styleValue ||
                      "" === styleValue
                        ? ""
                        : isCustomProperty ||
                          "number" !== typeof styleValue ||
                          0 === styleValue ||
                          (isUnitlessNumber.hasOwnProperty(delimiter) &&
                            isUnitlessNumber[delimiter])
                          ? ("" + styleValue).trim()
                          : styleValue + "px";
                    serialized += isCustomProperty;
                    delimiter = ";";
                  }
                }
              propValue = serialized || null;
            }
            j = null;
            b: if (
              ((isCustomProperty = tag),
              (styleValue = initialValue),
              -1 === isCustomProperty.indexOf("-"))
            )
              isCustomProperty = "string" === typeof styleValue.is;
            else
              switch (isCustomProperty) {
                case "annotation-xml":
                case "color-profile":
                case "font-face":
                case "font-face-src":
                case "font-face-uri":
                case "font-face-format":
                case "font-face-name":
                case "missing-glyph":
                  isCustomProperty = !1;
                  break b;
                default:
                  isCustomProperty = !0;
              }
            if (isCustomProperty)
              RESERVED_PROPS.hasOwnProperty(out) ||
                ((j = out),
                (j =
                  isAttributeNameSafe(j) && null != propValue
                    ? j + "=" + ('"' + escapeTextForBrowser(propValue) + '"')
                    : ""));
            else {
              isCustomProperty = out;
              j = propValue;
              propValue = properties.hasOwnProperty(isCustomProperty)
                ? properties[isCustomProperty]
                : null;
              if ((styleValue = "style" !== isCustomProperty))
                styleValue =
                  null !== propValue
                    ? 0 === propValue.type
                    : !(2 < isCustomProperty.length) ||
                      ("o" !== isCustomProperty[0] &&
                        "O" !== isCustomProperty[0]) ||
                      ("n" !== isCustomProperty[1] &&
                        "N" !== isCustomProperty[1])
                      ? !1
                      : !0;
              styleValue ||
              shouldRemoveAttribute(isCustomProperty, j, propValue, !1)
                ? (j = "")
                : null !== propValue
                  ? ((isCustomProperty = propValue.attributeName),
                    (propValue = propValue.type),
                    (j =
                      3 === propValue || (4 === propValue && !0 === j)
                        ? isCustomProperty + '=""'
                        : isCustomProperty +
                          "=" +
                          ('"' + escapeTextForBrowser(j) + '"')))
                  : (j = isAttributeNameSafe(isCustomProperty)
                      ? isCustomProperty +
                        "=" +
                        ('"' + escapeTextForBrowser(j) + '"')
                      : "");
            }
            j && (value += " " + j);
          }
        }
      textareaChildren || (optionChildren && (value += ' data-reactroot=""'));
      var out = value;
      initialValue = "";
      omittedCloseTags.hasOwnProperty(tag)
        ? (out += "/>")
        : ((out += ">"), (initialValue = "</" + element.type + ">"));
      a: {
        textareaChildren = props.dangerouslySetInnerHTML;
        if (null != textareaChildren) {
          if (null != textareaChildren.__html) {
            textareaChildren = textareaChildren.__html;
            break a;
          }
        } else if (
          ((textareaChildren = props.children),
          "string" === typeof textareaChildren ||
            "number" === typeof textareaChildren)
        ) {
          textareaChildren = escapeTextForBrowser(textareaChildren);
          break a;
        }
        textareaChildren = null;
      }
      null != textareaChildren
        ? ((props = []),
          newlineEatingTags[tag] &&
            "\n" === textareaChildren.charAt(0) &&
            (out += "\n"),
          (out += textareaChildren))
        : (props = toArray(props.children));
      element = element.type;
      parentNamespace =
        null == parentNamespace ||
        "http://www.w3.org/1999/xhtml" === parentNamespace
          ? getIntrinsicNamespace(element)
          : "http://www.w3.org/2000/svg" === parentNamespace &&
            "foreignObject" === element
            ? "http://www.w3.org/1999/xhtml"
            : parentNamespace;
      this.stack.push({
        domNamespace: parentNamespace,
        type: tag,
        children: props,
        childIndex: 0,
        context: context,
        footer: initialValue
      });
      this.previousWasTextNode = !1;
      return out;
    };
    return ReactDOMServerRenderer;
  })(),
  ReactDOMServerBrowser = {
    renderToString: function(element) {
      element = new ReactDOMServerRenderer(element, !1);
      try {
        return element.read(Infinity);
      } finally {
        element.destroy();
      }
    },
    renderToStaticMarkup: function(element) {
      element = new ReactDOMServerRenderer(element, !0);
      try {
        return element.read(Infinity);
      } finally {
        element.destroy();
      }
    },
    renderToNodeStream: function() {
      reactProdInvariant("207");
    },
    renderToStaticNodeStream: function() {
      reactProdInvariant("208");
    },
    version: "16.8.6"
  },
  ReactDOMServerBrowser$1 = { default: ReactDOMServerBrowser },
  ReactDOMServer =
    (ReactDOMServerBrowser$1 && ReactDOMServerBrowser) ||
    ReactDOMServerBrowser$1;
module.exports = ReactDOMServer.default || ReactDOMServer;

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

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
"use strict";
var React = require("react"),
  scheduler = require("scheduler"),
  tracing = require("scheduler/tracing"),
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
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
var hasSymbol = "function" === typeof Symbol && Symbol.for,
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
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
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
function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    if (0 !== (node.effectTag & 2)) return 1;
    for (; node.return; )
      if (((node = node.return), 0 !== (node.effectTag & 2))) return 1;
  }
  return 3 === node.tag ? 2 : 3;
}
function assertIsMounted(fiber) {
  2 !== isFiberMountedImpl(fiber) ? reactProdInvariant("188") : void 0;
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate)
    return (
      (alternate = isFiberMountedImpl(fiber)),
      3 === alternate ? reactProdInvariant("188") : void 0,
      1 === alternate ? null : fiber
    );
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return,
      parentB = parentA ? parentA.alternate : null;
    if (!parentA || !parentB) break;
    if (parentA.child === parentB.child) {
      for (var child = parentA.child; child; ) {
        if (child === a) return assertIsMounted(parentA), fiber;
        if (child === b) return assertIsMounted(parentA), alternate;
        child = child.sibling;
      }
      reactProdInvariant("188");
    }
    if (a.return !== b.return) (a = parentA), (b = parentB);
    else {
      child = !1;
      for (var _child = parentA.child; _child; ) {
        if (_child === a) {
          child = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          child = !0;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!child) {
        for (_child = parentB.child; _child; ) {
          if (_child === a) {
            child = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            child = !0;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        child ? void 0 : reactProdInvariant("189");
      }
    }
    a.alternate !== b ? reactProdInvariant("190") : void 0;
  }
  3 !== a.tag ? reactProdInvariant("188") : void 0;
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node = parent; ; ) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) (node.child.return = node), (node = node.child);
    else {
      if (node === parent) break;
      for (; !node.sibling; ) {
        if (!node.return || node.return === parent) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return null;
}
var disableInputAttributeSyncing = require("ReactFeatureFlags")
    .disableInputAttributeSyncing,
  enableUserTimingAPI = !1,
  refCount = 0,
  timeout = null;
function updateFlagOutsideOfReactCallStack() {
  timeout ||
    (timeout = setTimeout(function() {
      timeout = null;
      enableUserTimingAPI = 0 < refCount;
    }));
}
React ? void 0 : reactProdInvariant("227");
var ReactFbErrorUtils = require("ReactFbErrorUtils");
"function" !== typeof ReactFbErrorUtils.invokeGuardedCallback
  ? reactProdInvariant("255")
  : void 0;
function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
  ReactFbErrorUtils.invokeGuardedCallback.apply(this, arguments);
}
var hasError = !1,
  caughtError = null,
  hasRethrowError = !1,
  rethrowError = null,
  reporter = {
    onError: function(error) {
      hasError = !0;
      caughtError = error;
    }
  };
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = !1;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(
  name,
  func,
  context,
  a,
  b,
  c,
  d,
  e,
  f
) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = !1;
      caughtError = null;
    } else reactProdInvariant("198"), (error = void 0);
    hasRethrowError || ((hasRethrowError = !0), (rethrowError = error));
  }
}
var eventPluginOrder = null,
  namesToPlugins = {};
function recomputePluginOrdering() {
  if (eventPluginOrder)
    for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
        pluginIndex = eventPluginOrder.indexOf(pluginName);
      -1 < pluginIndex ? void 0 : reactProdInvariant("96", pluginName);
      if (!plugins[pluginIndex]) {
        pluginModule.extractEvents
          ? void 0
          : reactProdInvariant("97", pluginName);
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;
        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = void 0;
          var dispatchConfig = pluginIndex[eventName],
            pluginModule$jscomp$0 = pluginModule,
            eventName$jscomp$0 = eventName;
          eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0)
            ? reactProdInvariant("99", eventName$jscomp$0)
            : void 0;
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames)
              phasedRegistrationNames.hasOwnProperty(
                JSCompiler_inline_result
              ) &&
                publishRegistrationName(
                  phasedRegistrationNames[JSCompiler_inline_result],
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                );
            JSCompiler_inline_result = !0;
          } else
            dispatchConfig.registrationName
              ? (publishRegistrationName(
                  dispatchConfig.registrationName,
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                ),
                (JSCompiler_inline_result = !0))
              : (JSCompiler_inline_result = !1);
          JSCompiler_inline_result
            ? void 0
            : reactProdInvariant("98", eventName, pluginName);
        }
      }
    }
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  registrationNameModules[registrationName]
    ? reactProdInvariant("100", registrationName)
    : void 0;
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [],
  eventNameDispatchConfigs = {},
  registrationNameModules = {},
  registrationNameDependencies = {},
  getFiberCurrentPropsFromNode = null,
  getInstanceFromNode = null,
  getNodeFromInstance = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
function accumulateInto(current, next) {
  null == next ? reactProdInvariant("30") : void 0;
  if (null == current) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) return current.push.apply(current, next), current;
    current.push(next);
    return current;
  }
  return Array.isArray(next) ? [current].concat(next) : [current, next];
}
function forEachAccumulated(arr, cb, scope) {
  Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
}
var eventQueue = null;
function executeDispatchesAndReleaseTopLevel(e) {
  if (e) {
    var dispatchListeners = e._dispatchListeners,
      dispatchInstances = e._dispatchInstances;
    if (Array.isArray(dispatchListeners))
      for (
        var i = 0;
        i < dispatchListeners.length && !e.isPropagationStopped();
        i++
      )
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
    else
      dispatchListeners &&
        executeDispatch(e, dispatchListeners, dispatchInstances);
    e._dispatchListeners = null;
    e._dispatchInstances = null;
    e.isPersistent() || e.constructor.release(e);
  }
}
var injection = {
  injectEventPluginOrder: function(injectedEventPluginOrder) {
    eventPluginOrder ? reactProdInvariant("101") : void 0;
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = !1,
      pluginName;
    for (pluginName in injectedNamesToPlugins)
      if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        var pluginModule = injectedNamesToPlugins[pluginName];
        (namesToPlugins.hasOwnProperty(pluginName) &&
          namesToPlugins[pluginName] === pluginModule) ||
          (namesToPlugins[pluginName]
            ? reactProdInvariant("102", pluginName)
            : void 0,
          (namesToPlugins[pluginName] = pluginModule),
          (isOrderingDirty = !0));
      }
    isOrderingDirty && recomputePluginOrdering();
  }
};
function getListener(inst, registrationName) {
  var listener = inst.stateNode;
  if (!listener) return null;
  var props = getFiberCurrentPropsFromNode(listener);
  if (!props) return null;
  listener = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (props = !props.disabled) ||
        ((inst = inst.type),
        (props = !(
          "button" === inst ||
          "input" === inst ||
          "select" === inst ||
          "textarea" === inst
        )));
      inst = !props;
      break a;
    default:
      inst = !1;
  }
  if (inst) return null;
  listener && "function" !== typeof listener
    ? reactProdInvariant("231", registrationName, typeof listener)
    : void 0;
  return listener;
}
function runEventsInBatch(events) {
  null !== events && (eventQueue = accumulateInto(eventQueue, events));
  events = eventQueue;
  eventQueue = null;
  if (
    events &&
    (forEachAccumulated(events, executeDispatchesAndReleaseTopLevel),
    eventQueue ? reactProdInvariant("95") : void 0,
    hasRethrowError)
  )
    throw ((events = rethrowError),
    (hasRethrowError = !1),
    (rethrowError = null),
    events);
}
var randomKey = Math.random()
    .toString(36)
    .slice(2),
  internalInstanceKey = "__reactInternalInstance$" + randomKey,
  internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) return node[internalInstanceKey];
  for (; !node[internalInstanceKey]; )
    if (node.parentNode) node = node.parentNode;
    else return null;
  node = node[internalInstanceKey];
  return 5 === node.tag || 6 === node.tag ? node : null;
}
function getInstanceFromNode$1(node) {
  node = node[internalInstanceKey];
  return !node || (5 !== node.tag && 6 !== node.tag) ? null : node;
}
function getNodeFromInstance$1(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  reactProdInvariant("33");
}
function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}
function getParent(inst) {
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateDirectionalDispatches(inst, phase, event) {
  if (
    (phase = getListener(
      inst,
      event.dispatchConfig.phasedRegistrationNames[phase]
    ))
  )
    (event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      phase
    )),
      (event._dispatchInstances = accumulateInto(
        event._dispatchInstances,
        inst
      ));
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    for (var inst = event._targetInst, path = []; inst; )
      path.push(inst), (inst = getParent(inst));
    for (inst = path.length; 0 < inst--; )
      accumulateDirectionalDispatches(path[inst], "captured", event);
    for (inst = 0; inst < path.length; inst++)
      accumulateDirectionalDispatches(path[inst], "bubbled", event);
  }
}
function accumulateDispatches(inst, ignoredDirection, event) {
  inst &&
    event &&
    event.dispatchConfig.registrationName &&
    (ignoredDirection = getListener(
      inst,
      event.dispatchConfig.registrationName
    )) &&
    ((event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      ignoredDirection
    )),
    (event._dispatchInstances = accumulateInto(
      event._dispatchInstances,
      inst
    )));
}
function accumulateDirectDispatchesSingle(event) {
  event &&
    event.dispatchConfig.registrationName &&
    accumulateDispatches(event._targetInst, null, event);
}
function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
var canUseDOM = !(
  "undefined" === typeof window ||
  !window.document ||
  !window.document.createElement
);
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  },
  prefixedEventNames = {},
  style = {};
canUseDOM &&
  ((style = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete vendorPrefixes.animationend.animation,
    delete vendorPrefixes.animationiteration.animation,
    delete vendorPrefixes.animationstart.animation),
  "TransitionEvent" in window ||
    delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return (prefixedEventNames[eventName] = prefixMap[styleProp]);
  return eventName;
}
var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"),
  TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ),
  root = null,
  startText = null,
  fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start,
    startValue = startText,
    startLength = startValue.length,
    end,
    endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (
    start = 0;
    start < startLength && startValue[start] === endValue[start];
    start++
  );
  var minEnd = startLength - start;
  for (
    end = 1;
    end <= minEnd &&
    startValue[startLength - end] === endValue[endLength - end];
    end++
  );
  return (fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0));
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  dispatchConfig = this.constructor.Interface;
  for (var propName in dispatchConfig)
    dispatchConfig.hasOwnProperty(propName) &&
      ((targetInst = dispatchConfig[propName])
        ? (this[propName] = targetInst(nativeEvent))
        : "target" === propName
          ? (this.target = nativeEventTarget)
          : (this[propName] = nativeEvent[propName]));
  this.isDefaultPrevented = (null != nativeEvent.defaultPrevented
  ? nativeEvent.defaultPrevented
  : !1 === nativeEvent.returnValue)
    ? functionThatReturnsTrue
    : functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {
    this.defaultPrevented = !0;
    var event = this.nativeEvent;
    event &&
      (event.preventDefault
        ? event.preventDefault()
        : "unknown" !== typeof event.returnValue && (event.returnValue = !1),
      (this.isDefaultPrevented = functionThatReturnsTrue));
  },
  stopPropagation: function() {
    var event = this.nativeEvent;
    event &&
      (event.stopPropagation
        ? event.stopPropagation()
        : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0),
      (this.isPropagationStopped = functionThatReturnsTrue));
  },
  persist: function() {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function() {
    var Interface = this.constructor.Interface,
      propName;
    for (propName in Interface) this[propName] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
SyntheticEvent.Interface = {
  type: null,
  target: null,
  currentTarget: function() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};
SyntheticEvent.extend = function(Interface) {
  function E() {}
  function Class() {
    return Super.apply(this, arguments);
  }
  var Super = this;
  E.prototype = Super.prototype;
  var prototype = new E();
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;
  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);
  return Class;
};
addEventPoolingTo(SyntheticEvent);
function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  if (this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  event instanceof this ? void 0 : reactProdInvariant("279");
  event.destructor();
  10 > this.eventPool.length && this.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticCompositionEvent = SyntheticEvent.extend({ data: null }),
  SyntheticInputEvent = SyntheticEvent.extend({ data: null }),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM &&
  "documentMode" in document &&
  (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData =
    canUseDOM &&
    (!canUseCompositionEvent ||
      (documentMode && 8 < documentMode && 11 >= documentMode)),
  SPACEBAR_CHAR = String.fromCharCode(32),
  eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
        " "
      )
    }
  },
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "blur":
      return !0;
    default:
      return !1;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent
    ? nativeEvent.data
    : null;
}
var isComposing = !1;
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return (
        (topLevelType = nativeEvent.data),
        topLevelType === SPACEBAR_CHAR && hasSpaceKeypress ? null : topLevelType
      );
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing)
    return "compositionend" === topLevelType ||
      (!canUseCompositionEvent &&
        isFallbackCompositionEnd(topLevelType, nativeEvent))
      ? ((topLevelType = getData()),
        (fallbackText = startText = root = null),
        (isComposing = !1),
        topLevelType)
      : null;
  switch (topLevelType) {
    case "paste":
      return null;
    case "keypress":
      if (
        !(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) ||
        (nativeEvent.ctrlKey && nativeEvent.altKey)
      ) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var eventType = void 0;
      var composition = void 0;
      if (canUseCompositionEvent)
        b: {
          switch (topLevelType) {
            case "compositionstart":
              eventType = eventTypes.compositionStart;
              break b;
            case "compositionend":
              eventType = eventTypes.compositionEnd;
              break b;
            case "compositionupdate":
              eventType = eventTypes.compositionUpdate;
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing
          ? isFallbackCompositionEnd(topLevelType, nativeEvent) &&
            (eventType = eventTypes.compositionEnd)
          : "keydown" === topLevelType &&
            229 === nativeEvent.keyCode &&
            (eventType = eventTypes.compositionStart);
      eventType
        ? (useFallbackCompositionData &&
            "ko" !== nativeEvent.locale &&
            (isComposing || eventType !== eventTypes.compositionStart
              ? eventType === eventTypes.compositionEnd &&
                isComposing &&
                (composition = getData())
              : ((root = nativeEventTarget),
                (startText = "value" in root ? root.value : root.textContent),
                (isComposing = !0))),
          (eventType = SyntheticCompositionEvent.getPooled(
            eventType,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          composition
            ? (eventType.data = composition)
            : ((composition = getDataFromCustomEvent(nativeEvent)),
              null !== composition && (eventType.data = composition)),
          accumulateTwoPhaseDispatches(eventType),
          (composition = eventType))
        : (composition = null);
      (topLevelType = canUseTextInputEvent
        ? getNativeBeforeInputChars(topLevelType, nativeEvent)
        : getFallbackBeforeInputChars(topLevelType, nativeEvent))
        ? ((targetInst = SyntheticInputEvent.getPooled(
            eventTypes.beforeInput,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          (targetInst.data = topLevelType),
          accumulateTwoPhaseDispatches(targetInst))
        : (targetInst = null);
      return null === composition
        ? targetInst
        : null === targetInst
          ? composition
          : [composition, targetInst];
    }
  },
  restoreImpl = null,
  restoreTarget = null,
  restoreQueue = null;
function restoreStateOfTarget(target) {
  if ((target = getInstanceFromNode(target))) {
    "function" !== typeof restoreImpl ? reactProdInvariant("280") : void 0;
    var props = getFiberCurrentPropsFromNode(target.stateNode);
    restoreImpl(target.stateNode, target.type, props);
  }
}
function enqueueStateRestore(target) {
  restoreTarget
    ? restoreQueue
      ? restoreQueue.push(target)
      : (restoreQueue = [target])
    : (restoreTarget = target);
}
function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets)
      for (target = 0; target < queuedTargets.length; target++)
        restoreStateOfTarget(queuedTargets[target]);
  }
}
function _batchedUpdatesImpl(fn, bookkeeping) {
  return fn(bookkeeping);
}
function _interactiveUpdatesImpl(fn, a, b) {
  return fn(a, b);
}
function _flushInteractiveUpdatesImpl() {}
var isBatching = !1;
function batchedUpdates(fn, bookkeeping) {
  if (isBatching) return fn(bookkeeping);
  isBatching = !0;
  try {
    return _batchedUpdatesImpl(fn, bookkeeping);
  } finally {
    if (((isBatching = !1), null !== restoreTarget || null !== restoreQueue))
      _flushInteractiveUpdatesImpl(), restoreStateIfNeeded();
  }
}
var supportedInputTypes = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName
    ? !!supportedInputTypes[elem.type]
    : "textarea" === nodeName
      ? !0
      : !1;
}
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement &&
    (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return !1;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = eventNameSuffix in document;
  isSupported ||
    ((isSupported = document.createElement("div")),
    isSupported.setAttribute(eventNameSuffix, "return;"),
    (isSupported = "function" === typeof isSupported[eventNameSuffix]));
  return isSupported;
}
function isCheckable(elem) {
  var type = elem.type;
  return (
    (elem = elem.nodeName) &&
    "input" === elem.toLowerCase() &&
    ("checkbox" === type || "radio" === type)
  );
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    ),
    currentValue = "" + node[valueField];
  if (
    !node.hasOwnProperty(valueField) &&
    "undefined" !== typeof descriptor &&
    "function" === typeof descriptor.get &&
    "function" === typeof descriptor.set
  ) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: !0,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return !1;
  var tracker = node._valueTracker;
  if (!tracker) return !0;
  var lastValue = tracker.getValue();
  var value = "";
  node &&
    (value = isCheckable(node)
      ? node.checked
        ? "true"
        : "false"
      : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), !0) : !1;
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  do {
    a: switch (workInProgress.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var JSCompiler_inline_result = "";
        break a;
      default:
        var owner = workInProgress._debugOwner,
          source = workInProgress._debugSource,
          name = getComponentName(workInProgress.type);
        JSCompiler_inline_result = null;
        owner && (JSCompiler_inline_result = getComponentName(owner.type));
        owner = name;
        name = "";
        source
          ? (name =
              " (at " +
              source.fileName.replace(BEFORE_SLASH_RE, "") +
              ":" +
              source.lineNumber +
              ")")
          : JSCompiler_inline_result &&
            (name = " (created by " + JSCompiler_inline_result + ")");
        JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
    }
    info += JSCompiler_inline_result;
    workInProgress = workInProgress.return;
  } while (workInProgress);
  return info;
}
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
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
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var propertyInfo = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result =
    null !== propertyInfo
      ? 0 === propertyInfo.type
      : isCustomComponentTag
        ? !1
        : !(2 < name.length) ||
          ("o" !== name[0] && "O" !== name[0]) ||
          ("n" !== name[1] && "N" !== name[1])
          ? !1
          : !0;
  JSCompiler_inline_result ||
    (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) &&
      (value = null),
    isCustomComponentTag || null === propertyInfo
      ? isAttributeNameSafe(name) &&
        (null === value
          ? node.removeAttribute(name)
          : node.setAttribute(name, "" + value))
      : propertyInfo.mustUseProperty
        ? (node[propertyInfo.propertyName] =
            null === value ? (3 === propertyInfo.type ? !1 : "") : value)
        : ((name = propertyInfo.attributeName),
          (isCustomComponentTag = propertyInfo.attributeNamespace),
          null === value
            ? node.removeAttribute(name)
            : ((propertyInfo = propertyInfo.type),
              (value =
                3 === propertyInfo || (4 === propertyInfo && !0 === value)
                  ? ""
                  : "" + value),
              isCustomComponentTag
                ? node.setAttributeNS(isCustomComponentTag, name, value)
                : node.setAttribute(name, value))));
}
function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return "";
  }
}
function getHostProps(element, props) {
  var checked = props.checked;
  return Object.assign({}, props, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  });
}
function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const =
      null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(
    null != props.value ? props.value : defaultValue
  );
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled:
      "checkbox" === props.type || "radio" === props.type
        ? null != props.checked
        : null != props.value
  };
}
function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, !1);
}
function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value)
    if ("number" === type) {
      if ((0 === value && "" === element.value) || element.value != value)
        element.value = "" + value;
    } else element.value !== "" + value && (element.value = "" + value);
  else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return;
  }
  disableInputAttributeSyncing
    ? props.hasOwnProperty("defaultValue") &&
      setDefaultValue(element, props.type, getToStringValue(props.defaultValue))
    : props.hasOwnProperty("value")
      ? setDefaultValue(element, props.type, value)
      : props.hasOwnProperty("defaultValue") &&
        setDefaultValue(
          element,
          props.type,
          getToStringValue(props.defaultValue)
        );
  disableInputAttributeSyncing
    ? null == props.defaultChecked
      ? element.removeAttribute("checked")
      : (element.defaultChecked = !!props.defaultChecked)
    : null == props.checked &&
      null != props.defaultChecked &&
      (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (
      (type = "submit" === type || "reset" === type) &&
      (void 0 === props.value || null === props.value)
    )
      return;
    var _initialValue = "" + element._wrapperState.initialValue;
    if (!isHydrating)
      if (disableInputAttributeSyncing) {
        var value = getToStringValue(props.value);
        null == value ||
          (!type && value === element.value) ||
          (element.value = "" + value);
      } else _initialValue !== element.value && (element.value = _initialValue);
    disableInputAttributeSyncing
      ? ((type = getToStringValue(props.defaultValue)),
        null != type && (element.defaultValue = "" + type))
      : (element.defaultValue = _initialValue);
  }
  type = element.name;
  "" !== type && (element.name = "");
  disableInputAttributeSyncing
    ? (isHydrating || updateChecked(element, props),
      props.hasOwnProperty("defaultChecked") &&
        ((element.defaultChecked = !element.defaultChecked),
        (element.defaultChecked = !!props.defaultChecked)))
    : ((element.defaultChecked = !element.defaultChecked),
      (element.defaultChecked = !!element._wrapperState.initialChecked));
  "" !== type && (element.name = type);
}
function setDefaultValue(node, type, value) {
  if ("number" !== type || node.ownerDocument.activeElement !== node)
    null == value
      ? (node.defaultValue = "" + node._wrapperState.initialValue)
      : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
}
var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(
      " "
    )
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  inst = SyntheticEvent.getPooled(
    eventTypes$1.change,
    inst,
    nativeEvent,
    target
  );
  inst.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(inst);
  return inst;
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported = !1;
canUseDOM &&
  (isInputEventSupported =
    isEventSupported("input") &&
    (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange() {
  activeElement &&
    (activeElement.detachEvent("onpropertychange", handlePropertyChange),
    (activeElementInst = activeElement = null));
}
function handlePropertyChange(nativeEvent) {
  "value" === nativeEvent.propertyName &&
    getInstIfValueChanged(activeElementInst) &&
    ((nativeEvent = createAndAccumulateChangeEvent(
      activeElementInst,
      nativeEvent,
      getEventTarget(nativeEvent)
    )),
    batchedUpdates(runEventInBatch, nativeEvent));
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  "focus" === topLevelType
    ? (stopWatchingForValueChange(),
      (activeElement = target),
      (activeElementInst = targetInst),
      activeElement.attachEvent("onpropertychange", handlePropertyChange))
    : "blur" === topLevelType && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType) {
  if (
    "selectionchange" === topLevelType ||
    "keyup" === topLevelType ||
    "keydown" === topLevelType
  )
    return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType)
    return getInstIfValueChanged(targetInst);
}
var ChangeEventPlugin = {
    eventTypes: eventTypes$1,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window,
        getTargetInstFunc = void 0,
        handleEventFunc = void 0,
        nodeName = targetNode.nodeName && targetNode.nodeName.toLowerCase();
      "select" === nodeName ||
      ("input" === nodeName && "file" === targetNode.type)
        ? (getTargetInstFunc = getTargetInstForChangeEvent)
        : isTextInputElement(targetNode)
          ? isInputEventSupported
            ? (getTargetInstFunc = getTargetInstForInputOrChangeEvent)
            : ((getTargetInstFunc = getTargetInstForInputEventPolyfill),
              (handleEventFunc = handleEventsForInputEventPolyfill))
          : (nodeName = targetNode.nodeName) &&
            "input" === nodeName.toLowerCase() &&
            ("checkbox" === targetNode.type || "radio" === targetNode.type) &&
            (getTargetInstFunc = getTargetInstForClickEvent);
      if (
        getTargetInstFunc &&
        (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))
      )
        return createAndAccumulateChangeEvent(
          getTargetInstFunc,
          nativeEvent,
          nativeEventTarget
        );
      handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
      "blur" === topLevelType &&
        (topLevelType = targetNode._wrapperState) &&
        topLevelType.controlled &&
        "number" === targetNode.type &&
        (disableInputAttributeSyncing ||
          setDefaultValue(targetNode, "number", targetNode.value));
    }
  },
  SyntheticUIEvent = SyntheticEvent.extend({ view: null, detail: null }),
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState
    ? nativeEvent.getModifierState(keyArg)
    : (keyArg = modifierKeyToProp[keyArg])
      ? !!nativeEvent[keyArg]
      : !1;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var previousScreenX = 0,
  previousScreenY = 0,
  isMovementXSet = !1,
  isMovementYSet = !1,
  SyntheticMouseEvent = SyntheticUIEvent.extend({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: null,
    buttons: null,
    relatedTarget: function(event) {
      return (
        event.relatedTarget ||
        (event.fromElement === event.srcElement
          ? event.toElement
          : event.fromElement)
      );
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      var screenX = previousScreenX;
      previousScreenX = event.screenX;
      return isMovementXSet
        ? "mousemove" === event.type
          ? event.screenX - screenX
          : 0
        : ((isMovementXSet = !0), 0);
    },
    movementY: function(event) {
      if ("movementY" in event) return event.movementY;
      var screenY = previousScreenY;
      previousScreenY = event.screenY;
      return isMovementYSet
        ? "mousemove" === event.type
          ? event.screenY - screenY
          : 0
        : ((isMovementYSet = !0), 0);
    }
  }),
  SyntheticPointerEvent = SyntheticMouseEvent.extend({
    pointerId: null,
    width: null,
    height: null,
    pressure: null,
    tangentialPressure: null,
    tiltX: null,
    tiltY: null,
    twist: null,
    pointerType: null,
    isPrimary: null
  }),
  eventTypes$2 = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
  EnterLeaveEventPlugin = {
    eventTypes: eventTypes$2,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var isOverEvent =
          "mouseover" === topLevelType || "pointerover" === topLevelType,
        isOutEvent =
          "mouseout" === topLevelType || "pointerout" === topLevelType;
      if (
        (isOverEvent &&
          (nativeEvent.relatedTarget || nativeEvent.fromElement)) ||
        (!isOutEvent && !isOverEvent)
      )
        return null;
      isOverEvent =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget
          : (isOverEvent = nativeEventTarget.ownerDocument)
            ? isOverEvent.defaultView || isOverEvent.parentWindow
            : window;
      isOutEvent
        ? ((isOutEvent = targetInst),
          (targetInst = (targetInst =
            nativeEvent.relatedTarget || nativeEvent.toElement)
            ? getClosestInstanceFromNode(targetInst)
            : null))
        : (isOutEvent = null);
      if (isOutEvent === targetInst) return null;
      var eventInterface = void 0,
        leaveEventType = void 0,
        enterEventType = void 0,
        eventTypePrefix = void 0;
      if ("mouseout" === topLevelType || "mouseover" === topLevelType)
        (eventInterface = SyntheticMouseEvent),
          (leaveEventType = eventTypes$2.mouseLeave),
          (enterEventType = eventTypes$2.mouseEnter),
          (eventTypePrefix = "mouse");
      else if ("pointerout" === topLevelType || "pointerover" === topLevelType)
        (eventInterface = SyntheticPointerEvent),
          (leaveEventType = eventTypes$2.pointerLeave),
          (enterEventType = eventTypes$2.pointerEnter),
          (eventTypePrefix = "pointer");
      var fromNode =
        null == isOutEvent ? isOverEvent : getNodeFromInstance$1(isOutEvent);
      isOverEvent =
        null == targetInst ? isOverEvent : getNodeFromInstance$1(targetInst);
      topLevelType = eventInterface.getPooled(
        leaveEventType,
        isOutEvent,
        nativeEvent,
        nativeEventTarget
      );
      topLevelType.type = eventTypePrefix + "leave";
      topLevelType.target = fromNode;
      topLevelType.relatedTarget = isOverEvent;
      nativeEvent = eventInterface.getPooled(
        enterEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      nativeEvent.type = eventTypePrefix + "enter";
      nativeEvent.target = isOverEvent;
      nativeEvent.relatedTarget = fromNode;
      nativeEventTarget = targetInst;
      if (isOutEvent && nativeEventTarget)
        a: {
          targetInst = isOutEvent;
          isOverEvent = nativeEventTarget;
          eventTypePrefix = 0;
          for (
            eventInterface = targetInst;
            eventInterface;
            eventInterface = getParent(eventInterface)
          )
            eventTypePrefix++;
          eventInterface = 0;
          for (
            enterEventType = isOverEvent;
            enterEventType;
            enterEventType = getParent(enterEventType)
          )
            eventInterface++;
          for (; 0 < eventTypePrefix - eventInterface; )
            (targetInst = getParent(targetInst)), eventTypePrefix--;
          for (; 0 < eventInterface - eventTypePrefix; )
            (isOverEvent = getParent(isOverEvent)), eventInterface--;
          for (; eventTypePrefix--; ) {
            if (
              targetInst === isOverEvent ||
              targetInst === isOverEvent.alternate
            )
              break a;
            targetInst = getParent(targetInst);
            isOverEvent = getParent(isOverEvent);
          }
          targetInst = null;
        }
      else targetInst = null;
      isOverEvent = targetInst;
      for (targetInst = []; isOutEvent && isOutEvent !== isOverEvent; ) {
        eventTypePrefix = isOutEvent.alternate;
        if (null !== eventTypePrefix && eventTypePrefix === isOverEvent) break;
        targetInst.push(isOutEvent);
        isOutEvent = getParent(isOutEvent);
      }
      for (
        isOutEvent = [];
        nativeEventTarget && nativeEventTarget !== isOverEvent;

      ) {
        eventTypePrefix = nativeEventTarget.alternate;
        if (null !== eventTypePrefix && eventTypePrefix === isOverEvent) break;
        isOutEvent.push(nativeEventTarget);
        nativeEventTarget = getParent(nativeEventTarget);
      }
      for (
        nativeEventTarget = 0;
        nativeEventTarget < targetInst.length;
        nativeEventTarget++
      )
        accumulateDispatches(
          targetInst[nativeEventTarget],
          "bubbled",
          topLevelType
        );
      for (nativeEventTarget = isOutEvent.length; 0 < nativeEventTarget--; )
        accumulateDispatches(
          isOutEvent[nativeEventTarget],
          "captured",
          nativeEvent
        );
      return [topLevelType, nativeEvent];
    }
  };
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return !0;
  if (
    "object" !== typeof objA ||
    null === objA ||
    "object" !== typeof objB ||
    null === objB
  )
    return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++)
    if (
      !hasOwnProperty$1.call(objB, keysA[keysB]) ||
      !is(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
var EventListenerWWW = require("EventListener"),
  SyntheticAnimationEvent = SyntheticEvent.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticClipboardEvent = SyntheticEvent.extend({
    clipboardData: function(event) {
      return "clipboardData" in event
        ? event.clipboardData
        : window.clipboardData;
    }
  }),
  SyntheticFocusEvent = SyntheticUIEvent.extend({ relatedTarget: null });
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent
    ? ((nativeEvent = nativeEvent.charCode),
      0 === nativeEvent && 13 === keyCode && (nativeEvent = 13))
    : (nativeEvent = keyCode);
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
var normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  SyntheticKeyboardEvent = SyntheticUIEvent.extend({
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type
        ? ((nativeEvent = getEventCharCode(nativeEvent)),
          13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent))
        : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type
          ? translateToKey[nativeEvent.keyCode] || "Unidentified"
          : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type
        ? event.keyCode
        : 0;
    },
    which: function(event) {
      return "keypress" === event.type
        ? getEventCharCode(event)
        : "keydown" === event.type || "keyup" === event.type
          ? event.keyCode
          : 0;
    }
  }),
  SyntheticDragEvent = SyntheticMouseEvent.extend({ dataTransfer: null }),
  SyntheticTouchEvent = SyntheticUIEvent.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  }),
  SyntheticTransitionEvent = SyntheticEvent.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticWheelEvent = SyntheticMouseEvent.extend({
    deltaX: function(event) {
      return "deltaX" in event
        ? event.deltaX
        : "wheelDeltaX" in event
          ? -event.wheelDeltaX
          : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event
        ? event.deltaY
        : "wheelDeltaY" in event
          ? -event.wheelDeltaY
          : "wheelDelta" in event
            ? -event.wheelDelta
            : 0;
    },
    deltaZ: null,
    deltaMode: null
  }),
  nonInteractiveEventTypeNames = [
    ["abort", "abort"],
    [TOP_ANIMATION_END, "animationEnd"],
    [TOP_ANIMATION_ITERATION, "animationIteration"],
    [TOP_ANIMATION_START, "animationStart"],
    ["canplay", "canPlay"],
    ["canplaythrough", "canPlayThrough"],
    ["drag", "drag"],
    ["dragenter", "dragEnter"],
    ["dragexit", "dragExit"],
    ["dragleave", "dragLeave"],
    ["dragover", "dragOver"],
    ["durationchange", "durationChange"],
    ["emptied", "emptied"],
    ["encrypted", "encrypted"],
    ["ended", "ended"],
    ["error", "error"],
    ["gotpointercapture", "gotPointerCapture"],
    ["load", "load"],
    ["loadeddata", "loadedData"],
    ["loadedmetadata", "loadedMetadata"],
    ["loadstart", "loadStart"],
    ["lostpointercapture", "lostPointerCapture"],
    ["mousemove", "mouseMove"],
    ["mouseout", "mouseOut"],
    ["mouseover", "mouseOver"],
    ["playing", "playing"],
    ["pointermove", "pointerMove"],
    ["pointerout", "pointerOut"],
    ["pointerover", "pointerOver"],
    ["progress", "progress"],
    ["scroll", "scroll"],
    ["seeking", "seeking"],
    ["stalled", "stalled"],
    ["suspend", "suspend"],
    ["timeupdate", "timeUpdate"],
    ["toggle", "toggle"],
    ["touchmove", "touchMove"],
    [TOP_TRANSITION_END, "transitionEnd"],
    ["waiting", "waiting"],
    ["wheel", "wheel"]
  ],
  eventTypes$4 = {},
  topLevelEventsToDispatchConfig = {};
function addEventTypeNameToConfig(_ref, isInteractive) {
  var topEvent = _ref[0];
  _ref = _ref[1];
  var onEvent = "on" + (_ref[0].toUpperCase() + _ref.slice(1));
  isInteractive = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + "Capture"
    },
    dependencies: [topEvent],
    isInteractive: isInteractive
  };
  eventTypes$4[_ref] = isInteractive;
  topLevelEventsToDispatchConfig[topEvent] = isInteractive;
}
[
  ["blur", "blur"],
  ["cancel", "cancel"],
  ["click", "click"],
  ["close", "close"],
  ["contextmenu", "contextMenu"],
  ["copy", "copy"],
  ["cut", "cut"],
  ["auxclick", "auxClick"],
  ["dblclick", "doubleClick"],
  ["dragend", "dragEnd"],
  ["dragstart", "dragStart"],
  ["drop", "drop"],
  ["focus", "focus"],
  ["input", "input"],
  ["invalid", "invalid"],
  ["keydown", "keyDown"],
  ["keypress", "keyPress"],
  ["keyup", "keyUp"],
  ["mousedown", "mouseDown"],
  ["mouseup", "mouseUp"],
  ["paste", "paste"],
  ["pause", "pause"],
  ["play", "play"],
  ["pointercancel", "pointerCancel"],
  ["pointerdown", "pointerDown"],
  ["pointerup", "pointerUp"],
  ["ratechange", "rateChange"],
  ["reset", "reset"],
  ["seeked", "seeked"],
  ["submit", "submit"],
  ["touchcancel", "touchCancel"],
  ["touchend", "touchEnd"],
  ["touchstart", "touchStart"],
  ["volumechange", "volumeChange"]
].forEach(function(eventTuple) {
  addEventTypeNameToConfig(eventTuple, !0);
});
nonInteractiveEventTypeNames.forEach(function(eventTuple) {
  addEventTypeNameToConfig(eventTuple, !1);
});
var SimpleEventPlugin = {
    eventTypes: eventTypes$4,
    isInteractiveTopLevelEventType: function(topLevelType) {
      topLevelType = topLevelEventsToDispatchConfig[topLevelType];
      return void 0 !== topLevelType && !0 === topLevelType.isInteractive;
    },
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
      if (!dispatchConfig) return null;
      switch (topLevelType) {
        case "keypress":
          if (0 === getEventCharCode(nativeEvent)) return null;
        case "keydown":
        case "keyup":
          topLevelType = SyntheticKeyboardEvent;
          break;
        case "blur":
        case "focus":
          topLevelType = SyntheticFocusEvent;
          break;
        case "click":
          if (2 === nativeEvent.button) return null;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          topLevelType = SyntheticMouseEvent;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          topLevelType = SyntheticDragEvent;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          topLevelType = SyntheticTouchEvent;
          break;
        case TOP_ANIMATION_END:
        case TOP_ANIMATION_ITERATION:
        case TOP_ANIMATION_START:
          topLevelType = SyntheticAnimationEvent;
          break;
        case TOP_TRANSITION_END:
          topLevelType = SyntheticTransitionEvent;
          break;
        case "scroll":
          topLevelType = SyntheticUIEvent;
          break;
        case "wheel":
          topLevelType = SyntheticWheelEvent;
          break;
        case "copy":
        case "cut":
        case "paste":
          topLevelType = SyntheticClipboardEvent;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          topLevelType = SyntheticPointerEvent;
          break;
        default:
          topLevelType = SyntheticEvent;
      }
      targetInst = topLevelType.getPooled(
        dispatchConfig,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      accumulateTwoPhaseDispatches(targetInst);
      return targetInst;
    }
  },
  isInteractiveTopLevelEventType =
    SimpleEventPlugin.isInteractiveTopLevelEventType,
  callbackBookkeepingPool = [];
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst,
    ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root;
    for (root = ancestor; root.return; ) root = root.return;
    root = 3 !== root.tag ? null : root.stateNode.containerInfo;
    if (!root) break;
    bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);
  for (ancestor = 0; ancestor < bookKeeping.ancestors.length; ancestor++) {
    targetInst = bookKeeping.ancestors[ancestor];
    var nativeEventTarget = getEventTarget(bookKeeping.nativeEvent);
    root = bookKeeping.topLevelType;
    for (
      var nativeEvent = bookKeeping.nativeEvent, events = null, i = 0;
      i < plugins.length;
      i++
    ) {
      var possiblePlugin = plugins[i];
      possiblePlugin &&
        (possiblePlugin = possiblePlugin.extractEvents(
          root,
          targetInst,
          nativeEvent,
          nativeEventTarget
        )) &&
        (events = accumulateInto(events, possiblePlugin));
    }
    runEventsInBatch(events);
  }
}
var _enabled = !0;
function trapBubbledEvent(topLevelType, element) {
  if (!element) return null;
  var listener = (isInteractiveTopLevelEventType(topLevelType)
    ? dispatchInteractiveEvent
    : dispatchEvent
  ).bind(null, topLevelType);
  EventListenerWWW.listen(element, topLevelType, listener);
}
function trapCapturedEvent(topLevelType, element) {
  if (!element) return null;
  var listener = (isInteractiveTopLevelEventType(topLevelType)
    ? dispatchInteractiveEvent
    : dispatchEvent
  ).bind(null, topLevelType);
  EventListenerWWW.capture(element, topLevelType, listener);
}
function dispatchInteractiveEvent(topLevelType, nativeEvent) {
  _interactiveUpdatesImpl(dispatchEvent, topLevelType, nativeEvent);
}
function dispatchEvent(topLevelType, nativeEvent) {
  if (_enabled) {
    var nativeEventTarget = getEventTarget(nativeEvent);
    nativeEventTarget = getClosestInstanceFromNode(nativeEventTarget);
    null === nativeEventTarget ||
      "number" !== typeof nativeEventTarget.tag ||
      2 === isFiberMountedImpl(nativeEventTarget) ||
      (nativeEventTarget = null);
    if (callbackBookkeepingPool.length) {
      var instance = callbackBookkeepingPool.pop();
      instance.topLevelType = topLevelType;
      instance.nativeEvent = nativeEvent;
      instance.targetInst = nativeEventTarget;
      topLevelType = instance;
    } else
      topLevelType = {
        topLevelType: topLevelType,
        nativeEvent: nativeEvent,
        targetInst: nativeEventTarget,
        ancestors: []
      };
    try {
      batchedUpdates(handleTopLevel, topLevelType);
    } finally {
      (topLevelType.topLevelType = null),
        (topLevelType.nativeEvent = null),
        (topLevelType.targetInst = null),
        (topLevelType.ancestors.length = 0),
        10 > callbackBookkeepingPool.length &&
          callbackBookkeepingPool.push(topLevelType);
    }
  }
}
var alreadyListeningTo = {},
  reactTopListenersCounter = 0,
  topListenersIDKey = "_reactListenersID" + ("" + Math.random()).slice(2);
function getListeningForDocument(mountAt) {
  Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey) ||
    ((mountAt[topListenersIDKey] = reactTopListenersCounter++),
    (alreadyListeningTo[mountAt[topListenersIDKey]] = {}));
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <= offset && nodeEnd >= offset)
        return { node: node, offset: offset - root };
      root = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode
    ? outerNode === innerNode
      ? !0
      : outerNode && 3 === outerNode.nodeType
        ? !1
        : innerNode && 3 === innerNode.nodeType
          ? containsNode(outerNode, innerNode.parentNode)
          : "contains" in outerNode
            ? outerNode.contains(innerNode)
            : outerNode.compareDocumentPosition
              ? !!(outerNode.compareDocumentPosition(innerNode) & 16)
              : !1
    : !1;
}
function getActiveElementDeep() {
  for (
    var win = window, element = getActiveElement();
    element instanceof win.HTMLIFrameElement;

  ) {
    try {
      var JSCompiler_inline_result =
        "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = !1;
    }
    if (JSCompiler_inline_result) win = element.contentWindow;
    else break;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    (("input" === nodeName &&
      ("text" === elem.type ||
        "search" === elem.type ||
        "tel" === elem.type ||
        "url" === elem.type ||
        "password" === elem.type)) ||
      "textarea" === nodeName ||
      "true" === elem.contentEditable)
  );
}
function getSelectionInformation() {
  var focusedElem = getActiveElementDeep();
  if (hasSelectionCapabilities(focusedElem)) {
    if ("selectionStart" in focusedElem)
      var JSCompiler_temp = {
        start: focusedElem.selectionStart,
        end: focusedElem.selectionEnd
      };
    else
      a: {
        JSCompiler_temp =
          ((JSCompiler_temp = focusedElem.ownerDocument) &&
            JSCompiler_temp.defaultView) ||
          window;
        var selection =
          JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
        if (selection && 0 !== selection.rangeCount) {
          JSCompiler_temp = selection.anchorNode;
          var anchorOffset = selection.anchorOffset,
            focusNode = selection.focusNode;
          selection = selection.focusOffset;
          try {
            JSCompiler_temp.nodeType, focusNode.nodeType;
          } catch (e) {
            JSCompiler_temp = null;
            break a;
          }
          var length = 0,
            start = -1,
            end = -1,
            indexWithinAnchor = 0,
            indexWithinFocus = 0,
            node = focusedElem,
            parentNode = null;
          b: for (;;) {
            for (var next; ; ) {
              node !== JSCompiler_temp ||
                (0 !== anchorOffset && 3 !== node.nodeType) ||
                (start = length + anchorOffset);
              node !== focusNode ||
                (0 !== selection && 3 !== node.nodeType) ||
                (end = length + selection);
              3 === node.nodeType && (length += node.nodeValue.length);
              if (null === (next = node.firstChild)) break;
              parentNode = node;
              node = next;
            }
            for (;;) {
              if (node === focusedElem) break b;
              parentNode === JSCompiler_temp &&
                ++indexWithinAnchor === anchorOffset &&
                (start = length);
              parentNode === focusNode &&
                ++indexWithinFocus === selection &&
                (end = length);
              if (null !== (next = node.nextSibling)) break;
              node = parentNode;
              parentNode = node.parentNode;
            }
            node = next;
          }
          JSCompiler_temp =
            -1 === start || -1 === end ? null : { start: start, end: end };
        } else JSCompiler_temp = null;
      }
    JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
  } else JSCompiler_temp = null;
  return { focusedElem: focusedElem, selectionRange: JSCompiler_temp };
}
function restoreSelection(priorSelectionInformation) {
  var curFocusedElem = getActiveElementDeep(),
    priorFocusedElem = priorSelectionInformation.focusedElem,
    priorSelectionRange = priorSelectionInformation.selectionRange;
  if (
    curFocusedElem !== priorFocusedElem &&
    priorFocusedElem &&
    priorFocusedElem.ownerDocument &&
    containsNode(
      priorFocusedElem.ownerDocument.documentElement,
      priorFocusedElem
    )
  ) {
    if (
      null !== priorSelectionRange &&
      hasSelectionCapabilities(priorFocusedElem)
    )
      if (
        ((curFocusedElem = priorSelectionRange.start),
        (priorSelectionInformation = priorSelectionRange.end),
        void 0 === priorSelectionInformation &&
          (priorSelectionInformation = curFocusedElem),
        "selectionStart" in priorFocusedElem)
      )
        (priorFocusedElem.selectionStart = curFocusedElem),
          (priorFocusedElem.selectionEnd = Math.min(
            priorSelectionInformation,
            priorFocusedElem.value.length
          ));
      else if (
        ((priorSelectionInformation =
          ((curFocusedElem = priorFocusedElem.ownerDocument || document) &&
            curFocusedElem.defaultView) ||
          window),
        priorSelectionInformation.getSelection)
      ) {
        priorSelectionInformation = priorSelectionInformation.getSelection();
        var length = priorFocusedElem.textContent.length,
          start = Math.min(priorSelectionRange.start, length);
        priorSelectionRange =
          void 0 === priorSelectionRange.end
            ? start
            : Math.min(priorSelectionRange.end, length);
        !priorSelectionInformation.extend &&
          start > priorSelectionRange &&
          ((length = priorSelectionRange),
          (priorSelectionRange = start),
          (start = length));
        length = getNodeForCharacterOffset(priorFocusedElem, start);
        var endMarker = getNodeForCharacterOffset(
          priorFocusedElem,
          priorSelectionRange
        );
        length &&
          endMarker &&
          (1 !== priorSelectionInformation.rangeCount ||
            priorSelectionInformation.anchorNode !== length.node ||
            priorSelectionInformation.anchorOffset !== length.offset ||
            priorSelectionInformation.focusNode !== endMarker.node ||
            priorSelectionInformation.focusOffset !== endMarker.offset) &&
          ((curFocusedElem = curFocusedElem.createRange()),
          curFocusedElem.setStart(length.node, length.offset),
          priorSelectionInformation.removeAllRanges(),
          start > priorSelectionRange
            ? (priorSelectionInformation.addRange(curFocusedElem),
              priorSelectionInformation.extend(
                endMarker.node,
                endMarker.offset
              ))
            : (curFocusedElem.setEnd(endMarker.node, endMarker.offset),
              priorSelectionInformation.addRange(curFocusedElem)));
      }
    curFocusedElem = [];
    for (
      priorSelectionInformation = priorFocusedElem;
      (priorSelectionInformation = priorSelectionInformation.parentNode);

    )
      1 === priorSelectionInformation.nodeType &&
        curFocusedElem.push({
          element: priorSelectionInformation,
          left: priorSelectionInformation.scrollLeft,
          top: priorSelectionInformation.scrollTop
        });
    "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
    for (
      priorFocusedElem = 0;
      priorFocusedElem < curFocusedElem.length;
      priorFocusedElem++
    )
      (priorSelectionInformation = curFocusedElem[priorFocusedElem]),
        (priorSelectionInformation.element.scrollLeft =
          priorSelectionInformation.left),
        (priorSelectionInformation.element.scrollTop =
          priorSelectionInformation.top);
  }
}
var skipSelectionChangeEvent =
    canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  eventTypes$3 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    }
  },
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc =
    nativeEventTarget.window === nativeEventTarget
      ? nativeEventTarget.document
      : 9 === nativeEventTarget.nodeType
        ? nativeEventTarget
        : nativeEventTarget.ownerDocument;
  if (
    mouseDown ||
    null == activeElement$1 ||
    activeElement$1 !== getActiveElement(doc)
  )
    return null;
  doc = activeElement$1;
  "selectionStart" in doc && hasSelectionCapabilities(doc)
    ? (doc = { start: doc.selectionStart, end: doc.selectionEnd })
    : ((doc = (
        (doc.ownerDocument && doc.ownerDocument.defaultView) ||
        window
      ).getSelection()),
      (doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }));
  return lastSelection && shallowEqual(lastSelection, doc)
    ? null
    : ((lastSelection = doc),
      (nativeEvent = SyntheticEvent.getPooled(
        eventTypes$3.select,
        activeElementInst$1,
        nativeEvent,
        nativeEventTarget
      )),
      (nativeEvent.type = "select"),
      (nativeEvent.target = activeElement$1),
      accumulateTwoPhaseDispatches(nativeEvent),
      nativeEvent);
}
var SelectEventPlugin = {
  eventTypes: eventTypes$3,
  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var doc =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
            ? nativeEventTarget
            : nativeEventTarget.ownerDocument,
      JSCompiler_temp;
    if (!(JSCompiler_temp = !doc)) {
      a: {
        doc = getListeningForDocument(doc);
        JSCompiler_temp = registrationNameDependencies.onSelect;
        for (var i = 0; i < JSCompiler_temp.length; i++) {
          var dependency = JSCompiler_temp[i];
          if (!doc.hasOwnProperty(dependency) || !doc[dependency]) {
            doc = !1;
            break a;
          }
        }
        doc = !0;
      }
      JSCompiler_temp = !doc;
    }
    if (JSCompiler_temp) return null;
    doc = targetInst ? getNodeFromInstance$1(targetInst) : window;
    switch (topLevelType) {
      case "focus":
        if (isTextInputElement(doc) || "true" === doc.contentEditable)
          (activeElement$1 = doc),
            (activeElementInst$1 = targetInst),
            (lastSelection = null);
        break;
      case "blur":
        lastSelection = activeElementInst$1 = activeElement$1 = null;
        break;
      case "mousedown":
        mouseDown = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        return (
          (mouseDown = !1), constructSelectEvent(nativeEvent, nativeEventTarget)
        );
      case "selectionchange":
        if (skipSelectionChangeEvent) break;
      case "keydown":
      case "keyup":
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }
    return null;
  }
};
injection.injectEventPluginOrder(
  "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
    " "
  )
);
getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNode$1;
getInstanceFromNode = getInstanceFromNode$1;
getNodeFromInstance = getNodeFromInstance$1;
injection.injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function getHostProps$1(element, props) {
  element = Object.assign({ children: void 0 }, props);
  if ((props = flattenChildren(props.children))) element.children = props;
  return element;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = !0;
    for (propValue = 0; propValue < node.length; propValue++)
      (i = multiple.hasOwnProperty("$" + node[propValue].value)),
        node[propValue].selected !== i && (node[propValue].selected = i),
        i && setDefaultSelected && (node[propValue].defaultSelected = !0);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = !0;
        setDefaultSelected && (node[i].defaultSelected = !0);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = !0);
  }
}
function getHostProps$3(element, props) {
  null != props.dangerouslySetInnerHTML ? reactProdInvariant("91") : void 0;
  return Object.assign({}, props, {
    value: void 0,
    defaultValue: void 0,
    children: "" + element._wrapperState.initialValue
  });
}
function initWrapperState$2(element, props) {
  var initialValue = props.value;
  null == initialValue &&
    ((initialValue = props.defaultValue),
    (props = props.children),
    null != props &&
      (null != initialValue ? reactProdInvariant("92") : void 0,
      Array.isArray(props) &&
        (1 >= props.length ? void 0 : reactProdInvariant("93"),
        (props = props[0])),
      (initialValue = props)),
    null == initialValue && (initialValue = ""));
  element._wrapperState = { initialValue: getToStringValue(initialValue) };
}
function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value &&
    ((value = "" + value),
    value !== element.value && (element.value = value),
    null == props.defaultValue &&
      element.defaultValue !== value &&
      (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue);
}
function postMountWrapper$3(element) {
  var textContent = element.textContent;
  textContent === element._wrapperState.initialValue &&
    (element.value = textContent);
}
var Namespaces = {
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
function getChildNamespace(parentNamespace, type) {
  return null == parentNamespace ||
    "http://www.w3.org/1999/xhtml" === parentNamespace
    ? getIntrinsicNamespace(type)
    : "http://www.w3.org/2000/svg" === parentNamespace &&
      "foreignObject" === type
      ? "http://www.w3.org/1999/xhtml"
      : parentNamespace;
}
var reusableSVGContainer = void 0,
  setInnerHTML = (function(func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
      ? function(arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function() {
            return func(arg0, arg1, arg2, arg3);
          });
        }
      : func;
  })(function(node, html) {
    if (node.namespaceURI !== Namespaces.svg || "innerHTML" in node)
      node.innerHTML = html;
    else {
      reusableSVGContainer =
        reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML = "<svg>" + html + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild; )
        node.removeChild(node.firstChild);
      for (; html.firstChild; ) node.appendChild(html.firstChild);
    }
  });
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (
      firstChild &&
      firstChild === node.lastChild &&
      3 === firstChild.nodeType
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
var isUnitlessNumber = {
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
function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value
    ? ""
    : isCustomProperty ||
      "number" !== typeof value ||
      0 === value ||
      (isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
      ? ("" + value).trim()
      : value + "px";
}
function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles)
    if (styles.hasOwnProperty(styleName)) {
      var isCustomProperty = 0 === styleName.indexOf("--"),
        styleValue = dangerousStyleValue(
          styleName,
          styles[styleName],
          isCustomProperty
        );
      "float" === styleName && (styleName = "cssFloat");
      isCustomProperty
        ? node.setProperty(styleName, styleValue)
        : (node[styleName] = styleValue);
    }
}
var voidElementTags = Object.assign(
  { menuitem: !0 },
  {
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
  }
);
function assertValidProps(tag, props) {
  props &&
    (voidElementTags[tag] &&
      (null != props.children || null != props.dangerouslySetInnerHTML
        ? reactProdInvariant("137", tag, "")
        : void 0),
    null != props.dangerouslySetInnerHTML &&
      (null != props.children ? reactProdInvariant("60") : void 0,
      "object" === typeof props.dangerouslySetInnerHTML &&
      "__html" in props.dangerouslySetInnerHTML
        ? void 0
        : reactProdInvariant("61")),
    null != props.style && "object" !== typeof props.style
      ? reactProdInvariant("62", "")
      : void 0);
}
function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
function ensureListeningTo(rootContainerElement, registrationName) {
  rootContainerElement =
    9 === rootContainerElement.nodeType || 11 === rootContainerElement.nodeType
      ? rootContainerElement
      : rootContainerElement.ownerDocument;
  var isListening = getListeningForDocument(rootContainerElement);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++) {
    var dependency = registrationName[i];
    if (!isListening.hasOwnProperty(dependency) || !isListening[dependency]) {
      switch (dependency) {
        case "scroll":
          trapCapturedEvent("scroll", rootContainerElement);
          break;
        case "focus":
        case "blur":
          trapCapturedEvent("focus", rootContainerElement);
          trapCapturedEvent("blur", rootContainerElement);
          isListening.blur = !0;
          isListening.focus = !0;
          break;
        case "cancel":
        case "close":
          isEventSupported(dependency) &&
            trapCapturedEvent(dependency, rootContainerElement);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === mediaEventTypes.indexOf(dependency) &&
            trapBubbledEvent(dependency, rootContainerElement);
      }
      isListening[dependency] = !0;
    }
  }
}
function noop() {}
var eventsEnabled = null,
  selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return !1;
}
function shouldSetTextContent(type, props) {
  return (
    "textarea" === type ||
    "option" === type ||
    "noscript" === type ||
    "string" === typeof props.children ||
    "number" === typeof props.children ||
    ("object" === typeof props.dangerouslySetInnerHTML &&
      null !== props.dangerouslySetInnerHTML &&
      null != props.dangerouslySetInnerHTML.__html)
  );
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0,
  schedulePassiveEffects = scheduler.unstable_scheduleCallback,
  cancelPassiveEffects = scheduler.unstable_cancelCallback;
function commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
  domElement[internalEventHandlersKey] = newProps;
  "input" === type &&
    "radio" === newProps.type &&
    null != newProps.name &&
    updateChecked(domElement, newProps);
  isCustomComponent(type, oldProps);
  oldProps = isCustomComponent(type, newProps);
  for (var i = 0; i < updatePayload.length; i += 2) {
    var propKey = updatePayload[i],
      propValue = updatePayload[i + 1];
    "style" === propKey
      ? setValueForStyles(domElement, propValue)
      : "dangerouslySetInnerHTML" === propKey
        ? setInnerHTML(domElement, propValue)
        : "children" === propKey
          ? setTextContent(domElement, propValue)
          : setValueForProperty(domElement, propKey, propValue, oldProps);
  }
  switch (type) {
    case "input":
      updateWrapper(domElement, newProps);
      break;
    case "textarea":
      updateWrapper$1(domElement, newProps);
      break;
    case "select":
      (updatePayload = domElement._wrapperState.wasMultiple),
        (domElement._wrapperState.wasMultiple = !!newProps.multiple),
        (type = newProps.value),
        null != type
          ? updateOptions(domElement, !!newProps.multiple, type, !1)
          : updatePayload !== !!newProps.multiple &&
            (null != newProps.defaultValue
              ? updateOptions(
                  domElement,
                  !!newProps.multiple,
                  newProps.defaultValue,
                  !0
                )
              : updateOptions(
                  domElement,
                  !!newProps.multiple,
                  newProps.multiple ? [] : "",
                  !1
                ));
  }
}
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance;
  suspenseInstance = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (((node = nextNode.data), "/$" === node))
        if (0 === suspenseInstance) {
          parentInstance.removeChild(nextNode);
          break;
        } else suspenseInstance--;
      else "$" === node && suspenseInstance++;
    node = nextNode;
  } while (node);
}
function getNextHydratableSibling(instance) {
  for (
    instance = instance.nextSibling;
    instance &&
    1 !== instance.nodeType &&
    3 !== instance.nodeType &&
    (8 !== instance.nodeType || "$" !== instance.data);

  )
    instance = instance.nextSibling;
  return instance;
}
function getFirstHydratableChild(parentInstance) {
  for (
    parentInstance = parentInstance.firstChild;
    parentInstance &&
    1 !== parentInstance.nodeType &&
    3 !== parentInstance.nodeType &&
    (8 !== parentInstance.nodeType || "$" !== parentInstance.data);

  )
    parentInstance = parentInstance.nextSibling;
  return parentInstance;
}
var supportsUserTiming =
    "undefined" !== typeof performance &&
    "function" === typeof performance.mark &&
    "function" === typeof performance.clearMarks &&
    "function" === typeof performance.measure &&
    "function" === typeof performance.clearMeasures,
  currentFiber = null,
  currentPhase = null,
  currentPhaseFiber = null,
  isCommitting = !1,
  hasScheduledUpdateInCurrentCommit = !1,
  hasScheduledUpdateInCurrentPhase = !1,
  commitCountInCurrentWorkLoop = 0,
  effectCountInCurrentCommit = 0,
  isWaitingForCallback = !1,
  labelsInCurrentCommit = new Set();
function beginMark(markName) {
  performance.mark("\u269b " + markName);
}
function endMark(label, markName, warning) {
  markName = "\u269b " + markName;
  label =
    (warning ? "\u26d4 " : "\u269b ") +
    label +
    (warning ? " Warning: " + warning : "");
  try {
    performance.measure(label, markName);
  } catch (err) {}
  performance.clearMarks(markName);
  performance.clearMeasures(label);
}
function getFiberLabel(componentName, isMounted, phase) {
  return null === phase
    ? componentName + " [" + (isMounted ? "update" : "mount") + "]"
    : componentName + "." + phase;
}
function beginFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  if (isCommitting && labelsInCurrentCommit.has(fiber)) return !1;
  labelsInCurrentCommit.add(fiber);
  beginMark(fiber + " (#" + debugID + ")");
  return !0;
}
function clearFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber =
    getFiberLabel(componentName, null !== fiber.alternate, phase) +
    " (#" +
    debugID +
    ")";
  performance.clearMarks("\u269b " + fiber);
}
function endFiberMark(fiber, phase, warning) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  endMark(fiber, fiber + " (#" + debugID + ")", warning);
}
function shouldIgnoreFiber(fiber) {
  switch (fiber.tag) {
    case 3:
    case 5:
    case 6:
    case 4:
    case 7:
    case 10:
    case 9:
    case 8:
      return !0;
    default:
      return !1;
  }
}
function resumeTimersRecursively(fiber) {
  null !== fiber.return && resumeTimersRecursively(fiber.return);
  fiber._debugIsCurrentlyTiming && beginFiberMark(fiber, null);
}
function startWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber = fiber),
    beginFiberMark(fiber, null) && (fiber._debugIsCurrentlyTiming = !0));
}
function cancelWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((fiber._debugIsCurrentlyTiming = !1), clearFiberMark(fiber, null));
}
function stopWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber = fiber.return),
    fiber._debugIsCurrentlyTiming &&
      ((fiber._debugIsCurrentlyTiming = !1), endFiberMark(fiber, null, null)));
}
function startPhaseTimer(fiber, phase) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      clearFiberMark(currentPhaseFiber, currentPhase),
    (currentPhase = currentPhaseFiber = null),
    (hasScheduledUpdateInCurrentPhase = !1),
    beginFiberMark(fiber, phase) &&
      ((currentPhaseFiber = fiber), (currentPhase = phase)));
}
function stopPhaseTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      endFiberMark(
        currentPhaseFiber,
        currentPhase,
        hasScheduledUpdateInCurrentPhase ? "Scheduled a cascading update" : null
      ),
    (currentPhaseFiber = currentPhase = null));
}
function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
  if (enableUserTimingAPI && supportsUserTiming) {
    var warning = null;
    null !== interruptedBy
      ? (warning =
          3 === interruptedBy.tag
            ? "A top-level update interrupted the previous render"
            : "An update to " +
              (getComponentName(interruptedBy.type) || "Unknown") +
              " interrupted the previous render")
      : 1 < commitCountInCurrentWorkLoop &&
        (warning = "There were cascading updates");
    commitCountInCurrentWorkLoop = 0;
    interruptedBy = didCompleteRoot
      ? "(React Tree Reconciliation: Completed Root)"
      : "(React Tree Reconciliation: Yielded)";
    for (didCompleteRoot = currentFiber; didCompleteRoot; )
      didCompleteRoot._debugIsCurrentlyTiming &&
        endFiberMark(didCompleteRoot, null, null),
        (didCompleteRoot = didCompleteRoot.return);
    endMark(interruptedBy, "(React Tree Reconciliation)", warning);
  }
}
function stopCommitTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var warning = null;
    hasScheduledUpdateInCurrentCommit
      ? (warning = "Lifecycle hook scheduled a cascading update")
      : 0 < commitCountInCurrentWorkLoop &&
        (warning = "Caused by a cascading update in earlier commit");
    hasScheduledUpdateInCurrentCommit = !1;
    commitCountInCurrentWorkLoop++;
    isCommitting = !1;
    labelsInCurrentCommit.clear();
    endMark("(Committing Changes)", "(Committing Changes)", warning);
  }
}
function stopCommitSnapshotEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Snapshot Effects: " + count + " Total)",
      "(Committing Snapshot Effects)",
      null
    );
  }
}
function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Host Effects: " + count + " Total)",
      "(Committing Host Effects)",
      null
    );
  }
}
function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Calling Lifecycle Methods: " + count + " Total)",
      "(Calling Lifecycle Methods)",
      null
    );
  }
}
var valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index ||
    ((cursor.current = valueStack[index]), (valueStack[index] = null), index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  contextStackCursor = { current: emptyContextObject },
  didPerformWorkStackCursor = { current: !1 },
  previousContext = emptyContextObject;
function getMaskedContext(workInProgress, unmaskedContext) {
  var contextTypes = workInProgress.type.contextTypes;
  if (!contextTypes) return emptyContextObject;
  var instance = workInProgress.stateNode;
  if (
    instance &&
    instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext
  )
    return instance.__reactInternalMemoizedMaskedChildContext;
  var context = {},
    key;
  for (key in contextTypes) context[key] = unmaskedContext[key];
  instance &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return context;
}
function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && void 0 !== type;
}
function popContext(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function pushTopLevelContextObject(fiber, context, didChange) {
  contextStackCursor.current !== emptyContextObject
    ? reactProdInvariant("168")
    : void 0;
  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}
function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode,
    childContextTypes = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  startPhaseTimer(fiber, "getChildContext");
  fiber = instance.getChildContext();
  stopPhaseTimer();
  for (var contextKey in fiber)
    contextKey in childContextTypes
      ? void 0
      : reactProdInvariant(
          "108",
          getComponentName(type) || "Unknown",
          contextKey
        );
  return Object.assign({}, parentContext, fiber);
}
function pushContextProvider(workInProgress) {
  var instance = workInProgress.stateNode;
  instance =
    (instance && instance.__reactInternalMemoizedMergedChildContext) ||
    emptyContextObject;
  previousContext = contextStackCursor.current;
  push(contextStackCursor, instance, workInProgress);
  push(
    didPerformWorkStackCursor,
    didPerformWorkStackCursor.current,
    workInProgress
  );
  return !0;
}
function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  instance ? void 0 : reactProdInvariant("169");
  didChange
    ? ((type = processChildContext(workInProgress, type, previousContext)),
      (instance.__reactInternalMemoizedMergedChildContext = type),
      pop(didPerformWorkStackCursor, workInProgress),
      pop(contextStackCursor, workInProgress),
      push(contextStackCursor, type, workInProgress))
    : pop(didPerformWorkStackCursor, workInProgress);
  push(didPerformWorkStackCursor, didChange, workInProgress);
}
var onCommitFiberRoot = null,
  onCommitFiberUnmount = null;
function catchErrors(fn) {
  return function(arg) {
    try {
      return fn(arg);
    } catch (err) {}
  };
}
var isDevToolsPresent = "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__;
function injectInternals(internals) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled || !hook.supportsFiber) return !0;
  try {
    var rendererID = hook.inject(internals);
    onCommitFiberRoot = catchErrors(function(root) {
      return hook.onCommitFiberRoot(rendererID, root);
    });
    onCommitFiberUnmount = catchErrors(function(fiber) {
      return hook.onCommitFiberUnmount(rendererID, fiber);
    });
  } catch (err) {}
  return !0;
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.contextDependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
  this.treeBaseDuration = this.selfBaseDuration = this.actualStartTime = this.actualDuration =
    Number.NaN;
  this.actualDuration = 0;
  this.actualStartTime = -1;
  this.treeBaseDuration = this.selfBaseDuration = 0;
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component)
    return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress
    ? ((workInProgress = createFiber(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      )),
      (workInProgress.elementType = current.elementType),
      (workInProgress.type = current.type),
      (workInProgress.stateNode = current.stateNode),
      (workInProgress.alternate = current),
      (current.alternate = workInProgress))
    : ((workInProgress.pendingProps = pendingProps),
      (workInProgress.effectTag = 0),
      (workInProgress.nextEffect = null),
      (workInProgress.firstEffect = null),
      (workInProgress.lastEffect = null),
      (workInProgress.actualDuration = 0),
      (workInProgress.actualStartTime = -1));
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.contextDependencies = current.contextDependencies;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  workInProgress.selfBaseDuration = current.selfBaseDuration;
  workInProgress.treeBaseDuration = current.treeBaseDuration;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  expirationTime
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(
          pendingProps.children,
          mode,
          expirationTime,
          key
        );
      case REACT_CONCURRENT_MODE_TYPE:
        return createFiberFromMode(pendingProps, mode | 3, expirationTime, key);
      case REACT_STRICT_MODE_TYPE:
        return createFiberFromMode(pendingProps, mode | 2, expirationTime, key);
      case REACT_PROFILER_TYPE:
        return (
          (type = createFiber(12, pendingProps, key, mode | 4)),
          (type.elementType = REACT_PROFILER_TYPE),
          (type.type = REACT_PROFILER_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.type = REACT_SUSPENSE_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONTEXT_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
          }
        reactProdInvariant("130", null == type ? type : typeof type, "");
    }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.expirationTime = expirationTime;
  return key;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  elements = createFiber(7, elements, key, mode);
  elements.expirationTime = expirationTime;
  return elements;
}
function createFiberFromMode(pendingProps, mode, expirationTime, key) {
  pendingProps = createFiber(8, pendingProps, key, mode);
  mode = 0 === (mode & 1) ? REACT_STRICT_MODE_TYPE : REACT_CONCURRENT_MODE_TYPE;
  pendingProps.elementType = mode;
  pendingProps.type = mode;
  pendingProps.expirationTime = expirationTime;
  return pendingProps;
}
function createFiberFromText(content, mode, expirationTime) {
  content = createFiber(6, content, null, mode);
  content.expirationTime = expirationTime;
  return content;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.expirationTime = expirationTime;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
var lowPriorityWarning = require("lowPriorityWarning");
function markPendingPriorityLevel(root, expirationTime) {
  root.didError = !1;
  var earliestPendingTime = root.earliestPendingTime;
  0 === earliestPendingTime
    ? (root.earliestPendingTime = root.latestPendingTime = expirationTime)
    : earliestPendingTime < expirationTime
      ? (root.earliestPendingTime = expirationTime)
      : root.latestPendingTime > expirationTime &&
        (root.latestPendingTime = expirationTime);
  findNextExpirationTimeToWorkOn(expirationTime, root);
}
function markCommittedPriorityLevels(root, earliestRemainingTime) {
  root.didError = !1;
  if (0 === earliestRemainingTime)
    (root.earliestPendingTime = 0),
      (root.latestPendingTime = 0),
      (root.earliestSuspendedTime = 0),
      (root.latestSuspendedTime = 0),
      (root.latestPingedTime = 0);
  else {
    earliestRemainingTime < root.latestPingedTime &&
      (root.latestPingedTime = 0);
    var latestPendingTime = root.latestPendingTime;
    0 !== latestPendingTime &&
      (latestPendingTime > earliestRemainingTime
        ? (root.earliestPendingTime = root.latestPendingTime = 0)
        : root.earliestPendingTime > earliestRemainingTime &&
          (root.earliestPendingTime = root.latestPendingTime));
    latestPendingTime = root.earliestSuspendedTime;
    0 === latestPendingTime
      ? markPendingPriorityLevel(root, earliestRemainingTime)
      : earliestRemainingTime < root.latestSuspendedTime
        ? ((root.earliestSuspendedTime = 0),
          (root.latestSuspendedTime = 0),
          (root.latestPingedTime = 0),
          markPendingPriorityLevel(root, earliestRemainingTime))
        : earliestRemainingTime > latestPendingTime &&
          markPendingPriorityLevel(root, earliestRemainingTime);
  }
  findNextExpirationTimeToWorkOn(0, root);
}
function hasLowerPriorityWork(root, erroredExpirationTime) {
  var latestPendingTime = root.latestPendingTime,
    latestSuspendedTime = root.latestSuspendedTime;
  root = root.latestPingedTime;
  return (
    (0 !== latestPendingTime && latestPendingTime < erroredExpirationTime) ||
    (0 !== latestSuspendedTime &&
      latestSuspendedTime < erroredExpirationTime) ||
    (0 !== root && root < erroredExpirationTime)
  );
}
function markSuspendedPriorityLevel(root, suspendedTime) {
  root.didError = !1;
  root.latestPingedTime >= suspendedTime && (root.latestPingedTime = 0);
  var earliestPendingTime = root.earliestPendingTime,
    latestPendingTime = root.latestPendingTime;
  earliestPendingTime === suspendedTime
    ? (root.earliestPendingTime =
        latestPendingTime === suspendedTime
          ? (root.latestPendingTime = 0)
          : latestPendingTime)
    : latestPendingTime === suspendedTime &&
      (root.latestPendingTime = earliestPendingTime);
  earliestPendingTime = root.earliestSuspendedTime;
  latestPendingTime = root.latestSuspendedTime;
  0 === earliestPendingTime
    ? (root.earliestSuspendedTime = root.latestSuspendedTime = suspendedTime)
    : earliestPendingTime < suspendedTime
      ? (root.earliestSuspendedTime = suspendedTime)
      : latestPendingTime > suspendedTime &&
        (root.latestSuspendedTime = suspendedTime);
  findNextExpirationTimeToWorkOn(suspendedTime, root);
}
function findEarliestOutstandingPriorityLevel(root, renderExpirationTime) {
  var earliestPendingTime = root.earliestPendingTime;
  root = root.earliestSuspendedTime;
  earliestPendingTime > renderExpirationTime &&
    (renderExpirationTime = earliestPendingTime);
  root > renderExpirationTime && (renderExpirationTime = root);
  return renderExpirationTime;
}
function findNextExpirationTimeToWorkOn(completedExpirationTime, root) {
  var earliestSuspendedTime = root.earliestSuspendedTime,
    latestSuspendedTime = root.latestSuspendedTime,
    earliestPendingTime = root.earliestPendingTime,
    latestPingedTime = root.latestPingedTime;
  earliestPendingTime =
    0 !== earliestPendingTime ? earliestPendingTime : latestPingedTime;
  0 === earliestPendingTime &&
    (0 === completedExpirationTime ||
      latestSuspendedTime < completedExpirationTime) &&
    (earliestPendingTime = latestSuspendedTime);
  completedExpirationTime = earliestPendingTime;
  0 !== completedExpirationTime &&
    earliestSuspendedTime > completedExpirationTime &&
    (completedExpirationTime = earliestSuspendedTime);
  root.nextExpirationTimeToWorkOn = earliestPendingTime;
  root.expirationTime = completedExpirationTime;
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
  }
  return baseProps;
}
function readLazyComponentType(lazyComponent) {
  var result = lazyComponent._result;
  switch (lazyComponent._status) {
    case 1:
      return result;
    case 2:
      throw result;
    case 0:
      throw result;
    default:
      lazyComponent._status = 0;
      result = lazyComponent._ctor;
      result = result();
      result.then(
        function(moduleObject) {
          0 === lazyComponent._status &&
            ((moduleObject = moduleObject.default),
            (lazyComponent._status = 1),
            (lazyComponent._result = moduleObject));
        },
        function(error) {
          0 === lazyComponent._status &&
            ((lazyComponent._status = 2), (lazyComponent._result = error));
        }
      );
      switch (lazyComponent._status) {
        case 1:
          return lazyComponent._result;
        case 2:
          throw lazyComponent._result;
      }
      lazyComponent._result = result;
      throw result;
  }
}
var emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps =
    null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps
      ? ctor
      : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  nextProps = workInProgress.updateQueue;
  null !== nextProps &&
    0 === workInProgress.expirationTime &&
    (nextProps.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternalFiber)
      ? 2 === isFiberMountedImpl(component)
      : !1;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime();
    currentTime = computeExpirationForFiber(currentTime, inst);
    var update = createUpdate(currentTime);
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    flushPassiveEffects();
    enqueueUpdate(inst, update);
    scheduleWork(inst, currentTime);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime();
    currentTime = computeExpirationForFiber(currentTime, inst);
    var update = createUpdate(currentTime);
    update.tag = ReplaceState;
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    flushPassiveEffects();
    enqueueUpdate(inst, update);
    scheduleWork(inst, currentTime);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime();
    currentTime = computeExpirationForFiber(currentTime, inst);
    var update = createUpdate(currentTime);
    update.tag = ForceUpdate;
    void 0 !== callback && null !== callback && (update.callback = callback);
    flushPassiveEffects();
    enqueueUpdate(inst, update);
    scheduleWork(inst, currentTime);
  }
};
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  var instance = workInProgress.stateNode;
  return "function" === typeof instance.shouldComponentUpdate
    ? (startPhaseTimer(workInProgress, "shouldComponentUpdate"),
      (workInProgress = instance.shouldComponentUpdate(
        newProps,
        newState,
        nextContext
      )),
      stopPhaseTimer(),
      workInProgress)
    : ctor.prototype && ctor.prototype.isPureReactComponent
      ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
      : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = !1,
    unmaskedContext = emptyContextObject;
  var context = ctor.contextType;
  "object" === typeof context && null !== context
    ? (context = readContext(context))
    : ((unmaskedContext = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (isLegacyContextConsumer = ctor.contextTypes),
      (context = (isLegacyContextConsumer =
        null !== isLegacyContextConsumer && void 0 !== isLegacyContextConsumer)
        ? getMaskedContext(workInProgress, unmaskedContext)
        : emptyContextObject));
  ctor = new ctor(props, context);
  workInProgress.memoizedState =
    null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternalFiber = workInProgress;
  isLegacyContextConsumer &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return ctor;
}
function callComponentWillReceiveProps(
  workInProgress,
  instance,
  newProps,
  nextContext
) {
  var oldState = instance.state;
  startPhaseTimer(workInProgress, "componentWillReceiveProps");
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  stopPhaseTimer();
  instance.state !== oldState &&
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(
  workInProgress,
  ctor,
  newProps,
  renderExpirationTime
) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType
    ? (instance.context = readContext(contextType))
    : ((contextType = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (instance.context = getMaskedContext(workInProgress, contextType)));
  contextType = workInProgress.updateQueue;
  null !== contextType &&
    (processUpdateQueue(
      workInProgress,
      contextType,
      newProps,
      instance,
      renderExpirationTime
    ),
    (instance.state = workInProgress.memoizedState));
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType &&
    (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof ctor.getDerivedStateFromProps ||
    "function" === typeof instance.getSnapshotBeforeUpdate ||
    ("function" !== typeof instance.UNSAFE_componentWillMount &&
      "function" !== typeof instance.componentWillMount) ||
    (startPhaseTimer(workInProgress, "componentWillMount"),
    (ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    stopPhaseTimer(),
    ctor !== instance.state &&
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null),
    (contextType = workInProgress.updateQueue),
    null !== contextType &&
      (processUpdateQueue(
        workInProgress,
        contextType,
        newProps,
        instance,
        renderExpirationTime
      ),
      (instance.state = workInProgress.memoizedState)));
  "function" === typeof instance.componentDidMount &&
    (workInProgress.effectTag |= 4);
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current$$1, element) {
  returnFiber = element.ref;
  if (
    null !== returnFiber &&
    "function" !== typeof returnFiber &&
    "object" !== typeof returnFiber
  ) {
    if (element._owner) {
      element = element._owner;
      var inst = void 0;
      element &&
        (1 !== element.tag ? reactProdInvariant("309") : void 0,
        (inst = element.stateNode));
      inst ? void 0 : reactProdInvariant("147", returnFiber);
      var stringRef = "" + returnFiber;
      if (
        null !== current$$1 &&
        null !== current$$1.ref &&
        "function" === typeof current$$1.ref &&
        current$$1.ref._stringRef === stringRef
      )
        return current$$1.ref;
      current$$1 = function(value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : (refs[stringRef] = value);
      };
      current$$1._stringRef = stringRef;
      return current$$1;
    }
    "string" !== typeof returnFiber ? reactProdInvariant("284") : void 0;
    element._owner ? void 0 : reactProdInvariant("290", returnFiber);
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  "textarea" !== returnFiber.type &&
    reactProdInvariant(
      "31",
      "[object Object]" === Object.prototype.toString.call(newChild)
        ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
        : newChild,
      ""
    );
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last
        ? ((last.nextEffect = childToDelete),
          (returnFiber.lastEffect = childToDelete))
        : (returnFiber.firstEffect = returnFiber.lastEffect = childToDelete);
      childToDelete.nextEffect = null;
      childToDelete.effectTag = 8;
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key
        ? returnFiber.set(currentFirstChild.key, currentFirstChild)
        : returnFiber.set(currentFirstChild.index, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return returnFiber;
  }
  function useFiber(fiber, pendingProps, expirationTime) {
    fiber = createWorkInProgress(fiber, pendingProps, expirationTime);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return (
        (newIndex = newIndex.index),
        newIndex < lastPlacedIndex
          ? ((newFiber.effectTag = 2), lastPlacedIndex)
          : newIndex
      );
    newFiber.effectTag = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects &&
      null === newFiber.alternate &&
      (newFiber.effectTag = 2);
    return newFiber;
  }
  function updateTextNode(
    returnFiber,
    current$$1,
    textContent,
    expirationTime
  ) {
    if (null === current$$1 || 6 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromText(
          textContent,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, textContent, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateElement(returnFiber, current$$1, element, expirationTime) {
    if (null !== current$$1 && current$$1.elementType === element.type)
      return (
        (expirationTime = useFiber(current$$1, element.props, expirationTime)),
        (expirationTime.ref = coerceRef(returnFiber, current$$1, element)),
        (expirationTime.return = returnFiber),
        expirationTime
      );
    expirationTime = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      expirationTime
    );
    expirationTime.ref = coerceRef(returnFiber, current$$1, element);
    expirationTime.return = returnFiber;
    return expirationTime;
  }
  function updatePortal(returnFiber, current$$1, portal, expirationTime) {
    if (
      null === current$$1 ||
      4 !== current$$1.tag ||
      current$$1.stateNode.containerInfo !== portal.containerInfo ||
      current$$1.stateNode.implementation !== portal.implementation
    )
      return (
        (current$$1 = createFiberFromPortal(
          portal,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, portal.children || [], expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateFragment(
    returnFiber,
    current$$1,
    fragment,
    expirationTime,
    key
  ) {
    if (null === current$$1 || 7 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          expirationTime,
          key
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, fragment, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          expirationTime
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (expirationTime = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              expirationTime
            )),
            (expirationTime.ref = coerceRef(returnFiber, null, newChild)),
            (expirationTime.return = returnFiber),
            expirationTime
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (newChild.return = returnFiber),
            newChild
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            expirationTime,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  oldFiber,
                  newChild.props.children,
                  expirationTime,
                  key
                )
              : updateElement(returnFiber, oldFiber, newChild, expirationTime)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, expirationTime)
            : null;
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(
              returnFiber,
              oldFiber,
              newChild,
              expirationTime,
              null
            );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    expirationTime
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(
          returnFiber,
          existingChildren,
          "" + newChild,
          expirationTime
        )
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  existingChildren,
                  newChild.props.children,
                  expirationTime,
                  newChild.key
                )
              : updateElement(
                  returnFiber,
                  existingChildren,
                  newChild,
                  expirationTime
                )
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(
              returnFiber,
              existingChildren,
              newChild,
              expirationTime
            )
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(
            returnFiber,
            existingChildren,
            newChild,
            expirationTime,
            null
          )
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    expirationTime
  ) {
    for (
      var resultingFirstChild = null,
        previousNewFiber = null,
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null;
      null !== oldFiber && newIdx < newChildren.length;
      newIdx++
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (resultingFirstChild = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return (
        deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild
      );
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        if (
          (oldFiber = createChild(
            returnFiber,
            newChildren[newIdx],
            expirationTime
          ))
        )
          (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (resultingFirstChild = oldFiber)
              : (previousNewFiber.sibling = oldFiber),
            (previousNewFiber = oldFiber);
      return resultingFirstChild;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      newIdx < newChildren.length;
      newIdx++
    )
      if (
        (nextOldFiber = updateFromMap(
          oldFiber,
          returnFiber,
          newIdx,
          newChildren[newIdx],
          expirationTime
        ))
      )
        shouldTrackSideEffects &&
          null !== nextOldFiber.alternate &&
          oldFiber.delete(
            null === nextOldFiber.key ? newIdx : nextOldFiber.key
          ),
          (currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          )),
          null === previousNewFiber
            ? (resultingFirstChild = nextOldFiber)
            : (previousNewFiber.sibling = nextOldFiber),
          (previousNewFiber = nextOldFiber);
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    expirationTime
  ) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    "function" !== typeof iteratorFn ? reactProdInvariant("150") : void 0;
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    null == newChildrenIterable ? reactProdInvariant("151") : void 0;
    for (
      var previousNewFiber = (iteratorFn = null),
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null,
        step = newChildrenIterable.next();
      null !== oldFiber && !step.done;
      newIdx++, step = newChildrenIterable.next()
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        step.value,
        expirationTime
      );
      if (null === newFiber) {
        oldFiber || (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (iteratorFn = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next())
        (step = createChild(returnFiber, step.value, expirationTime)),
          null !== step &&
            ((currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (iteratorFn = step)
              : (previousNewFiber.sibling = step),
            (previousNewFiber = step));
      return iteratorFn;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      !step.done;
      newIdx++, step = newChildrenIterable.next()
    )
      (step = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        step.value,
        expirationTime
      )),
        null !== step &&
          (shouldTrackSideEffects &&
            null !== step.alternate &&
            oldFiber.delete(null === step.key ? newIdx : step.key),
          (currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
          null === previousNewFiber
            ? (iteratorFn = step)
            : (previousNewFiber.sibling = step),
          (previousNewFiber = step));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return iteratorFn;
  }
  return function(returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment =
      "object" === typeof newChild &&
      null !== newChild &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject)
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;
            for (
              isUnkeyedTopLevelFragment = currentFirstChild;
              null !== isUnkeyedTopLevelFragment;

            ) {
              if (isUnkeyedTopLevelFragment.key === isObject)
                if (
                  7 === isUnkeyedTopLevelFragment.tag
                    ? newChild.type === REACT_FRAGMENT_TYPE
                    : isUnkeyedTopLevelFragment.elementType === newChild.type
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    isUnkeyedTopLevelFragment.sibling
                  );
                  currentFirstChild = useFiber(
                    isUnkeyedTopLevelFragment,
                    newChild.type === REACT_FRAGMENT_TYPE
                      ? newChild.props.children
                      : newChild.props,
                    expirationTime
                  );
                  currentFirstChild.ref = coerceRef(
                    returnFiber,
                    isUnkeyedTopLevelFragment,
                    newChild
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                } else {
                  deleteRemainingChildren(
                    returnFiber,
                    isUnkeyedTopLevelFragment
                  );
                  break;
                }
              else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE
              ? ((currentFirstChild = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  expirationTime,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((expirationTime = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  expirationTime
                )),
                (expirationTime.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (expirationTime.return = returnFiber),
                (returnFiber = expirationTime));
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (
              isUnkeyedTopLevelFragment = newChild.key;
              null !== currentFirstChild;

            ) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment)
                if (
                  4 === currentFirstChild.tag &&
                  currentFirstChild.stateNode.containerInfo ===
                    newChild.containerInfo &&
                  currentFirstChild.stateNode.implementation ===
                    newChild.implementation
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  currentFirstChild = useFiber(
                    currentFirstChild,
                    newChild.children || [],
                    expirationTime
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                } else {
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                }
              else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            currentFirstChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
      }
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = "" + newChild),
        null !== currentFirstChild && 6 === currentFirstChild.tag
          ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling),
            (currentFirstChild = useFiber(
              currentFirstChild,
              newChild,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild))
          : (deleteRemainingChildren(returnFiber, currentFirstChild),
            (currentFirstChild = createFiberFromText(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild)),
        placeSingleChild(returnFiber)
      );
    if (isArray(newChild))
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    if (getIteratorFn(newChild))
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment)
      switch (returnFiber.tag) {
        case 1:
        case 0:
          (expirationTime = returnFiber.type),
            reactProdInvariant(
              "152",
              expirationTime.displayName || expirationTime.name || "Component"
            );
      }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT = {},
  contextStackCursor$1 = { current: NO_CONTEXT },
  contextFiberStackCursor = { current: NO_CONTEXT },
  rootInstanceStackCursor = { current: NO_CONTEXT };
function requiredContext(c) {
  c === NO_CONTEXT ? reactProdInvariant("174") : void 0;
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor$1, NO_CONTEXT, fiber);
  var type = nextRootInstance.nodeType;
  switch (type) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement)
        ? nextRootInstance.namespaceURI
        : getChildNamespace(null, "");
      break;
    default:
      (type = 8 === type ? nextRootInstance.parentNode : nextRootInstance),
        (nextRootInstance = type.namespaceURI || null),
        (type = type.tagName),
        (nextRootInstance = getChildNamespace(nextRootInstance, type));
  }
  pop(contextStackCursor$1, fiber);
  push(contextStackCursor$1, nextRootInstance, fiber);
}
function popHostContainer(fiber) {
  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildNamespace(context, fiber.type);
  context !== nextContext &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, nextContext, fiber));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber));
}
var NoEffect$1 = 0,
  UnmountSnapshot = 2,
  UnmountMutation = 4,
  MountMutation = 8,
  UnmountLayout = 16,
  MountLayout = 32,
  MountPassive = 64,
  UnmountPassive = 128,
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  renderExpirationTime = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  nextCurrentHook = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  nextWorkInProgressHook = null,
  remainingExpirationTime = 0,
  componentUpdateQueue = null,
  sideEffectTag = 0,
  didScheduleRenderPhaseUpdate = !1,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function throwInvalidHookError() {
  reactProdInvariant("321");
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!is(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  refOrContext,
  nextRenderExpirationTime
) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  nextCurrentHook = null !== current ? current.memoizedState : null;
  ReactCurrentDispatcher$1.current =
    null === nextCurrentHook ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  workInProgress = Component(props, refOrContext);
  if (didScheduleRenderPhaseUpdate) {
    do
      (didScheduleRenderPhaseUpdate = !1),
        (numberOfReRenders += 1),
        (nextCurrentHook = null !== current ? current.memoizedState : null),
        (nextWorkInProgressHook = firstWorkInProgressHook),
        (componentUpdateQueue = workInProgressHook = currentHook = null),
        (ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdate),
        (workInProgress = Component(props, refOrContext));
    while (didScheduleRenderPhaseUpdate);
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  current = currentlyRenderingFiber$1;
  current.memoizedState = firstWorkInProgressHook;
  current.expirationTime = remainingExpirationTime;
  current.updateQueue = componentUpdateQueue;
  current.effectTag |= sideEffectTag;
  current = null !== currentHook && null !== currentHook.next;
  renderExpirationTime = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  current ? reactProdInvariant("300") : void 0;
  return workInProgress;
}
function resetHooks() {
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  renderExpirationTime = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  didScheduleRenderPhaseUpdate = !1;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === workInProgressHook
    ? (firstWorkInProgressHook = workInProgressHook = hook)
    : (workInProgressHook = workInProgressHook.next = hook);
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null !== nextWorkInProgressHook)
    (workInProgressHook = nextWorkInProgressHook),
      (nextWorkInProgressHook = workInProgressHook.next),
      (currentHook = nextCurrentHook),
      (nextCurrentHook = null !== currentHook ? currentHook.next : null);
  else {
    null === nextCurrentHook ? reactProdInvariant("310") : void 0;
    currentHook = nextCurrentHook;
    var newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,
      next: null
    };
    workInProgressHook =
      null === workInProgressHook
        ? (firstWorkInProgressHook = newHook)
        : (workInProgressHook.next = newHook);
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  null === queue ? reactProdInvariant("311") : void 0;
  queue.lastRenderedReducer = reducer;
  if (0 < numberOfReRenders) {
    var _dispatch = queue.dispatch;
    if (null !== renderPhaseUpdates) {
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
      if (void 0 !== firstRenderPhaseUpdate) {
        renderPhaseUpdates.delete(queue);
        var newState = hook.memoizedState;
        do
          (newState = reducer(newState, firstRenderPhaseUpdate.action)),
            (firstRenderPhaseUpdate = firstRenderPhaseUpdate.next);
        while (null !== firstRenderPhaseUpdate);
        is(newState, hook.memoizedState) || (didReceiveUpdate = !0);
        hook.memoizedState = newState;
        hook.baseUpdate === queue.last && (hook.baseState = newState);
        queue.lastRenderedState = newState;
        return [newState, _dispatch];
      }
    }
    return [hook.memoizedState, _dispatch];
  }
  _dispatch = queue.last;
  var baseUpdate = hook.baseUpdate;
  newState = hook.baseState;
  null !== baseUpdate
    ? (null !== _dispatch && (_dispatch.next = null),
      (_dispatch = baseUpdate.next))
    : (_dispatch = null !== _dispatch ? _dispatch.next : null);
  if (null !== _dispatch) {
    var newBaseUpdate = (firstRenderPhaseUpdate = null),
      _update = _dispatch,
      didSkip = !1;
    do {
      var updateExpirationTime = _update.expirationTime;
      updateExpirationTime < renderExpirationTime
        ? (didSkip ||
            ((didSkip = !0),
            (newBaseUpdate = baseUpdate),
            (firstRenderPhaseUpdate = newState)),
          updateExpirationTime > remainingExpirationTime &&
            (remainingExpirationTime = updateExpirationTime))
        : (newState =
            _update.eagerReducer === reducer
              ? _update.eagerState
              : reducer(newState, _update.action));
      baseUpdate = _update;
      _update = _update.next;
    } while (null !== _update && _update !== _dispatch);
    didSkip ||
      ((newBaseUpdate = baseUpdate), (firstRenderPhaseUpdate = newState));
    is(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    hook.baseUpdate = newBaseUpdate;
    hook.baseState = firstRenderPhaseUpdate;
    queue.lastRenderedState = newState;
  }
  return [hook.memoizedState, queue.dispatch];
}
function pushEffect(tag, create, destroy, deps) {
  tag = { tag: tag, create: create, destroy: destroy, deps: deps, next: null };
  null === componentUpdateQueue
    ? ((componentUpdateQueue = { lastEffect: null }),
      (componentUpdateQueue.lastEffect = tag.next = tag))
    : ((create = componentUpdateQueue.lastEffect),
      null === create
        ? (componentUpdateQueue.lastEffect = tag.next = tag)
        : ((destroy = create.next),
          (create.next = tag),
          (tag.next = destroy),
          (componentUpdateQueue.lastEffect = tag)));
  return tag;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(
    hookEffectTag,
    create,
    void 0,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(NoEffect$1, create, destroy, deps);
      return;
    }
  }
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(hookEffectTag, create, destroy, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref)
    return (
      (create = create()),
      ref(create),
      function() {
        ref(null);
      }
    );
  if (null !== ref && void 0 !== ref)
    return (
      (create = create()),
      (ref.current = create),
      function() {
        ref.current = null;
      }
    );
}
function mountDebugValue() {}
function dispatchAction(fiber, queue, action) {
  25 > numberOfReRenders ? void 0 : reactProdInvariant("301");
  var alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber$1 ||
    (null !== alternate && alternate === currentlyRenderingFiber$1)
  )
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (fiber = {
        expirationTime: renderExpirationTime,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, fiber);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = fiber;
    }
  else {
    flushPassiveEffects();
    var currentTime = requestCurrentTime();
    currentTime = computeExpirationForFiber(currentTime, fiber);
    var _update2 = {
        expirationTime: currentTime,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      },
      _last = queue.last;
    if (null === _last) _update2.next = _update2;
    else {
      var first = _last.next;
      null !== first && (_update2.next = first);
      _last.next = _update2;
    }
    queue.last = _update2;
    if (
      0 === fiber.expirationTime &&
      (null === alternate || 0 === alternate.expirationTime) &&
      ((alternate = queue.lastRenderedReducer), null !== alternate)
    )
      try {
        var currentState = queue.lastRenderedState,
          _eagerState = alternate(currentState, action);
        _update2.eagerReducer = alternate;
        _update2.eagerState = _eagerState;
        if (is(_eagerState, currentState)) return;
      } catch (error) {
      } finally {
      }
    scheduleWork(fiber, currentTime);
  }
}
var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: function(create, deps) {
      return mountEffectImpl(516, UnmountPassive | MountPassive, create, deps);
    },
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(
        4,
        UnmountMutation | MountLayout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4, UnmountMutation | MountLayout, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = void 0 !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$1,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return (hook.memoizedState = initialValue);
    },
    useState: function(initialState) {
      var hook = mountWorkInProgressHook();
      "function" === typeof initialState && (initialState = initialState());
      hook.memoizedState = hook.baseState = initialState;
      initialState = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      initialState = initialState.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$1,
        initialState
      );
      return [hook.memoizedState, initialState];
    },
    useDebugValue: mountDebugValue
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: function(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function(create, deps) {
      return updateEffectImpl(516, UnmountPassive | MountPassive, create, deps);
    },
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return updateEffectImpl(
        4,
        UnmountMutation | MountLayout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return updateEffectImpl(4, UnmountMutation | MountLayout, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: updateReducer,
    useRef: function() {
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function(initialState) {
      return updateReducer(basicStateReducer, initialState);
    },
    useDebugValue: mountDebugValue
  },
  commitTime = 0,
  profilerStartTime = -1;
function startProfilerTimer(fiber) {
  profilerStartTime = scheduler.unstable_now();
  0 > fiber.actualStartTime &&
    (fiber.actualStartTime = scheduler.unstable_now());
}
function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
  if (0 <= profilerStartTime) {
    var elapsedTime = scheduler.unstable_now() - profilerStartTime;
    fiber.actualDuration += elapsedTime;
    overrideBaseTime && (fiber.selfBaseDuration = elapsedTime);
    profilerStartTime = -1;
  }
}
var hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.effectTag = 8;
  null !== returnFiber.lastEffect
    ? ((returnFiber.lastEffect.nextEffect = fiber),
      (returnFiber.lastEffect = fiber))
    : (returnFiber.firstEffect = returnFiber.lastEffect = fiber);
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance =
        1 !== nextInstance.nodeType ||
        type.toLowerCase() !== nextInstance.nodeName.toLowerCase()
          ? null
          : nextInstance;
      return null !== nextInstance
        ? ((fiber.stateNode = nextInstance), !0)
        : !1;
    case 6:
      return (
        (nextInstance =
          "" === fiber.pendingProps || 3 !== nextInstance.nodeType
            ? null
            : nextInstance),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 13:
      return (
        (nextInstance = 8 !== nextInstance.nodeType ? null : nextInstance),
        null !== nextInstance
          ? ((fiber.tag = 18), (fiber.stateNode = nextInstance), !0)
          : !1
      );
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratableSibling(firstAttemptedInstance);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.effectTag |= 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getFirstHydratableChild(nextInstance);
    } else
      (fiber.effectTag |= 2),
        (isHydrating = !1),
        (hydrationParentFiber = fiber);
  }
}
function popToNextHostParent(fiber) {
  for (
    fiber = fiber.return;
    null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 18 !== fiber.tag;

  )
    fiber = fiber.return;
  hydrationParentFiber = fiber;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return !1;
  if (!isHydrating) return popToNextHostParent(fiber), (isHydrating = !0), !1;
  var type = fiber.type;
  if (
    5 !== fiber.tag ||
    ("head" !== type &&
      "body" !== type &&
      !shouldSetTextContent(type, fiber.memoizedProps))
  )
    for (type = nextHydratableInstance; type; )
      deleteHydratableInstance(fiber, type),
        (type = getNextHydratableSibling(type));
  popToNextHostParent(fiber);
  nextHydratableInstance = hydrationParentFiber
    ? getNextHydratableSibling(fiber.stateNode)
    : null;
  return !0;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = !1;
}
var ReactCurrentOwner$3 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(
  current$$1,
  workInProgress,
  nextChildren,
  renderExpirationTime
) {
  workInProgress.child =
    null === current$$1
      ? mountChildFibers(
          workInProgress,
          null,
          nextChildren,
          renderExpirationTime
        )
      : reconcileChildFibers(
          workInProgress,
          current$$1.child,
          nextChildren,
          renderExpirationTime
        );
}
function updateForwardRef(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    nextProps,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  if (null === current$$1) {
    var type = Component.type;
    if (
      "function" === typeof type &&
      !shouldConstruct(type) &&
      void 0 === type.defaultProps &&
      null === Component.compare &&
      void 0 === Component.defaultProps
    )
      return (
        (workInProgress.tag = 15),
        (workInProgress.type = type),
        updateSimpleMemoComponent(
          current$$1,
          workInProgress,
          type,
          nextProps,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    current$$1 = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      null,
      workInProgress.mode,
      renderExpirationTime
    );
    current$$1.ref = workInProgress.ref;
    current$$1.return = workInProgress;
    return (workInProgress.child = current$$1);
  }
  type = current$$1.child;
  if (
    updateExpirationTime < renderExpirationTime &&
    ((updateExpirationTime = type.memoizedProps),
    (Component = Component.compare),
    (Component = null !== Component ? Component : shallowEqual),
    Component(updateExpirationTime, nextProps) &&
      current$$1.ref === workInProgress.ref)
  )
    return bailoutOnAlreadyFinishedWork(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  workInProgress.effectTag |= 1;
  current$$1 = createWorkInProgress(type, nextProps, renderExpirationTime);
  current$$1.ref = workInProgress.ref;
  current$$1.return = workInProgress;
  return (workInProgress.child = current$$1);
}
function updateSimpleMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  return null !== current$$1 &&
    shallowEqual(current$$1.memoizedProps, nextProps) &&
    current$$1.ref === workInProgress.ref &&
    ((didReceiveUpdate = !1), updateExpirationTime < renderExpirationTime)
    ? bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    : updateFunctionComponent(
        current$$1,
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      );
}
function markRef(current$$1, workInProgress) {
  var ref = workInProgress.ref;
  if (
    (null === current$$1 && null !== ref) ||
    (null !== current$$1 && current$$1.ref !== ref)
  )
    workInProgress.effectTag |= 128;
}
function updateFunctionComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  var unmaskedContext = isContextProvider(Component)
    ? previousContext
    : contextStackCursor.current;
  unmaskedContext = getMaskedContext(workInProgress, unmaskedContext);
  prepareToReadContext(workInProgress, renderExpirationTime);
  Component = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    unmaskedContext,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    Component,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateClassComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  if (isContextProvider(Component)) {
    var hasContext = !0;
    pushContextProvider(workInProgress);
  } else hasContext = !1;
  prepareToReadContext(workInProgress, renderExpirationTime);
  if (null === workInProgress.stateNode)
    null !== current$$1 &&
      ((current$$1.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.effectTag |= 2)),
      constructClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      mountClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      (nextProps = !0);
  else if (null === current$$1) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType
      ? (contextType = readContext(contextType))
      : ((contextType = isContextProvider(Component)
          ? previousContext
          : contextStackCursor.current),
        (contextType = getMaskedContext(workInProgress, contextType)));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps,
      hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate;
    hasNewLifecycles ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((oldProps !== nextProps || oldContext !== contextType) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          contextType
        ));
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    oldContext = instance.state = oldState;
    var updateQueue = workInProgress.updateQueue;
    null !== updateQueue &&
      (processUpdateQueue(
        workInProgress,
        updateQueue,
        nextProps,
        instance,
        renderExpirationTime
      ),
      (oldContext = workInProgress.memoizedState));
    oldProps !== nextProps ||
    oldState !== oldContext ||
    didPerformWorkStackCursor.current ||
    hasForceUpdate
      ? ("function" === typeof getDerivedStateFromProps &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            getDerivedStateFromProps,
            nextProps
          ),
          (oldContext = workInProgress.memoizedState)),
        (oldProps =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          ))
          ? (hasNewLifecycles ||
              ("function" !== typeof instance.UNSAFE_componentWillMount &&
                "function" !== typeof instance.componentWillMount) ||
              (startPhaseTimer(workInProgress, "componentWillMount"),
              "function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount(),
              stopPhaseTimer()),
            "function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4))
          : ("function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = oldContext)),
        (instance.props = nextProps),
        (instance.state = oldContext),
        (instance.context = contextType),
        (nextProps = oldProps))
      : ("function" === typeof instance.componentDidMount &&
          (workInProgress.effectTag |= 4),
        (nextProps = !1));
  } else
    (instance = workInProgress.stateNode),
      (oldProps = workInProgress.memoizedProps),
      (instance.props =
        workInProgress.type === workInProgress.elementType
          ? oldProps
          : resolveDefaultProps(workInProgress.type, oldProps)),
      (oldContext = instance.context),
      (contextType = Component.contextType),
      "object" === typeof contextType && null !== contextType
        ? (contextType = readContext(contextType))
        : ((contextType = isContextProvider(Component)
            ? previousContext
            : contextStackCursor.current),
          (contextType = getMaskedContext(workInProgress, contextType))),
      (getDerivedStateFromProps = Component.getDerivedStateFromProps),
      (hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate) ||
        ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
          "function" !== typeof instance.componentWillReceiveProps) ||
        ((oldProps !== nextProps || oldContext !== contextType) &&
          callComponentWillReceiveProps(
            workInProgress,
            instance,
            nextProps,
            contextType
          )),
      (hasForceUpdate = !1),
      (oldContext = workInProgress.memoizedState),
      (oldState = instance.state = oldContext),
      (updateQueue = workInProgress.updateQueue),
      null !== updateQueue &&
        (processUpdateQueue(
          workInProgress,
          updateQueue,
          nextProps,
          instance,
          renderExpirationTime
        ),
        (oldState = workInProgress.memoizedState)),
      oldProps !== nextProps ||
      oldContext !== oldState ||
      didPerformWorkStackCursor.current ||
      hasForceUpdate
        ? ("function" === typeof getDerivedStateFromProps &&
            (applyDerivedStateFromProps(
              workInProgress,
              Component,
              getDerivedStateFromProps,
              nextProps
            ),
            (oldState = workInProgress.memoizedState)),
          (getDerivedStateFromProps =
            hasForceUpdate ||
            checkShouldComponentUpdate(
              workInProgress,
              Component,
              oldProps,
              nextProps,
              oldContext,
              oldState,
              contextType
            ))
            ? (hasNewLifecycles ||
                ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                  "function" !== typeof instance.componentWillUpdate) ||
                (startPhaseTimer(workInProgress, "componentWillUpdate"),
                "function" === typeof instance.componentWillUpdate &&
                  instance.componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                "function" === typeof instance.UNSAFE_componentWillUpdate &&
                  instance.UNSAFE_componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                stopPhaseTimer()),
              "function" === typeof instance.componentDidUpdate &&
                (workInProgress.effectTag |= 4),
              "function" === typeof instance.getSnapshotBeforeUpdate &&
                (workInProgress.effectTag |= 256))
            : ("function" !== typeof instance.componentDidUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 4),
              "function" !== typeof instance.getSnapshotBeforeUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 256),
              (workInProgress.memoizedProps = nextProps),
              (workInProgress.memoizedState = oldState)),
          (instance.props = nextProps),
          (instance.state = oldState),
          (instance.context = contextType),
          (nextProps = getDerivedStateFromProps))
        : ("function" !== typeof instance.componentDidUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 4),
          "function" !== typeof instance.getSnapshotBeforeUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 256),
          (nextProps = !1));
  return finishClassComponent(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    hasContext,
    renderExpirationTime
  );
}
function finishClassComponent(
  current$$1,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderExpirationTime
) {
  markRef(current$$1, workInProgress);
  var didCaptureError = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !didCaptureError)
    return (
      hasContext && invalidateContextProvider(workInProgress, Component, !1),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$3.current = workInProgress;
  if (
    didCaptureError &&
    "function" !== typeof Component.getDerivedStateFromError
  ) {
    var nextChildren = null;
    profilerStartTime = -1;
  } else nextChildren = shouldUpdate.render();
  workInProgress.effectTag |= 1;
  null !== current$$1 && didCaptureError
    ? ((didCaptureError = nextChildren),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        current$$1.child,
        null,
        renderExpirationTime
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        didCaptureError,
        renderExpirationTime
      )))
    : reconcileChildren(
        current$$1,
        workInProgress,
        nextChildren,
        renderExpirationTime
      );
  workInProgress.memoizedState = shouldUpdate.state;
  hasContext && invalidateContextProvider(workInProgress, Component, !0);
  return workInProgress.child;
}
function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  root.pendingContext
    ? pushTopLevelContextObject(
        workInProgress,
        root.pendingContext,
        root.pendingContext !== root.context
      )
    : root.context &&
      pushTopLevelContextObject(workInProgress, root.context, !1);
  pushHostContainer(workInProgress, root.containerInfo);
}
function updateSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var mode = workInProgress.mode,
    nextProps = workInProgress.pendingProps,
    nextState = workInProgress.memoizedState;
  if (0 === (workInProgress.effectTag & 64)) {
    nextState = null;
    var nextDidTimeout = !1;
  } else
    (nextState = { timedOutAt: null !== nextState ? nextState.timedOutAt : 0 }),
      (nextDidTimeout = !0),
      (workInProgress.effectTag &= -65);
  if (null === current$$1) {
    if (
      void 0 !== nextProps.fallback &&
      (tryToClaimNextHydratableInstance(workInProgress),
      18 === workInProgress.tag)
    )
      return updateDehydratedSuspenseComponent(
        null,
        workInProgress,
        renderExpirationTime
      );
    if (nextDidTimeout) {
      var nextFallbackChildren = nextProps.fallback;
      current$$1 = createFiberFromFragment(null, mode, 0, null);
      0 === (workInProgress.mode & 1) &&
        (current$$1.child =
          null !== workInProgress.memoizedState
            ? workInProgress.child.child
            : workInProgress.child);
      renderExpirationTime = createFiberFromFragment(
        nextFallbackChildren,
        mode,
        renderExpirationTime,
        null
      );
      current$$1.sibling = renderExpirationTime;
      mode = current$$1;
      mode.return = renderExpirationTime.return = workInProgress;
    } else
      mode = renderExpirationTime = mountChildFibers(
        workInProgress,
        null,
        nextProps.children,
        renderExpirationTime
      );
  } else {
    if (null !== current$$1.memoizedState)
      if (
        ((nextFallbackChildren = current$$1.child),
        (mode = nextFallbackChildren.sibling),
        nextDidTimeout)
      ) {
        nextProps = nextProps.fallback;
        renderExpirationTime = createWorkInProgress(
          nextFallbackChildren,
          nextFallbackChildren.pendingProps,
          0
        );
        0 === (workInProgress.mode & 1) &&
          ((nextDidTimeout =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child),
          nextDidTimeout !== nextFallbackChildren.child &&
            (renderExpirationTime.child = nextDidTimeout));
        if (workInProgress.mode & 4) {
          nextFallbackChildren = 0;
          for (
            nextDidTimeout = renderExpirationTime.child;
            null !== nextDidTimeout;

          )
            (nextFallbackChildren += nextDidTimeout.treeBaseDuration),
              (nextDidTimeout = nextDidTimeout.sibling);
          renderExpirationTime.treeBaseDuration = nextFallbackChildren;
        }
        nextFallbackChildren = renderExpirationTime.sibling = createWorkInProgress(
          mode,
          nextProps,
          mode.expirationTime
        );
        mode = renderExpirationTime;
        renderExpirationTime.childExpirationTime = 0;
        renderExpirationTime = nextFallbackChildren;
        mode.return = renderExpirationTime.return = workInProgress;
      } else
        mode = renderExpirationTime = reconcileChildFibers(
          workInProgress,
          nextFallbackChildren.child,
          nextProps.children,
          renderExpirationTime
        );
    else {
      var _currentPrimaryChild = current$$1.child;
      if (nextDidTimeout) {
        nextProps = nextProps.fallback;
        nextFallbackChildren = createFiberFromFragment(null, mode, 0, null);
        nextFallbackChildren.child = _currentPrimaryChild;
        0 === (workInProgress.mode & 1) &&
          (nextFallbackChildren.child =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child);
        if (workInProgress.mode & 4) {
          nextDidTimeout = 0;
          for (
            _currentPrimaryChild = nextFallbackChildren.child;
            null !== _currentPrimaryChild;

          )
            (nextDidTimeout += _currentPrimaryChild.treeBaseDuration),
              (_currentPrimaryChild = _currentPrimaryChild.sibling);
          nextFallbackChildren.treeBaseDuration = nextDidTimeout;
        }
        renderExpirationTime = nextFallbackChildren.sibling = createFiberFromFragment(
          nextProps,
          mode,
          renderExpirationTime,
          null
        );
        renderExpirationTime.effectTag |= 2;
        mode = nextFallbackChildren;
        nextFallbackChildren.childExpirationTime = 0;
        mode.return = renderExpirationTime.return = workInProgress;
      } else
        renderExpirationTime = mode = reconcileChildFibers(
          workInProgress,
          _currentPrimaryChild,
          nextProps.children,
          renderExpirationTime
        );
    }
    workInProgress.stateNode = current$$1.stateNode;
  }
  workInProgress.memoizedState = nextState;
  workInProgress.child = mode;
  return renderExpirationTime;
}
function updateDehydratedSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  if (null === current$$1) return (workInProgress.expirationTime = 1), null;
  var hasContextChanged$$1 =
    current$$1.childExpirationTime >= renderExpirationTime;
  if (didReceiveUpdate || hasContextChanged$$1) {
    current$$1.alternate = null;
    workInProgress.alternate = null;
    hasContextChanged$$1 = workInProgress.return;
    null === hasContextChanged$$1 ? reactProdInvariant("315") : void 0;
    var last = hasContextChanged$$1.lastEffect;
    null !== last
      ? ((last.nextEffect = current$$1),
        (hasContextChanged$$1.lastEffect = current$$1))
      : (hasContextChanged$$1.firstEffect = hasContextChanged$$1.lastEffect = current$$1);
    current$$1.nextEffect = null;
    current$$1.effectTag = 8;
    workInProgress.tag = 13;
    workInProgress.stateNode = null;
    workInProgress.memoizedState = null;
    workInProgress.effectTag |= 2;
    return updateSuspenseComponent(null, workInProgress, renderExpirationTime);
  }
  return 0 === (workInProgress.effectTag & 64)
    ? ((nextHydratableInstance = getNextHydratableSibling(
        workInProgress.stateNode
      )),
      popToNextHostParent(workInProgress),
      (isHydrating = !0),
      (workInProgress.child = mountChildFibers(
        workInProgress,
        null,
        workInProgress.pendingProps.children,
        renderExpirationTime
      )),
      workInProgress.child)
    : (workInProgress.child = null);
}
function bailoutOnAlreadyFinishedWork(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  cancelWorkTimer(workInProgress);
  null !== current$$1 &&
    (workInProgress.contextDependencies = current$$1.contextDependencies);
  profilerStartTime = -1;
  if (workInProgress.childExpirationTime < renderExpirationTime) return null;
  null !== current$$1 && workInProgress.child !== current$$1.child
    ? reactProdInvariant("153")
    : void 0;
  if (null !== workInProgress.child) {
    current$$1 = workInProgress.child;
    renderExpirationTime = createWorkInProgress(
      current$$1,
      current$$1.pendingProps,
      current$$1.expirationTime
    );
    workInProgress.child = renderExpirationTime;
    for (
      renderExpirationTime.return = workInProgress;
      null !== current$$1.sibling;

    )
      (current$$1 = current$$1.sibling),
        (renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(
          current$$1,
          current$$1.pendingProps,
          current$$1.expirationTime
        )),
        (renderExpirationTime.return = workInProgress);
    renderExpirationTime.sibling = null;
  }
  return workInProgress.child;
}
function beginWork(current$$1, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (null !== current$$1)
    if (
      current$$1.memoizedProps !== workInProgress.pendingProps ||
      didPerformWorkStackCursor.current
    )
      didReceiveUpdate = !0;
    else {
      if (updateExpirationTime < renderExpirationTime) {
        didReceiveUpdate = !1;
        switch (workInProgress.tag) {
          case 3:
            pushHostRootContext(workInProgress);
            resetHydrationState();
            break;
          case 5:
            pushHostContext(workInProgress);
            break;
          case 1:
            isContextProvider(workInProgress.type) &&
              pushContextProvider(workInProgress);
            break;
          case 4:
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
            break;
          case 10:
            pushProvider(workInProgress, workInProgress.memoizedProps.value);
            break;
          case 12:
            workInProgress.effectTag |= 4;
            break;
          case 13:
            if (null !== workInProgress.memoizedState) {
              updateExpirationTime = workInProgress.child.childExpirationTime;
              if (
                0 !== updateExpirationTime &&
                updateExpirationTime >= renderExpirationTime
              )
                return updateSuspenseComponent(
                  current$$1,
                  workInProgress,
                  renderExpirationTime
                );
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              return null !== workInProgress ? workInProgress.sibling : null;
            }
            break;
          case 18:
            workInProgress.effectTag |= 64;
        }
        return bailoutOnAlreadyFinishedWork(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
      }
    }
  else didReceiveUpdate = !1;
  workInProgress.expirationTime = 0;
  switch (workInProgress.tag) {
    case 2:
      updateExpirationTime = workInProgress.elementType;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      var context = getMaskedContext(
        workInProgress,
        contextStackCursor.current
      );
      prepareToReadContext(workInProgress, renderExpirationTime);
      context = renderWithHooks(
        null,
        workInProgress,
        updateExpirationTime,
        current$$1,
        context,
        renderExpirationTime
      );
      workInProgress.effectTag |= 1;
      if (
        "object" === typeof context &&
        null !== context &&
        "function" === typeof context.render &&
        void 0 === context.$$typeof
      ) {
        workInProgress.tag = 1;
        resetHooks();
        if (isContextProvider(updateExpirationTime)) {
          var hasContext = !0;
          pushContextProvider(workInProgress);
        } else hasContext = !1;
        workInProgress.memoizedState =
          null !== context.state && void 0 !== context.state
            ? context.state
            : null;
        var getDerivedStateFromProps =
          updateExpirationTime.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps &&
          applyDerivedStateFromProps(
            workInProgress,
            updateExpirationTime,
            getDerivedStateFromProps,
            current$$1
          );
        context.updater = classComponentUpdater;
        workInProgress.stateNode = context;
        context._reactInternalFiber = workInProgress;
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          current$$1,
          renderExpirationTime
        );
        workInProgress = finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          hasContext,
          renderExpirationTime
        );
      } else
        (workInProgress.tag = 0),
          reconcileChildren(
            null,
            workInProgress,
            context,
            renderExpirationTime
          ),
          (workInProgress = workInProgress.child);
      return workInProgress;
    case 16:
      context = workInProgress.elementType;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      hasContext = workInProgress.pendingProps;
      cancelWorkTimer(workInProgress);
      current$$1 = readLazyComponentType(context);
      workInProgress.type = current$$1;
      context = workInProgress.tag = resolveLazyComponentTag(current$$1);
      startWorkTimer(workInProgress);
      hasContext = resolveDefaultProps(current$$1, hasContext);
      getDerivedStateFromProps = void 0;
      switch (context) {
        case 0:
          getDerivedStateFromProps = updateFunctionComponent(
            null,
            workInProgress,
            current$$1,
            hasContext,
            renderExpirationTime
          );
          break;
        case 1:
          getDerivedStateFromProps = updateClassComponent(
            null,
            workInProgress,
            current$$1,
            hasContext,
            renderExpirationTime
          );
          break;
        case 11:
          getDerivedStateFromProps = updateForwardRef(
            null,
            workInProgress,
            current$$1,
            hasContext,
            renderExpirationTime
          );
          break;
        case 14:
          getDerivedStateFromProps = updateMemoComponent(
            null,
            workInProgress,
            current$$1,
            resolveDefaultProps(current$$1.type, hasContext),
            updateExpirationTime,
            renderExpirationTime
          );
          break;
        default:
          reactProdInvariant("306", current$$1, "");
      }
      return getDerivedStateFromProps;
    case 0:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateFunctionComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 1:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateClassComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 3:
      pushHostRootContext(workInProgress);
      updateExpirationTime = workInProgress.updateQueue;
      null === updateExpirationTime ? reactProdInvariant("282") : void 0;
      context = workInProgress.memoizedState;
      context = null !== context ? context.element : null;
      processUpdateQueue(
        workInProgress,
        updateExpirationTime,
        workInProgress.pendingProps,
        null,
        renderExpirationTime
      );
      updateExpirationTime = workInProgress.memoizedState.element;
      if (updateExpirationTime === context)
        resetHydrationState(),
          (workInProgress = bailoutOnAlreadyFinishedWork(
            current$$1,
            workInProgress,
            renderExpirationTime
          ));
      else {
        context = workInProgress.stateNode;
        if (
          (context =
            (null === current$$1 || null === current$$1.child) &&
            context.hydrate)
        )
          (nextHydratableInstance = getFirstHydratableChild(
            workInProgress.stateNode.containerInfo
          )),
            (hydrationParentFiber = workInProgress),
            (context = isHydrating = !0);
        context
          ? ((workInProgress.effectTag |= 2),
            (workInProgress.child = mountChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            )))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
            resetHydrationState());
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (hasContext = null !== current$$1 ? current$$1.memoizedProps : null),
        (getDerivedStateFromProps = context.children),
        shouldSetTextContent(updateExpirationTime, context)
          ? (getDerivedStateFromProps = null)
          : null !== hasContext &&
            shouldSetTextContent(updateExpirationTime, hasContext) &&
            (workInProgress.effectTag |= 16),
        markRef(current$$1, workInProgress),
        1 !== renderExpirationTime && workInProgress.mode & 1 && context.hidden
          ? ((workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
            (workInProgress = null))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              getDerivedStateFromProps,
              renderExpirationTime
            ),
            (workInProgress = workInProgress.child)),
        workInProgress
      );
    case 6:
      return (
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        null
      );
    case 13:
      return updateSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (updateExpirationTime = workInProgress.pendingProps),
        null === current$$1
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ))
          : reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
        workInProgress.child
      );
    case 11:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateForwardRef(
          current$$1,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 7:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 12:
      return (
        (workInProgress.effectTag |= 4),
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 10:
      a: {
        updateExpirationTime = workInProgress.type._context;
        context = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = context.value;
        pushProvider(workInProgress, hasContext);
        if (null !== getDerivedStateFromProps) {
          var oldValue = getDerivedStateFromProps.value;
          hasContext = is(oldValue, hasContext)
            ? 0
            : ("function" === typeof updateExpirationTime._calculateChangedBits
                ? updateExpirationTime._calculateChangedBits(
                    oldValue,
                    hasContext
                  )
                : 1073741823) | 0;
          if (0 === hasContext) {
            if (
              getDerivedStateFromProps.children === context.children &&
              !didPerformWorkStackCursor.current
            ) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              break a;
            }
          } else
            for (
              getDerivedStateFromProps = workInProgress.child,
                null !== getDerivedStateFromProps &&
                  (getDerivedStateFromProps.return = workInProgress);
              null !== getDerivedStateFromProps;

            ) {
              var list = getDerivedStateFromProps.contextDependencies;
              if (null !== list) {
                oldValue = getDerivedStateFromProps.child;
                for (var dependency = list.first; null !== dependency; ) {
                  if (
                    dependency.context === updateExpirationTime &&
                    0 !== (dependency.observedBits & hasContext)
                  ) {
                    1 === getDerivedStateFromProps.tag &&
                      ((dependency = createUpdate(renderExpirationTime)),
                      (dependency.tag = ForceUpdate),
                      enqueueUpdate(getDerivedStateFromProps, dependency));
                    getDerivedStateFromProps.expirationTime <
                      renderExpirationTime &&
                      (getDerivedStateFromProps.expirationTime = renderExpirationTime);
                    dependency = getDerivedStateFromProps.alternate;
                    null !== dependency &&
                      dependency.expirationTime < renderExpirationTime &&
                      (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(
                      getDerivedStateFromProps.return,
                      renderExpirationTime
                    );
                    list.expirationTime < renderExpirationTime &&
                      (list.expirationTime = renderExpirationTime);
                    break;
                  }
                  dependency = dependency.next;
                }
              } else
                10 === getDerivedStateFromProps.tag
                  ? (oldValue =
                      getDerivedStateFromProps.type === workInProgress.type
                        ? null
                        : getDerivedStateFromProps.child)
                  : 18 === getDerivedStateFromProps.tag
                    ? (getDerivedStateFromProps.expirationTime <
                        renderExpirationTime &&
                        (getDerivedStateFromProps.expirationTime = renderExpirationTime),
                      (oldValue = getDerivedStateFromProps.alternate),
                      null !== oldValue &&
                        oldValue.expirationTime < renderExpirationTime &&
                        (oldValue.expirationTime = renderExpirationTime),
                      scheduleWorkOnParentPath(
                        getDerivedStateFromProps,
                        renderExpirationTime
                      ),
                      (oldValue = getDerivedStateFromProps.sibling))
                    : (oldValue = getDerivedStateFromProps.child);
              if (null !== oldValue) oldValue.return = getDerivedStateFromProps;
              else
                for (oldValue = getDerivedStateFromProps; null !== oldValue; ) {
                  if (oldValue === workInProgress) {
                    oldValue = null;
                    break;
                  }
                  getDerivedStateFromProps = oldValue.sibling;
                  if (null !== getDerivedStateFromProps) {
                    getDerivedStateFromProps.return = oldValue.return;
                    oldValue = getDerivedStateFromProps;
                    break;
                  }
                  oldValue = oldValue.return;
                }
              getDerivedStateFromProps = oldValue;
            }
        }
        reconcileChildren(
          current$$1,
          workInProgress,
          context.children,
          renderExpirationTime
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (context = workInProgress.type),
        (hasContext = workInProgress.pendingProps),
        (updateExpirationTime = hasContext.children),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (context = readContext(context, hasContext.unstable_observedBits)),
        (updateExpirationTime = updateExpirationTime(context)),
        (workInProgress.effectTag |= 1),
        reconcileChildren(
          current$$1,
          workInProgress,
          updateExpirationTime,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 14:
      return (
        (context = workInProgress.type),
        (hasContext = resolveDefaultProps(
          context,
          workInProgress.pendingProps
        )),
        (hasContext = resolveDefaultProps(context.type, hasContext)),
        updateMemoComponent(
          current$$1,
          workInProgress,
          context,
          hasContext,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current$$1,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateExpirationTime,
        renderExpirationTime
      );
    case 17:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        null !== current$$1 &&
          ((current$$1.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        isContextProvider(updateExpirationTime)
          ? ((current$$1 = !0), pushContextProvider(workInProgress))
          : (current$$1 = !1),
        prepareToReadContext(workInProgress, renderExpirationTime),
        constructClassInstance(
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        ),
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        ),
        finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          current$$1,
          renderExpirationTime
        )
      );
    case 18:
      return updateDehydratedSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
  }
  reactProdInvariant("156");
}
var valueCursor = { current: null },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;
  push(valueCursor, context._currentValue, providerFiber);
  context._currentValue = nextValue;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor, providerFiber);
  providerFiber.type._context._currentValue = currentValue;
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if (parent.childExpirationTime < renderExpirationTime)
      (parent.childExpirationTime = renderExpirationTime),
        null !== alternate &&
          alternate.childExpirationTime < renderExpirationTime &&
          (alternate.childExpirationTime = renderExpirationTime);
    else if (
      null !== alternate &&
      alternate.childExpirationTime < renderExpirationTime
    )
      alternate.childExpirationTime = renderExpirationTime;
    else break;
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  var currentDependencies = workInProgress.contextDependencies;
  null !== currentDependencies &&
    currentDependencies.expirationTime >= renderExpirationTime &&
    (didReceiveUpdate = !0);
  workInProgress.contextDependencies = null;
}
function readContext(context, observedBits) {
  if (
    lastContextWithAllBitsObserved !== context &&
    !1 !== observedBits &&
    0 !== observedBits
  ) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits)
      (lastContextWithAllBitsObserved = context), (observedBits = 1073741823);
    observedBits = { context: context, observedBits: observedBits, next: null };
    null === lastContextDependency
      ? (null === currentlyRenderingFiber ? reactProdInvariant("308") : void 0,
        (lastContextDependency = observedBits),
        (currentlyRenderingFiber.contextDependencies = {
          first: observedBits,
          expirationTime: 0
        }))
      : (lastContextDependency = lastContextDependency.next = observedBits);
  }
  return context._currentValue;
}
var UpdateState = 0,
  ReplaceState = 1,
  ForceUpdate = 2,
  CaptureUpdate = 3,
  hasForceUpdate = !1;
function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function cloneUpdateQueue(currentQueue) {
  return {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function createUpdate(expirationTime) {
  return {
    expirationTime: expirationTime,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}
function appendUpdateToQueue(queue, update) {
  null === queue.lastUpdate
    ? (queue.firstUpdate = queue.lastUpdate = update)
    : ((queue.lastUpdate.next = update), (queue.lastUpdate = update));
}
function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  if (null === alternate) {
    var queue1 = fiber.updateQueue;
    var queue2 = null;
    null === queue1 &&
      (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
  } else
    (queue1 = fiber.updateQueue),
      (queue2 = alternate.updateQueue),
      null === queue1
        ? null === queue2
          ? ((queue1 = fiber.updateQueue = createUpdateQueue(
              fiber.memoizedState
            )),
            (queue2 = alternate.updateQueue = createUpdateQueue(
              alternate.memoizedState
            )))
          : (queue1 = fiber.updateQueue = cloneUpdateQueue(queue2))
        : null === queue2 &&
          (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1));
  null === queue2 || queue1 === queue2
    ? appendUpdateToQueue(queue1, update)
    : null === queue1.lastUpdate || null === queue2.lastUpdate
      ? (appendUpdateToQueue(queue1, update),
        appendUpdateToQueue(queue2, update))
      : (appendUpdateToQueue(queue1, update), (queue2.lastUpdate = update));
}
function enqueueCapturedUpdate(workInProgress, update) {
  var workInProgressQueue = workInProgress.updateQueue;
  workInProgressQueue =
    null === workInProgressQueue
      ? (workInProgress.updateQueue = createUpdateQueue(
          workInProgress.memoizedState
        ))
      : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
  null === workInProgressQueue.lastCapturedUpdate
    ? (workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update)
    : ((workInProgressQueue.lastCapturedUpdate.next = update),
      (workInProgressQueue.lastCapturedUpdate = update));
}
function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
  var current = workInProgress.alternate;
  null !== current &&
    queue === current.updateQueue &&
    (queue = workInProgress.updateQueue = cloneUpdateQueue(queue));
  return queue;
}
function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case ReplaceState:
      return (
        (workInProgress = update.payload),
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress
      );
    case CaptureUpdate:
      workInProgress.effectTag = (workInProgress.effectTag & -2049) | 64;
    case UpdateState:
      workInProgress = update.payload;
      nextProps =
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress;
      if (null === nextProps || void 0 === nextProps) break;
      return Object.assign({}, prevState, nextProps);
    case ForceUpdate:
      hasForceUpdate = !0;
  }
  return prevState;
}
function processUpdateQueue(
  workInProgress,
  queue,
  props,
  instance,
  renderExpirationTime
) {
  hasForceUpdate = !1;
  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);
  for (
    var newBaseState = queue.baseState,
      newFirstUpdate = null,
      newExpirationTime = 0,
      update = queue.firstUpdate,
      resultState = newBaseState;
    null !== update;

  ) {
    var updateExpirationTime = update.expirationTime;
    updateExpirationTime < renderExpirationTime
      ? (null === newFirstUpdate &&
          ((newFirstUpdate = update), (newBaseState = resultState)),
        newExpirationTime < updateExpirationTime &&
          (newExpirationTime = updateExpirationTime))
      : ((resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastEffect
            ? (queue.firstEffect = queue.lastEffect = update)
            : ((queue.lastEffect.nextEffect = update),
              (queue.lastEffect = update))));
    update = update.next;
  }
  updateExpirationTime = null;
  for (update = queue.firstCapturedUpdate; null !== update; ) {
    var _updateExpirationTime = update.expirationTime;
    _updateExpirationTime < renderExpirationTime
      ? (null === updateExpirationTime &&
          ((updateExpirationTime = update),
          null === newFirstUpdate && (newBaseState = resultState)),
        newExpirationTime < _updateExpirationTime &&
          (newExpirationTime = _updateExpirationTime))
      : ((resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastCapturedEffect
            ? (queue.firstCapturedEffect = queue.lastCapturedEffect = update)
            : ((queue.lastCapturedEffect.nextEffect = update),
              (queue.lastCapturedEffect = update))));
    update = update.next;
  }
  null === newFirstUpdate && (queue.lastUpdate = null);
  null === updateExpirationTime
    ? (queue.lastCapturedUpdate = null)
    : (workInProgress.effectTag |= 32);
  null === newFirstUpdate &&
    null === updateExpirationTime &&
    (newBaseState = resultState);
  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate;
  queue.firstCapturedUpdate = updateExpirationTime;
  workInProgress.expirationTime = newExpirationTime;
  workInProgress.memoizedState = resultState;
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  null !== finishedQueue.firstCapturedUpdate &&
    (null !== finishedQueue.lastUpdate &&
      ((finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate),
      (finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate)),
    (finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null));
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
  commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
  finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
}
function commitUpdateEffects(effect, instance) {
  for (; null !== effect; ) {
    var _callback3 = effect.callback;
    if (null !== _callback3) {
      effect.callback = null;
      var context = instance;
      "function" !== typeof _callback3
        ? reactProdInvariant("191", _callback3)
        : void 0;
      _callback3.call(context);
    }
    effect = effect.nextEffect;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
function markUpdate(workInProgress) {
  workInProgress.effectTag |= 4;
}
var appendAllChildren = void 0,
  updateHostContainer = void 0,
  updateHostComponent$1 = void 0,
  updateHostText$1 = void 0;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) parent.appendChild(node.stateNode);
    else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function() {};
updateHostComponent$1 = function(
  current,
  workInProgress,
  type,
  newProps,
  rootContainerInstance
) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    var instance = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    current = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(instance, oldProps);
        newProps = getHostProps(instance, newProps);
        current = [];
        break;
      case "option":
        oldProps = getHostProps$1(instance, oldProps);
        newProps = getHostProps$1(instance, newProps);
        current = [];
        break;
      case "select":
        oldProps = Object.assign({}, oldProps, { value: void 0 });
        newProps = Object.assign({}, newProps, { value: void 0 });
        current = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(instance, oldProps);
        newProps = getHostProps$3(instance, newProps);
        current = [];
        break;
      default:
        "function" !== typeof oldProps.onClick &&
          "function" === typeof newProps.onClick &&
          (instance.onclick = noop);
    }
    assertValidProps(type, newProps);
    instance = type = void 0;
    var styleUpdates = null;
    for (type in oldProps)
      if (
        !newProps.hasOwnProperty(type) &&
        oldProps.hasOwnProperty(type) &&
        null != oldProps[type]
      )
        if ("style" === type) {
          var lastStyle = oldProps[type];
          for (instance in lastStyle)
            lastStyle.hasOwnProperty(instance) &&
              (styleUpdates || (styleUpdates = {}),
              (styleUpdates[instance] = ""));
        } else
          "dangerouslySetInnerHTML" !== type &&
            "children" !== type &&
            "suppressContentEditableWarning" !== type &&
            "suppressHydrationWarning" !== type &&
            "autoFocus" !== type &&
            (registrationNameModules.hasOwnProperty(type)
              ? current || (current = [])
              : (current = current || []).push(type, null));
    for (type in newProps) {
      var nextProp = newProps[type];
      lastStyle = null != oldProps ? oldProps[type] : void 0;
      if (
        newProps.hasOwnProperty(type) &&
        nextProp !== lastStyle &&
        (null != nextProp || null != lastStyle)
      )
        if ("style" === type)
          if (lastStyle) {
            for (instance in lastStyle)
              !lastStyle.hasOwnProperty(instance) ||
                (nextProp && nextProp.hasOwnProperty(instance)) ||
                (styleUpdates || (styleUpdates = {}),
                (styleUpdates[instance] = ""));
            for (instance in nextProp)
              nextProp.hasOwnProperty(instance) &&
                lastStyle[instance] !== nextProp[instance] &&
                (styleUpdates || (styleUpdates = {}),
                (styleUpdates[instance] = nextProp[instance]));
          } else
            styleUpdates ||
              (current || (current = []), current.push(type, styleUpdates)),
              (styleUpdates = nextProp);
        else
          "dangerouslySetInnerHTML" === type
            ? ((nextProp = nextProp ? nextProp.__html : void 0),
              (lastStyle = lastStyle ? lastStyle.__html : void 0),
              null != nextProp &&
                lastStyle !== nextProp &&
                (current = current || []).push(type, "" + nextProp))
            : "children" === type
              ? lastStyle === nextProp ||
                ("string" !== typeof nextProp &&
                  "number" !== typeof nextProp) ||
                (current = current || []).push(type, "" + nextProp)
              : "suppressContentEditableWarning" !== type &&
                "suppressHydrationWarning" !== type &&
                (registrationNameModules.hasOwnProperty(type)
                  ? (null != nextProp &&
                      ensureListeningTo(rootContainerInstance, type),
                    current || lastStyle === nextProp || (current = []))
                  : (current = current || []).push(type, nextProp));
    }
    styleUpdates && (current = current || []).push("style", styleUpdates);
    rootContainerInstance = current;
    (workInProgress.updateQueue = rootContainerInstance) &&
      markUpdate(workInProgress);
  }
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && markUpdate(workInProgress);
};
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
"function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog
  ? reactProdInvariant("320")
  : void 0;
function logCapturedError(capturedError) {
  !1 !== ReactFiberErrorDialogWWW.showErrorDialog(capturedError) &&
    console.error(capturedError.error);
}
var PossiblyWeakSet$1 = "function" === typeof WeakSet ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source,
    stack = errorInfo.stack;
  null === stack &&
    null !== source &&
    (stack = getStackByFiberInDevAndProd(source));
  errorInfo = {
    componentName: null !== source ? getComponentName(source.type) : null,
    componentStack: null !== stack ? stack : "",
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: !1,
    willRetry: !1
  };
  null !== boundary &&
    1 === boundary.tag &&
    ((errorInfo.errorBoundary = boundary.stateNode),
    (errorInfo.errorBoundaryName = getComponentName(boundary.type)),
    (errorInfo.errorBoundaryFound = !0),
    (errorInfo.willRetry = !0));
  try {
    logCapturedError(errorInfo);
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function safelyDetachRef(current$$1) {
  var ref = current$$1.ref;
  if (null !== ref)
    if ("function" === typeof ref)
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError(current$$1, refError);
      }
    else ref.current = null;
}
function commitHookEffectList(unmountTag, mountTag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if ((effect.tag & unmountTag) !== NoEffect$1) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        void 0 !== destroy && destroy();
      }
      (effect.tag & mountTag) !== NoEffect$1 &&
        ((destroy = effect.create), (effect.destroy = destroy()));
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function hideOrUnhideAllChildren(finishedWork, isHidden) {
  for (var node = finishedWork; ; ) {
    if (5 === node.tag) {
      var instance = node.stateNode;
      if (isHidden) instance.style.display = "none";
      else {
        instance = node.stateNode;
        var styleProp = node.memoizedProps.style;
        styleProp =
          void 0 !== styleProp &&
          null !== styleProp &&
          styleProp.hasOwnProperty("display")
            ? styleProp.display
            : null;
        instance.style.display = dangerousStyleValue("display", styleProp);
      }
    } else if (6 === node.tag)
      node.stateNode.nodeValue = isHidden ? "" : node.memoizedProps;
    else if (13 === node.tag && null !== node.memoizedState) {
      instance = node.child.sibling;
      instance.return = node;
      node = instance;
      continue;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitUnmount(current$$1$jscomp$0) {
  "function" === typeof onCommitFiberUnmount &&
    onCommitFiberUnmount(current$$1$jscomp$0);
  switch (current$$1$jscomp$0.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      var updateQueue = current$$1$jscomp$0.updateQueue;
      if (
        null !== updateQueue &&
        ((updateQueue = updateQueue.lastEffect), null !== updateQueue)
      ) {
        var effect = (updateQueue = updateQueue.next);
        do {
          var destroy = effect.destroy;
          if (void 0 !== destroy) {
            var current$$1 = current$$1$jscomp$0;
            try {
              destroy();
            } catch (error) {
              captureCommitPhaseError(current$$1, error);
            }
          }
          effect = effect.next;
        } while (effect !== updateQueue);
      }
      break;
    case 1:
      safelyDetachRef(current$$1$jscomp$0);
      updateQueue = current$$1$jscomp$0.stateNode;
      if ("function" === typeof updateQueue.componentWillUnmount)
        try {
          startPhaseTimer(current$$1$jscomp$0, "componentWillUnmount"),
            (updateQueue.props = current$$1$jscomp$0.memoizedProps),
            (updateQueue.state = current$$1$jscomp$0.memoizedState),
            updateQueue.componentWillUnmount(),
            stopPhaseTimer();
        } catch (unmountError) {
          captureCommitPhaseError(current$$1$jscomp$0, unmountError);
        }
      return;
    case 5:
      safelyDetachRef(current$$1$jscomp$0);
      return;
    case 4:
      unmountHostComponents(current$$1$jscomp$0);
      return;
  }
  current$$1$jscomp$0.stateNode = null;
  null != current$$1$jscomp$0.alternate &&
    (current$$1$jscomp$0.alternate.stateNode = null);
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent; ) {
      if (isHostParent(parent)) {
        var parentFiber = parent;
        break a;
      }
      parent = parent.return;
    }
    reactProdInvariant("160");
    parentFiber = void 0;
  }
  var isContainer = (parent = void 0);
  switch (parentFiber.tag) {
    case 5:
      parent = parentFiber.stateNode;
      isContainer = !1;
      break;
    case 3:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = !0;
      break;
    default:
      reactProdInvariant("161");
  }
  parentFiber.effectTag & 16 &&
    (setTextContent(parent, ""), (parentFiber.effectTag &= -17));
  a: b: for (parentFiber = finishedWork; ; ) {
    for (; null === parentFiber.sibling; ) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (
      parentFiber = parentFiber.sibling;
      5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;

    ) {
      if (parentFiber.effectTag & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else
        (parentFiber.child.return = parentFiber),
          (parentFiber = parentFiber.child);
    }
    if (!(parentFiber.effectTag & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  for (var node = finishedWork; ; ) {
    if (5 === node.tag || 6 === node.tag)
      if (parentFiber)
        if (isContainer) {
          var container = parent,
            child = node.stateNode,
            beforeChild = parentFiber;
          8 === container.nodeType
            ? container.parentNode.insertBefore(child, beforeChild)
            : container.insertBefore(child, beforeChild);
        } else parent.insertBefore(node.stateNode, parentFiber);
      else
        isContainer
          ? ((child = parent),
            (beforeChild = node.stateNode),
            8 === child.nodeType
              ? ((container = child.parentNode),
                container.insertBefore(beforeChild, child))
              : ((container = child), container.appendChild(beforeChild)),
            (child = child._reactRootContainer),
            (null !== child && void 0 !== child) ||
              null !== container.onclick ||
              (container.onclick = noop))
          : parent.appendChild(node.stateNode);
    else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function unmountHostComponents(current$$1) {
  for (
    var node = current$$1,
      currentParentIsValid = !1,
      currentParent = void 0,
      currentParentIsContainer = void 0;
    ;

  ) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        null === currentParentIsValid ? reactProdInvariant("160") : void 0;
        switch (currentParentIsValid.tag) {
          case 5:
            currentParent = currentParentIsValid.stateNode;
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParentIsValid.stateNode.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParentIsValid.stateNode.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      var stateNode = node.stateNode;
      a: for (var root = node, node$jscomp$0 = root; ; )
        if (
          (commitUnmount(node$jscomp$0),
          null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag)
        )
          (node$jscomp$0.child.return = node$jscomp$0),
            (node$jscomp$0 = node$jscomp$0.child);
        else {
          if (node$jscomp$0 === root) break;
          for (; null === node$jscomp$0.sibling; ) {
            if (null === node$jscomp$0.return || node$jscomp$0.return === root)
              break a;
            node$jscomp$0 = node$jscomp$0.return;
          }
          node$jscomp$0.sibling.return = node$jscomp$0.return;
          node$jscomp$0 = node$jscomp$0.sibling;
        }
      currentParentIsContainer
        ? ((root = currentParent),
          8 === root.nodeType
            ? root.parentNode.removeChild(stateNode)
            : root.removeChild(stateNode))
        : currentParent.removeChild(stateNode);
    } else if (18 === node.tag)
      currentParentIsContainer
        ? ((stateNode = currentParent),
          (root = node.stateNode),
          8 === stateNode.nodeType
            ? clearSuspenseBoundary(stateNode.parentNode, root)
            : 1 === stateNode.nodeType &&
              clearSuspenseBoundary(stateNode, root))
        : clearSuspenseBoundary(currentParent, node.stateNode);
    else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if ((commitUnmount(node), null !== node.child)) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current$$1) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === current$$1) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current$$1, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
      break;
    case 1:
      break;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps;
        current$$1 = null !== current$$1 ? current$$1.memoizedProps : newProps;
        var type = finishedWork.type,
          updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        null !== updatePayload &&
          commitUpdate(
            instance,
            updatePayload,
            type,
            current$$1,
            newProps,
            finishedWork
          );
      }
      break;
    case 6:
      null === finishedWork.stateNode ? reactProdInvariant("162") : void 0;
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      break;
    case 3:
      break;
    case 12:
      break;
    case 13:
      instance = finishedWork.memoizedState;
      newProps = void 0;
      current$$1 = finishedWork;
      null === instance
        ? (newProps = !1)
        : ((newProps = !0),
          (current$$1 = finishedWork.child),
          0 === instance.timedOutAt &&
            (instance.timedOutAt = requestCurrentTime()));
      null !== current$$1 && hideOrUnhideAllChildren(current$$1, newProps);
      instance = finishedWork.updateQueue;
      if (null !== instance) {
        finishedWork.updateQueue = null;
        var retryCache = finishedWork.stateNode;
        null === retryCache &&
          (retryCache = finishedWork.stateNode = new PossiblyWeakSet$1());
        instance.forEach(function(thenable) {
          var retry = retryTimedOutBoundary.bind(null, finishedWork, thenable);
          retry = tracing.unstable_wrap(retry);
          retryCache.has(thenable) ||
            (retryCache.add(thenable), thenable.then(retry, retry));
        });
      }
      break;
    case 17:
      break;
    default:
      reactProdInvariant("163");
  }
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set,
  PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime);
  expirationTime.tag = CaptureUpdate;
  expirationTime.payload = { element: null };
  var error = errorInfo.value;
  expirationTime.callback = function() {
    onUncaughtError(error);
    logError(fiber, errorInfo);
  };
  return expirationTime;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime);
  expirationTime.tag = CaptureUpdate;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error$jscomp$0 = errorInfo.value;
    expirationTime.payload = function() {
      return getDerivedStateFromError(error$jscomp$0);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (expirationTime.callback = function() {
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var error = errorInfo.value,
        stack = errorInfo.stack;
      logError(fiber, errorInfo);
      this.componentDidCatch(error, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return expirationTime;
}
function attachPingListener(root, renderExpirationTime, thenable) {
  var pingCache = root.pingCache;
  if (null === pingCache) {
    pingCache = root.pingCache = new PossiblyWeakMap();
    var threadIDs = new Set();
    pingCache.set(thenable, threadIDs);
  } else
    (threadIDs = pingCache.get(thenable)),
      void 0 === threadIDs &&
        ((threadIDs = new Set()), pingCache.set(thenable, threadIDs));
  threadIDs.has(renderExpirationTime) ||
    (threadIDs.add(renderExpirationTime),
    (root = pingSuspendedRoot.bind(null, root, thenable, renderExpirationTime)),
    (root = tracing.unstable_wrap(root)),
    thenable.then(root, root));
}
function throwException(
  root,
  returnFiber,
  sourceFiber,
  value,
  renderExpirationTime
) {
  sourceFiber.effectTag |= 1024;
  sourceFiber.firstEffect = sourceFiber.lastEffect = null;
  if (
    null !== value &&
    "object" === typeof value &&
    "function" === typeof value.then
  ) {
    var thenable = value;
    value = returnFiber;
    var earliestTimeoutMs = -1,
      startTimeMs = -1;
    do {
      if (13 === value.tag) {
        var current$$1 = value.alternate;
        if (
          null !== current$$1 &&
          ((current$$1 = current$$1.memoizedState), null !== current$$1)
        ) {
          startTimeMs = 10 * (1073741822 - current$$1.timedOutAt);
          break;
        }
        current$$1 = value.pendingProps.maxDuration;
        if ("number" === typeof current$$1)
          if (0 >= current$$1) earliestTimeoutMs = 0;
          else if (-1 === earliestTimeoutMs || current$$1 < earliestTimeoutMs)
            earliestTimeoutMs = current$$1;
      }
      value = value.return;
    } while (null !== value);
    value = returnFiber;
    do {
      if ((current$$1 = 13 === value.tag))
        current$$1 =
          void 0 === value.memoizedProps.fallback
            ? !1
            : null === value.memoizedState;
      if (current$$1) {
        returnFiber = value.updateQueue;
        null === returnFiber
          ? ((returnFiber = new Set()),
            returnFiber.add(thenable),
            (value.updateQueue = returnFiber))
          : returnFiber.add(thenable);
        if (0 === (value.mode & 1)) {
          value.effectTag |= 64;
          sourceFiber.effectTag &= -1957;
          1 === sourceFiber.tag &&
            (null === sourceFiber.alternate
              ? (sourceFiber.tag = 17)
              : ((renderExpirationTime = createUpdate(1073741823)),
                (renderExpirationTime.tag = ForceUpdate),
                enqueueUpdate(sourceFiber, renderExpirationTime)));
          sourceFiber.expirationTime = 1073741823;
          return;
        }
        attachPingListener(root, renderExpirationTime, thenable);
        -1 === earliestTimeoutMs
          ? (thenable = 1073741823)
          : (-1 === startTimeMs &&
              (startTimeMs =
                10 *
                  (1073741822 -
                    findEarliestOutstandingPriorityLevel(
                      root,
                      renderExpirationTime
                    )) -
                5e3),
            (thenable = startTimeMs + earliestTimeoutMs));
        0 <= thenable &&
          nextLatestAbsoluteTimeoutMs < thenable &&
          (nextLatestAbsoluteTimeoutMs = thenable);
        value.effectTag |= 2048;
        value.expirationTime = renderExpirationTime;
        return;
      }
      if (18 === value.tag) {
        attachPingListener(root, renderExpirationTime, thenable);
        sourceFiber = value.memoizedState;
        null === sourceFiber &&
          ((sourceFiber = value.memoizedState = new PossiblyWeakSet()),
          (root = value.alternate) ? void 0 : reactProdInvariant("319"),
          (root.memoizedState = sourceFiber));
        sourceFiber.has(thenable) ||
          (sourceFiber.add(thenable),
          (sourceFiber = retryTimedOutBoundary.bind(null, value, thenable)),
          (sourceFiber = tracing.unstable_wrap(sourceFiber)),
          thenable.then(sourceFiber, sourceFiber));
        value.effectTag |= 2048;
        value.expirationTime = renderExpirationTime;
        return;
      }
      value = value.return;
    } while (null !== value);
    value = Error(
      (getComponentName(sourceFiber.type) || "A React component") +
        " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
        getStackByFiberInDevAndProd(sourceFiber)
    );
  }
  nextRenderDidError = !0;
  value = createCapturedValue(value, sourceFiber);
  thenable = returnFiber;
  do {
    switch (thenable.tag) {
      case 3:
        thenable.effectTag |= 2048;
        thenable.expirationTime = renderExpirationTime;
        renderExpirationTime = createRootErrorUpdate(
          thenable,
          value,
          renderExpirationTime
        );
        enqueueCapturedUpdate(thenable, renderExpirationTime);
        return;
      case 1:
        if (
          ((sourceFiber = value),
          (root = thenable.type),
          (earliestTimeoutMs = thenable.stateNode),
          0 === (thenable.effectTag & 64) &&
            ("function" === typeof root.getDerivedStateFromError ||
              (null !== earliestTimeoutMs &&
                "function" === typeof earliestTimeoutMs.componentDidCatch &&
                (null === legacyErrorBoundariesThatAlreadyFailed ||
                  !legacyErrorBoundariesThatAlreadyFailed.has(
                    earliestTimeoutMs
                  )))))
        ) {
          thenable.effectTag |= 2048;
          thenable.expirationTime = renderExpirationTime;
          renderExpirationTime = createClassErrorUpdate(
            thenable,
            sourceFiber,
            renderExpirationTime
          );
          enqueueCapturedUpdate(thenable, renderExpirationTime);
          return;
        }
    }
    thenable = thenable.return;
  } while (null !== thenable);
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      isContextProvider(workInProgress.type) && popContext(workInProgress);
      var effectTag = workInProgress.effectTag;
      return effectTag & 2048
        ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
          workInProgress)
        : null;
    case 3:
      return (
        popHostContainer(workInProgress),
        popTopLevelContextObject(workInProgress),
        (effectTag = workInProgress.effectTag),
        0 !== (effectTag & 64) ? reactProdInvariant("285") : void 0,
        (workInProgress.effectTag = (effectTag & -2049) | 64),
        workInProgress
      );
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      return (
        (effectTag = workInProgress.effectTag),
        effectTag & 2048
          ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
            workInProgress)
          : null
      );
    case 18:
      return (
        (effectTag = workInProgress.effectTag),
        effectTag & 2048
          ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
            workInProgress)
          : null
      );
    case 4:
      return popHostContainer(workInProgress), null;
    case 10:
      return popProvider(workInProgress), null;
    default:
      return null;
  }
}
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner;
null == tracing.__interactionsRef || null == tracing.__interactionsRef.current
  ? reactProdInvariant("302")
  : void 0;
var lastUniqueAsyncExpiration = 1073741822,
  isWorking = !1,
  nextUnitOfWork = null,
  nextRoot = null,
  nextRenderExpirationTime = 0,
  nextLatestAbsoluteTimeoutMs = -1,
  nextRenderDidError = !1,
  nextEffect = null,
  isCommitting$1 = !1,
  rootWithPendingPassiveEffects = null,
  passiveEffectCallbackHandle = null,
  passiveEffectCallback = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  interruptedBy = null;
function resetStack() {
  if (null !== nextUnitOfWork)
    for (
      var interruptedWork = nextUnitOfWork.return;
      null !== interruptedWork;

    ) {
      var interruptedWork$jscomp$0 = interruptedWork;
      switch (interruptedWork$jscomp$0.tag) {
        case 1:
          var childContextTypes =
            interruptedWork$jscomp$0.type.childContextTypes;
          null !== childContextTypes &&
            void 0 !== childContextTypes &&
            popContext(interruptedWork$jscomp$0);
          break;
        case 3:
          popHostContainer(interruptedWork$jscomp$0);
          popTopLevelContextObject(interruptedWork$jscomp$0);
          break;
        case 5:
          popHostContext(interruptedWork$jscomp$0);
          break;
        case 4:
          popHostContainer(interruptedWork$jscomp$0);
          break;
        case 10:
          popProvider(interruptedWork$jscomp$0);
      }
      interruptedWork = interruptedWork.return;
    }
  nextRoot = null;
  nextRenderExpirationTime = 0;
  nextLatestAbsoluteTimeoutMs = -1;
  nextRenderDidError = !1;
  nextUnitOfWork = null;
}
function commitAllHostEffects() {
  for (; null !== nextEffect; ) {
    enableUserTimingAPI && effectCountInCurrentCommit++;
    var effectTag = nextEffect.effectTag;
    effectTag & 16 && setTextContent(nextEffect.stateNode, "");
    if (effectTag & 128) {
      var current$$1 = nextEffect.alternate;
      null !== current$$1 &&
        ((current$$1 = current$$1.ref),
        null !== current$$1 &&
          ("function" === typeof current$$1
            ? current$$1(null)
            : (current$$1.current = null)));
    }
    switch (effectTag & 14) {
      case 2:
        commitPlacement(nextEffect);
        nextEffect.effectTag &= -3;
        break;
      case 6:
        commitPlacement(nextEffect);
        nextEffect.effectTag &= -3;
        commitWork(nextEffect.alternate, nextEffect);
        break;
      case 4:
        commitWork(nextEffect.alternate, nextEffect);
        break;
      case 8:
        (effectTag = nextEffect),
          unmountHostComponents(effectTag),
          (effectTag.return = null),
          (effectTag.child = null),
          (effectTag.memoizedState = null),
          (effectTag.updateQueue = null),
          (effectTag = effectTag.alternate),
          null !== effectTag &&
            ((effectTag.return = null),
            (effectTag.child = null),
            (effectTag.memoizedState = null),
            (effectTag.updateQueue = null));
    }
    nextEffect = nextEffect.nextEffect;
  }
}
function commitBeforeMutationLifecycles() {
  for (; null !== nextEffect; ) {
    if (nextEffect.effectTag & 256) {
      enableUserTimingAPI && effectCountInCurrentCommit++;
      a: {
        var current$$1 = nextEffect.alternate,
          finishedWork = nextEffect;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectList(UnmountSnapshot, NoEffect$1, finishedWork);
            break a;
          case 1:
            if (finishedWork.effectTag & 256 && null !== current$$1) {
              var prevProps = current$$1.memoizedProps,
                prevState = current$$1.memoizedState;
              startPhaseTimer(finishedWork, "getSnapshotBeforeUpdate");
              current$$1 = finishedWork.stateNode;
              finishedWork = current$$1.getSnapshotBeforeUpdate(
                finishedWork.elementType === finishedWork.type
                  ? prevProps
                  : resolveDefaultProps(finishedWork.type, prevProps),
                prevState
              );
              current$$1.__reactInternalSnapshotBeforeUpdate = finishedWork;
              stopPhaseTimer();
            }
            break a;
          case 3:
          case 5:
          case 6:
          case 4:
          case 17:
            break a;
          default:
            reactProdInvariant("163");
        }
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
function commitAllLifeCycles(
  finishedRoot$jscomp$0,
  committedExpirationTime$jscomp$0
) {
  for (; null !== nextEffect; ) {
    var effectTag = nextEffect.effectTag;
    if (effectTag & 36) {
      enableUserTimingAPI && effectCountInCurrentCommit++;
      var finishedRoot = finishedRoot$jscomp$0,
        current$$1 = nextEffect.alternate,
        finishedWork = nextEffect,
        committedExpirationTime = committedExpirationTime$jscomp$0;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectList(UnmountLayout, MountLayout, finishedWork);
          break;
        case 1:
          finishedRoot = finishedWork.stateNode;
          if (finishedWork.effectTag & 4) {
            if (null === current$$1)
              startPhaseTimer(finishedWork, "componentDidMount"),
                finishedRoot.componentDidMount();
            else {
              var prevProps =
                finishedWork.elementType === finishedWork.type
                  ? current$$1.memoizedProps
                  : resolveDefaultProps(
                      finishedWork.type,
                      current$$1.memoizedProps
                    );
              current$$1 = current$$1.memoizedState;
              startPhaseTimer(finishedWork, "componentDidUpdate");
              finishedRoot.componentDidUpdate(
                prevProps,
                current$$1,
                finishedRoot.__reactInternalSnapshotBeforeUpdate
              );
            }
            stopPhaseTimer();
          }
          current$$1 = finishedWork.updateQueue;
          null !== current$$1 &&
            commitUpdateQueue(
              finishedWork,
              current$$1,
              finishedRoot,
              committedExpirationTime
            );
          break;
        case 3:
          current$$1 = finishedWork.updateQueue;
          if (null !== current$$1) {
            finishedRoot = null;
            if (null !== finishedWork.child)
              switch (finishedWork.child.tag) {
                case 5:
                  finishedRoot = finishedWork.child.stateNode;
                  break;
                case 1:
                  finishedRoot = finishedWork.child.stateNode;
              }
            commitUpdateQueue(
              finishedWork,
              current$$1,
              finishedRoot,
              committedExpirationTime
            );
          }
          break;
        case 5:
          committedExpirationTime = finishedWork.stateNode;
          null === current$$1 &&
            finishedWork.effectTag & 4 &&
            shouldAutoFocusHostComponent(
              finishedWork.type,
              finishedWork.memoizedProps
            ) &&
            committedExpirationTime.focus();
          break;
        case 6:
          break;
        case 4:
          break;
        case 12:
          committedExpirationTime = finishedWork.memoizedProps.onRender;
          committedExpirationTime(
            finishedWork.memoizedProps.id,
            null === current$$1 ? "mount" : "update",
            finishedWork.actualDuration,
            finishedWork.treeBaseDuration,
            finishedWork.actualStartTime,
            commitTime,
            finishedRoot.memoizedInteractions
          );
          break;
        case 13:
          break;
        case 17:
          break;
        default:
          reactProdInvariant("163");
      }
    }
    effectTag & 128 &&
      (enableUserTimingAPI && effectCountInCurrentCommit++,
      (finishedWork = nextEffect.ref),
      null !== finishedWork &&
        ((committedExpirationTime = nextEffect.stateNode),
        "function" === typeof finishedWork
          ? finishedWork(committedExpirationTime)
          : (finishedWork.current = committedExpirationTime)));
    effectTag & 512 && (rootWithPendingPassiveEffects = finishedRoot$jscomp$0);
    nextEffect = nextEffect.nextEffect;
  }
}
function commitPassiveEffects(root, firstEffect) {
  passiveEffectCallback = passiveEffectCallbackHandle = rootWithPendingPassiveEffects = null;
  var previousIsRendering = isRendering;
  isRendering = !0;
  do {
    if (firstEffect.effectTag & 512) {
      var didError = !1,
        error = void 0;
      try {
        var finishedWork = firstEffect;
        commitHookEffectList(UnmountPassive, NoEffect$1, finishedWork);
        commitHookEffectList(NoEffect$1, MountPassive, finishedWork);
      } catch (e) {
        (didError = !0), (error = e);
      }
      didError && captureCommitPhaseError(firstEffect, error);
    }
    firstEffect = firstEffect.nextEffect;
  } while (null !== firstEffect);
  isRendering = previousIsRendering;
  previousIsRendering = root.expirationTime;
  0 !== previousIsRendering && requestWork(root, previousIsRendering);
  isBatchingUpdates || isRendering || performWork(1073741823, !1);
}
function flushPassiveEffects() {
  null !== passiveEffectCallbackHandle &&
    cancelPassiveEffects(passiveEffectCallbackHandle);
  null !== passiveEffectCallback && passiveEffectCallback();
}
function commitRoot(root, finishedWork) {
  isCommitting$1 = isWorking = !0;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((isCommitting = !0),
    (hasScheduledUpdateInCurrentCommit = !1),
    labelsInCurrentCommit.clear(),
    beginMark("(Committing Changes)"));
  root.current === finishedWork ? reactProdInvariant("177") : void 0;
  var committedExpirationTime = root.pendingCommitExpirationTime;
  0 === committedExpirationTime ? reactProdInvariant("261") : void 0;
  root.pendingCommitExpirationTime = 0;
  var updateExpirationTimeBeforeCommit = finishedWork.expirationTime,
    childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
  markCommittedPriorityLevels(
    root,
    childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit
      ? childExpirationTimeBeforeCommit
      : updateExpirationTimeBeforeCommit
  );
  updateExpirationTimeBeforeCommit = null;
  updateExpirationTimeBeforeCommit = tracing.__interactionsRef.current;
  tracing.__interactionsRef.current = root.memoizedInteractions;
  ReactCurrentOwner$2.current = null;
  childExpirationTimeBeforeCommit = void 0;
  1 < finishedWork.effectTag
    ? null !== finishedWork.lastEffect
      ? ((finishedWork.lastEffect.nextEffect = finishedWork),
        (childExpirationTimeBeforeCommit = finishedWork.firstEffect))
      : (childExpirationTimeBeforeCommit = finishedWork)
    : (childExpirationTimeBeforeCommit = finishedWork.firstEffect);
  eventsEnabled = _enabled;
  selectionInformation = getSelectionInformation();
  _enabled = !1;
  nextEffect = childExpirationTimeBeforeCommit;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Committing Snapshot Effects)"));
  for (; null !== nextEffect; ) {
    var didError = !1,
      error$jscomp$0 = void 0;
    try {
      commitBeforeMutationLifecycles();
    } catch (e) {
      (didError = !0), (error$jscomp$0 = e);
    }
    didError &&
      (null === nextEffect ? reactProdInvariant("178") : void 0,
      captureCommitPhaseError(nextEffect, error$jscomp$0),
      null !== nextEffect &&
        ((didError = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        (nextEffect = didError)));
  }
  stopCommitSnapshotEffectsTimer();
  commitTime = scheduler.unstable_now();
  nextEffect = childExpirationTimeBeforeCommit;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0), beginMark("(Committing Host Effects)"));
  for (; null !== nextEffect; ) {
    didError = !1;
    error$jscomp$0 = void 0;
    try {
      commitAllHostEffects();
    } catch (e) {
      (didError = !0), (error$jscomp$0 = e);
    }
    didError &&
      (null === nextEffect ? reactProdInvariant("178") : void 0,
      captureCommitPhaseError(nextEffect, error$jscomp$0),
      null !== nextEffect && (nextEffect = nextEffect.nextEffect));
  }
  stopCommitHostEffectsTimer();
  restoreSelection(selectionInformation);
  selectionInformation = null;
  _enabled = !!eventsEnabled;
  eventsEnabled = null;
  root.current = finishedWork;
  nextEffect = childExpirationTimeBeforeCommit;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Calling Lifecycle Methods)"));
  for (; null !== nextEffect; ) {
    didError = !1;
    error$jscomp$0 = void 0;
    try {
      commitAllLifeCycles(root, committedExpirationTime);
    } catch (e) {
      (didError = !0), (error$jscomp$0 = e);
    }
    didError &&
      (null === nextEffect ? reactProdInvariant("178") : void 0,
      captureCommitPhaseError(nextEffect, error$jscomp$0),
      null !== nextEffect && (nextEffect = nextEffect.nextEffect));
  }
  if (
    null !== childExpirationTimeBeforeCommit &&
    null !== rootWithPendingPassiveEffects
  ) {
    var callback = commitPassiveEffects.bind(
      null,
      root,
      childExpirationTimeBeforeCommit
    );
    callback = tracing.unstable_wrap(callback);
    passiveEffectCallbackHandle = scheduler.unstable_runWithPriority(
      scheduler.unstable_NormalPriority,
      function() {
        return schedulePassiveEffects(callback);
      }
    );
    passiveEffectCallback = callback;
  } else
    for (nextEffect = childExpirationTimeBeforeCommit; null !== nextEffect; )
      (childExpirationTimeBeforeCommit = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        (nextEffect = childExpirationTimeBeforeCommit);
  isWorking = isCommitting$1 = !1;
  stopCommitLifeCyclesTimer();
  stopCommitTimer();
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork.stateNode);
  childExpirationTimeBeforeCommit = finishedWork.expirationTime;
  finishedWork = finishedWork.childExpirationTime;
  var earliestRemainingTimeAfterCommit =
    finishedWork > childExpirationTimeBeforeCommit
      ? finishedWork
      : childExpirationTimeBeforeCommit;
  0 === earliestRemainingTimeAfterCommit &&
    (legacyErrorBoundariesThatAlreadyFailed = null);
  onCommit(root, earliestRemainingTimeAfterCommit);
  tracing.__interactionsRef.current = updateExpirationTimeBeforeCommit;
  var subscriber = void 0;
  try {
    if (
      ((subscriber = tracing.__subscriberRef.current),
      null !== subscriber && 0 < root.memoizedInteractions.size)
    )
      subscriber.onWorkStopped(
        root.memoizedInteractions,
        1e3 * committedExpirationTime + root.interactionThreadID
      );
  } catch (error) {
    hasUnhandledError || ((hasUnhandledError = !0), (unhandledError = error));
  } finally {
    var pendingInteractionMap = root.pendingInteractionMap;
    pendingInteractionMap.forEach(function(
      scheduledInteractions,
      scheduledExpirationTime
    ) {
      scheduledExpirationTime > earliestRemainingTimeAfterCommit &&
        (pendingInteractionMap.delete(scheduledExpirationTime),
        scheduledInteractions.forEach(function(interaction) {
          interaction.__count--;
          if (null !== subscriber && 0 === interaction.__count)
            try {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            } catch (error) {
              hasUnhandledError ||
                ((hasUnhandledError = !0), (unhandledError = error));
            }
        }));
    });
  }
}
function completeUnitOfWork(workInProgress) {
  for (;;) {
    var current$$1 = workInProgress.alternate,
      returnFiber = workInProgress.return,
      siblingFiber = workInProgress.sibling;
    if (0 === (workInProgress.effectTag & 1024)) {
      nextUnitOfWork = workInProgress;
      workInProgress.mode & 4 && startProfilerTimer(workInProgress);
      a: {
        var current = current$$1;
        current$$1 = workInProgress;
        var renderExpirationTime = nextRenderExpirationTime;
        var JSCompiler_inline_result = current$$1.pendingProps;
        switch (current$$1.tag) {
          case 2:
            break;
          case 16:
            break;
          case 15:
          case 0:
            break;
          case 1:
            isContextProvider(current$$1.type) && popContext(current$$1);
            break;
          case 3:
            popHostContainer(current$$1);
            popTopLevelContextObject(current$$1);
            JSCompiler_inline_result = current$$1.stateNode;
            JSCompiler_inline_result.pendingContext &&
              ((JSCompiler_inline_result.context =
                JSCompiler_inline_result.pendingContext),
              (JSCompiler_inline_result.pendingContext = null));
            if (null === current || null === current.child)
              popHydrationState(current$$1), (current$$1.effectTag &= -3);
            updateHostContainer(current$$1);
            break;
          case 5:
            popHostContext(current$$1);
            var rootContainerInstance = requiredContext(
              rootInstanceStackCursor.current
            );
            renderExpirationTime = current$$1.type;
            if (null !== current && null != current$$1.stateNode)
              updateHostComponent$1(
                current,
                current$$1,
                renderExpirationTime,
                JSCompiler_inline_result,
                rootContainerInstance
              ),
                current.ref !== current$$1.ref && (current$$1.effectTag |= 128);
            else if (JSCompiler_inline_result) {
              var currentHostContext = requiredContext(
                contextStackCursor$1.current
              );
              if (popHydrationState(current$$1)) {
                JSCompiler_inline_result = current$$1;
                current = JSCompiler_inline_result.stateNode;
                var type = JSCompiler_inline_result.type,
                  props = JSCompiler_inline_result.memoizedProps,
                  rootContainerInstance$jscomp$0 = rootContainerInstance;
                current[internalInstanceKey] = JSCompiler_inline_result;
                current[internalEventHandlersKey] = props;
                renderExpirationTime = void 0;
                rootContainerInstance = type;
                switch (rootContainerInstance) {
                  case "iframe":
                  case "object":
                    trapBubbledEvent("load", current);
                    break;
                  case "video":
                  case "audio":
                    for (type = 0; type < mediaEventTypes.length; type++)
                      trapBubbledEvent(mediaEventTypes[type], current);
                    break;
                  case "source":
                    trapBubbledEvent("error", current);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    trapBubbledEvent("error", current);
                    trapBubbledEvent("load", current);
                    break;
                  case "form":
                    trapBubbledEvent("reset", current);
                    trapBubbledEvent("submit", current);
                    break;
                  case "details":
                    trapBubbledEvent("toggle", current);
                    break;
                  case "input":
                    initWrapperState(current, props);
                    trapBubbledEvent("invalid", current);
                    ensureListeningTo(
                      rootContainerInstance$jscomp$0,
                      "onChange"
                    );
                    break;
                  case "select":
                    current._wrapperState = { wasMultiple: !!props.multiple };
                    trapBubbledEvent("invalid", current);
                    ensureListeningTo(
                      rootContainerInstance$jscomp$0,
                      "onChange"
                    );
                    break;
                  case "textarea":
                    initWrapperState$2(current, props),
                      trapBubbledEvent("invalid", current),
                      ensureListeningTo(
                        rootContainerInstance$jscomp$0,
                        "onChange"
                      );
                }
                assertValidProps(rootContainerInstance, props);
                type = null;
                for (renderExpirationTime in props)
                  props.hasOwnProperty(renderExpirationTime) &&
                    ((currentHostContext = props[renderExpirationTime]),
                    "children" === renderExpirationTime
                      ? "string" === typeof currentHostContext
                        ? current.textContent !== currentHostContext &&
                          (type = ["children", currentHostContext])
                        : "number" === typeof currentHostContext &&
                          current.textContent !== "" + currentHostContext &&
                          (type = ["children", "" + currentHostContext])
                      : registrationNameModules.hasOwnProperty(
                          renderExpirationTime
                        ) &&
                        null != currentHostContext &&
                        ensureListeningTo(
                          rootContainerInstance$jscomp$0,
                          renderExpirationTime
                        ));
                switch (rootContainerInstance) {
                  case "input":
                    track(current);
                    postMountWrapper(current, props, !0);
                    break;
                  case "textarea":
                    track(current);
                    postMountWrapper$3(current, props);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof props.onClick &&
                      (current.onclick = noop);
                }
                renderExpirationTime = type;
                JSCompiler_inline_result.updateQueue = renderExpirationTime;
                JSCompiler_inline_result =
                  null !== renderExpirationTime ? !0 : !1;
                JSCompiler_inline_result && markUpdate(current$$1);
              } else {
                props = current$$1;
                rootContainerInstance$jscomp$0 = renderExpirationTime;
                current = JSCompiler_inline_result;
                type =
                  9 === rootContainerInstance.nodeType
                    ? rootContainerInstance
                    : rootContainerInstance.ownerDocument;
                currentHostContext === Namespaces.html &&
                  (currentHostContext = getIntrinsicNamespace(
                    rootContainerInstance$jscomp$0
                  ));
                currentHostContext === Namespaces.html
                  ? "script" === rootContainerInstance$jscomp$0
                    ? ((current = type.createElement("div")),
                      (current.innerHTML = "<script>\x3c/script>"),
                      (type = current.removeChild(current.firstChild)))
                    : "string" === typeof current.is
                      ? (type = type.createElement(
                          rootContainerInstance$jscomp$0,
                          { is: current.is }
                        ))
                      : ((type = type.createElement(
                          rootContainerInstance$jscomp$0
                        )),
                        "select" === rootContainerInstance$jscomp$0 &&
                          ((rootContainerInstance$jscomp$0 = type),
                          current.multiple
                            ? (rootContainerInstance$jscomp$0.multiple = !0)
                            : current.size &&
                              (rootContainerInstance$jscomp$0.size =
                                current.size)))
                  : (type = type.createElementNS(
                      currentHostContext,
                      rootContainerInstance$jscomp$0
                    ));
                current = type;
                current[internalInstanceKey] = props;
                current[internalEventHandlersKey] = JSCompiler_inline_result;
                appendAllChildren(current, current$$1, !1, !1);
                rootContainerInstance$jscomp$0 = current;
                type = renderExpirationTime;
                props = JSCompiler_inline_result;
                var rootContainerElement = rootContainerInstance,
                  isCustomComponentTag = isCustomComponent(type, props);
                switch (type) {
                  case "iframe":
                  case "object":
                    trapBubbledEvent("load", rootContainerInstance$jscomp$0);
                    rootContainerInstance = props;
                    break;
                  case "video":
                  case "audio":
                    for (
                      rootContainerInstance = 0;
                      rootContainerInstance < mediaEventTypes.length;
                      rootContainerInstance++
                    )
                      trapBubbledEvent(
                        mediaEventTypes[rootContainerInstance],
                        rootContainerInstance$jscomp$0
                      );
                    rootContainerInstance = props;
                    break;
                  case "source":
                    trapBubbledEvent("error", rootContainerInstance$jscomp$0);
                    rootContainerInstance = props;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    trapBubbledEvent("error", rootContainerInstance$jscomp$0);
                    trapBubbledEvent("load", rootContainerInstance$jscomp$0);
                    rootContainerInstance = props;
                    break;
                  case "form":
                    trapBubbledEvent("reset", rootContainerInstance$jscomp$0);
                    trapBubbledEvent("submit", rootContainerInstance$jscomp$0);
                    rootContainerInstance = props;
                    break;
                  case "details":
                    trapBubbledEvent("toggle", rootContainerInstance$jscomp$0);
                    rootContainerInstance = props;
                    break;
                  case "input":
                    initWrapperState(rootContainerInstance$jscomp$0, props);
                    rootContainerInstance = getHostProps(
                      rootContainerInstance$jscomp$0,
                      props
                    );
                    trapBubbledEvent("invalid", rootContainerInstance$jscomp$0);
                    ensureListeningTo(rootContainerElement, "onChange");
                    break;
                  case "option":
                    rootContainerInstance = getHostProps$1(
                      rootContainerInstance$jscomp$0,
                      props
                    );
                    break;
                  case "select":
                    rootContainerInstance$jscomp$0._wrapperState = {
                      wasMultiple: !!props.multiple
                    };
                    rootContainerInstance = Object.assign({}, props, {
                      value: void 0
                    });
                    trapBubbledEvent("invalid", rootContainerInstance$jscomp$0);
                    ensureListeningTo(rootContainerElement, "onChange");
                    break;
                  case "textarea":
                    initWrapperState$2(rootContainerInstance$jscomp$0, props);
                    rootContainerInstance = getHostProps$3(
                      rootContainerInstance$jscomp$0,
                      props
                    );
                    trapBubbledEvent("invalid", rootContainerInstance$jscomp$0);
                    ensureListeningTo(rootContainerElement, "onChange");
                    break;
                  default:
                    rootContainerInstance = props;
                }
                assertValidProps(type, rootContainerInstance);
                currentHostContext = void 0;
                var tag = type,
                  domElement = rootContainerInstance$jscomp$0,
                  nextProps = rootContainerInstance;
                for (currentHostContext in nextProps)
                  if (nextProps.hasOwnProperty(currentHostContext)) {
                    var nextProp = nextProps[currentHostContext];
                    "style" === currentHostContext
                      ? setValueForStyles(domElement, nextProp)
                      : "dangerouslySetInnerHTML" === currentHostContext
                        ? ((nextProp = nextProp ? nextProp.__html : void 0),
                          null != nextProp &&
                            setInnerHTML(domElement, nextProp))
                        : "children" === currentHostContext
                          ? "string" === typeof nextProp
                            ? ("textarea" !== tag || "" !== nextProp) &&
                              setTextContent(domElement, nextProp)
                            : "number" === typeof nextProp &&
                              setTextContent(domElement, "" + nextProp)
                          : "suppressContentEditableWarning" !==
                              currentHostContext &&
                            "suppressHydrationWarning" !== currentHostContext &&
                            "autoFocus" !== currentHostContext &&
                            (registrationNameModules.hasOwnProperty(
                              currentHostContext
                            )
                              ? null != nextProp &&
                                ensureListeningTo(
                                  rootContainerElement,
                                  currentHostContext
                                )
                              : null != nextProp &&
                                setValueForProperty(
                                  domElement,
                                  currentHostContext,
                                  nextProp,
                                  isCustomComponentTag
                                ));
                  }
                switch (type) {
                  case "input":
                    track(rootContainerInstance$jscomp$0);
                    postMountWrapper(rootContainerInstance$jscomp$0, props, !1);
                    break;
                  case "textarea":
                    track(rootContainerInstance$jscomp$0);
                    postMountWrapper$3(rootContainerInstance$jscomp$0, props);
                    break;
                  case "option":
                    null != props.value &&
                      rootContainerInstance$jscomp$0.setAttribute(
                        "value",
                        "" + getToStringValue(props.value)
                      );
                    break;
                  case "select":
                    rootContainerInstance = rootContainerInstance$jscomp$0;
                    rootContainerInstance.multiple = !!props.multiple;
                    rootContainerInstance$jscomp$0 = props.value;
                    null != rootContainerInstance$jscomp$0
                      ? updateOptions(
                          rootContainerInstance,
                          !!props.multiple,
                          rootContainerInstance$jscomp$0,
                          !1
                        )
                      : null != props.defaultValue &&
                        updateOptions(
                          rootContainerInstance,
                          !!props.multiple,
                          props.defaultValue,
                          !0
                        );
                    break;
                  default:
                    "function" === typeof rootContainerInstance.onClick &&
                      (rootContainerInstance$jscomp$0.onclick = noop);
                }
                (JSCompiler_inline_result = shouldAutoFocusHostComponent(
                  renderExpirationTime,
                  JSCompiler_inline_result
                )) && markUpdate(current$$1);
                current$$1.stateNode = current;
              }
              null !== current$$1.ref && (current$$1.effectTag |= 128);
            } else
              null === current$$1.stateNode
                ? reactProdInvariant("166")
                : void 0;
            break;
          case 6:
            current && null != current$$1.stateNode
              ? updateHostText$1(
                  current,
                  current$$1,
                  current.memoizedProps,
                  JSCompiler_inline_result
                )
              : ("string" !== typeof JSCompiler_inline_result &&
                  (null === current$$1.stateNode
                    ? reactProdInvariant("166")
                    : void 0),
                (current = requiredContext(rootInstanceStackCursor.current)),
                requiredContext(contextStackCursor$1.current),
                popHydrationState(current$$1)
                  ? ((JSCompiler_inline_result = current$$1),
                    (renderExpirationTime = JSCompiler_inline_result.stateNode),
                    (current = JSCompiler_inline_result.memoizedProps),
                    (renderExpirationTime[
                      internalInstanceKey
                    ] = JSCompiler_inline_result),
                    (JSCompiler_inline_result =
                      renderExpirationTime.nodeValue !== current) &&
                      markUpdate(current$$1))
                  : ((renderExpirationTime = current$$1),
                    (JSCompiler_inline_result = (9 === current.nodeType
                      ? current
                      : current.ownerDocument
                    ).createTextNode(JSCompiler_inline_result)),
                    (JSCompiler_inline_result[
                      internalInstanceKey
                    ] = current$$1),
                    (renderExpirationTime.stateNode = JSCompiler_inline_result)));
            break;
          case 11:
            break;
          case 13:
            JSCompiler_inline_result = current$$1.memoizedState;
            if (0 !== (current$$1.effectTag & 64)) {
              current$$1.expirationTime = renderExpirationTime;
              nextUnitOfWork = current$$1;
              break a;
            }
            JSCompiler_inline_result = null !== JSCompiler_inline_result;
            renderExpirationTime =
              null !== current && null !== current.memoizedState;
            null !== current &&
              !JSCompiler_inline_result &&
              renderExpirationTime &&
              ((current = current.child.sibling),
              null !== current &&
                ((rootContainerInstance = current$$1.firstEffect),
                null !== rootContainerInstance
                  ? ((current$$1.firstEffect = current),
                    (current.nextEffect = rootContainerInstance))
                  : ((current$$1.firstEffect = current$$1.lastEffect = current),
                    (current.nextEffect = null)),
                (current.effectTag = 8)));
            if (JSCompiler_inline_result || renderExpirationTime)
              current$$1.effectTag |= 4;
            break;
          case 7:
            break;
          case 8:
            break;
          case 12:
            break;
          case 4:
            popHostContainer(current$$1);
            updateHostContainer(current$$1);
            break;
          case 10:
            popProvider(current$$1);
            break;
          case 9:
            break;
          case 14:
            break;
          case 17:
            isContextProvider(current$$1.type) && popContext(current$$1);
            break;
          case 18:
            if (null === current)
              b: {
                popHydrationState(current$$1)
                  ? void 0
                  : reactProdInvariant("318"),
                  (current$$1 = current$$1.stateNode)
                    ? void 0
                    : reactProdInvariant("317"),
                  (current$$1 = current$$1.nextSibling);
                for (JSCompiler_inline_result = 0; current$$1; ) {
                  if (8 === current$$1.nodeType)
                    if (
                      ((renderExpirationTime = current$$1.data),
                      "/$" === renderExpirationTime)
                    ) {
                      if (0 === JSCompiler_inline_result) {
                        nextHydratableInstance = getNextHydratableSibling(
                          current$$1
                        );
                        break b;
                      }
                      JSCompiler_inline_result--;
                    } else
                      "$" === renderExpirationTime &&
                        JSCompiler_inline_result++;
                  current$$1 = current$$1.nextSibling;
                }
                nextHydratableInstance = null;
              }
            else
              0 === (current$$1.effectTag & 64) &&
                ((current.alternate = null),
                (current$$1.alternate = null),
                (current$$1.tag = 13),
                (current$$1.memoizedState = null),
                (current$$1.stateNode = null));
            break;
          default:
            reactProdInvariant("156");
        }
        nextUnitOfWork = null;
      }
      workInProgress.mode & 4 &&
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, !1);
      stopWorkTimer(workInProgress);
      current$$1 = workInProgress;
      if (
        1 === nextRenderExpirationTime ||
        1 !== current$$1.childExpirationTime
      ) {
        JSCompiler_inline_result = 0;
        if (current$$1.mode & 4) {
          renderExpirationTime = current$$1.actualDuration;
          current = current$$1.selfBaseDuration;
          rootContainerInstance =
            null === current$$1.alternate ||
            current$$1.child !== current$$1.alternate.child;
          for (props = current$$1.child; null !== props; )
            (rootContainerInstance$jscomp$0 = props.expirationTime),
              (type = props.childExpirationTime),
              rootContainerInstance$jscomp$0 > JSCompiler_inline_result &&
                (JSCompiler_inline_result = rootContainerInstance$jscomp$0),
              type > JSCompiler_inline_result &&
                (JSCompiler_inline_result = type),
              rootContainerInstance &&
                (renderExpirationTime += props.actualDuration),
              (current += props.treeBaseDuration),
              (props = props.sibling);
          current$$1.actualDuration = renderExpirationTime;
          current$$1.treeBaseDuration = current;
        } else
          for (
            renderExpirationTime = current$$1.child;
            null !== renderExpirationTime;

          )
            (current = renderExpirationTime.expirationTime),
              (rootContainerInstance =
                renderExpirationTime.childExpirationTime),
              current > JSCompiler_inline_result &&
                (JSCompiler_inline_result = current),
              rootContainerInstance > JSCompiler_inline_result &&
                (JSCompiler_inline_result = rootContainerInstance),
              (renderExpirationTime = renderExpirationTime.sibling);
        current$$1.childExpirationTime = JSCompiler_inline_result;
      }
      if (null !== nextUnitOfWork) return nextUnitOfWork;
      null !== returnFiber &&
        0 === (returnFiber.effectTag & 1024) &&
        (null === returnFiber.firstEffect &&
          (returnFiber.firstEffect = workInProgress.firstEffect),
        null !== workInProgress.lastEffect &&
          (null !== returnFiber.lastEffect &&
            (returnFiber.lastEffect.nextEffect = workInProgress.firstEffect),
          (returnFiber.lastEffect = workInProgress.lastEffect)),
        1 < workInProgress.effectTag &&
          (null !== returnFiber.lastEffect
            ? (returnFiber.lastEffect.nextEffect = workInProgress)
            : (returnFiber.firstEffect = workInProgress),
          (returnFiber.lastEffect = workInProgress)));
    } else {
      if (workInProgress.mode & 4) {
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, !1);
        current$$1 = workInProgress.actualDuration;
        for (
          JSCompiler_inline_result = workInProgress.child;
          null !== JSCompiler_inline_result;

        )
          (current$$1 += JSCompiler_inline_result.actualDuration),
            (JSCompiler_inline_result = JSCompiler_inline_result.sibling);
        workInProgress.actualDuration = current$$1;
      }
      current$$1 = unwindWork(workInProgress, nextRenderExpirationTime);
      workInProgress.effectTag & 64
        ? ((JSCompiler_inline_result = workInProgress),
          enableUserTimingAPI &&
            supportsUserTiming &&
            !shouldIgnoreFiber(JSCompiler_inline_result) &&
            ((currentFiber = JSCompiler_inline_result.return),
            JSCompiler_inline_result._debugIsCurrentlyTiming &&
              ((JSCompiler_inline_result._debugIsCurrentlyTiming = !1),
              endFiberMark(
                JSCompiler_inline_result,
                null,
                13 === JSCompiler_inline_result.tag ||
                18 === JSCompiler_inline_result.tag
                  ? "Rendering was suspended"
                  : "An error was thrown inside this error boundary"
              ))))
        : stopWorkTimer(workInProgress);
      if (null !== current$$1)
        return (
          stopWorkTimer(workInProgress),
          (current$$1.effectTag &= 1023),
          current$$1
        );
      null !== returnFiber &&
        ((returnFiber.firstEffect = returnFiber.lastEffect = null),
        (returnFiber.effectTag |= 1024));
    }
    if (null !== siblingFiber) return siblingFiber;
    if (null !== returnFiber) workInProgress = returnFiber;
    else break;
  }
  return null;
}
function performUnitOfWork(workInProgress) {
  var current$$1 = workInProgress.alternate;
  startWorkTimer(workInProgress);
  workInProgress.mode & 4 && startProfilerTimer(workInProgress);
  current$$1 = beginWork(current$$1, workInProgress, nextRenderExpirationTime);
  workInProgress.memoizedProps = workInProgress.pendingProps;
  workInProgress.mode & 4 &&
    stopProfilerTimerIfRunningAndRecordDelta(workInProgress, !0);
  null === current$$1 && (current$$1 = completeUnitOfWork(workInProgress));
  ReactCurrentOwner$2.current = null;
  return current$$1;
}
function renderRoot(root, isYieldy) {
  isWorking ? reactProdInvariant("243") : void 0;
  flushPassiveEffects();
  isWorking = !0;
  var previousDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  var expirationTime = root.nextExpirationTimeToWorkOn;
  if (
    expirationTime !== nextRenderExpirationTime ||
    root !== nextRoot ||
    null === nextUnitOfWork
  ) {
    resetStack();
    nextRoot = root;
    nextRenderExpirationTime = expirationTime;
    nextUnitOfWork = createWorkInProgress(
      nextRoot.current,
      null,
      nextRenderExpirationTime
    );
    root.pendingCommitExpirationTime = 0;
    var interactions = new Set();
    root.pendingInteractionMap.forEach(function(
      scheduledInteractions,
      scheduledExpirationTime
    ) {
      scheduledExpirationTime >= expirationTime &&
        scheduledInteractions.forEach(function(interaction) {
          return interactions.add(interaction);
        });
    });
    root.memoizedInteractions = interactions;
    if (0 < interactions.size) {
      var subscriber = tracing.__subscriberRef.current;
      if (null !== subscriber) {
        var threadID = 1e3 * expirationTime + root.interactionThreadID;
        try {
          subscriber.onWorkStarted(interactions, threadID);
        } catch (error) {
          hasUnhandledError ||
            ((hasUnhandledError = !0), (unhandledError = error));
        }
      }
    }
  }
  subscriber = null;
  subscriber = tracing.__interactionsRef.current;
  tracing.__interactionsRef.current = root.memoizedInteractions;
  threadID = !1;
  enableUserTimingAPI &&
    ((currentFiber = nextUnitOfWork),
    supportsUserTiming &&
      ((commitCountInCurrentWorkLoop = 0),
      beginMark("(React Tree Reconciliation)"),
      null !== currentFiber && resumeTimersRecursively(currentFiber)));
  do {
    try {
      if (isYieldy)
        for (; null !== nextUnitOfWork && !shouldYieldToRenderer(); )
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      else
        for (; null !== nextUnitOfWork; )
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    } catch (thrownValue) {
      if (
        ((lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null),
        resetHooks(),
        null === nextUnitOfWork)
      )
        (threadID = !0), onUncaughtError(thrownValue);
      else {
        nextUnitOfWork.mode & 4 &&
          stopProfilerTimerIfRunningAndRecordDelta(nextUnitOfWork, !0);
        null === nextUnitOfWork ? reactProdInvariant("271") : void 0;
        var sourceFiber = nextUnitOfWork,
          returnFiber = sourceFiber.return;
        if (null === returnFiber) (threadID = !0), onUncaughtError(thrownValue);
        else {
          throwException(
            root,
            returnFiber,
            sourceFiber,
            thrownValue,
            nextRenderExpirationTime
          );
          nextUnitOfWork = completeUnitOfWork(sourceFiber);
          continue;
        }
      }
    }
    break;
  } while (1);
  tracing.__interactionsRef.current = subscriber;
  isWorking = !1;
  ReactCurrentDispatcher.current = previousDispatcher;
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
  resetHooks();
  if (threadID)
    stopWorkLoopTimer(interruptedBy, !1),
      (nextRoot = interruptedBy = null),
      (root.finishedWork = null);
  else if (null !== nextUnitOfWork)
    stopWorkLoopTimer(interruptedBy, !1),
      (interruptedBy = null),
      (root.finishedWork = null);
  else {
    stopWorkLoopTimer(interruptedBy, !0);
    previousDispatcher = root.current.alternate;
    null === previousDispatcher ? reactProdInvariant("281") : void 0;
    interruptedBy = nextRoot = null;
    if (nextRenderDidError) {
      if (hasLowerPriorityWork(root, expirationTime)) {
        markSuspendedPriorityLevel(root, expirationTime);
        onSuspend(
          root,
          previousDispatcher,
          expirationTime,
          root.expirationTime,
          -1
        );
        return;
      }
      if (!root.didError && isYieldy) {
        root.didError = !0;
        isYieldy = root.nextExpirationTimeToWorkOn = expirationTime;
        subscriber = root.expirationTime = 1073741823;
        onSuspend(root, previousDispatcher, isYieldy, subscriber, -1);
        return;
      }
    }
    isYieldy && -1 !== nextLatestAbsoluteTimeoutMs
      ? (markSuspendedPriorityLevel(root, expirationTime),
        (isYieldy =
          10 *
          (1073741822 -
            findEarliestOutstandingPriorityLevel(root, expirationTime))),
        isYieldy < nextLatestAbsoluteTimeoutMs &&
          (nextLatestAbsoluteTimeoutMs = isYieldy),
        (isYieldy = 10 * (1073741822 - requestCurrentTime())),
        (isYieldy = nextLatestAbsoluteTimeoutMs - isYieldy),
        onSuspend(
          root,
          previousDispatcher,
          expirationTime,
          root.expirationTime,
          0 > isYieldy ? 0 : isYieldy
        ))
      : onComplete(root, previousDispatcher, expirationTime);
  }
}
function captureCommitPhaseError(sourceFiber, value) {
  for (var fiber = sourceFiber.return; null !== fiber; ) {
    switch (fiber.tag) {
      case 1:
        var instance = fiber.stateNode;
        if (
          "function" === typeof fiber.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            (null === legacyErrorBoundariesThatAlreadyFailed ||
              !legacyErrorBoundariesThatAlreadyFailed.has(instance)))
        ) {
          sourceFiber = createCapturedValue(value, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          scheduleWork(fiber, 1073741823);
          return;
        }
        break;
      case 3:
        sourceFiber = createCapturedValue(value, sourceFiber);
        sourceFiber = createRootErrorUpdate(fiber, sourceFiber, 1073741823);
        enqueueUpdate(fiber, sourceFiber);
        scheduleWork(fiber, 1073741823);
        return;
    }
    fiber = fiber.return;
  }
  3 === sourceFiber.tag &&
    ((fiber = createCapturedValue(value, sourceFiber)),
    (fiber = createRootErrorUpdate(sourceFiber, fiber, 1073741823)),
    enqueueUpdate(sourceFiber, fiber),
    scheduleWork(sourceFiber, 1073741823));
}
function computeExpirationForFiber(currentTime, fiber) {
  var priorityLevel = scheduler.unstable_getCurrentPriorityLevel(),
    expirationTime = void 0;
  if (0 === (fiber.mode & 1)) expirationTime = 1073741823;
  else if (isWorking && !isCommitting$1)
    expirationTime = nextRenderExpirationTime;
  else {
    switch (priorityLevel) {
      case scheduler.unstable_ImmediatePriority:
        expirationTime = 1073741823;
        break;
      case scheduler.unstable_UserBlockingPriority:
        expirationTime =
          1073741822 - 10 * ((((1073741822 - currentTime + 15) / 10) | 0) + 1);
        break;
      case scheduler.unstable_NormalPriority:
        expirationTime =
          1073741822 - 25 * ((((1073741822 - currentTime + 500) / 25) | 0) + 1);
        break;
      case scheduler.unstable_LowPriority:
      case scheduler.unstable_IdlePriority:
        expirationTime = 1;
        break;
      default:
        reactProdInvariant("313");
    }
    null !== nextRoot &&
      expirationTime === nextRenderExpirationTime &&
      --expirationTime;
  }
  priorityLevel === scheduler.unstable_UserBlockingPriority &&
    (0 === lowestPriorityPendingInteractiveExpirationTime ||
      expirationTime < lowestPriorityPendingInteractiveExpirationTime) &&
    (lowestPriorityPendingInteractiveExpirationTime = expirationTime);
  return expirationTime;
}
function pingSuspendedRoot(root, thenable, pingTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(thenable);
  if (null !== nextRoot && nextRenderExpirationTime === pingTime)
    nextRoot = null;
  else if (
    ((thenable = root.earliestSuspendedTime),
    (pingCache = root.latestSuspendedTime),
    0 !== thenable && pingTime <= thenable && pingTime >= pingCache)
  ) {
    root.didError = !1;
    thenable = root.latestPingedTime;
    if (0 === thenable || thenable > pingTime) root.latestPingedTime = pingTime;
    findNextExpirationTimeToWorkOn(pingTime, root);
    pingTime = root.expirationTime;
    0 !== pingTime && requestWork(root, pingTime);
  }
}
function retryTimedOutBoundary(boundaryFiber, thenable) {
  var retryCache = void 0;
  switch (boundaryFiber.tag) {
    case 13:
      retryCache = boundaryFiber.stateNode;
      break;
    case 18:
      retryCache = boundaryFiber.memoizedState;
      break;
    default:
      reactProdInvariant("314");
  }
  null !== retryCache && retryCache.delete(thenable);
  thenable = requestCurrentTime();
  thenable = computeExpirationForFiber(thenable, boundaryFiber);
  boundaryFiber = scheduleWorkToRoot(boundaryFiber, thenable);
  null !== boundaryFiber &&
    (markPendingPriorityLevel(boundaryFiber, thenable),
    (thenable = boundaryFiber.expirationTime),
    0 !== thenable && requestWork(boundaryFiber, thenable));
}
function scheduleWorkToRoot(fiber, expirationTime) {
  enableUserTimingAPI &&
    (isCommitting && (hasScheduledUpdateInCurrentCommit = !0),
    null !== currentPhase &&
      "componentWillMount" !== currentPhase &&
      "componentWillReceiveProps" !== currentPhase &&
      (hasScheduledUpdateInCurrentPhase = !0));
  fiber.expirationTime < expirationTime &&
    (fiber.expirationTime = expirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < expirationTime &&
    (alternate.expirationTime = expirationTime);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;
  else
    for (; null !== node; ) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime &&
        (node.childExpirationTime = expirationTime);
      null !== alternate &&
        alternate.childExpirationTime < expirationTime &&
        (alternate.childExpirationTime = expirationTime);
      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  if (
    null !== root &&
    ((fiber = tracing.__interactionsRef.current), 0 < fiber.size)
  ) {
    alternate = root.pendingInteractionMap;
    var pendingInteractions = alternate.get(expirationTime);
    null != pendingInteractions
      ? fiber.forEach(function(interaction) {
          pendingInteractions.has(interaction) || interaction.__count++;
          pendingInteractions.add(interaction);
        })
      : (alternate.set(expirationTime, new Set(fiber)),
        fiber.forEach(function(interaction) {
          interaction.__count++;
        }));
    alternate = tracing.__subscriberRef.current;
    if (null !== alternate)
      alternate.onWorkScheduled(
        fiber,
        1e3 * expirationTime + root.interactionThreadID
      );
  }
  return root;
}
function scheduleWork(fiber, expirationTime) {
  var root = scheduleWorkToRoot(fiber, expirationTime);
  null !== root &&
    (!isWorking &&
      0 !== nextRenderExpirationTime &&
      expirationTime > nextRenderExpirationTime &&
      ((interruptedBy = fiber), resetStack()),
    markPendingPriorityLevel(root, expirationTime),
    (isWorking && !isCommitting$1 && nextRoot === root) ||
      requestWork(root, root.expirationTime),
    nestedUpdateCount > NESTED_UPDATE_LIMIT &&
      ((nestedUpdateCount = 0), reactProdInvariant("185")));
}
function syncUpdates(fn, a, b, c, d) {
  return scheduler.unstable_runWithPriority(
    scheduler.unstable_ImmediatePriority,
    function() {
      return fn(a, b, c, d);
    }
  );
}
var firstScheduledRoot = null,
  lastScheduledRoot = null,
  callbackExpirationTime = 0,
  callbackID = void 0,
  isRendering = !1,
  nextFlushedRoot = null,
  nextFlushedExpirationTime = 0,
  lowestPriorityPendingInteractiveExpirationTime = 0,
  hasUnhandledError = !1,
  unhandledError = null,
  isBatchingUpdates = !1,
  isUnbatchingUpdates = !1,
  completedBatches = null,
  originalStartTimeMs = scheduler.unstable_now(),
  currentRendererTime = 1073741822 - ((originalStartTimeMs / 10) | 0),
  currentSchedulerTime = currentRendererTime,
  NESTED_UPDATE_LIMIT = 50,
  nestedUpdateCount = 0,
  lastCommittedRootDuringThisBatch = null;
function recomputeCurrentRendererTime() {
  currentRendererTime =
    1073741822 - (((scheduler.unstable_now() - originalStartTimeMs) / 10) | 0);
}
function scheduleCallbackWithExpirationTime(root, expirationTime) {
  if (0 !== callbackExpirationTime) {
    if (expirationTime < callbackExpirationTime) return;
    null !== callbackID && scheduler.unstable_cancelCallback(callbackID);
  } else
    enableUserTimingAPI &&
      supportsUserTiming &&
      !isWaitingForCallback &&
      ((isWaitingForCallback = !0),
      beginMark("(Waiting for async callback...)"));
  callbackExpirationTime = expirationTime;
  root = scheduler.unstable_now() - originalStartTimeMs;
  callbackID = scheduler.unstable_scheduleCallback(performAsyncWork, {
    timeout: 10 * (1073741822 - expirationTime) - root
  });
}
function onComplete(root, finishedWork, expirationTime) {
  root.pendingCommitExpirationTime = expirationTime;
  root.finishedWork = finishedWork;
}
function onSuspend(
  root,
  finishedWork,
  suspendedExpirationTime,
  rootExpirationTime,
  msUntilTimeout
) {
  root.expirationTime = rootExpirationTime;
  0 !== msUntilTimeout || shouldYieldToRenderer()
    ? 0 < msUntilTimeout &&
      (root.timeoutHandle = scheduleTimeout(
        onTimeout.bind(null, root, finishedWork, suspendedExpirationTime),
        msUntilTimeout
      ))
    : ((root.pendingCommitExpirationTime = suspendedExpirationTime),
      (root.finishedWork = finishedWork));
}
function onTimeout(root, finishedWork, suspendedExpirationTime) {
  root.pendingCommitExpirationTime = suspendedExpirationTime;
  root.finishedWork = finishedWork;
  recomputeCurrentRendererTime();
  currentSchedulerTime = currentRendererTime;
  flushRoot(root, suspendedExpirationTime);
}
function onCommit(root, expirationTime) {
  root.expirationTime = expirationTime;
  root.finishedWork = null;
}
function requestCurrentTime() {
  if (isRendering) return currentSchedulerTime;
  findHighestPriorityRoot();
  if (0 === nextFlushedExpirationTime || 1 === nextFlushedExpirationTime)
    recomputeCurrentRendererTime(),
      (currentSchedulerTime = currentRendererTime);
  return currentSchedulerTime;
}
function requestWork(root, expirationTime) {
  null === root.nextScheduledRoot
    ? ((root.expirationTime = expirationTime),
      null === lastScheduledRoot
        ? ((firstScheduledRoot = lastScheduledRoot = root),
          (root.nextScheduledRoot = root))
        : ((lastScheduledRoot = lastScheduledRoot.nextScheduledRoot = root),
          (lastScheduledRoot.nextScheduledRoot = firstScheduledRoot)))
    : expirationTime > root.expirationTime &&
      (root.expirationTime = expirationTime);
  isRendering ||
    (isBatchingUpdates
      ? isUnbatchingUpdates &&
        ((nextFlushedRoot = root),
        (nextFlushedExpirationTime = 1073741823),
        performWorkOnRoot(root, 1073741823, !1))
      : 1073741823 === expirationTime
        ? performWork(1073741823, !1)
        : scheduleCallbackWithExpirationTime(root, expirationTime));
}
function findHighestPriorityRoot() {
  var highestPriorityWork = 0,
    highestPriorityRoot = null;
  if (null !== lastScheduledRoot)
    for (
      var previousScheduledRoot = lastScheduledRoot, root = firstScheduledRoot;
      null !== root;

    ) {
      var remainingExpirationTime = root.expirationTime;
      if (0 === remainingExpirationTime) {
        null === previousScheduledRoot || null === lastScheduledRoot
          ? reactProdInvariant("244")
          : void 0;
        if (root === root.nextScheduledRoot) {
          firstScheduledRoot = lastScheduledRoot = root.nextScheduledRoot = null;
          break;
        } else if (root === firstScheduledRoot)
          (firstScheduledRoot = remainingExpirationTime =
            root.nextScheduledRoot),
            (lastScheduledRoot.nextScheduledRoot = remainingExpirationTime),
            (root.nextScheduledRoot = null);
        else if (root === lastScheduledRoot) {
          lastScheduledRoot = previousScheduledRoot;
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
          root.nextScheduledRoot = null;
          break;
        } else
          (previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot),
            (root.nextScheduledRoot = null);
        root = previousScheduledRoot.nextScheduledRoot;
      } else {
        remainingExpirationTime > highestPriorityWork &&
          ((highestPriorityWork = remainingExpirationTime),
          (highestPriorityRoot = root));
        if (root === lastScheduledRoot) break;
        if (1073741823 === highestPriorityWork) break;
        previousScheduledRoot = root;
        root = root.nextScheduledRoot;
      }
    }
  nextFlushedRoot = highestPriorityRoot;
  nextFlushedExpirationTime = highestPriorityWork;
}
var didYield = !1;
function shouldYieldToRenderer() {
  return didYield
    ? !0
    : scheduler.unstable_shouldYield()
      ? (didYield = !0)
      : !1;
}
function performAsyncWork() {
  try {
    if (!shouldYieldToRenderer() && null !== firstScheduledRoot) {
      recomputeCurrentRendererTime();
      var root = firstScheduledRoot;
      do {
        var expirationTime = root.expirationTime;
        0 !== expirationTime &&
          currentRendererTime <= expirationTime &&
          (root.nextExpirationTimeToWorkOn = currentRendererTime);
        root = root.nextScheduledRoot;
      } while (root !== firstScheduledRoot);
    }
    performWork(0, !0);
  } finally {
    didYield = !1;
  }
}
function performWork(minExpirationTime, isYieldy) {
  findHighestPriorityRoot();
  if (isYieldy) {
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;
    if (enableUserTimingAPI) {
      var didExpire = nextFlushedExpirationTime > currentRendererTime,
        expirationTime = 10 * (1073741822 - nextFlushedExpirationTime);
      enableUserTimingAPI &&
        supportsUserTiming &&
        ((isWaitingForCallback = !1),
        endMark(
          "(Waiting for async callback... will force flush in " +
            expirationTime +
            " ms)",
          "(Waiting for async callback...)",
          didExpire ? "React was blocked by main thread" : null
        ));
    }
    for (
      ;
      null !== nextFlushedRoot &&
      0 !== nextFlushedExpirationTime &&
      minExpirationTime <= nextFlushedExpirationTime &&
      !(didYield && currentRendererTime > nextFlushedExpirationTime);

    )
      performWorkOnRoot(
        nextFlushedRoot,
        nextFlushedExpirationTime,
        currentRendererTime > nextFlushedExpirationTime
      ),
        findHighestPriorityRoot(),
        recomputeCurrentRendererTime(),
        (currentSchedulerTime = currentRendererTime);
  } else
    for (
      ;
      null !== nextFlushedRoot &&
      0 !== nextFlushedExpirationTime &&
      minExpirationTime <= nextFlushedExpirationTime;

    )
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !1),
        findHighestPriorityRoot();
  isYieldy && ((callbackExpirationTime = 0), (callbackID = null));
  0 !== nextFlushedExpirationTime &&
    scheduleCallbackWithExpirationTime(
      nextFlushedRoot,
      nextFlushedExpirationTime
    );
  nestedUpdateCount = 0;
  lastCommittedRootDuringThisBatch = null;
  if (null !== completedBatches)
    for (
      minExpirationTime = completedBatches,
        completedBatches = null,
        isYieldy = 0;
      isYieldy < minExpirationTime.length;
      isYieldy++
    ) {
      didExpire = minExpirationTime[isYieldy];
      try {
        didExpire._onComplete();
      } catch (error) {
        hasUnhandledError ||
          ((hasUnhandledError = !0), (unhandledError = error));
      }
    }
  if (hasUnhandledError)
    throw ((minExpirationTime = unhandledError),
    (unhandledError = null),
    (hasUnhandledError = !1),
    minExpirationTime);
}
function flushRoot(root, expirationTime) {
  isRendering ? reactProdInvariant("253") : void 0;
  nextFlushedRoot = root;
  nextFlushedExpirationTime = expirationTime;
  performWorkOnRoot(root, expirationTime, !1);
  performWork(1073741823, !1);
}
function performWorkOnRoot(root, expirationTime, isYieldy) {
  isRendering ? reactProdInvariant("245") : void 0;
  isRendering = !0;
  if (isYieldy) {
    var _finishedWork = root.finishedWork;
    null !== _finishedWork
      ? completeRoot(root, _finishedWork, expirationTime)
      : ((root.finishedWork = null),
        (_finishedWork = root.timeoutHandle),
        -1 !== _finishedWork &&
          ((root.timeoutHandle = -1), cancelTimeout(_finishedWork)),
        renderRoot(root, isYieldy),
        (_finishedWork = root.finishedWork),
        null !== _finishedWork &&
          (shouldYieldToRenderer()
            ? (root.finishedWork = _finishedWork)
            : completeRoot(root, _finishedWork, expirationTime)));
  } else
    (_finishedWork = root.finishedWork),
      null !== _finishedWork
        ? completeRoot(root, _finishedWork, expirationTime)
        : ((root.finishedWork = null),
          (_finishedWork = root.timeoutHandle),
          -1 !== _finishedWork &&
            ((root.timeoutHandle = -1), cancelTimeout(_finishedWork)),
          renderRoot(root, isYieldy),
          (_finishedWork = root.finishedWork),
          null !== _finishedWork &&
            completeRoot(root, _finishedWork, expirationTime));
  isRendering = !1;
}
function completeRoot(root, finishedWork, expirationTime) {
  var firstBatch = root.firstBatch;
  if (
    null !== firstBatch &&
    firstBatch._expirationTime >= expirationTime &&
    (null === completedBatches
      ? (completedBatches = [firstBatch])
      : completedBatches.push(firstBatch),
    firstBatch._defer)
  ) {
    root.finishedWork = finishedWork;
    root.expirationTime = 0;
    return;
  }
  root.finishedWork = null;
  root === lastCommittedRootDuringThisBatch
    ? nestedUpdateCount++
    : ((lastCommittedRootDuringThisBatch = root), (nestedUpdateCount = 0));
  scheduler.unstable_runWithPriority(
    scheduler.unstable_ImmediatePriority,
    function() {
      commitRoot(root, finishedWork);
    }
  );
}
function onUncaughtError(error) {
  null === nextFlushedRoot ? reactProdInvariant("246") : void 0;
  nextFlushedRoot.expirationTime = 0;
  hasUnhandledError || ((hasUnhandledError = !0), (unhandledError = error));
}
function batchedUpdates$1(fn, a) {
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = !0;
  try {
    return fn(a);
  } finally {
    (isBatchingUpdates = previousIsBatchingUpdates) ||
      isRendering ||
      performWork(1073741823, !1);
  }
}
function unbatchedUpdates(fn, a) {
  if (isBatchingUpdates && !isUnbatchingUpdates) {
    isUnbatchingUpdates = !0;
    try {
      return fn(a);
    } finally {
      isUnbatchingUpdates = !1;
    }
  }
  return fn(a);
}
function interactiveUpdates$1(fn, a, b) {
  isBatchingUpdates ||
    isRendering ||
    0 === lowestPriorityPendingInteractiveExpirationTime ||
    (performWork(lowestPriorityPendingInteractiveExpirationTime, !1),
    (lowestPriorityPendingInteractiveExpirationTime = 0));
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = !0;
  try {
    return scheduler.unstable_runWithPriority(
      scheduler.unstable_UserBlockingPriority,
      function() {
        return fn(a, b);
      }
    );
  } finally {
    (isBatchingUpdates = previousIsBatchingUpdates) ||
      isRendering ||
      performWork(1073741823, !1);
  }
}
function updateContainerAtExpirationTime(
  element,
  container,
  parentComponent,
  expirationTime,
  callback
) {
  var current$$1 = container.current;
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternalFiber;
    b: {
      2 === isFiberMountedImpl(parentComponent) && 1 === parentComponent.tag
        ? void 0
        : reactProdInvariant("170");
      var parentContext = parentComponent;
      do {
        switch (parentContext.tag) {
          case 3:
            parentContext = parentContext.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(parentContext.type)) {
              parentContext =
                parentContext.stateNode
                  .__reactInternalMemoizedMergedChildContext;
              break b;
            }
        }
        parentContext = parentContext.return;
      } while (null !== parentContext);
      reactProdInvariant("171");
      parentContext = void 0;
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(
          parentComponent,
          Component,
          parentContext
        );
        break a;
      }
    }
    parentComponent = parentContext;
  } else parentComponent = emptyContextObject;
  null === container.context
    ? (container.context = parentComponent)
    : (container.pendingContext = parentComponent);
  container = callback;
  callback = createUpdate(expirationTime);
  callback.payload = { element: element };
  container = void 0 === container ? null : container;
  null !== container && (callback.callback = container);
  flushPassiveEffects();
  enqueueUpdate(current$$1, callback);
  scheduleWork(current$$1, expirationTime);
  return expirationTime;
}
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current,
    currentTime = requestCurrentTime();
  current$$1 = computeExpirationForFiber(currentTime, current$$1);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    current$$1,
    callback
  );
}
function getPublicRootInstance(container) {
  container = container.current;
  if (!container.child) return null;
  switch (container.child.tag) {
    case 5:
      return container.child.stateNode;
    default:
      return container.child.stateNode;
  }
}
function createPortal$1(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
var didWarnAboutUnstableCreatePortal = !1;
restoreImpl = function(domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode; ) props = props.parentNode;
        props = props.querySelectorAll(
          "input[name=" + JSON.stringify("" + tag) + '][type="radio"]'
        );
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
            otherProps ? void 0 : reactProdInvariant("90");
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps);
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      (tag = props.value),
        null != tag && updateOptions(domElement, !!props.multiple, tag, !1);
  }
};
function ReactBatch(root) {
  var result =
    1073741822 -
    25 * ((((1073741822 - requestCurrentTime() + 500) / 25) | 0) + 1);
  result >= lastUniqueAsyncExpiration &&
    (result = lastUniqueAsyncExpiration - 1);
  this._expirationTime = lastUniqueAsyncExpiration = result;
  this._root = root;
  this._callbacks = this._next = null;
  this._hasChildren = this._didComplete = !1;
  this._children = null;
  this._defer = !0;
}
ReactBatch.prototype.render = function(children) {
  this._defer ? void 0 : reactProdInvariant("250");
  this._hasChildren = !0;
  this._children = children;
  var internalRoot = this._root._internalRoot,
    expirationTime = this._expirationTime,
    work = new ReactWork();
  updateContainerAtExpirationTime(
    children,
    internalRoot,
    null,
    expirationTime,
    work._onCommit
  );
  return work;
};
ReactBatch.prototype.then = function(onComplete) {
  if (this._didComplete) onComplete();
  else {
    var callbacks = this._callbacks;
    null === callbacks && (callbacks = this._callbacks = []);
    callbacks.push(onComplete);
  }
};
ReactBatch.prototype.commit = function() {
  var internalRoot = this._root._internalRoot,
    firstBatch = internalRoot.firstBatch;
  this._defer && null !== firstBatch ? void 0 : reactProdInvariant("251");
  if (this._hasChildren) {
    var expirationTime = this._expirationTime;
    if (firstBatch !== this) {
      this._hasChildren &&
        ((expirationTime = this._expirationTime = firstBatch._expirationTime),
        this.render(this._children));
      for (var previous = null, batch = firstBatch; batch !== this; )
        (previous = batch), (batch = batch._next);
      null === previous ? reactProdInvariant("251") : void 0;
      previous._next = batch._next;
      this._next = firstBatch;
      internalRoot.firstBatch = this;
    }
    this._defer = !1;
    flushRoot(internalRoot, expirationTime);
    firstBatch = this._next;
    this._next = null;
    firstBatch = internalRoot.firstBatch = firstBatch;
    null !== firstBatch &&
      firstBatch._hasChildren &&
      firstBatch.render(firstBatch._children);
  } else (this._next = null), (this._defer = !1);
};
ReactBatch.prototype._onComplete = function() {
  if (!this._didComplete) {
    this._didComplete = !0;
    var callbacks = this._callbacks;
    if (null !== callbacks)
      for (var i = 0; i < callbacks.length; i++) (0, callbacks[i])();
  }
};
function ReactWork() {
  this._callbacks = null;
  this._didCommit = !1;
  this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function(onCommit) {
  if (this._didCommit) onCommit();
  else {
    var callbacks = this._callbacks;
    null === callbacks && (callbacks = this._callbacks = []);
    callbacks.push(onCommit);
  }
};
ReactWork.prototype._onCommit = function() {
  if (!this._didCommit) {
    this._didCommit = !0;
    var callbacks = this._callbacks;
    if (null !== callbacks)
      for (var i = 0; i < callbacks.length; i++) {
        var _callback2 = callbacks[i];
        "function" !== typeof _callback2
          ? reactProdInvariant("191", _callback2)
          : void 0;
        _callback2();
      }
  }
};
function ReactRoot(container, isConcurrent, hydrate) {
  isConcurrent = isConcurrent ? 3 : 0;
  isDevToolsPresent && (isConcurrent |= 4);
  isConcurrent = createFiber(3, null, null, isConcurrent);
  container = {
    current: isConcurrent,
    containerInfo: container,
    pendingChildren: null,
    earliestPendingTime: 0,
    latestPendingTime: 0,
    earliestSuspendedTime: 0,
    latestSuspendedTime: 0,
    latestPingedTime: 0,
    pingCache: null,
    didError: !1,
    pendingCommitExpirationTime: 0,
    finishedWork: null,
    timeoutHandle: -1,
    context: null,
    pendingContext: null,
    hydrate: hydrate,
    nextExpirationTimeToWorkOn: 0,
    expirationTime: 0,
    firstBatch: null,
    nextScheduledRoot: null,
    interactionThreadID: tracing.unstable_getThreadID(),
    memoizedInteractions: new Set(),
    pendingInteractionMap: new Map()
  };
  this._internalRoot = isConcurrent.stateNode = container;
}
ReactRoot.prototype.render = function(children, callback) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(children, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.unmount = function(callback) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(null, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function(
  parentComponent,
  children,
  callback
) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(children, root, parentComponent, work._onCommit);
  return work;
};
ReactRoot.prototype.createBatch = function() {
  var batch = new ReactBatch(this),
    expirationTime = batch._expirationTime,
    internalRoot = this._internalRoot,
    firstBatch = internalRoot.firstBatch;
  if (null === firstBatch)
    (internalRoot.firstBatch = batch), (batch._next = null);
  else {
    for (
      internalRoot = null;
      null !== firstBatch && firstBatch._expirationTime >= expirationTime;

    )
      (internalRoot = firstBatch), (firstBatch = firstBatch._next);
    batch._next = firstBatch;
    null !== internalRoot && (internalRoot._next = batch);
  }
  return batch;
};
function isValidContainer(node) {
  return !(
    !node ||
    (1 !== node.nodeType &&
      9 !== node.nodeType &&
      11 !== node.nodeType &&
      (8 !== node.nodeType ||
        " react-mount-point-unstable " !== node.nodeValue))
  );
}
_batchedUpdatesImpl = batchedUpdates$1;
_interactiveUpdatesImpl = interactiveUpdates$1;
_flushInteractiveUpdatesImpl = function() {
  isRendering ||
    0 === lowestPriorityPendingInteractiveExpirationTime ||
    (performWork(lowestPriorityPendingInteractiveExpirationTime, !1),
    (lowestPriorityPendingInteractiveExpirationTime = 0));
};
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  forceHydrate ||
    ((forceHydrate = container
      ? 9 === container.nodeType
        ? container.documentElement
        : container.firstChild
      : null),
    (forceHydrate = !(
      !forceHydrate ||
      1 !== forceHydrate.nodeType ||
      !forceHydrate.hasAttribute("data-reactroot")
    )));
  if (!forceHydrate)
    for (var rootSibling; (rootSibling = container.lastChild); )
      container.removeChild(rootSibling);
  return new ReactRoot(container, !1, forceHydrate);
}
function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  var root = container._reactRootContainer;
  if (root) {
    if ("function" === typeof callback) {
      var _originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(root._internalRoot);
        _originalCallback.call(instance);
      };
    }
    null != parentComponent
      ? root.legacy_renderSubtreeIntoContainer(
          parentComponent,
          children,
          callback
        )
      : root.render(children, callback);
  } else {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    if ("function" === typeof callback) {
      var originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    unbatchedUpdates(function() {
      null != parentComponent
        ? root.legacy_renderSubtreeIntoContainer(
            parentComponent,
            children,
            callback
          )
        : root.render(children, callback);
    });
  }
  return getPublicRootInstance(root._internalRoot);
}
function createPortal$$1(children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  isValidContainer(container) ? void 0 : reactProdInvariant("200");
  return createPortal$1(children, container, null, key);
}
var ReactDOM$1 = {
  createPortal: createPortal$$1,
  findDOMNode: function(componentOrElement) {
    if (null == componentOrElement) return null;
    if (1 === componentOrElement.nodeType) return componentOrElement;
    var fiber = componentOrElement._reactInternalFiber;
    void 0 === fiber &&
      ("function" === typeof componentOrElement.render
        ? reactProdInvariant("188")
        : reactProdInvariant("268", Object.keys(componentOrElement)));
    componentOrElement = findCurrentHostFiber(fiber);
    componentOrElement =
      null === componentOrElement ? null : componentOrElement.stateNode;
    return componentOrElement;
  },
  hydrate: function(element, container, callback) {
    isValidContainer(container) ? void 0 : reactProdInvariant("200");
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !0,
      callback
    );
  },
  render: function(element, container, callback) {
    isValidContainer(container) ? void 0 : reactProdInvariant("200");
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !1,
      callback
    );
  },
  unstable_renderSubtreeIntoContainer: function(
    parentComponent,
    element,
    containerNode,
    callback
  ) {
    isValidContainer(containerNode) ? void 0 : reactProdInvariant("200");
    null == parentComponent || void 0 === parentComponent._reactInternalFiber
      ? reactProdInvariant("38")
      : void 0;
    return legacyRenderSubtreeIntoContainer(
      parentComponent,
      element,
      containerNode,
      !1,
      callback
    );
  },
  unmountComponentAtNode: function(container) {
    isValidContainer(container) ? void 0 : reactProdInvariant("40");
    return container._reactRootContainer
      ? (unbatchedUpdates(function() {
          legacyRenderSubtreeIntoContainer(
            null,
            null,
            container,
            !1,
            function() {
              container._reactRootContainer = null;
            }
          );
        }),
        !0)
      : !1;
  },
  unstable_createPortal: function() {
    didWarnAboutUnstableCreatePortal ||
      ((didWarnAboutUnstableCreatePortal = !0),
      lowPriorityWarning(
        !1,
        'The ReactDOM.unstable_createPortal() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactDOM.createPortal() instead. It has the exact same API, but without the "unstable_" prefix.'
      ));
    return createPortal$$1.apply(void 0, arguments);
  },
  unstable_batchedUpdates: batchedUpdates$1,
  unstable_interactiveUpdates: interactiveUpdates$1,
  flushSync: function(fn, a) {
    isRendering ? reactProdInvariant("187") : void 0;
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = !0;
    try {
      return syncUpdates(fn, a);
    } finally {
      (isBatchingUpdates = previousIsBatchingUpdates),
        performWork(1073741823, !1);
    }
  },
  unstable_createRoot: createRoot,
  unstable_flushControlled: function(fn) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = !0;
    try {
      syncUpdates(fn);
    } finally {
      (isBatchingUpdates = previousIsBatchingUpdates) ||
        isRendering ||
        performWork(1073741823, !1);
    }
  },
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [
      getInstanceFromNode$1,
      getNodeFromInstance$1,
      getFiberCurrentPropsFromNode$1,
      injection.injectEventPluginsByName,
      eventNameDispatchConfigs,
      accumulateTwoPhaseDispatches,
      function(events) {
        forEachAccumulated(events, accumulateDirectDispatchesSingle);
      },
      enqueueStateRestore,
      restoreStateIfNeeded,
      dispatchEvent,
      runEventsInBatch
    ]
  }
};
function createRoot(container, options) {
  isValidContainer(container)
    ? void 0
    : reactProdInvariant("299", "unstable_createRoot");
  return new ReactRoot(
    container,
    !0,
    null != options && !0 === options.hydrate
  );
}
(function(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  return injectInternals(
    Object.assign({}, devToolsConfig, {
      overrideProps: null,
      currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
      findHostInstanceByFiber: function(fiber) {
        fiber = findCurrentHostFiber(fiber);
        return null === fiber ? null : fiber.stateNode;
      },
      findFiberByHostInstance: function(instance) {
        return findFiberByHostInstance
          ? findFiberByHostInstance(instance)
          : null;
      }
    })
  );
})({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "16.8.6",
  rendererPackageName: "react-dom"
});
Object.assign(ReactDOM$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
  ReactBrowserEventEmitter: {
    isEnabled: function() {
      return _enabled;
    }
  },
  ReactFiberTreeReflection: {
    findCurrentFiberUsingSlowPath: findCurrentFiberUsingSlowPath
  },
  ReactDOMComponentTree: {
    getClosestInstanceFromNode: getClosestInstanceFromNode
  },
  ReactInstanceMap: {
    get: function(key) {
      return key._reactInternalFiber;
    }
  },
  addUserTimingListener: function() {
    refCount++;
    updateFlagOutsideOfReactCallStack();
    return function() {
      refCount--;
      updateFlagOutsideOfReactCallStack();
    };
  }
});
var ReactDOMFB = { default: ReactDOM$1 },
  ReactDOMFB$1 = (ReactDOMFB && ReactDOM$1) || ReactDOMFB;
module.exports = ReactDOMFB$1.default || ReactDOMFB$1;

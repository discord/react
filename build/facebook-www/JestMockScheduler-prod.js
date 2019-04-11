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
var callback = null,
  currentTime = -1;
function flushCallback(didTimeout, ms) {
  if (null !== callback) {
    var cb = callback;
    callback = null;
    try {
      (currentTime = ms), cb(didTimeout);
    } finally {
      currentTime = -1;
    }
  }
}
function requestHostCallback(cb, ms) {
  -1 !== currentTime
    ? setTimeout(requestHostCallback, 0, cb, ms)
    : ((callback = cb),
      setTimeout(flushCallback, ms, !0, ms),
      setTimeout(flushCallback, 1073741823, !1, 1073741823));
}
global._schedMock = [
  requestHostCallback,
  function() {
    callback = null;
  },
  function() {
    return !1;
  },
  function() {
    return -1 === currentTime ? 0 : currentTime;
  }
];
exports.mockRestore = function() {
  delete global._schedMock;
};

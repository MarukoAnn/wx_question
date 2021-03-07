(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"wx_question","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 120:
/*!****************************************************!*\
  !*** D:/wx_project/wx_question/util/question.json ***!
  \****************************************************/
/*! exports provided: question, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"question\":[{\"title\":\"1、您的孩子是否曾经患过过敏性疾病？（至少2次）【如湿疹、荨麻疹、哮喘、过敏性鼻炎等】\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":0}]},{\"title\":\"2、您的孩子直系亲属【如爸爸、妈妈、姥姥、姥爷、爷爷、奶奶、叔叔、姑姑、姨、舅等】有过敏性疾病么？\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":0}]},{\"title\":\"3、您的孩子体型符合以下哪种情况？【可多选】\",\"isImage\":\"false\",\"more\":\"true\",\"select\":[{\"item\":\"A.体型正常或结实\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":2,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.体型偏矮\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"C.体型偏瘦\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"D.体型偏胖\",\"focus\":\"D\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4}]},{\"title\":\"4、您的孩子精力符合以下哪种情况?\",\"isImage\":\"true\",\"imageurl\":\"\",\"select\":[{\"item\":\"A.精力充沛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.精力旺盛，喜动或活动多\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"imageurl\":\"\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.容易劳累、没精神\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":5,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"5、您的孩子肌肉符合以下哪种情况?(用手捏孩子上臂肌肉感觉暄软，相比身体其他部位仅肚子软)\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.肌肉紧实\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.肌肉松软\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":2,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.肚子大、软\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":2,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"6、您的孩子脸色符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.脸色红润有光泽\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.脸色偏黄\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.脸色偏白、没有光泽\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":5},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.脸部油腻\",\"imageurl\":\"\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"7、您的孩子口唇颜色符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.口唇颜色淡红\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":2,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.口唇颜色偏淡\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":5},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.口唇颜色偏红\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"8、您的孩子皮肤符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.皮肤润泽\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.皮肤干燥或瘙痒\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":4},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"9、您的孩子头发符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.头发细\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":2},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.头发颜色偏黄\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":4},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"10、您的孩子舌头符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.舌淡红苔薄白\",\"imageurl\":\"https://www.softcasing.com/images/question/A.jpg\",\"value\":{\"ph_value\":2,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"focus\":\"A\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.舌淡\",\"imageurl\":\"https://www.softcasing.com/images/question/B.jpg\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":3},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.舌淡胖，苔白滑\",\"imageurl\":\"https://www.softcasing.com/images/question/C.png\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":2,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.舌淡苔白\",\"imageurl\":\"https://www.softcasing.com/images/question/D.jpg\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.舌红\",\"imageurl\":\"https://www.softcasing.com/images/question/E.jpg\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":2,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.舌红苔黄\",\"imageurl\":\"https://www.softcasing.com/images/question/F.jpg\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.舌红苔黄腻\",\"imageurl\":\"https://www.softcasing.com/images/question/G.jpg\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.地图舌或者舌苔少\",\"imageurl\":\"https://www.softcasing.com/images/question/H.jpg\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":5,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.舌胖大，苔腻\",\"imageurl\":\"https://www.softcasing.com/images/question/I.jpg\",\"error\":\"false\",\"focus\":\"I\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"11、您的孩子鼻子、眼睛符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.下眼睑浮肿\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.起床眼屎多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.揉鼻子、揉眼睛或眨眼\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"12、您的孩子喝水符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.喜欢喝水（不包括饮料）\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.不喜欢喝水\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"13、您的孩子对冷热反应符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.怕冷\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":5,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.怕热\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"14、您的孩子出汗符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.活动后汗多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.睡觉出汗多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":2,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.出汗黏\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"15、您的孩子吃饭符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.饮食均衡、不挑食\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.饭量小\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":2,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.吃肉食偏多\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":2,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.吃凉的食物会不舒服\",\"imageurl\":\"\",\"focus\":\"D\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"16、您的孩子睡觉符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.入睡快，睡眠比较安稳\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.睡眠时间充足的情况下，白天也会打哈欠、犯困\",\"focus\":\"B\",\"imageurl\":\"\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":5,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.上床后需要较长时间才能入睡\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.夜卧睡眠不踏实，来回翻滚\",\"imageurl\":\"\",\"focus\":\"D\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E. 睡觉时眼睛微张（有缝隙）\",\"imageurl\":\"\",\"focus\":\"D\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":2,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"17、您的孩子大小便符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.大便不干不稀，能定时排便每日1~2次\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.大便干燥（例如球状、粗条状）\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":5,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.大便量多、不成形\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.大便粘便盆，不易冲刷干净\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":5,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.大便味臭\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.正常饮水量情况下，仍小便黄（3~6岁儿童每天正常饮水量【包括奶类、水果、蔬菜等中的水分】：1200~1600ml，约2.5~3个矿泉水瓶）\",\"imageurl\":\"\",\"focus\":\"F\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.正常饮水量情况下，小便次数多或量多【3~6岁儿童小便正常量500~1000ml/天，小便正常次数5~8次/天】\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"18、您的孩子身体状况及常见表现符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.身体健康、很少生病\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"否\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.患病后很快康复\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":3,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.起口疮、咽痛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.流鼻血（外伤导致除外）\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.说话声音小\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":2,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.口气重\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.手脚心热\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.手脚凉\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.肚子痛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"I\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":3,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"J.干呕\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"J\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"K.身上起湿疹\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"K\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"L.皮肤搔抓后有隆起刮痕\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"L\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":3,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"M.在以下情况下出现打喷嚏、流鼻涕、鼻塞、咳嗽【换季、温度变化、接触花粉或带毛的小动物、装修等可能存在过敏原的地方】\",\"imageurl\":\"\",\"focus\":\"M\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"N.接触或食用某过敏原后易起荨麻疹或皮肤痒\",\"imageurl\":\"\",\"focus\":\"N\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"O.不喜欢潮湿的环境或在潮湿环境下身体有不适表现（如起皮疹、胸闷、哮喘发作等）\",\"imageurl\":\"\",\"focus\":\"N\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"19、您的孩子每年患呼吸道感染（包括感冒、支气管炎、肺炎）的频率?\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.≥6次/每年\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.2~5次/每年\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":2,\"status\":0},{\"item\":\"C.<2次/每年\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":0}]},{\"title\":\"20、您的孩子尿床的频率?\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.几乎每天都有\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":4},{\"item\":\"B.1~4次/每周\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":3},{\"item\":\"C.1~4次/月\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":2},{\"item\":\"D.数月一次\",\"focus\":\"D\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":1},{\"item\":\"E.3岁以后几乎不尿床\",\"focus\":\"E\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":0}]},{\"title\":\"21、您的孩子性格表现符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.喜欢安静、不喜运动\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":3,\"ts_value\":3,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.性格开朗、爱笑\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":3,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.闷闷不乐、唉声叹气\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.胆子小，不喜欢冒险\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.脾气急躁\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.性格温和，脾气好，不易起急\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":3,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.遇事易紧张\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.敏感，在乎别人的说法及做法\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.在搬家或换学校后能较快适应环境（包括日常生活、健康状态、心理状态等）\",\"focus\":\"I\",\"imageurl\":\"\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]}]}");

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"wx_question","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"wx_question","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"wx_question","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"wx_question","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 25:
/*!************************************************!*\
  !*** D:/wx_project/wx_question/util/food.json ***!
  \************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"title\":\"家庭一般生活情况调查\",\"subscript\":\"【请根据实际情况填写数值或在符合的选项前划√ 】\",\"type\":2,\"itemSelcet\":[{\"label\":[{\"b_text\":\"您的孩子平均每日睡眠时间为\",\"input\":1,\"value\":\"\",\"select\":[],\"a_text\":\"小时\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"false\"},\"focus\":\"A\",\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"您的家庭居住面积为\",\"input\":1,\"value\":\"\",\"select\":[],\"a_text\":\"平方米\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"false\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"家庭人口数为\",\"input\":1,\"value\":\"\",\"select\":[],\"a_text\":\"人\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"false\"},\"focus\":\"C\",\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"您的孩子平均每日完成作业的时间是晚上\",\"input\":1,\"value\":\"\",\"select\":[],\"a_text\":\"点,平均一周有\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"select\":[],\"a_text\":\"个课外班。（若无作业及课外班，则填“无”）\",\"input_type\":\"text\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"false\"},\"focus\":\"D\",\"error\":\"false\",\"questionjson\":[],\"status\":0}]},{\"title\":\"家庭一般生活情况调查\",\"subscript\":\"【请根据实际情况填写数值或在符合的选项前划√ 】\",\"type\":1,\"label\":[],\"selectList\":[{\"label\":\"家中饲养宠物（如猫、狗）\",\"itemBgc\":\"#FFFFFF\",\"b_itemBgc\":\"#E5E5E5\",\"b_checkbcg\":\"#E2E2E2\",\"t_color\":\"#000\",\"i_hidden\":\"false\",\"status\":0,\"focus\":\"A\"},{\"label\":\"家中环境潮湿（如墙面返潮，墙面等处有较多霉斑霉点）\",\"itemBgc\":\"#FFFFFF\",\"b_itemBgc\":\"#E5E5E5\",\"b_checkbcg\":\"#E2E2E2\",\"t_color\":\"#000\",\"i_hidden\":\"false\",\"status\":0,\"focus\":\"B\"},{\"label\":\"家中有人现在或曾经吸烟\",\"itemBgc\":\"#FFFFFF\",\"b_itemBgc\":\"#E5E5E5\",\"b_checkbcg\":\"#E2E2E2\",\"t_color\":\"#000\",\"i_hidden\":\"false\",\"status\":0,\"focus\":\"C\"},{\"label\":\"近2年居住地有改变\",\"itemBgc\":\"#FFFFFF\",\"b_itemBgc\":\"#E5E5E5\",\"b_checkbcg\":\"#E2E2E2\",\"t_color\":\"#000\",\"i_hidden\":\"false\",\"status\":0,\"focus\":\"D\"},{\"label\":\"近2年按照相关指导调整饮食习惯\",\"itemBgc\":\"#FFFFFF\",\"b_itemBgc\":\"#E5E5E5\",\"b_checkbcg\":\"#E2E2E2\",\"t_color\":\"#000\",\"i_hidden\":\"false\",\"status\":0,\"focus\":\"E\"},{\"label\":\"以上均无\",\"itemBgc\":\"#FFFFFF\",\"b_itemBgc\":\"#E5E5E5\",\"b_checkbcg\":\"#E2E2E2\",\"t_color\":\"#000\",\"i_hidden\":\"false\",\"status\":0,\"focus\":\"F\"}]},{\"title\":\"一、谷、薯类\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位，即\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级,\",\"type\":0},{\"text\":\"若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":1}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"大米，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_rice.jpg\",\"https://www.softcasing.com/images/food/ic_rice_r.jpg\"],\"help\":{\"showhelpText\":\"true\"},\"focus\":\"A\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"面食，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_bread.jpg\",\"https://www.softcasing.com/images/food/ic_bread_r.jpg\"],\"focus\":\"B\",\"scr_hidden\":\"true\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"小米，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_millet_r.jpg\",\"https://www.softcasing.com/images/food/ic_millet.jpg\"],\"scr_hidden\":\"true\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"红薯，一年内平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_potato.jpg\",\"https://www.softcasing.com/images/food/ic_potato_r.jpg\"],\"scr_hidden\":\"true\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"二、蔬菜(果实类)\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于蔬菜有明显的季节性，因此请根据提示记录该蔬菜\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次（\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"A、果实类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"scr_hidden\":\"true\",\"imageList\":[\"https://www.softcasing.com/images/food/ic_cucumber.jpg\",\"https://www.softcasing.com/images/food/ic_cucumber_r.jpg\"],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"西红柿，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"A\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"黄  瓜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"茄  子，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_eggplant.jpg\",\"https://www.softcasing.com/images/food/ic_eggplant_r.jpg\"],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"豆  角，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"E\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"丝  瓜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"F\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"青  椒，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"G\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"冬  瓜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"H\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"二、蔬菜(根块茎类)\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于蔬菜有明显的季节性，因此请根据提示记录该蔬菜\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次（\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"B、根块茎类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"scr_hidden\":\"true\",\"imageList\":[\"https://www.softcasing.com/images/food/ic_radish.jpg\",\"https://www.softcasing.com/images/food/ic_radish_r.jpg\"],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"土豆，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"L\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"白萝卜或青萝卜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）（以上两种蔬菜，任意一种吃过1次，频率+1，例：若孩子本周食用白萝卜1次，青萝卜1次，则食用频率记为2次/周）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_radish.jpg\",\"https://www.softcasing.com/images/food/ic_radish_r.jpg\"],\"focus\":\"G\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"胡萝卜， 一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"K\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"洋葱，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"M\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"莲藕, 一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"N\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"二、蔬菜(叶菜类)\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于蔬菜有明显的季节性，因此请根据提示记录该蔬菜\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次（\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"C、叶菜类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_lettuce.jpg\",\"https://www.softcasing.com/images/food/ic_lettuce_r.jpg\"],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"白菜、卷心菜及茼蒿，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"input_type\":\"digit\",\"text\":\"每次食用量等级为（1  2  3  4）（注：以上三种蔬菜，任意一种吃过一次，频率+1。食用量级取三者平均量即可。）\",\"type\":\"1\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"R\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"生菜、菠菜及芹菜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"input_type\":\"digit\",\"text\":\"每次食用量等级为（1  2  3  4）注：以上三种蔬菜，任意一种吃过一次，频率+1。食用量级取三者平均量即可。）\",\"type\":\"1\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"R\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"茴香及韭菜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"input_type\":\"digit\",\"text\":\"每次食用量等级为（1  2  3  4）（注：以上两种蔬菜，任意一种吃过一次，频率+1。食用量级取二者平均量即可。\",\"type\":\"1\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"R\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"油菜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"input_type\":\"digit\",\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"S\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"type\":\"title\",\"text_title\":\"以下食物食用量参照如下图片估计使用量\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_broccoli.jpg\",\"https://www.softcasing.com/images/food/ic_broccoli_r.jpg\"],\"scr_hidden\":\"false\",\"text_scr\":[],\"focus\":\"B\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"菜花（或西兰花），一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）（以上两种蔬菜，任意一种吃过1次，频率+1，例：若孩子本周食用菜花1次，西兰花1次，则食用频率记为2次/周）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"Q\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"imgUrl\":[],\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"二、蔬菜(菌藻类)\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于蔬菜有明显的季节性，因此请根据提示记录该蔬菜\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次（\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"D、菌藻类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"scr_hidden\":\"true\",\"imageList\":[\"https://www.softcasing.com/images/food/ic_mushroom.jpg\",\"https://www.softcasing.com/images/food/ic_mushroom_r.jpg\"],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"平  菇，一年中的平均食用频率为 \",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"Y\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"海  带，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"qA\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"香  菇，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"qC\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"木  耳，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"qD\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"食用各类蔬菜比例：\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"input_type\":\"number\"},{\"b_text\":\"果实类:根茎类:叶菜类:菌菇类 ≈ \",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"input_type\":\"number\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"input_type\":\"number\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":1,\"select\":[],\"input_type\":\"number\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":2,\"select\":[],\"input_type\":\"number\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":3,\"select\":[],\"input_type\":\"number\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"type\":\"y\",\"focus\":\"qG\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0}]},{\"title\":\"三、肉类 \",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位，即\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"鱼肉类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_hfash.jpg\"],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"海鱼肉，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"E\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"河鱼肉，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_hfash.jpg\",\"https://www.softcasing.com/images/food/ic_hfash_r.jpg\"],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"F\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"type\":\"title\",\"text_title\":\"虾类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"海 虾 ，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"scr_hidden\":\"true\",\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_hshrimp.jpg\",\"https://www.softcasing.com/images/food/ic_hshrimp_r.jpg\"],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"G\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"河虾（小虾） ，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_shrimp.jpg\",\"https://www.softcasing.com/images/food/ic_shrimp_r.jpg\"],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"scr_hidden\":\"true\",\"focus\":\"H\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"type\":\"title\",\"text_title\":\"畜禽类\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"scr_hidden\":\"true\",\"imageList\":[\"https://www.softcasing.com/images/food/ic_pork.jpg\",\"https://www.softcasing.com/images/food/ic_pork_r.jpg\"],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"羊肉，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_porkone.jpg\",\"https://www.softcasing.com/images/food/ic_porktwo.jpg\"],\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"牛肉，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_pork.jpg\",\"https://www.softcasing.com/images/food/ic_pork_r.jpg\"],\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\" 鸡肉，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_porkone.jpg\",\"https://www.softcasing.com/images/food/ic_porktwo.jpg\"],\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"猪肉，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"type\":\"1\",\"input_type\":\"digit\"}],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_pork.jpg\",\"https://www.softcasing.com/images/food/ic_pork_r.jpg\"],\"focus\":\"A\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"四、水果类\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于水果有明显的季节性，因此请根据提示记录该水果\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次(\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"以下食物食用量参照如下图片估计使用量\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_apple.jpg\"],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"苹  果，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\"梨，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"text\":\"\",\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\"香蕉，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\"橙子，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"E\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\"桃子，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"F\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"type\":\"title\",\"text_title\":\"以下食物食用量参照如下图片估计使用量\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[],\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"G\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"猕猴挑，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"imgUrl\":[\"https://www.softcasing.com/images/food/ic_kiwifruit.jpg\"],\"focus\":\"H\",\"help\":{\"imgurl\":\"../../../static/image/ic_kiwifruit.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0}]},{\"title\":\"四、水果类\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于水果有明显的季节性，因此请根据提示记录该水果\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次（\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"以下食物食用量参照如下图片估计使用量\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_mango.jpg\",\"https://www.softcasing.com/images/food/ic_mango_r.jpg\"],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"芒果及榴莲，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）注：以上两种水果，任意一种吃过一次，频率+1。食用量级取二者平均量即可。）\"}],\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\"哈密瓜，一年中的平均食用频率为\",\"input\":1,\"value\":\"\",\"type\":\"1\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\",\"input_type\":\"digit\"}],\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\" 西  瓜，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"E\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"status\":0},{\"label\":[{\"b_text\":\"柚  子，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"focus\":\"F\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"四、水果类\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位。由于水果有明显的季节性，因此请根据提示记录该水果\",\"type\":0},{\"text\":\"一年中的平均\",\"type\":1},{\"text\":\"食入频次为__次（\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\")\",\"type\":0},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}]},\"type\":2,\"itemSelcet\":[{\"type\":\"title\",\"text_title\":\"以下食物食用量参照如下图片估计使用量\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_grape.jpg\",\"https://www.softcasing.com/images/food/ic_grape_r.jpg\"],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"A\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"蓝  莓，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"葡  萄，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"樱  桃，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"type\":\"title\",\"text_title\":\"以下食物食用量参照如下图片估计使用量\",\"label\":[],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"imageList\":[\"https://www.softcasing.com/images/food/ic_strawberry.jpg\",\"https://www.softcasing.com/images/food/ic_strawberry_r.jpg\"],\"scr_hidden\":\"true\",\"text_scr\":[{\"text\":\"以\",\"type\":0},{\"text\":\"图片中的食物量\",\"type\":1},{\"text\":\"为例，\",\"type\":0},{\"text\":\"≥1份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"4\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"3/4份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"3\",\"type\":1},{\"text\":\",\",\"type\":1},{\"text\":\"1/2份\",\"type\":1},{\"text\":\"记录等级为\",\"type\":0},{\"text\":\"2\",\"type\":1},{\"text\":\",\",\"type\":0},{\"text\":\"依次类推\",\"type\":1},{\"text\":\"。\",\"type\":0}],\"focus\":\"E\",\"help\":{\"showhelpText\":\"true\"},\"error\":\"false\",\"status\":1},{\"label\":[{\"b_text\":\"草  莓，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"F\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"荔  枝，一年中的平均食用频率为\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"G\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0},{\"label\":[{\"b_text\":\"其他水果，如\",\"input\":1,\"value\":\"\",\"a_text\":\"，食用\",\"select\":[],\"type\":\"1\",\"input_type\":\"text\"},{\"b_text\":\"频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"type\":\"1\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4  5）\",\"input_type\":\"digit\"}],\"focus\":\"H\",\"type\":\"x\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":1}]},{\"title\":\"五、蛋、奶类\",\"subscript\":{\"title\":[]},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"鸡  蛋，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[],\"input_type\":\"digit\",\"type\":\"1\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次量约为\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"颗\",\"select\":[],\"input_type\":\"digit\"}],\"focus\":\"A\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"type\":\"k\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"鹌鹑蛋，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[],\"input_type\":\"digit\",\"type\":\"1\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次量约为\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"颗\",\"select\":[],\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"type\":\"k\",\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"牛  奶，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[],\"input_type\":\"digit\",\"type\":\"1\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次量约为\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"ml\",\"select\":[],\"input_type\":\"digit\"}],\"type\":\"m\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"酸  奶（不包括酸奶饮料，如养乐多、酸酸乳等），食用频率为\",\"input\":1,\"type\":\"1\",\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"次/每次量约为\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":1,\"value\":\"\",\"a_text\":\"ml\",\"select\":[],\"input_type\":\"digit\"}],\"type\":\"m\",\"focus\":\"F\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"其他奶类如\",\"input\":1,\"value\":\"\",\"a_text\":\",食用频率\",\"select\":[],\"input_type\":\"text\"},{\"b_text\":\"为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"\",\"input_type\":\"digit\"},{\"b_text\":\"每次量约为\",\"input\":1,\"value\":\"\",\"a_text\":\"ml\",\"select\":[],\"input_type\":\"digit\"}],\"type\":\"x\",\"flag\":\"m\",\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"G\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":1}]},{\"title\":\"六、坚果类\",\"subscript\":{\"title\":[{\"text\":\"请您根据孩子的饮食情况，选择相应的食用频率单位，即\",\"type\":0},{\"text\":\"周或月\",\"type\":1},{\"text\":\"【可选】\",\"type\":2},{\"text\":\"。并根据孩子所吃食物的\",\"type\":0},{\"text\":\"体积\",\"type\":1},{\"text\":\"估计等级。若列举的食物种类，孩子食用频率\",\"type\":0},{\"text\":\"<1次/月\",\"type\":1},{\"text\":\"或“\",\"type\":0},{\"text\":\"不吃\",\"type\":1},{\"text\":\"，则记频次为“\",\"type\":0},{\"text\":\"0\",\"type\":1},{\"text\":\"”\",\"type\":0}],\"image\":\"https://www.softcasing.com/images/food/ic_almond.jpg\"},\"type\":2,\"flag\":\"flag\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"各类坚果，食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"select\":[],\"type\":\"1\",\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"每次食用量等级为（1  2  3  4）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"A\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[{\"label\":1,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":2,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":3,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}},{\"label\":4,\"status\":0,\"color\":{\"ftcolor\":\"#000\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#DADBDC\",\"bgc\":\"#E8F5FF\",\"t_innericonBgc\":\"#FFFFFF\"}}],\"status\":0}]},{\"title\":\"七、零食类\",\"subscript\":{\"title\":[]},\"type\":2,\"flag\":\"snack\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"油炸类/膨化类，食用频率为\",\"input\":1,\"type\":\"1\",\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"A\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"甜点类，食用频率为\",\"input\":1,\"value\":\"\",\"type\":\"1\",\"a_text\":\"次/\",\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"B\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"巧克力，食用频率为\",\"input\":1,\"value\":\"\",\"type\":\"1\",\"a_text\":\"次/\",\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"C\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"奶酪，食用频率为\",\"input\":1,\"value\":\"\",\"type\":\"1\",\"a_text\":\"次/\",\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\"\",\"input\":0,\"value\":\"\",\"a_text\":\"\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"D\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0},{\"label\":[{\"b_text\":\"碳酸饮料及甜饮料类，食用频率为\",\"input\":1,\"type\":\"1\",\"value\":\"\",\"a_text\":\"次/\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"\",\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"E\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0}]},{\"title\":\"八、\",\"subscript\":{\"title\":\"\"},\"type\":2,\"flag\":\"water\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"孩子每日饮水量\",\"input\":1,\"value\":\"\",\"select\":[],\"a_text\":\"ml（饮水内容包括:水，粥汤类，不包括各种奶类及饮料。）\",\"input_type\":\"number\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"A\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0}]},{\"title\":\"九、\",\"subscript\":{\"title\":\"\"},\"type\":2,\"flag\":\"snack\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"饭菜中应用辣椒，咖喱及孜然调料的食用频率为\",\"input\":1,\"value\":\"\",\"a_text\":\"次/\",\"input_type\":\"digit\",\"select\":[{\"text\":\"周\",\"color\":{\"fontcolor\":\"#DF2203\",\"borderColor\":\"#DF2203\",\"r_bgc\":\"#DF2203\"},\"value\":\"\",\"status\":1},{\"text\":\"月\",\"color\":{\"fontcolor\":\"#fff\",\"borderColor\":\"#fff\",\"r_bgc\":\"#8ECDFF\"},\"value\":\"\",\"status\":0}],\"text\":\"（以上品种，任意一种吃过1次，频率+1，例：若孩子本周食用辣椒调料1次，咖喱调料1次，则食用频率记为2次/周。）\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"focus\":\"A\",\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0}]},{\"title\":\"十、孩子平时的饮食结构的比例\",\"subscript\":{\"title\":\"\"},\"type\":2,\"flag\":\"final\",\"itemSelcet\":[{\"label\":[{\"b_text\":\"主食：蔬菜：肉：蛋奶：水果=\",\"input\":0,\"value\":\"\",\"select\":[]},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":1,\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":2,\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":3,\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":4,\"select\":[],\"input_type\":\"digit\"},{\"b_text\":\":\",\"input\":1,\"value\":\"\",\"name\":5,\"select\":[],\"input_type\":\"digit\"}],\"color\":{\"itemBgc\":\"#E8F5FF\",\"itemTitleBgc\":\"#8ECDFF\"},\"help\":{\"imgurl\":\"../../../static/image/ic_help.png\",\"showhelpText\":\"true\"},\"error\":\"false\",\"questionjson\":[],\"status\":0,\"focus\":\"A\"}]}]");

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 34:
/*!**********************************************!*\
  !*** D:/wx_project/wx_question/util/area.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    540000: '西藏自治区',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区',
    900000: '海外' },

  city_list: {
    110100: '北京市',
    120100: '天津市',
    130100: '石家庄市',
    130200: '唐山市',
    130300: '秦皇岛市',
    130400: '邯郸市',
    130500: '邢台市',
    130600: '保定市',
    130700: '张家口市',
    130800: '承德市',
    130900: '沧州市',
    131000: '廊坊市',
    131100: '衡水市',
    140100: '太原市',
    140200: '大同市',
    140300: '阳泉市',
    140400: '长治市',
    140500: '晋城市',
    140600: '朔州市',
    140700: '晋中市',
    140800: '运城市',
    140900: '忻州市',
    141000: '临汾市',
    141100: '吕梁市',
    150100: '呼和浩特市',
    150200: '包头市',
    150300: '乌海市',
    150400: '赤峰市',
    150500: '通辽市',
    150600: '鄂尔多斯市',
    150700: '呼伦贝尔市',
    150800: '巴彦淖尔市',
    150900: '乌兰察布市',
    152200: '兴安盟',
    152500: '锡林郭勒盟',
    152900: '阿拉善盟',
    210100: '沈阳市',
    210200: '大连市',
    210300: '鞍山市',
    210400: '抚顺市',
    210500: '本溪市',
    210600: '丹东市',
    210700: '锦州市',
    210800: '营口市',
    210900: '阜新市',
    211000: '辽阳市',
    211100: '盘锦市',
    211200: '铁岭市',
    211300: '朝阳市',
    211400: '葫芦岛市',
    220100: '长春市',
    220200: '吉林市',
    220300: '四平市',
    220400: '辽源市',
    220500: '通化市',
    220600: '白山市',
    220700: '松原市',
    220800: '白城市',
    222400: '延边朝鲜族自治州',
    230100: '哈尔滨市',
    230200: '齐齐哈尔市',
    230300: '鸡西市',
    230400: '鹤岗市',
    230500: '双鸭山市',
    230600: '大庆市',
    230700: '伊春市',
    230800: '佳木斯市',
    230900: '七台河市',
    231000: '牡丹江市',
    231100: '黑河市',
    231200: '绥化市',
    232700: '大兴安岭地区',
    310100: '上海市',
    320100: '南京市',
    320200: '无锡市',
    320300: '徐州市',
    320400: '常州市',
    320500: '苏州市',
    320600: '南通市',
    320700: '连云港市',
    320800: '淮安市',
    320900: '盐城市',
    321000: '扬州市',
    321100: '镇江市',
    321200: '泰州市',
    321300: '宿迁市',
    330100: '杭州市',
    330200: '宁波市',
    330300: '温州市',
    330400: '嘉兴市',
    330500: '湖州市',
    330600: '绍兴市',
    330700: '金华市',
    330800: '衢州市',
    330900: '舟山市',
    331000: '台州市',
    331100: '丽水市',
    340100: '合肥市',
    340200: '芜湖市',
    340300: '蚌埠市',
    340400: '淮南市',
    340500: '马鞍山市',
    340600: '淮北市',
    340700: '铜陵市',
    340800: '安庆市',
    341000: '黄山市',
    341100: '滁州市',
    341200: '阜阳市',
    341300: '宿州市',
    341500: '六安市',
    341600: '亳州市',
    341700: '池州市',
    341800: '宣城市',
    350100: '福州市',
    350200: '厦门市',
    350300: '莆田市',
    350400: '三明市',
    350500: '泉州市',
    350600: '漳州市',
    350700: '南平市',
    350800: '龙岩市',
    350900: '宁德市',
    360100: '南昌市',
    360200: '景德镇市',
    360300: '萍乡市',
    360400: '九江市',
    360500: '新余市',
    360600: '鹰潭市',
    360700: '赣州市',
    360800: '吉安市',
    360900: '宜春市',
    361000: '抚州市',
    361100: '上饶市',
    370100: '济南市',
    370200: '青岛市',
    370300: '淄博市',
    370400: '枣庄市',
    370500: '东营市',
    370600: '烟台市',
    370700: '潍坊市',
    370800: '济宁市',
    370900: '泰安市',
    371000: '威海市',
    371100: '日照市',
    371300: '临沂市',
    371400: '德州市',
    371500: '聊城市',
    371600: '滨州市',
    371700: '菏泽市',
    410100: '郑州市',
    410200: '开封市',
    410300: '洛阳市',
    410400: '平顶山市',
    410500: '安阳市',
    410600: '鹤壁市',
    410700: '新乡市',
    410800: '焦作市',
    410900: '濮阳市',
    411000: '许昌市',
    411100: '漯河市',
    411200: '三门峡市',
    411300: '南阳市',
    411400: '商丘市',
    411500: '信阳市',
    411600: '周口市',
    411700: '驻马店市',
    419000: '省直辖县',
    420100: '武汉市',
    420200: '黄石市',
    420300: '十堰市',
    420500: '宜昌市',
    420600: '襄阳市',
    420700: '鄂州市',
    420800: '荆门市',
    420900: '孝感市',
    421000: '荆州市',
    421100: '黄冈市',
    421200: '咸宁市',
    421300: '随州市',
    422800: '恩施土家族苗族自治州',
    429000: '省直辖县',
    430100: '长沙市',
    430200: '株洲市',
    430300: '湘潭市',
    430400: '衡阳市',
    430500: '邵阳市',
    430600: '岳阳市',
    430700: '常德市',
    430800: '张家界市',
    430900: '益阳市',
    431000: '郴州市',
    431100: '永州市',
    431200: '怀化市',
    431300: '娄底市',
    433100: '湘西土家族苗族自治州',
    440100: '广州市',
    440200: '韶关市',
    440300: '深圳市',
    440400: '珠海市',
    440500: '汕头市',
    440600: '佛山市',
    440700: '江门市',
    440800: '湛江市',
    440900: '茂名市',
    441200: '肇庆市',
    441300: '惠州市',
    441400: '梅州市',
    441500: '汕尾市',
    441600: '河源市',
    441700: '阳江市',
    441800: '清远市',
    441900: '东莞市',
    442000: '中山市',
    445100: '潮州市',
    445200: '揭阳市',
    445300: '云浮市',
    450100: '南宁市',
    450200: '柳州市',
    450300: '桂林市',
    450400: '梧州市',
    450500: '北海市',
    450600: '防城港市',
    450700: '钦州市',
    450800: '贵港市',
    450900: '玉林市',
    451000: '百色市',
    451100: '贺州市',
    451200: '河池市',
    451300: '来宾市',
    451400: '崇左市',
    460100: '海口市',
    460200: '三亚市',
    460300: '三沙市',
    460400: '儋州市',
    469000: '省直辖县',
    500100: '重庆市',
    500200: '县',
    510100: '成都市',
    510300: '自贡市',
    510400: '攀枝花市',
    510500: '泸州市',
    510600: '德阳市',
    510700: '绵阳市',
    510800: '广元市',
    510900: '遂宁市',
    511000: '内江市',
    511100: '乐山市',
    511300: '南充市',
    511400: '眉山市',
    511500: '宜宾市',
    511600: '广安市',
    511700: '达州市',
    511800: '雅安市',
    511900: '巴中市',
    512000: '资阳市',
    513200: '阿坝藏族羌族自治州',
    513300: '甘孜藏族自治州',
    513400: '凉山彝族自治州',
    520100: '贵阳市',
    520200: '六盘水市',
    520300: '遵义市',
    520400: '安顺市',
    520500: '毕节市',
    520600: '铜仁市',
    522300: '黔西南布依族苗族自治州',
    522600: '黔东南苗族侗族自治州',
    522700: '黔南布依族苗族自治州',
    530100: '昆明市',
    530300: '曲靖市',
    530400: '玉溪市',
    530500: '保山市',
    530600: '昭通市',
    530700: '丽江市',
    530800: '普洱市',
    530900: '临沧市',
    532300: '楚雄彝族自治州',
    532500: '红河哈尼族彝族自治州',
    532600: '文山壮族苗族自治州',
    532800: '西双版纳傣族自治州',
    532900: '大理白族自治州',
    533100: '德宏傣族景颇族自治州',
    533300: '怒江傈僳族自治州',
    533400: '迪庆藏族自治州',
    540100: '拉萨市',
    540200: '日喀则市',
    540300: '昌都市',
    540400: '林芝市',
    540500: '山南市',
    540600: '那曲市',
    542500: '阿里地区',
    610100: '西安市',
    610200: '铜川市',
    610300: '宝鸡市',
    610400: '咸阳市',
    610500: '渭南市',
    610600: '延安市',
    610700: '汉中市',
    610800: '榆林市',
    610900: '安康市',
    611000: '商洛市',
    620100: '兰州市',
    620200: '嘉峪关市',
    620300: '金昌市',
    620400: '白银市',
    620500: '天水市',
    620600: '武威市',
    620700: '张掖市',
    620800: '平凉市',
    620900: '酒泉市',
    621000: '庆阳市',
    621100: '定西市',
    621200: '陇南市',
    622900: '临夏回族自治州',
    623000: '甘南藏族自治州',
    630100: '西宁市',
    630200: '海东市',
    632200: '海北藏族自治州',
    632300: '黄南藏族自治州',
    632500: '海南藏族自治州',
    632600: '果洛藏族自治州',
    632700: '玉树藏族自治州',
    632800: '海西蒙古族藏族自治州',
    640100: '银川市',
    640200: '石嘴山市',
    640300: '吴忠市',
    640400: '固原市',
    640500: '中卫市',
    650100: '乌鲁木齐市',
    650200: '克拉玛依市',
    650400: '吐鲁番市',
    650500: '哈密市',
    652300: '昌吉回族自治州',
    652700: '博尔塔拉蒙古自治州',
    652800: '巴音郭楞蒙古自治州',
    652900: '阿克苏地区',
    653000: '克孜勒苏柯尔克孜自治州',
    653100: '喀什地区',
    653200: '和田地区',
    654000: '伊犁哈萨克自治州',
    654200: '塔城地区',
    654300: '阿勒泰地区',
    659000: '自治区直辖县级行政区划',
    710100: '台北市',
    710200: '高雄市',
    710300: '台南市',
    710400: '台中市',
    710500: '金门县',
    710600: '南投县',
    710700: '基隆市',
    710800: '新竹市',
    710900: '嘉义市',
    711100: '新北市',
    711200: '宜兰县',
    711300: '新竹县',
    711400: '桃园县',
    711500: '苗栗县',
    711700: '彰化县',
    711900: '嘉义县',
    712100: '云林县',
    712400: '屏东县',
    712500: '台东县',
    712600: '花莲县',
    712700: '澎湖县',
    712800: '连江县',
    810100: '香港岛',
    810200: '九龙',
    810300: '新界',
    820100: '澳门半岛',
    820200: '离岛',
    900400: '阿富汗',
    900800: '阿尔巴尼亚',
    901000: '南极洲',
    901200: '阿尔及利亚',
    901600: '美属萨摩亚',
    902000: '安道尔',
    902400: '安哥拉',
    902800: '安提瓜和巴布达',
    903100: '阿塞拜疆',
    903200: '阿根廷',
    903600: '澳大利亚',
    904000: '奥地利',
    904400: '巴哈马',
    904800: '巴林',
    905000: '孟加拉',
    905100: '亚美尼亚',
    905200: '巴巴多斯',
    905600: '比利时',
    906000: '百慕大',
    906400: '不丹',
    906800: '玻利维亚',
    907000: '波黑',
    907200: '博茨瓦纳',
    907400: '布韦岛',
    907600: '巴西',
    908400: '伯利兹',
    908600: '英属印度洋领地',
    909000: '所罗门群岛',
    909200: '英属维尔京群岛',
    909600: '文莱',
    910000: '保加利亚',
    910400: '缅甸',
    910800: '布隆迪',
    911200: '白俄罗斯',
    911600: '柬埔寨',
    912000: '喀麦隆',
    912400: '加拿大',
    913200: '佛得角',
    913600: '开曼群岛',
    914000: '中非',
    914400: '斯里兰卡',
    914800: '乍得',
    915200: '智利',
    916200: '圣诞岛',
    916600: '科科斯群岛',
    917000: '哥伦比亚',
    917400: '科摩罗',
    917500: '马约特',
    917800: '刚果（布）',
    918000: '刚果（金）',
    918400: '库克群岛',
    918800: '哥斯达黎加',
    919100: '克罗地亚',
    919200: '古巴',
    919600: '塞浦路斯',
    920300: '捷克',
    920400: '贝宁',
    920800: '丹麦',
    921200: '多米尼克',
    921400: '多米尼加',
    921800: '厄瓜多尔',
    922200: '萨尔瓦多',
    922600: '赤道几内亚',
    923100: '埃塞俄比亚',
    923200: '厄立特里亚',
    923300: '爱沙尼亚',
    923400: '法罗群岛',
    923800: '马尔维纳斯群岛（ 福克兰）',
    923900: '南乔治亚岛和南桑威奇群岛',
    924200: '斐济群岛',
    924600: '芬兰',
    924800: '奥兰群岛',
    925000: '法国',
    925400: '法属圭亚那',
    925800: '法属波利尼西亚',
    926000: '法属南部领地',
    926200: '吉布提',
    926600: '加蓬',
    926800: '格鲁吉亚',
    927000: '冈比亚',
    927500: '巴勒斯坦',
    927600: '德国',
    928800: '加纳',
    929200: '直布罗陀',
    929600: '基里巴斯',
    930000: '希腊',
    930400: '格陵兰',
    930800: '格林纳达',
    931200: '瓜德罗普',
    931600: '关岛',
    932000: '危地马拉',
    932400: '几内亚',
    932800: '圭亚那',
    933200: '海地',
    933400: '赫德岛和麦克唐纳群岛',
    933600: '梵蒂冈',
    934000: '洪都拉斯',
    934800: '匈牙利',
    935200: '冰岛',
    935600: '印度',
    936000: '印尼',
    936400: '伊朗',
    936800: '伊拉克',
    937200: '爱尔兰',
    937600: '以色列',
    938000: '意大利',
    938400: '科特迪瓦',
    938800: '牙买加',
    939200: '日本',
    939800: '哈萨克斯坦',
    940000: '约旦',
    940400: '肯尼亚',
    940800: '朝鲜 北朝鲜',
    941000: '韩国',
    941400: '科威特',
    941700: '吉尔吉斯斯坦',
    941800: '老挝',
    942200: '黎巴嫩',
    942600: '莱索托',
    942800: '拉脱维亚',
    943000: '利比里亚',
    943400: '利比亚',
    943800: '列支敦士登',
    944000: '立陶宛',
    944200: '卢森堡',
    945000: '马达加斯加',
    945400: '马拉维',
    945800: '马来西亚',
    946200: '马尔代夫',
    946600: '马里',
    947000: '马耳他',
    947400: '马提尼克',
    947800: '毛里塔尼亚',
    948000: '毛里求斯',
    948400: '墨西哥',
    949200: '摩纳哥',
    949600: '蒙古国',
    949800: '摩尔多瓦',
    949900: '黑山',
    950000: '蒙塞拉特岛',
    950400: '摩洛哥',
    950800: '莫桑比克',
    951200: '阿曼',
    951600: '纳米比亚',
    952000: '瑙鲁',
    952400: '尼泊尔',
    952800: '荷兰',
    953300: '阿鲁巴',
    953500: '荷兰加勒比区',
    954000: '新喀里多尼亚',
    954800: '瓦努阿图',
    955400: '新西兰',
    955800: '尼加拉瓜',
    956200: '尼日尔',
    956600: '尼日利亚',
    957000: '纽埃',
    957400: '诺福克岛',
    957800: '挪威',
    958000: '北马里亚纳群岛',
    958100: '美国本土外小岛屿',
    958300: '密克罗尼西亚联邦',
    958400: '马绍尔群岛',
    958500: '帕劳',
    958600: '巴基斯坦',
    959100: '巴拿马',
    959800: '巴布亚新几内亚',
    960000: '巴拉圭',
    960400: '秘鲁',
    960800: '菲律宾',
    961200: '皮特凯恩群岛',
    961600: '波兰',
    962000: '葡萄牙',
    962400: '几内亚比绍',
    962600: '东帝汶',
    963000: '波多黎各',
    963400: '卡塔尔',
    963800: '留尼汪',
    964200: '罗马尼亚',
    964300: '俄罗斯',
    964600: '卢旺达',
    965200: '圣巴泰勒米岛',
    965400: '圣赫勒拿',
    965900: '圣基茨和尼维斯',
    966000: '安圭拉',
    966200: '圣卢西亚',
    966300: '法属圣马丁',
    966600: '圣皮埃尔和密克隆',
    967000: '圣文森特和格林纳丁斯',
    967400: '圣马力诺',
    967800: '圣多美和普林西比',
    968200: '沙特阿拉伯',
    968600: '塞内加尔',
    968800: '塞尔维亚',
    969000: '塞舌尔',
    969400: '塞拉利昂',
    970200: '新加坡',
    970300: '斯洛伐克',
    970400: '越南',
    970500: '斯洛文尼亚',
    970600: '索马里',
    971000: '南非',
    971600: '津巴布韦',
    972400: '西班牙',
    972800: '南苏丹',
    972900: '苏丹',
    973200: '西撒哈拉',
    974000: '苏里南',
    974400: '斯瓦尔巴群岛和 扬马延岛',
    974800: '斯威士兰',
    975200: '瑞典',
    975600: '瑞士',
    976000: '叙利亚',
    976200: '塔吉克斯坦',
    976400: '泰国',
    976800: '多哥',
    977200: '托克劳',
    977600: '汤加',
    978000: '特立尼达和多巴哥',
    978400: '阿联酋',
    978800: '突尼斯',
    979200: '土耳其',
    979500: '土库曼斯坦',
    979600: '特克斯和凯科斯群岛',
    979800: '图瓦卢',
    980000: '乌干达',
    980400: '乌克兰',
    980700: '马其顿',
    981800: '埃及',
    982600: '英国',
    983100: '根西岛',
    983200: '泽西岛',
    983300: '马恩岛',
    983400: '坦桑尼亚',
    984000: '美国',
    985000: '美属维尔京群岛',
    985400: '布基纳法索',
    985800: '乌拉圭',
    986000: '乌兹别克斯坦',
    986200: '委内瑞拉',
    987600: '瓦利斯和富图纳',
    988200: '萨摩亚',
    988700: '也门',
    989400: '赞比亚' },

  county_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区',
    110107: '石景山区',
    110108: '海淀区',
    110109: '门头沟区',
    110111: '房山区',
    110112: '通州区',
    110113: '顺义区',
    110114: '昌平区',
    110115: '大兴区',
    110116: '怀柔区',
    110117: '平谷区',
    110118: '密云区',
    110119: '延庆区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    120106: '红桥区',
    120110: '东丽区',
    120111: '西青区',
    120112: '津南区',
    120113: '北辰区',
    120114: '武清区',
    120115: '宝坻区',
    120116: '滨海新区',
    120117: '宁河区',
    120118: '静海区',
    120119: '蓟州区',
    130102: '长安区',
    130104: '桥西区',
    130105: '新华区',
    130107: '井陉矿区',
    130108: '裕华区',
    130109: '藁城区',
    130110: '鹿泉区',
    130111: '栾城区',
    130121: '井陉县',
    130123: '正定县',
    130125: '行唐县',
    130126: '灵寿县',
    130127: '高邑县',
    130128: '深泽县',
    130129: '赞皇县',
    130130: '无极县',
    130131: '平山县',
    130132: '元氏县',
    130133: '赵县',
    130181: '辛集市',
    130183: '晋州市',
    130184: '新乐市',
    130202: '路南区',
    130203: '路北区',
    130204: '古冶区',
    130205: '开平区',
    130207: '丰南区',
    130208: '丰润区',
    130209: '曹妃甸区',
    130224: '滦南县',
    130225: '乐亭县',
    130227: '迁西县',
    130229: '玉田县',
    130281: '遵化市',
    130283: '迁安市',
    130284: '滦州市',
    130302: '海港区',
    130303: '山海关区',
    130304: '北戴河区',
    130306: '抚宁区',
    130321: '青龙满族自治县',
    130322: '昌黎县',
    130324: '卢龙县',
    130390: '经济技术开发区',
    130402: '邯山区',
    130403: '丛台区',
    130404: '复兴区',
    130406: '峰峰矿区',
    130407: '肥乡区',
    130408: '永年区',
    130423: '临漳县',
    130424: '成安县',
    130425: '大名县',
    130426: '涉县',
    130427: '磁县',
    130430: '邱县',
    130431: '鸡泽县',
    130432: '广平县',
    130433: '馆陶县',
    130434: '魏县',
    130435: '曲周县',
    130481: '武安市',
    130502: '桥东区',
    130503: '桥西区',
    130521: '邢台县',
    130522: '临城县',
    130523: '内丘县',
    130524: '柏乡县',
    130525: '隆尧县',
    130526: '任县',
    130527: '南和县',
    130528: '宁晋县',
    130529: '巨鹿县',
    130530: '新河县',
    130531: '广宗县',
    130532: '平乡县',
    130533: '威县',
    130534: '清河县',
    130535: '临西县',
    130581: '南宫市',
    130582: '沙河市',
    130602: '竞秀区',
    130606: '莲池区',
    130607: '满城区',
    130608: '清苑区',
    130609: '徐水区',
    130623: '涞水县',
    130624: '阜平县',
    130626: '定兴县',
    130627: '唐县',
    130628: '高阳县',
    130629: '容城县',
    130630: '涞源县',
    130631: '望都县',
    130632: '安新县',
    130633: '易县',
    130634: '曲阳县',
    130635: '蠡县',
    130636: '顺平县',
    130637: '博野县',
    130638: '雄县',
    130681: '涿州市',
    130682: '定州市',
    130683: '安国市',
    130684: '高碑店市',
    130702: '桥东区',
    130703: '桥西区',
    130705: '宣化区',
    130706: '下花园区',
    130708: '万全区',
    130709: '崇礼区',
    130722: '张北县',
    130723: '康保县',
    130724: '沽源县',
    130725: '尚义县',
    130726: '蔚县',
    130727: '阳原县',
    130728: '怀安县',
    130730: '怀来县',
    130731: '涿鹿县',
    130732: '赤城县',
    130802: '双桥区',
    130803: '双滦区',
    130804: '鹰手营子矿区',
    130821: '承德县',
    130822: '兴隆县',
    130824: '滦平县',
    130825: '隆化县',
    130826: '丰宁满族自治县',
    130827: '宽城满族自治县',
    130828: '围场满族蒙古族自治县',
    130881: '平泉市',
    130902: '新华区',
    130903: '运河区',
    130921: '沧县',
    130922: '青县',
    130923: '东光县',
    130924: '海兴县',
    130925: '盐山县',
    130926: '肃宁县',
    130927: '南皮县',
    130928: '吴桥县',
    130929: '献县',
    130930: '孟村回族自治县',
    130981: '泊头市',
    130982: '任丘市',
    130983: '黄骅市',
    130984: '河间市',
    131002: '安次区',
    131003: '广阳区',
    131022: '固安县',
    131023: '永清县',
    131024: '香河县',
    131025: '大城县',
    131026: '文安县',
    131028: '大厂回族自治县',
    131081: '霸州市',
    131082: '三河市',
    131090: '开发区',
    131102: '桃城区',
    131103: '冀州区',
    131121: '枣强县',
    131122: '武邑县',
    131123: '武强县',
    131124: '饶阳县',
    131125: '安平县',
    131126: '故城县',
    131127: '景县',
    131128: '阜城县',
    131182: '深州市',
    140105: '小店区',
    140106: '迎泽区',
    140107: '杏花岭区',
    140108: '尖草坪区',
    140109: '万柏林区',
    140110: '晋源区',
    140121: '清徐县',
    140122: '阳曲县',
    140123: '娄烦县',
    140181: '古交市',
    140212: '新荣区',
    140213: '平城区',
    140214: '云冈区',
    140215: '云州区',
    140221: '阳高县',
    140222: '天镇县',
    140223: '广灵县',
    140224: '灵丘县',
    140225: '浑源县',
    140226: '左云县',
    140302: '城区',
    140303: '矿区',
    140311: '郊区',
    140321: '平定县',
    140322: '盂县',
    140403: '潞州区',
    140404: '上党区',
    140405: '屯留区',
    140406: '潞城区',
    140423: '襄垣县',
    140425: '平顺县',
    140426: '黎城县',
    140427: '壶关县',
    140428: '长子县',
    140429: '武乡县',
    140430: '沁县',
    140431: '沁源县',
    140502: '城区',
    140521: '沁水县',
    140522: '阳城县',
    140524: '陵川县',
    140525: '泽州县',
    140581: '高平市',
    140602: '朔城区',
    140603: '平鲁区',
    140621: '山阴县',
    140622: '应县',
    140623: '右玉县',
    140681: '怀仁市',
    140702: '榆次区',
    140721: '榆社县',
    140722: '左权县',
    140723: '和顺县',
    140724: '昔阳县',
    140725: '寿阳县',
    140726: '太谷县',
    140727: '祁县',
    140728: '平遥县',
    140729: '灵石县',
    140781: '介休市',
    140802: '盐湖区',
    140821: '临猗县',
    140822: '万荣县',
    140823: '闻喜县',
    140824: '稷山县',
    140825: '新绛县',
    140826: '绛县',
    140827: '垣曲县',
    140828: '夏县',
    140829: '平陆县',
    140830: '芮城县',
    140881: '永济市',
    140882: '河津市',
    140902: '忻府区',
    140921: '定襄县',
    140922: '五台县',
    140923: '代县',
    140924: '繁峙县',
    140925: '宁武县',
    140926: '静乐县',
    140927: '神池县',
    140928: '五寨县',
    140929: '岢岚县',
    140930: '河曲县',
    140931: '保德县',
    140932: '偏关县',
    140981: '原平市',
    141002: '尧都区',
    141021: '曲沃县',
    141022: '翼城县',
    141023: '襄汾县',
    141024: '洪洞县',
    141025: '古县',
    141026: '安泽县',
    141027: '浮山县',
    141028: '吉县',
    141029: '乡宁县',
    141030: '大宁县',
    141031: '隰县',
    141032: '永和县',
    141033: '蒲县',
    141034: '汾西县',
    141081: '侯马市',
    141082: '霍州市',
    141102: '离石区',
    141121: '文水县',
    141122: '交城县',
    141123: '兴县',
    141124: '临县',
    141125: '柳林县',
    141126: '石楼县',
    141127: '岚县',
    141128: '方山县',
    141129: '中阳县',
    141130: '交口县',
    141181: '孝义市',
    141182: '汾阳市',
    150102: '新城区',
    150103: '回民区',
    150104: '玉泉区',
    150105: '赛罕区',
    150121: '土默特左旗',
    150122: '托克托县',
    150123: '和林格尔县',
    150124: '清水河县',
    150125: '武川县',
    150202: '东河区',
    150203: '昆都仑区',
    150204: '青山区',
    150205: '石拐区',
    150206: '白云鄂博矿区',
    150207: '九原区',
    150221: '土默特右旗',
    150222: '固阳县',
    150223: '达尔罕茂明安联合旗',
    150302: '海勃湾区',
    150303: '海南区',
    150304: '乌达区',
    150402: '红山区',
    150403: '元宝山区',
    150404: '松山区',
    150421: '阿鲁科尔沁旗',
    150422: '巴林左旗',
    150423: '巴林右旗',
    150424: '林西县',
    150425: '克什克腾旗',
    150426: '翁牛特旗',
    150428: '喀喇沁旗',
    150429: '宁城县',
    150430: '敖汉旗',
    150502: '科尔沁区',
    150521: '科尔沁左翼中旗',
    150522: '科尔沁左翼后旗',
    150523: '开鲁县',
    150524: '库伦旗',
    150525: '奈曼旗',
    150526: '扎鲁特旗',
    150581: '霍林郭勒市',
    150602: '东胜区',
    150603: '康巴什区',
    150621: '达拉特旗',
    150622: '准格尔旗',
    150623: '鄂托克前旗',
    150624: '鄂托克旗',
    150625: '杭锦旗',
    150626: '乌审旗',
    150627: '伊金霍洛旗',
    150702: '海拉尔区',
    150703: '扎赉诺尔区',
    150721: '阿荣旗',
    150722: '莫力达瓦达斡尔族自治旗',
    150723: '鄂伦春自治旗',
    150724: '鄂温克族自治旗',
    150725: '陈巴尔虎旗',
    150726: '新巴尔虎左旗',
    150727: '新巴尔虎右旗',
    150781: '满洲里市',
    150782: '牙克石市',
    150783: '扎兰屯市',
    150784: '额尔古纳市',
    150785: '根河市',
    150802: '临河区',
    150821: '五原县',
    150822: '磴口县',
    150823: '乌拉特前旗',
    150824: '乌拉特中旗',
    150825: '乌拉特后旗',
    150826: '杭锦后旗',
    150902: '集宁区',
    150921: '卓资县',
    150922: '化德县',
    150923: '商都县',
    150924: '兴和县',
    150925: '凉城县',
    150926: '察哈尔右翼前旗',
    150927: '察哈尔右翼中旗',
    150928: '察哈尔右翼后旗',
    150929: '四子王旗',
    150981: '丰镇市',
    152201: '乌兰浩特市',
    152202: '阿尔山市',
    152221: '科尔沁右翼前旗',
    152222: '科尔沁右翼中旗',
    152223: '扎赉特旗',
    152224: '突泉县',
    152501: '二连浩特市',
    152502: '锡林浩特市',
    152522: '阿巴嘎旗',
    152523: '苏尼特左旗',
    152524: '苏尼特右旗',
    152525: '东乌珠穆沁旗',
    152526: '西乌珠穆沁旗',
    152527: '太仆寺旗',
    152528: '镶黄旗',
    152529: '正镶白旗',
    152530: '正蓝旗',
    152531: '多伦县',
    152921: '阿拉善左旗',
    152922: '阿拉善右旗',
    152923: '额济纳旗',
    210102: '和平区',
    210103: '沈河区',
    210104: '大东区',
    210105: '皇姑区',
    210106: '铁西区',
    210111: '苏家屯区',
    210112: '浑南区',
    210113: '沈北新区',
    210114: '于洪区',
    210115: '辽中区',
    210123: '康平县',
    210124: '法库县',
    210181: '新民市',
    210190: '经济技术开发区',
    210202: '中山区',
    210203: '西岗区',
    210204: '沙河口区',
    210211: '甘井子区',
    210212: '旅顺口区',
    210213: '金州区',
    210214: '普兰店区',
    210224: '长海县',
    210281: '瓦房店市',
    210283: '庄河市',
    210302: '铁东区',
    210303: '铁西区',
    210304: '立山区',
    210311: '千山区',
    210321: '台安县',
    210323: '岫岩满族自治县',
    210381: '海城市',
    210390: '高新区',
    210402: '新抚区',
    210403: '东洲区',
    210404: '望花区',
    210411: '顺城区',
    210421: '抚顺县',
    210422: '新宾满族自治县',
    210423: '清原满族自治县',
    210502: '平山区',
    210503: '溪湖区',
    210504: '明山区',
    210505: '南芬区',
    210521: '本溪满族自治县',
    210522: '桓仁满族自治县',
    210602: '元宝区',
    210603: '振兴区',
    210604: '振安区',
    210624: '宽甸满族自治县',
    210681: '东港市',
    210682: '凤城市',
    210702: '古塔区',
    210703: '凌河区',
    210711: '太和区',
    210726: '黑山县',
    210727: '义县',
    210781: '凌海市',
    210782: '北镇市',
    210793: '经济技术开发区',
    210802: '站前区',
    210803: '西市区',
    210804: '鲅鱼圈区',
    210811: '老边区',
    210881: '盖州市',
    210882: '大石桥市',
    210902: '海州区',
    210903: '新邱区',
    210904: '太平区',
    210905: '清河门区',
    210911: '细河区',
    210921: '阜新蒙古族自治县',
    210922: '彰武县',
    211002: '白塔区',
    211003: '文圣区',
    211004: '宏伟区',
    211005: '弓长岭区',
    211011: '太子河区',
    211021: '辽阳县',
    211081: '灯塔市',
    211102: '双台子区',
    211103: '兴隆台区',
    211104: '大洼区',
    211122: '盘山县',
    211202: '银州区',
    211204: '清河区',
    211221: '铁岭县',
    211223: '西丰县',
    211224: '昌图县',
    211281: '调兵山市',
    211282: '开原市',
    211302: '双塔区',
    211303: '龙城区',
    211321: '朝阳县',
    211322: '建平县',
    211324: '喀喇沁左翼蒙古族自治县',
    211381: '北票市',
    211382: '凌源市',
    211402: '连山区',
    211403: '龙港区',
    211404: '南票区',
    211421: '绥中县',
    211422: '建昌县',
    211481: '兴城市',
    220102: '南关区',
    220103: '宽城区',
    220104: '朝阳区',
    220105: '二道区',
    220106: '绿园区',
    220112: '双阳区',
    220113: '九台区',
    220122: '农安县',
    220182: '榆树市',
    220183: '德惠市',
    220192: '经济技术开发区',
    220202: '昌邑区',
    220203: '龙潭区',
    220204: '船营区',
    220211: '丰满区',
    220221: '永吉县',
    220281: '蛟河市',
    220282: '桦甸市',
    220283: '舒兰市',
    220284: '磐石市',
    220302: '铁西区',
    220303: '铁东区',
    220322: '梨树县',
    220323: '伊通满族自治县',
    220381: '公主岭市',
    220382: '双辽市',
    220402: '龙山区',
    220403: '西安区',
    220421: '东丰县',
    220422: '东辽县',
    220502: '东昌区',
    220503: '二道江区',
    220521: '通化县',
    220523: '辉南县',
    220524: '柳河县',
    220581: '梅河口市',
    220582: '集安市',
    220602: '浑江区',
    220605: '江源区',
    220621: '抚松县',
    220622: '靖宇县',
    220623: '长白朝鲜族自治县',
    220681: '临江市',
    220702: '宁江区',
    220721: '前郭尔罗斯蒙古族自治县',
    220722: '长岭县',
    220723: '乾安县',
    220781: '扶余市',
    220802: '洮北区',
    220821: '镇赉县',
    220822: '通榆县',
    220881: '洮南市',
    220882: '大安市',
    222401: '延吉市',
    222402: '图们市',
    222403: '敦化市',
    222404: '珲春市',
    222405: '龙井市',
    222406: '和龙市',
    222424: '汪清县',
    222426: '安图县',
    230102: '道里区',
    230103: '南岗区',
    230104: '道外区',
    230108: '平房区',
    230109: '松北区',
    230110: '香坊区',
    230111: '呼兰区',
    230112: '阿城区',
    230113: '双城区',
    230123: '依兰县',
    230124: '方正县',
    230125: '宾县',
    230126: '巴彦县',
    230127: '木兰县',
    230128: '通河县',
    230129: '延寿县',
    230183: '尚志市',
    230184: '五常市',
    230202: '龙沙区',
    230203: '建华区',
    230204: '铁锋区',
    230205: '昂昂溪区',
    230206: '富拉尔基区',
    230207: '碾子山区',
    230208: '梅里斯达斡尔族区',
    230221: '龙江县',
    230223: '依安县',
    230224: '泰来县',
    230225: '甘南县',
    230227: '富裕县',
    230229: '克山县',
    230230: '克东县',
    230231: '拜泉县',
    230281: '讷河市',
    230302: '鸡冠区',
    230303: '恒山区',
    230304: '滴道区',
    230305: '梨树区',
    230306: '城子河区',
    230307: '麻山区',
    230321: '鸡东县',
    230381: '虎林市',
    230382: '密山市',
    230402: '向阳区',
    230403: '工农区',
    230404: '南山区',
    230405: '兴安区',
    230406: '东山区',
    230407: '兴山区',
    230421: '萝北县',
    230422: '绥滨县',
    230502: '尖山区',
    230503: '岭东区',
    230505: '四方台区',
    230506: '宝山区',
    230521: '集贤县',
    230522: '友谊县',
    230523: '宝清县',
    230524: '饶河县',
    230602: '萨尔图区',
    230603: '龙凤区',
    230604: '让胡路区',
    230605: '红岗区',
    230606: '大同区',
    230621: '肇州县',
    230622: '肇源县',
    230623: '林甸县',
    230624: '杜尔伯特蒙古族自治县',
    230702: '伊春区',
    230703: '南岔区',
    230704: '友好区',
    230705: '西林区',
    230706: '翠峦区',
    230707: '新青区',
    230708: '美溪区',
    230709: '金山屯区',
    230710: '五营区',
    230711: '乌马河区',
    230712: '汤旺河区',
    230713: '带岭区',
    230714: '乌伊岭区',
    230715: '红星区',
    230716: '上甘岭区',
    230722: '嘉荫县',
    230781: '铁力市',
    230803: '向阳区',
    230804: '前进区',
    230805: '东风区',
    230811: '郊区',
    230822: '桦南县',
    230826: '桦川县',
    230828: '汤原县',
    230881: '同江市',
    230882: '富锦市',
    230883: '抚远市',
    230902: '新兴区',
    230903: '桃山区',
    230904: '茄子河区',
    230921: '勃利县',
    231002: '东安区',
    231003: '阳明区',
    231004: '爱民区',
    231005: '西安区',
    231025: '林口县',
    231081: '绥芬河市',
    231083: '海林市',
    231084: '宁安市',
    231085: '穆棱市',
    231086: '东宁市',
    231102: '爱辉区',
    231121: '嫩江县',
    231123: '逊克县',
    231124: '孙吴县',
    231181: '北安市',
    231182: '五大连池市',
    231202: '北林区',
    231221: '望奎县',
    231222: '兰西县',
    231223: '青冈县',
    231224: '庆安县',
    231225: '明水县',
    231226: '绥棱县',
    231281: '安达市',
    231282: '肇东市',
    231283: '海伦市',
    232701: '漠河市',
    232721: '呼玛县',
    232722: '塔河县',
    232790: '松岭区',
    232791: '呼中区',
    232792: '加格达奇区',
    232793: '新林区',
    310101: '黄浦区',
    310104: '徐汇区',
    310105: '长宁区',
    310106: '静安区',
    310107: '普陀区',
    310109: '虹口区',
    310110: '杨浦区',
    310112: '闵行区',
    310113: '宝山区',
    310114: '嘉定区',
    310115: '浦东新区',
    310116: '金山区',
    310117: '松江区',
    310118: '青浦区',
    310120: '奉贤区',
    310151: '崇明区',
    320102: '玄武区',
    320104: '秦淮区',
    320105: '建邺区',
    320106: '鼓楼区',
    320111: '浦口区',
    320113: '栖霞区',
    320114: '雨花台区',
    320115: '江宁区',
    320116: '六合区',
    320117: '溧水区',
    320118: '高淳区',
    320205: '锡山区',
    320206: '惠山区',
    320211: '滨湖区',
    320213: '梁溪区',
    320214: '新吴区',
    320281: '江阴市',
    320282: '宜兴市',
    320302: '鼓楼区',
    320303: '云龙区',
    320305: '贾汪区',
    320311: '泉山区',
    320312: '铜山区',
    320321: '丰县',
    320322: '沛县',
    320324: '睢宁县',
    320381: '新沂市',
    320382: '邳州市',
    320391: '工业园区',
    320402: '天宁区',
    320404: '钟楼区',
    320411: '新北区',
    320412: '武进区',
    320413: '金坛区',
    320481: '溧阳市',
    320505: '虎丘区',
    320506: '吴中区',
    320507: '相城区',
    320508: '姑苏区',
    320509: '吴江区',
    320581: '常熟市',
    320582: '张家港市',
    320583: '昆山市',
    320585: '太仓市',
    320590: '工业园区',
    320591: '高新区',
    320602: '崇川区',
    320611: '港闸区',
    320612: '通州区',
    320623: '如东县',
    320681: '启东市',
    320682: '如皋市',
    320684: '海门市',
    320685: '海安市',
    320691: '高新区',
    320703: '连云区',
    320706: '海州区',
    320707: '赣榆区',
    320722: '东海县',
    320723: '灌云县',
    320724: '灌南县',
    320803: '淮安区',
    320804: '淮阴区',
    320812: '清江浦区',
    320813: '洪泽区',
    320826: '涟水县',
    320830: '盱眙县',
    320831: '金湖县',
    320890: '经济开发区',
    320902: '亭湖区',
    320903: '盐都区',
    320904: '大丰区',
    320921: '响水县',
    320922: '滨海县',
    320923: '阜宁县',
    320924: '射阳县',
    320925: '建湖县',
    320981: '东台市',
    321002: '广陵区',
    321003: '邗江区',
    321012: '江都区',
    321023: '宝应县',
    321081: '仪征市',
    321084: '高邮市',
    321090: '经济开发区',
    321102: '京口区',
    321111: '润州区',
    321112: '丹徒区',
    321181: '丹阳市',
    321182: '扬中市',
    321183: '句容市',
    321202: '海陵区',
    321203: '高港区',
    321204: '姜堰区',
    321281: '兴化市',
    321282: '靖江市',
    321283: '泰兴市',
    321302: '宿城区',
    321311: '宿豫区',
    321322: '沭阳县',
    321323: '泗阳县',
    321324: '泗洪县',
    330102: '上城区',
    330103: '下城区',
    330104: '江干区',
    330105: '拱墅区',
    330106: '西湖区',
    330108: '滨江区',
    330109: '萧山区',
    330110: '余杭区',
    330111: '富阳区',
    330112: '临安区',
    330122: '桐庐县',
    330127: '淳安县',
    330182: '建德市',
    330203: '海曙区',
    330205: '江北区',
    330206: '北仑区',
    330211: '镇海区',
    330212: '鄞州区',
    330213: '奉化区',
    330225: '象山县',
    330226: '宁海县',
    330281: '余姚市',
    330282: '慈溪市',
    330302: '鹿城区',
    330303: '龙湾区',
    330304: '瓯海区',
    330305: '洞头区',
    330324: '永嘉县',
    330326: '平阳县',
    330327: '苍南县',
    330328: '文成县',
    330329: '泰顺县',
    330381: '瑞安市',
    330382: '乐清市',
    330402: '南湖区',
    330411: '秀洲区',
    330421: '嘉善县',
    330424: '海盐县',
    330481: '海宁市',
    330482: '平湖市',
    330483: '桐乡市',
    330502: '吴兴区',
    330503: '南浔区',
    330521: '德清县',
    330522: '长兴县',
    330523: '安吉县',
    330602: '越城区',
    330603: '柯桥区',
    330604: '上虞区',
    330624: '新昌县',
    330681: '诸暨市',
    330683: '嵊州市',
    330702: '婺城区',
    330703: '金东区',
    330723: '武义县',
    330726: '浦江县',
    330727: '磐安县',
    330781: '兰溪市',
    330782: '义乌市',
    330783: '东阳市',
    330784: '永康市',
    330802: '柯城区',
    330803: '衢江区',
    330822: '常山县',
    330824: '开化县',
    330825: '龙游县',
    330881: '江山市',
    330902: '定海区',
    330903: '普陀区',
    330921: '岱山县',
    330922: '嵊泗县',
    331002: '椒江区',
    331003: '黄岩区',
    331004: '路桥区',
    331022: '三门县',
    331023: '天台县',
    331024: '仙居县',
    331081: '温岭市',
    331082: '临海市',
    331083: '玉环市',
    331102: '莲都区',
    331121: '青田县',
    331122: '缙云县',
    331123: '遂昌县',
    331124: '松阳县',
    331125: '云和县',
    331126: '庆元县',
    331127: '景宁畲族自治县',
    331181: '龙泉市',
    340102: '瑶海区',
    340103: '庐阳区',
    340104: '蜀山区',
    340111: '包河区',
    340121: '长丰县',
    340122: '肥东县',
    340123: '肥西县',
    340124: '庐江县',
    340181: '巢湖市',
    340190: '高新技术开发区',
    340191: '经济技术开发区',
    340202: '镜湖区',
    340203: '弋江区',
    340207: '鸠江区',
    340208: '三山区',
    340221: '芜湖县',
    340222: '繁昌县',
    340223: '南陵县',
    340225: '无为县',
    340302: '龙子湖区',
    340303: '蚌山区',
    340304: '禹会区',
    340311: '淮上区',
    340321: '怀远县',
    340322: '五河县',
    340323: '固镇县',
    340402: '大通区',
    340403: '田家庵区',
    340404: '谢家集区',
    340405: '八公山区',
    340406: '潘集区',
    340421: '凤台县',
    340422: '寿县',
    340503: '花山区',
    340504: '雨山区',
    340506: '博望区',
    340521: '当涂县',
    340522: '含山县',
    340523: '和县',
    340602: '杜集区',
    340603: '相山区',
    340604: '烈山区',
    340621: '濉溪县',
    340705: '铜官区',
    340706: '义安区',
    340711: '郊区',
    340722: '枞阳县',
    340802: '迎江区',
    340803: '大观区',
    340811: '宜秀区',
    340822: '怀宁县',
    340824: '潜山县',
    340825: '太湖县',
    340826: '宿松县',
    340827: '望江县',
    340828: '岳西县',
    340881: '桐城市',
    341002: '屯溪区',
    341003: '黄山区',
    341004: '徽州区',
    341021: '歙县',
    341022: '休宁县',
    341023: '黟县',
    341024: '祁门县',
    341102: '琅琊区',
    341103: '南谯区',
    341122: '来安县',
    341124: '全椒县',
    341125: '定远县',
    341126: '凤阳县',
    341181: '天长市',
    341182: '明光市',
    341202: '颍州区',
    341203: '颍东区',
    341204: '颍泉区',
    341221: '临泉县',
    341222: '太和县',
    341225: '阜南县',
    341226: '颍上县',
    341282: '界首市',
    341302: '埇桥区',
    341321: '砀山县',
    341322: '萧县',
    341323: '灵璧县',
    341324: '泗县',
    341390: '经济开发区',
    341502: '金安区',
    341503: '裕安区',
    341504: '叶集区',
    341522: '霍邱县',
    341523: '舒城县',
    341524: '金寨县',
    341525: '霍山县',
    341602: '谯城区',
    341621: '涡阳县',
    341622: '蒙城县',
    341623: '利辛县',
    341702: '贵池区',
    341721: '东至县',
    341722: '石台县',
    341723: '青阳县',
    341802: '宣州区',
    341821: '郎溪县',
    341822: '广德县',
    341823: '泾县',
    341824: '绩溪县',
    341825: '旌德县',
    341881: '宁国市',
    350102: '鼓楼区',
    350103: '台江区',
    350104: '仓山区',
    350105: '马尾区',
    350111: '晋安区',
    350112: '长乐区',
    350121: '闽侯县',
    350122: '连江县',
    350123: '罗源县',
    350124: '闽清县',
    350125: '永泰县',
    350128: '平潭县',
    350181: '福清市',
    350203: '思明区',
    350205: '海沧区',
    350206: '湖里区',
    350211: '集美区',
    350212: '同安区',
    350213: '翔安区',
    350302: '城厢区',
    350303: '涵江区',
    350304: '荔城区',
    350305: '秀屿区',
    350322: '仙游县',
    350402: '梅列区',
    350403: '三元区',
    350421: '明溪县',
    350423: '清流县',
    350424: '宁化县',
    350425: '大田县',
    350426: '尤溪县',
    350427: '沙县',
    350428: '将乐县',
    350429: '泰宁县',
    350430: '建宁县',
    350481: '永安市',
    350502: '鲤城区',
    350503: '丰泽区',
    350504: '洛江区',
    350505: '泉港区',
    350521: '惠安县',
    350524: '安溪县',
    350525: '永春县',
    350526: '德化县',
    350527: '金门县',
    350581: '石狮市',
    350582: '晋江市',
    350583: '南安市',
    350602: '芗城区',
    350603: '龙文区',
    350622: '云霄县',
    350623: '漳浦县',
    350624: '诏安县',
    350625: '长泰县',
    350626: '东山县',
    350627: '南靖县',
    350628: '平和县',
    350629: '华安县',
    350681: '龙海市',
    350702: '延平区',
    350703: '建阳区',
    350721: '顺昌县',
    350722: '浦城县',
    350723: '光泽县',
    350724: '松溪县',
    350725: '政和县',
    350781: '邵武市',
    350782: '武夷山市',
    350783: '建瓯市',
    350802: '新罗区',
    350803: '永定区',
    350821: '长汀县',
    350823: '上杭县',
    350824: '武平县',
    350825: '连城县',
    350881: '漳平市',
    350902: '蕉城区',
    350921: '霞浦县',
    350922: '古田县',
    350923: '屏南县',
    350924: '寿宁县',
    350925: '周宁县',
    350926: '柘荣县',
    350981: '福安市',
    350982: '福鼎市',
    360102: '东湖区',
    360103: '西湖区',
    360104: '青云谱区',
    360105: '湾里区',
    360111: '青山湖区',
    360112: '新建区',
    360121: '南昌县',
    360123: '安义县',
    360124: '进贤县',
    360190: '经济技术开发区',
    360192: '高新区',
    360202: '昌江区',
    360203: '珠山区',
    360222: '浮梁县',
    360281: '乐平市',
    360302: '安源区',
    360313: '湘东区',
    360321: '莲花县',
    360322: '上栗县',
    360323: '芦溪县',
    360402: '濂溪区',
    360403: '浔阳区',
    360404: '柴桑区',
    360423: '武宁县',
    360424: '修水县',
    360425: '永修县',
    360426: '德安县',
    360428: '都昌县',
    360429: '湖口县',
    360430: '彭泽县',
    360481: '瑞昌市',
    360482: '共青城市',
    360483: '庐山市',
    360490: '经济技术开发区',
    360502: '渝水区',
    360521: '分宜县',
    360602: '月湖区',
    360603: '余江区',
    360681: '贵溪市',
    360702: '章贡区',
    360703: '南康区',
    360704: '赣县区',
    360722: '信丰县',
    360723: '大余县',
    360724: '上犹县',
    360725: '崇义县',
    360726: '安远县',
    360727: '龙南县',
    360728: '定南县',
    360729: '全南县',
    360730: '宁都县',
    360731: '于都县',
    360732: '兴国县',
    360733: '会昌县',
    360734: '寻乌县',
    360735: '石城县',
    360781: '瑞金市',
    360802: '吉州区',
    360803: '青原区',
    360821: '吉安县',
    360822: '吉水县',
    360823: '峡江县',
    360824: '新干县',
    360825: '永丰县',
    360826: '泰和县',
    360827: '遂川县',
    360828: '万安县',
    360829: '安福县',
    360830: '永新县',
    360881: '井冈山市',
    360902: '袁州区',
    360921: '奉新县',
    360922: '万载县',
    360923: '上高县',
    360924: '宜丰县',
    360925: '靖安县',
    360926: '铜鼓县',
    360981: '丰城市',
    360982: '樟树市',
    360983: '高安市',
    361002: '临川区',
    361003: '东乡区',
    361021: '南城县',
    361022: '黎川县',
    361023: '南丰县',
    361024: '崇仁县',
    361025: '乐安县',
    361026: '宜黄县',
    361027: '金溪县',
    361028: '资溪县',
    361030: '广昌县',
    361102: '信州区',
    361103: '广丰区',
    361121: '上饶县',
    361123: '玉山县',
    361124: '铅山县',
    361125: '横峰县',
    361126: '弋阳县',
    361127: '余干县',
    361128: '鄱阳县',
    361129: '万年县',
    361130: '婺源县',
    361181: '德兴市',
    370102: '历下区',
    370103: '市中区',
    370104: '槐荫区',
    370105: '天桥区',
    370112: '历城区',
    370113: '长清区',
    370114: '章丘区',
    370115: '济阳区',
    370124: '平阴县',
    370126: '商河县',
    370190: '高新区',
    370191: '莱芜区',
    370202: '市南区',
    370203: '市北区',
    370211: '黄岛区',
    370212: '崂山区',
    370213: '李沧区',
    370214: '城阳区',
    370215: '即墨区',
    370281: '胶州市',
    370283: '平度市',
    370285: '莱西市',
    370290: '开发区',
    370302: '淄川区',
    370303: '张店区',
    370304: '博山区',
    370305: '临淄区',
    370306: '周村区',
    370321: '桓台县',
    370322: '高青县',
    370323: '沂源县',
    370402: '市中区',
    370403: '薛城区',
    370404: '峄城区',
    370405: '台儿庄区',
    370406: '山亭区',
    370481: '滕州市',
    370502: '东营区',
    370503: '河口区',
    370505: '垦利区',
    370522: '利津县',
    370523: '广饶县',
    370602: '芝罘区',
    370611: '福山区',
    370612: '牟平区',
    370613: '莱山区',
    370634: '长岛县',
    370681: '龙口市',
    370682: '莱阳市',
    370683: '莱州市',
    370684: '蓬莱市',
    370685: '招远市',
    370686: '栖霞市',
    370687: '海阳市',
    370690: '开发区',
    370702: '潍城区',
    370703: '寒亭区',
    370704: '坊子区',
    370705: '奎文区',
    370724: '临朐县',
    370725: '昌乐县',
    370781: '青州市',
    370782: '诸城市',
    370783: '寿光市',
    370784: '安丘市',
    370785: '高密市',
    370786: '昌邑市',
    370790: '开发区',
    370791: '高新区',
    370811: '任城区',
    370812: '兖州区',
    370826: '微山县',
    370827: '鱼台县',
    370828: '金乡县',
    370829: '嘉祥县',
    370830: '汶上县',
    370831: '泗水县',
    370832: '梁山县',
    370881: '曲阜市',
    370883: '邹城市',
    370890: '高新区',
    370902: '泰山区',
    370911: '岱岳区',
    370921: '宁阳县',
    370923: '东平县',
    370982: '新泰市',
    370983: '肥城市',
    371002: '环翠区',
    371003: '文登区',
    371082: '荣成市',
    371083: '乳山市',
    371091: '经济技术开发区',
    371102: '东港区',
    371103: '岚山区',
    371121: '五莲县',
    371122: '莒县',
    371302: '兰山区',
    371311: '罗庄区',
    371312: '河东区',
    371321: '沂南县',
    371322: '郯城县',
    371323: '沂水县',
    371324: '兰陵县',
    371325: '费县',
    371326: '平邑县',
    371327: '莒南县',
    371328: '蒙阴县',
    371329: '临沭县',
    371402: '德城区',
    371403: '陵城区',
    371422: '宁津县',
    371423: '庆云县',
    371424: '临邑县',
    371425: '齐河县',
    371426: '平原县',
    371427: '夏津县',
    371428: '武城县',
    371481: '乐陵市',
    371482: '禹城市',
    371502: '东昌府区',
    371521: '阳谷县',
    371522: '莘县',
    371523: '茌平县',
    371524: '东阿县',
    371525: '冠县',
    371526: '高唐县',
    371581: '临清市',
    371602: '滨城区',
    371603: '沾化区',
    371621: '惠民县',
    371622: '阳信县',
    371623: '无棣县',
    371625: '博兴县',
    371681: '邹平市',
    371702: '牡丹区',
    371703: '定陶区',
    371721: '曹县',
    371722: '单县',
    371723: '成武县',
    371724: '巨野县',
    371725: '郓城县',
    371726: '鄄城县',
    371728: '东明县',
    410102: '中原区',
    410103: '二七区',
    410104: '管城回族区',
    410105: '金水区',
    410106: '上街区',
    410108: '惠济区',
    410122: '中牟县',
    410181: '巩义市',
    410182: '荥阳市',
    410183: '新密市',
    410184: '新郑市',
    410185: '登封市',
    410190: '高新技术开发区',
    410191: '经济技术开发区',
    410202: '龙亭区',
    410203: '顺河回族区',
    410204: '鼓楼区',
    410205: '禹王台区',
    410212: '祥符区',
    410221: '杞县',
    410222: '通许县',
    410223: '尉氏县',
    410225: '兰考县',
    410302: '老城区',
    410303: '西工区',
    410304: '瀍河回族区',
    410305: '涧西区',
    410306: '吉利区',
    410311: '洛龙区',
    410322: '孟津县',
    410323: '新安县',
    410324: '栾川县',
    410325: '嵩县',
    410326: '汝阳县',
    410327: '宜阳县',
    410328: '洛宁县',
    410329: '伊川县',
    410381: '偃师市',
    410402: '新华区',
    410403: '卫东区',
    410404: '石龙区',
    410411: '湛河区',
    410421: '宝丰县',
    410422: '叶县',
    410423: '鲁山县',
    410425: '郏县',
    410481: '舞钢市',
    410482: '汝州市',
    410502: '文峰区',
    410503: '北关区',
    410505: '殷都区',
    410506: '龙安区',
    410522: '安阳县',
    410523: '汤阴县',
    410526: '滑县',
    410527: '内黄县',
    410581: '林州市',
    410590: '开发区',
    410602: '鹤山区',
    410603: '山城区',
    410611: '淇滨区',
    410621: '浚县',
    410622: '淇县',
    410702: '红旗区',
    410703: '卫滨区',
    410704: '凤泉区',
    410711: '牧野区',
    410721: '新乡县',
    410724: '获嘉县',
    410725: '原阳县',
    410726: '延津县',
    410727: '封丘县',
    410728: '长垣县',
    410781: '卫辉市',
    410782: '辉县市',
    410802: '解放区',
    410803: '中站区',
    410804: '马村区',
    410811: '山阳区',
    410821: '修武县',
    410822: '博爱县',
    410823: '武陟县',
    410825: '温县',
    410882: '沁阳市',
    410883: '孟州市',
    410902: '华龙区',
    410922: '清丰县',
    410923: '南乐县',
    410926: '范县',
    410927: '台前县',
    410928: '濮阳县',
    411002: '魏都区',
    411003: '建安区',
    411024: '鄢陵县',
    411025: '襄城县',
    411081: '禹州市',
    411082: '长葛市',
    411102: '源汇区',
    411103: '郾城区',
    411104: '召陵区',
    411121: '舞阳县',
    411122: '临颍县',
    411202: '湖滨区',
    411203: '陕州区',
    411221: '渑池县',
    411224: '卢氏县',
    411281: '义马市',
    411282: '灵宝市',
    411302: '宛城区',
    411303: '卧龙区',
    411321: '南召县',
    411322: '方城县',
    411323: '西峡县',
    411324: '镇平县',
    411325: '内乡县',
    411326: '淅川县',
    411327: '社旗县',
    411328: '唐河县',
    411329: '新野县',
    411330: '桐柏县',
    411381: '邓州市',
    411402: '梁园区',
    411403: '睢阳区',
    411421: '民权县',
    411422: '睢县',
    411423: '宁陵县',
    411424: '柘城县',
    411425: '虞城县',
    411426: '夏邑县',
    411481: '永城市',
    411502: '浉河区',
    411503: '平桥区',
    411521: '罗山县',
    411522: '光山县',
    411523: '新县',
    411524: '商城县',
    411525: '固始县',
    411526: '潢川县',
    411527: '淮滨县',
    411528: '息县',
    411602: '川汇区',
    411621: '扶沟县',
    411622: '西华县',
    411623: '商水县',
    411624: '沈丘县',
    411625: '郸城县',
    411626: '淮阳县',
    411627: '太康县',
    411628: '鹿邑县',
    411681: '项城市',
    411690: '经济开发区',
    411702: '驿城区',
    411721: '西平县',
    411722: '上蔡县',
    411723: '平舆县',
    411724: '正阳县',
    411725: '确山县',
    411726: '泌阳县',
    411727: '汝南县',
    411728: '遂平县',
    411729: '新蔡县',
    419001: '济源市',
    420102: '江岸区',
    420103: '江汉区',
    420104: '硚口区',
    420105: '汉阳区',
    420106: '武昌区',
    420107: '青山区',
    420111: '洪山区',
    420112: '东西湖区',
    420113: '汉南区',
    420114: '蔡甸区',
    420115: '江夏区',
    420116: '黄陂区',
    420117: '新洲区',
    420202: '黄石港区',
    420203: '西塞山区',
    420204: '下陆区',
    420205: '铁山区',
    420222: '阳新县',
    420281: '大冶市',
    420302: '茅箭区',
    420303: '张湾区',
    420304: '郧阳区',
    420322: '郧西县',
    420323: '竹山县',
    420324: '竹溪县',
    420325: '房县',
    420381: '丹江口市',
    420502: '西陵区',
    420503: '伍家岗区',
    420504: '点军区',
    420505: '猇亭区',
    420506: '夷陵区',
    420525: '远安县',
    420526: '兴山县',
    420527: '秭归县',
    420528: '长阳土家族自治县',
    420529: '五峰土家族自治县',
    420581: '宜都市',
    420582: '当阳市',
    420583: '枝江市',
    420590: '经济开发区',
    420602: '襄城区',
    420606: '樊城区',
    420607: '襄州区',
    420624: '南漳县',
    420625: '谷城县',
    420626: '保康县',
    420682: '老河口市',
    420683: '枣阳市',
    420684: '宜城市',
    420702: '梁子湖区',
    420703: '华容区',
    420704: '鄂城区',
    420802: '东宝区',
    420804: '掇刀区',
    420822: '沙洋县',
    420881: '钟祥市',
    420882: '京山市',
    420902: '孝南区',
    420921: '孝昌县',
    420922: '大悟县',
    420923: '云梦县',
    420981: '应城市',
    420982: '安陆市',
    420984: '汉川市',
    421002: '沙市区',
    421003: '荆州区',
    421022: '公安县',
    421023: '监利县',
    421024: '江陵县',
    421081: '石首市',
    421083: '洪湖市',
    421087: '松滋市',
    421102: '黄州区',
    421121: '团风县',
    421122: '红安县',
    421123: '罗田县',
    421124: '英山县',
    421125: '浠水县',
    421126: '蕲春县',
    421127: '黄梅县',
    421181: '麻城市',
    421182: '武穴市',
    421202: '咸安区',
    421221: '嘉鱼县',
    421222: '通城县',
    421223: '崇阳县',
    421224: '通山县',
    421281: '赤壁市',
    421303: '曾都区',
    421321: '随县',
    421381: '广水市',
    422801: '恩施市',
    422802: '利川市',
    422822: '建始县',
    422823: '巴东县',
    422825: '宣恩县',
    422826: '咸丰县',
    422827: '来凤县',
    422828: '鹤峰县',
    429004: '仙桃市',
    429005: '潜江市',
    429006: '天门市',
    429021: '神农架林区',
    430102: '芙蓉区',
    430103: '天心区',
    430104: '岳麓区',
    430105: '开福区',
    430111: '雨花区',
    430112: '望城区',
    430121: '长沙县',
    430181: '浏阳市',
    430182: '宁乡市',
    430202: '荷塘区',
    430203: '芦淞区',
    430204: '石峰区',
    430211: '天元区',
    430212: '渌口区',
    430223: '攸县',
    430224: '茶陵县',
    430225: '炎陵县',
    430281: '醴陵市',
    430302: '雨湖区',
    430304: '岳塘区',
    430321: '湘潭县',
    430381: '湘乡市',
    430382: '韶山市',
    430405: '珠晖区',
    430406: '雁峰区',
    430407: '石鼓区',
    430408: '蒸湘区',
    430412: '南岳区',
    430421: '衡阳县',
    430422: '衡南县',
    430423: '衡山县',
    430424: '衡东县',
    430426: '祁东县',
    430481: '耒阳市',
    430482: '常宁市',
    430502: '双清区',
    430503: '大祥区',
    430511: '北塔区',
    430521: '邵东县',
    430522: '新邵县',
    430523: '邵阳县',
    430524: '隆回县',
    430525: '洞口县',
    430527: '绥宁县',
    430528: '新宁县',
    430529: '城步苗族自治县',
    430581: '武冈市',
    430602: '岳阳楼区',
    430603: '云溪区',
    430611: '君山区',
    430621: '岳阳县',
    430623: '华容县',
    430624: '湘阴县',
    430626: '平江县',
    430681: '汨罗市',
    430682: '临湘市',
    430702: '武陵区',
    430703: '鼎城区',
    430721: '安乡县',
    430722: '汉寿县',
    430723: '澧县',
    430724: '临澧县',
    430725: '桃源县',
    430726: '石门县',
    430781: '津市市',
    430802: '永定区',
    430811: '武陵源区',
    430821: '慈利县',
    430822: '桑植县',
    430902: '资阳区',
    430903: '赫山区',
    430921: '南县',
    430922: '桃江县',
    430923: '安化县',
    430981: '沅江市',
    431002: '北湖区',
    431003: '苏仙区',
    431021: '桂阳县',
    431022: '宜章县',
    431023: '永兴县',
    431024: '嘉禾县',
    431025: '临武县',
    431026: '汝城县',
    431027: '桂东县',
    431028: '安仁县',
    431081: '资兴市',
    431102: '零陵区',
    431103: '冷水滩区',
    431121: '祁阳县',
    431122: '东安县',
    431123: '双牌县',
    431124: '道县',
    431125: '江永县',
    431126: '宁远县',
    431127: '蓝山县',
    431128: '新田县',
    431129: '江华瑶族自治县',
    431202: '鹤城区',
    431221: '中方县',
    431222: '沅陵县',
    431223: '辰溪县',
    431224: '溆浦县',
    431225: '会同县',
    431226: '麻阳苗族自治县',
    431227: '新晃侗族自治县',
    431228: '芷江侗族自治县',
    431229: '靖州苗族侗族自治县',
    431230: '通道侗族自治县',
    431281: '洪江市',
    431302: '娄星区',
    431321: '双峰县',
    431322: '新化县',
    431381: '冷水江市',
    431382: '涟源市',
    433101: '吉首市',
    433122: '泸溪县',
    433123: '凤凰县',
    433124: '花垣县',
    433125: '保靖县',
    433126: '古丈县',
    433127: '永顺县',
    433130: '龙山县',
    440103: '荔湾区',
    440104: '越秀区',
    440105: '海珠区',
    440106: '天河区',
    440111: '白云区',
    440112: '黄埔区',
    440113: '番禺区',
    440114: '花都区',
    440115: '南沙区',
    440117: '从化区',
    440118: '增城区',
    440203: '武江区',
    440204: '浈江区',
    440205: '曲江区',
    440222: '始兴县',
    440224: '仁化县',
    440229: '翁源县',
    440232: '乳源瑶族自治县',
    440233: '新丰县',
    440281: '乐昌市',
    440282: '南雄市',
    440303: '罗湖区',
    440304: '福田区',
    440305: '南山区',
    440306: '宝安区',
    440307: '龙岗区',
    440308: '盐田区',
    440309: '龙华区',
    440310: '坪山区',
    440311: '光明区',
    440402: '香洲区',
    440403: '斗门区',
    440404: '金湾区',
    440507: '龙湖区',
    440511: '金平区',
    440512: '濠江区',
    440513: '潮阳区',
    440514: '潮南区',
    440515: '澄海区',
    440523: '南澳县',
    440604: '禅城区',
    440605: '南海区',
    440606: '顺德区',
    440607: '三水区',
    440608: '高明区',
    440703: '蓬江区',
    440704: '江海区',
    440705: '新会区',
    440781: '台山市',
    440783: '开平市',
    440784: '鹤山市',
    440785: '恩平市',
    440802: '赤坎区',
    440803: '霞山区',
    440804: '坡头区',
    440811: '麻章区',
    440823: '遂溪县',
    440825: '徐闻县',
    440881: '廉江市',
    440882: '雷州市',
    440883: '吴川市',
    440890: '经济技术开发区',
    440902: '茂南区',
    440904: '电白区',
    440981: '高州市',
    440982: '化州市',
    440983: '信宜市',
    441202: '端州区',
    441203: '鼎湖区',
    441204: '高要区',
    441223: '广宁县',
    441224: '怀集县',
    441225: '封开县',
    441226: '德庆县',
    441284: '四会市',
    441302: '惠城区',
    441303: '惠阳区',
    441322: '博罗县',
    441323: '惠东县',
    441324: '龙门县',
    441402: '梅江区',
    441403: '梅县区',
    441422: '大埔县',
    441423: '丰顺县',
    441424: '五华县',
    441426: '平远县',
    441427: '蕉岭县',
    441481: '兴宁市',
    441502: '城区',
    441521: '海丰县',
    441523: '陆河县',
    441581: '陆丰市',
    441602: '源城区',
    441621: '紫金县',
    441622: '龙川县',
    441623: '连平县',
    441624: '和平县',
    441625: '东源县',
    441702: '江城区',
    441704: '阳东区',
    441721: '阳西县',
    441781: '阳春市',
    441802: '清城区',
    441803: '清新区',
    441821: '佛冈县',
    441823: '阳山县',
    441825: '连山壮族瑶族自治县',
    441826: '连南瑶族自治县',
    441881: '英德市',
    441882: '连州市',
    441901: '中堂镇',
    441903: '南城街道办事处',
    441904: '长安镇',
    441905: '东坑镇',
    441906: '樟木头镇',
    441907: '莞城街道办事处',
    441908: '石龙镇',
    441909: '桥头镇',
    441910: '万江街道办事处',
    441911: '麻涌镇',
    441912: '虎门镇',
    441913: '谢岗镇',
    441914: '石碣镇',
    441915: '茶山镇',
    441916: '东城街道办事处',
    441917: '洪梅镇',
    441918: '道滘镇',
    441919: '高埗镇',
    441920: '企石镇',
    441921: '凤岗镇',
    441922: '大岭山镇',
    441923: '松山湖管委会',
    441924: '清溪镇',
    441925: '望牛墩镇',
    441926: '厚街镇',
    441927: '常平镇',
    441928: '寮步镇',
    441929: '石排镇',
    441930: '横沥镇',
    441931: '塘厦镇',
    441932: '黄江镇',
    441933: '大朗镇',
    441934: '东莞港',
    441935: '东莞生态园',
    441990: '沙田镇',
    442001: '南头镇',
    442002: '神湾镇',
    442003: '东凤镇',
    442004: '五桂山街道办事处',
    442005: '黄圃镇',
    442006: '小榄镇',
    442007: '石岐区街道办事处',
    442008: '横栏镇',
    442009: '三角镇',
    442010: '三乡镇',
    442011: '港口镇',
    442012: '沙溪镇',
    442013: '板芙镇',
    442015: '东升镇',
    442016: '阜沙镇',
    442017: '民众镇',
    442018: '东区街道办事处',
    442019: '火炬开发区街道办事处',
    442020: '西区街道办事处',
    442021: '南区街道办事处',
    442022: '古镇镇',
    442023: '坦洲镇',
    442024: '大涌镇',
    442025: '南朗镇',
    445102: '湘桥区',
    445103: '潮安区',
    445122: '饶平县',
    445202: '榕城区',
    445203: '揭东区',
    445222: '揭西县',
    445224: '惠来县',
    445281: '普宁市',
    445302: '云城区',
    445303: '云安区',
    445321: '新兴县',
    445322: '郁南县',
    445381: '罗定市',
    450102: '兴宁区',
    450103: '青秀区',
    450105: '江南区',
    450107: '西乡塘区',
    450108: '良庆区',
    450109: '邕宁区',
    450110: '武鸣区',
    450123: '隆安县',
    450124: '马山县',
    450125: '上林县',
    450126: '宾阳县',
    450127: '横县',
    450202: '城中区',
    450203: '鱼峰区',
    450204: '柳南区',
    450205: '柳北区',
    450206: '柳江区',
    450222: '柳城县',
    450223: '鹿寨县',
    450224: '融安县',
    450225: '融水苗族自治县',
    450226: '三江侗族自治县',
    450302: '秀峰区',
    450303: '叠彩区',
    450304: '象山区',
    450305: '七星区',
    450311: '雁山区',
    450312: '临桂区',
    450321: '阳朔县',
    450323: '灵川县',
    450324: '全州县',
    450325: '兴安县',
    450326: '永福县',
    450327: '灌阳县',
    450328: '龙胜各族自治县',
    450329: '资源县',
    450330: '平乐县',
    450332: '恭城瑶族自治县',
    450381: '荔浦市',
    450403: '万秀区',
    450405: '长洲区',
    450406: '龙圩区',
    450421: '苍梧县',
    450422: '藤县',
    450423: '蒙山县',
    450481: '岑溪市',
    450502: '海城区',
    450503: '银海区',
    450512: '铁山港区',
    450521: '合浦县',
    450602: '港口区',
    450603: '防城区',
    450621: '上思县',
    450681: '东兴市',
    450702: '钦南区',
    450703: '钦北区',
    450721: '灵山县',
    450722: '浦北县',
    450802: '港北区',
    450803: '港南区',
    450804: '覃塘区',
    450821: '平南县',
    450881: '桂平市',
    450902: '玉州区',
    450903: '福绵区',
    450921: '容县',
    450922: '陆川县',
    450923: '博白县',
    450924: '兴业县',
    450981: '北流市',
    451002: '右江区',
    451021: '田阳县',
    451022: '田东县',
    451023: '平果县',
    451024: '德保县',
    451026: '那坡县',
    451027: '凌云县',
    451028: '乐业县',
    451029: '田林县',
    451030: '西林县',
    451031: '隆林各族自治县',
    451081: '靖西市',
    451102: '八步区',
    451103: '平桂区',
    451121: '昭平县',
    451122: '钟山县',
    451123: '富川瑶族自治县',
    451202: '金城江区',
    451203: '宜州区',
    451221: '南丹县',
    451222: '天峨县',
    451223: '凤山县',
    451224: '东兰县',
    451225: '罗城仫佬族自治县',
    451226: '环江毛南族自治县',
    451227: '巴马瑶族自治县',
    451228: '都安瑶族自治县',
    451229: '大化瑶族自治县',
    451302: '兴宾区',
    451321: '忻城县',
    451322: '象州县',
    451323: '武宣县',
    451324: '金秀瑶族自治县',
    451381: '合山市',
    451402: '江州区',
    451421: '扶绥县',
    451422: '宁明县',
    451423: '龙州县',
    451424: '大新县',
    451425: '天等县',
    451481: '凭祥市',
    460105: '秀英区',
    460106: '龙华区',
    460107: '琼山区',
    460108: '美兰区',
    460202: '海棠区',
    460203: '吉阳区',
    460204: '天涯区',
    460205: '崖州区',
    460321: '西沙群岛',
    460322: '南沙群岛',
    460323: '中沙群岛的岛礁及其海域',
    460401: '那大镇',
    460402: '和庆镇',
    460403: '南丰镇',
    460404: '大成镇',
    460405: '雅星镇',
    460406: '兰洋镇',
    460407: '光村镇',
    460408: '木棠镇',
    460409: '海头镇',
    460410: '峨蔓镇',
    460411: '王五镇',
    460412: '白马井镇',
    460413: '中和镇',
    460414: '排浦镇',
    460415: '东成镇',
    460416: '新州镇',
    460417: '洋浦经济开发区',
    460418: '华南热作学院',
    469001: '五指山市',
    469002: '琼海市',
    469005: '文昌市',
    469006: '万宁市',
    469007: '东方市',
    469021: '定安县',
    469022: '屯昌县',
    469023: '澄迈县',
    469024: '临高县',
    469025: '白沙黎族自治县',
    469026: '昌江黎族自治县',
    469027: '乐东黎族自治县',
    469028: '陵水黎族自治县',
    469029: '保亭黎族苗族自治县',
    469030: '琼中黎族苗族自治县',
    500101: '万州区',
    500102: '涪陵区',
    500103: '渝中区',
    500104: '大渡口区',
    500105: '江北区',
    500106: '沙坪坝区',
    500107: '九龙坡区',
    500108: '南岸区',
    500109: '北碚区',
    500110: '綦江区',
    500111: '大足区',
    500112: '渝北区',
    500113: '巴南区',
    500114: '黔江区',
    500115: '长寿区',
    500116: '江津区',
    500117: '合川区',
    500118: '永川区',
    500119: '南川区',
    500120: '璧山区',
    500151: '铜梁区',
    500152: '潼南区',
    500153: '荣昌区',
    500154: '开州区',
    500155: '梁平区',
    500156: '武隆区',
    500229: '城口县',
    500230: '丰都县',
    500231: '垫江县',
    500233: '忠县',
    500235: '云阳县',
    500236: '奉节县',
    500237: '巫山县',
    500238: '巫溪县',
    500240: '石柱土家族自治县',
    500241: '秀山土家族苗族自治县',
    500242: '酉阳土家族苗族自治县',
    500243: '彭水苗族土家族自治县',
    510104: '锦江区',
    510105: '青羊区',
    510106: '金牛区',
    510107: '武侯区',
    510108: '成华区',
    510112: '龙泉驿区',
    510113: '青白江区',
    510114: '新都区',
    510115: '温江区',
    510116: '双流区',
    510117: '郫都区',
    510121: '金堂县',
    510129: '大邑县',
    510131: '蒲江县',
    510132: '新津县',
    510181: '都江堰市',
    510182: '彭州市',
    510183: '邛崃市',
    510184: '崇州市',
    510185: '简阳市',
    510191: '高新区',
    510302: '自流井区',
    510303: '贡井区',
    510304: '大安区',
    510311: '沿滩区',
    510321: '荣县',
    510322: '富顺县',
    510402: '东区',
    510403: '西区',
    510411: '仁和区',
    510421: '米易县',
    510422: '盐边县',
    510502: '江阳区',
    510503: '纳溪区',
    510504: '龙马潭区',
    510521: '泸县',
    510522: '合江县',
    510524: '叙永县',
    510525: '古蔺县',
    510603: '旌阳区',
    510604: '罗江区',
    510623: '中江县',
    510681: '广汉市',
    510682: '什邡市',
    510683: '绵竹市',
    510703: '涪城区',
    510704: '游仙区',
    510705: '安州区',
    510722: '三台县',
    510723: '盐亭县',
    510725: '梓潼县',
    510726: '北川羌族自治县',
    510727: '平武县',
    510781: '江油市',
    510791: '高新区',
    510802: '利州区',
    510811: '昭化区',
    510812: '朝天区',
    510821: '旺苍县',
    510822: '青川县',
    510823: '剑阁县',
    510824: '苍溪县',
    510903: '船山区',
    510904: '安居区',
    510921: '蓬溪县',
    510922: '射洪县',
    510923: '大英县',
    511002: '市中区',
    511011: '东兴区',
    511024: '威远县',
    511025: '资中县',
    511083: '隆昌市',
    511102: '市中区',
    511111: '沙湾区',
    511112: '五通桥区',
    511113: '金口河区',
    511123: '犍为县',
    511124: '井研县',
    511126: '夹江县',
    511129: '沐川县',
    511132: '峨边彝族自治县',
    511133: '马边彝族自治县',
    511181: '峨眉山市',
    511302: '顺庆区',
    511303: '高坪区',
    511304: '嘉陵区',
    511321: '南部县',
    511322: '营山县',
    511323: '蓬安县',
    511324: '仪陇县',
    511325: '西充县',
    511381: '阆中市',
    511402: '东坡区',
    511403: '彭山区',
    511421: '仁寿县',
    511423: '洪雅县',
    511424: '丹棱县',
    511425: '青神县',
    511502: '翠屏区',
    511503: '南溪区',
    511504: '叙州区',
    511523: '江安县',
    511524: '长宁县',
    511525: '高县',
    511526: '珙县',
    511527: '筠连县',
    511528: '兴文县',
    511529: '屏山县',
    511602: '广安区',
    511603: '前锋区',
    511621: '岳池县',
    511622: '武胜县',
    511623: '邻水县',
    511681: '华蓥市',
    511702: '通川区',
    511703: '达川区',
    511722: '宣汉县',
    511723: '开江县',
    511724: '大竹县',
    511725: '渠县',
    511781: '万源市',
    511802: '雨城区',
    511803: '名山区',
    511822: '荥经县',
    511823: '汉源县',
    511824: '石棉县',
    511825: '天全县',
    511826: '芦山县',
    511827: '宝兴县',
    511902: '巴州区',
    511903: '恩阳区',
    511921: '通江县',
    511922: '南江县',
    511923: '平昌县',
    512002: '雁江区',
    512021: '安岳县',
    512022: '乐至县',
    513201: '马尔康市',
    513221: '汶川县',
    513222: '理县',
    513223: '茂县',
    513224: '松潘县',
    513225: '九寨沟县',
    513226: '金川县',
    513227: '小金县',
    513228: '黑水县',
    513230: '壤塘县',
    513231: '阿坝县',
    513232: '若尔盖县',
    513233: '红原县',
    513301: '康定市',
    513322: '泸定县',
    513323: '丹巴县',
    513324: '九龙县',
    513325: '雅江县',
    513326: '道孚县',
    513327: '炉霍县',
    513328: '甘孜县',
    513329: '新龙县',
    513330: '德格县',
    513331: '白玉县',
    513332: '石渠县',
    513333: '色达县',
    513334: '理塘县',
    513335: '巴塘县',
    513336: '乡城县',
    513337: '稻城县',
    513338: '得荣县',
    513401: '西昌市',
    513422: '木里藏族自治县',
    513423: '盐源县',
    513424: '德昌县',
    513425: '会理县',
    513426: '会东县',
    513427: '宁南县',
    513428: '普格县',
    513429: '布拖县',
    513430: '金阳县',
    513431: '昭觉县',
    513432: '喜德县',
    513433: '冕宁县',
    513434: '越西县',
    513435: '甘洛县',
    513436: '美姑县',
    513437: '雷波县',
    520102: '南明区',
    520103: '云岩区',
    520111: '花溪区',
    520112: '乌当区',
    520113: '白云区',
    520115: '观山湖区',
    520121: '开阳县',
    520122: '息烽县',
    520123: '修文县',
    520181: '清镇市',
    520201: '钟山区',
    520203: '六枝特区',
    520221: '水城县',
    520281: '盘州市',
    520302: '红花岗区',
    520303: '汇川区',
    520304: '播州区',
    520322: '桐梓县',
    520323: '绥阳县',
    520324: '正安县',
    520325: '道真仡佬族苗族自治县',
    520326: '务川仡佬族苗族自治县',
    520327: '凤冈县',
    520328: '湄潭县',
    520329: '余庆县',
    520330: '习水县',
    520381: '赤水市',
    520382: '仁怀市',
    520402: '西秀区',
    520403: '平坝区',
    520422: '普定县',
    520423: '镇宁布依族苗族自治县',
    520424: '关岭布依族苗族自治县',
    520425: '紫云苗族布依族自治县',
    520502: '七星关区',
    520521: '大方县',
    520522: '黔西县',
    520523: '金沙县',
    520524: '织金县',
    520525: '纳雍县',
    520526: '威宁彝族回族苗族自治县',
    520527: '赫章县',
    520602: '碧江区',
    520603: '万山区',
    520621: '江口县',
    520622: '玉屏侗族自治县',
    520623: '石阡县',
    520624: '思南县',
    520625: '印江土家族苗族自治县',
    520626: '德江县',
    520627: '沿河土家族自治县',
    520628: '松桃苗族自治县',
    522301: '兴义市',
    522302: '兴仁市',
    522323: '普安县',
    522324: '晴隆县',
    522325: '贞丰县',
    522326: '望谟县',
    522327: '册亨县',
    522328: '安龙县',
    522601: '凯里市',
    522622: '黄平县',
    522623: '施秉县',
    522624: '三穗县',
    522625: '镇远县',
    522626: '岑巩县',
    522627: '天柱县',
    522628: '锦屏县',
    522629: '剑河县',
    522630: '台江县',
    522631: '黎平县',
    522632: '榕江县',
    522633: '从江县',
    522634: '雷山县',
    522635: '麻江县',
    522636: '丹寨县',
    522701: '都匀市',
    522702: '福泉市',
    522722: '荔波县',
    522723: '贵定县',
    522725: '瓮安县',
    522726: '独山县',
    522727: '平塘县',
    522728: '罗甸县',
    522729: '长顺县',
    522730: '龙里县',
    522731: '惠水县',
    522732: '三都水族自治县',
    530102: '五华区',
    530103: '盘龙区',
    530111: '官渡区',
    530112: '西山区',
    530113: '东川区',
    530114: '呈贡区',
    530115: '晋宁区',
    530124: '富民县',
    530125: '宜良县',
    530126: '石林彝族自治县',
    530127: '嵩明县',
    530128: '禄劝彝族苗族自治县',
    530129: '寻甸回族彝族自治县',
    530181: '安宁市',
    530302: '麒麟区',
    530303: '沾益区',
    530304: '马龙区',
    530322: '陆良县',
    530323: '师宗县',
    530324: '罗平县',
    530325: '富源县',
    530326: '会泽县',
    530381: '宣威市',
    530402: '红塔区',
    530403: '江川区',
    530422: '澄江县',
    530423: '通海县',
    530424: '华宁县',
    530425: '易门县',
    530426: '峨山彝族自治县',
    530427: '新平彝族傣族自治县',
    530428: '元江哈尼族彝族傣族自治县',
    530502: '隆阳区',
    530521: '施甸县',
    530523: '龙陵县',
    530524: '昌宁县',
    530581: '腾冲市',
    530602: '昭阳区',
    530621: '鲁甸县',
    530622: '巧家县',
    530623: '盐津县',
    530624: '大关县',
    530625: '永善县',
    530626: '绥江县',
    530627: '镇雄县',
    530628: '彝良县',
    530629: '威信县',
    530681: '水富市',
    530702: '古城区',
    530721: '玉龙纳西族自治县',
    530722: '永胜县',
    530723: '华坪县',
    530724: '宁蒗彝族自治县',
    530802: '思茅区',
    530821: '宁洱哈尼族彝族自治县',
    530822: '墨江哈尼族自治县',
    530823: '景东彝族自治县',
    530824: '景谷傣族彝族自治县',
    530825: '镇沅彝族哈尼族拉祜族自治县',
    530826: '江城哈尼族彝族自治县',
    530827: '孟连傣族拉祜族佤族自治县',
    530828: '澜沧拉祜族自治县',
    530829: '西盟佤族自治县',
    530902: '临翔区',
    530921: '凤庆县',
    530922: '云县',
    530923: '永德县',
    530924: '镇康县',
    530925: '双江拉祜族佤族布朗族傣族自治县',
    530926: '耿马傣族佤族自治县',
    530927: '沧源佤族自治县',
    532301: '楚雄市',
    532322: '双柏县',
    532323: '牟定县',
    532324: '南华县',
    532325: '姚安县',
    532326: '大姚县',
    532327: '永仁县',
    532328: '元谋县',
    532329: '武定县',
    532331: '禄丰县',
    532501: '个旧市',
    532502: '开远市',
    532503: '蒙自市',
    532504: '弥勒市',
    532523: '屏边苗族自治县',
    532524: '建水县',
    532525: '石屏县',
    532527: '泸西县',
    532528: '元阳县',
    532529: '红河县',
    532530: '金平苗族瑶族傣族自治县',
    532531: '绿春县',
    532532: '河口瑶族自治县',
    532601: '文山市',
    532622: '砚山县',
    532623: '西畴县',
    532624: '麻栗坡县',
    532625: '马关县',
    532626: '丘北县',
    532627: '广南县',
    532628: '富宁县',
    532801: '景洪市',
    532822: '勐海县',
    532823: '勐腊县',
    532901: '大理市',
    532922: '漾濞彝族自治县',
    532923: '祥云县',
    532924: '宾川县',
    532925: '弥渡县',
    532926: '南涧彝族自治县',
    532927: '巍山彝族回族自治县',
    532928: '永平县',
    532929: '云龙县',
    532930: '洱源县',
    532931: '剑川县',
    532932: '鹤庆县',
    533102: '瑞丽市',
    533103: '芒市',
    533122: '梁河县',
    533123: '盈江县',
    533124: '陇川县',
    533301: '泸水市',
    533323: '福贡县',
    533324: '贡山独龙族怒族自治县',
    533325: '兰坪白族普米族自治县',
    533401: '香格里拉市',
    533422: '德钦县',
    533423: '维西傈僳族自治县',
    540102: '城关区',
    540103: '堆龙德庆区',
    540104: '达孜区',
    540121: '林周县',
    540122: '当雄县',
    540123: '尼木县',
    540124: '曲水县',
    540127: '墨竹工卡县',
    540202: '桑珠孜区',
    540221: '南木林县',
    540222: '江孜县',
    540223: '定日县',
    540224: '萨迦县',
    540225: '拉孜县',
    540226: '昂仁县',
    540227: '谢通门县',
    540228: '白朗县',
    540229: '仁布县',
    540230: '康马县',
    540231: '定结县',
    540232: '仲巴县',
    540233: '亚东县',
    540234: '吉隆县',
    540235: '聂拉木县',
    540236: '萨嘎县',
    540237: '岗巴县',
    540302: '卡若区',
    540321: '江达县',
    540322: '贡觉县',
    540323: '类乌齐县',
    540324: '丁青县',
    540325: '察雅县',
    540326: '八宿县',
    540327: '左贡县',
    540328: '芒康县',
    540329: '洛隆县',
    540330: '边坝县',
    540402: '巴宜区',
    540421: '工布江达县',
    540422: '米林县',
    540423: '墨脱县',
    540424: '波密县',
    540425: '察隅县',
    540426: '朗县',
    540502: '乃东区',
    540521: '扎囊县',
    540522: '贡嘎县',
    540523: '桑日县',
    540524: '琼结县',
    540525: '曲松县',
    540526: '措美县',
    540527: '洛扎县',
    540528: '加查县',
    540529: '隆子县',
    540530: '错那县',
    540531: '浪卡子县',
    540602: '色尼区',
    540621: '嘉黎县',
    540622: '比如县',
    540623: '聂荣县',
    540624: '安多县',
    540625: '申扎县',
    540626: '索县',
    540627: '班戈县',
    540628: '巴青县',
    540629: '尼玛县',
    540630: '双湖县',
    542521: '普兰县',
    542522: '札达县',
    542523: '噶尔县',
    542524: '日土县',
    542525: '革吉县',
    542526: '改则县',
    542527: '措勤县',
    610102: '新城区',
    610103: '碑林区',
    610104: '莲湖区',
    610111: '灞桥区',
    610112: '未央区',
    610113: '雁塔区',
    610114: '阎良区',
    610115: '临潼区',
    610116: '长安区',
    610117: '高陵区',
    610118: '鄠邑区',
    610122: '蓝田县',
    610124: '周至县',
    610202: '王益区',
    610203: '印台区',
    610204: '耀州区',
    610222: '宜君县',
    610302: '渭滨区',
    610303: '金台区',
    610304: '陈仓区',
    610322: '凤翔县',
    610323: '岐山县',
    610324: '扶风县',
    610326: '眉县',
    610327: '陇县',
    610328: '千阳县',
    610329: '麟游县',
    610330: '凤县',
    610331: '太白县',
    610402: '秦都区',
    610403: '杨陵区',
    610404: '渭城区',
    610422: '三原县',
    610423: '泾阳县',
    610424: '乾县',
    610425: '礼泉县',
    610426: '永寿县',
    610428: '长武县',
    610429: '旬邑县',
    610430: '淳化县',
    610431: '武功县',
    610481: '兴平市',
    610482: '彬州市',
    610502: '临渭区',
    610503: '华州区',
    610522: '潼关县',
    610523: '大荔县',
    610524: '合阳县',
    610525: '澄城县',
    610526: '蒲城县',
    610527: '白水县',
    610528: '富平县',
    610581: '韩城市',
    610582: '华阴市',
    610602: '宝塔区',
    610603: '安塞区',
    610621: '延长县',
    610622: '延川县',
    610623: '子长县',
    610625: '志丹县',
    610626: '吴起县',
    610627: '甘泉县',
    610628: '富县',
    610629: '洛川县',
    610630: '宜川县',
    610631: '黄龙县',
    610632: '黄陵县',
    610702: '汉台区',
    610703: '南郑区',
    610722: '城固县',
    610723: '洋县',
    610724: '西乡县',
    610725: '勉县',
    610726: '宁强县',
    610727: '略阳县',
    610728: '镇巴县',
    610729: '留坝县',
    610730: '佛坪县',
    610802: '榆阳区',
    610803: '横山区',
    610822: '府谷县',
    610824: '靖边县',
    610825: '定边县',
    610826: '绥德县',
    610827: '米脂县',
    610828: '佳县',
    610829: '吴堡县',
    610830: '清涧县',
    610831: '子洲县',
    610881: '神木市',
    610902: '汉滨区',
    610921: '汉阴县',
    610922: '石泉县',
    610923: '宁陕县',
    610924: '紫阳县',
    610925: '岚皋县',
    610926: '平利县',
    610927: '镇坪县',
    610928: '旬阳县',
    610929: '白河县',
    611002: '商州区',
    611021: '洛南县',
    611022: '丹凤县',
    611023: '商南县',
    611024: '山阳县',
    611025: '镇安县',
    611026: '柞水县',
    620102: '城关区',
    620103: '七里河区',
    620104: '西固区',
    620105: '安宁区',
    620111: '红古区',
    620121: '永登县',
    620122: '皋兰县',
    620123: '榆中县',
    620201: '市辖区',
    620290: '雄关区',
    620291: '长城区',
    620292: '镜铁区',
    620293: '新城镇',
    620294: '峪泉镇',
    620295: '文殊镇',
    620302: '金川区',
    620321: '永昌县',
    620402: '白银区',
    620403: '平川区',
    620421: '靖远县',
    620422: '会宁县',
    620423: '景泰县',
    620502: '秦州区',
    620503: '麦积区',
    620521: '清水县',
    620522: '秦安县',
    620523: '甘谷县',
    620524: '武山县',
    620525: '张家川回族自治县',
    620602: '凉州区',
    620621: '民勤县',
    620622: '古浪县',
    620623: '天祝藏族自治县',
    620702: '甘州区',
    620721: '肃南裕固族自治县',
    620722: '民乐县',
    620723: '临泽县',
    620724: '高台县',
    620725: '山丹县',
    620802: '崆峒区',
    620821: '泾川县',
    620822: '灵台县',
    620823: '崇信县',
    620825: '庄浪县',
    620826: '静宁县',
    620881: '华亭市',
    620902: '肃州区',
    620921: '金塔县',
    620922: '瓜州县',
    620923: '肃北蒙古族自治县',
    620924: '阿克塞哈萨克族自治县',
    620981: '玉门市',
    620982: '敦煌市',
    621002: '西峰区',
    621021: '庆城县',
    621022: '环县',
    621023: '华池县',
    621024: '合水县',
    621025: '正宁县',
    621026: '宁县',
    621027: '镇原县',
    621102: '安定区',
    621121: '通渭县',
    621122: '陇西县',
    621123: '渭源县',
    621124: '临洮县',
    621125: '漳县',
    621126: '岷县',
    621202: '武都区',
    621221: '成县',
    621222: '文县',
    621223: '宕昌县',
    621224: '康县',
    621225: '西和县',
    621226: '礼县',
    621227: '徽县',
    621228: '两当县',
    622901: '临夏市',
    622921: '临夏县',
    622922: '康乐县',
    622923: '永靖县',
    622924: '广河县',
    622925: '和政县',
    622926: '东乡族自治县',
    622927: '积石山保安族东乡族撒拉族自治县',
    623001: '合作市',
    623021: '临潭县',
    623022: '卓尼县',
    623023: '舟曲县',
    623024: '迭部县',
    623025: '玛曲县',
    623026: '碌曲县',
    623027: '夏河县',
    630102: '城东区',
    630103: '城中区',
    630104: '城西区',
    630105: '城北区',
    630121: '大通回族土族自治县',
    630122: '湟中县',
    630123: '湟源县',
    630202: '乐都区',
    630203: '平安区',
    630222: '民和回族土族自治县',
    630223: '互助土族自治县',
    630224: '化隆回族自治县',
    630225: '循化撒拉族自治县',
    632221: '门源回族自治县',
    632222: '祁连县',
    632223: '海晏县',
    632224: '刚察县',
    632321: '同仁县',
    632322: '尖扎县',
    632323: '泽库县',
    632324: '河南蒙古族自治县',
    632521: '共和县',
    632522: '同德县',
    632523: '贵德县',
    632524: '兴海县',
    632525: '贵南县',
    632621: '玛沁县',
    632622: '班玛县',
    632623: '甘德县',
    632624: '达日县',
    632625: '久治县',
    632626: '玛多县',
    632701: '玉树市',
    632722: '杂多县',
    632723: '称多县',
    632724: '治多县',
    632725: '囊谦县',
    632726: '曲麻莱县',
    632801: '格尔木市',
    632802: '德令哈市',
    632803: '茫崖市',
    632821: '乌兰县',
    632822: '都兰县',
    632823: '天峻县',
    640104: '兴庆区',
    640105: '西夏区',
    640106: '金凤区',
    640121: '永宁县',
    640122: '贺兰县',
    640181: '灵武市',
    640202: '大武口区',
    640205: '惠农区',
    640221: '平罗县',
    640302: '利通区',
    640303: '红寺堡区',
    640323: '盐池县',
    640324: '同心县',
    640381: '青铜峡市',
    640402: '原州区',
    640422: '西吉县',
    640423: '隆德县',
    640424: '泾源县',
    640425: '彭阳县',
    640502: '沙坡头区',
    640521: '中宁县',
    640522: '海原县',
    650102: '天山区',
    650103: '沙依巴克区',
    650104: '新市区',
    650105: '水磨沟区',
    650106: '头屯河区',
    650107: '达坂城区',
    650109: '米东区',
    650121: '乌鲁木齐县',
    650202: '独山子区',
    650203: '克拉玛依区',
    650204: '白碱滩区',
    650205: '乌尔禾区',
    650402: '高昌区',
    650421: '鄯善县',
    650422: '托克逊县',
    650502: '伊州区',
    650521: '巴里坤哈萨克自治县',
    650522: '伊吾县',
    652301: '昌吉市',
    652302: '阜康市',
    652323: '呼图壁县',
    652324: '玛纳斯县',
    652325: '奇台县',
    652327: '吉木萨尔县',
    652328: '木垒哈萨克自治县',
    652701: '博乐市',
    652702: '阿拉山口市',
    652722: '精河县',
    652723: '温泉县',
    652801: '库尔勒市',
    652822: '轮台县',
    652823: '尉犁县',
    652824: '若羌县',
    652825: '且末县',
    652826: '焉耆回族自治县',
    652827: '和静县',
    652828: '和硕县',
    652829: '博湖县',
    652901: '阿克苏市',
    652922: '温宿县',
    652923: '库车县',
    652924: '沙雅县',
    652925: '新和县',
    652926: '拜城县',
    652927: '乌什县',
    652928: '阿瓦提县',
    652929: '柯坪县',
    653001: '阿图什市',
    653022: '阿克陶县',
    653023: '阿合奇县',
    653024: '乌恰县',
    653101: '喀什市',
    653121: '疏附县',
    653122: '疏勒县',
    653123: '英吉沙县',
    653124: '泽普县',
    653125: '莎车县',
    653126: '叶城县',
    653127: '麦盖提县',
    653128: '岳普湖县',
    653129: '伽师县',
    653130: '巴楚县',
    653131: '塔什库尔干塔吉克自治县',
    653201: '和田市',
    653221: '和田县',
    653222: '墨玉县',
    653223: '皮山县',
    653224: '洛浦县',
    653225: '策勒县',
    653226: '于田县',
    653227: '民丰县',
    654002: '伊宁市',
    654003: '奎屯市',
    654004: '霍尔果斯市',
    654021: '伊宁县',
    654022: '察布查尔锡伯自治县',
    654023: '霍城县',
    654024: '巩留县',
    654025: '新源县',
    654026: '昭苏县',
    654027: '特克斯县',
    654028: '尼勒克县',
    654201: '塔城市',
    654202: '乌苏市',
    654221: '额敏县',
    654223: '沙湾县',
    654224: '托里县',
    654225: '裕民县',
    654226: '和布克赛尔蒙古自治县',
    654301: '阿勒泰市',
    654321: '布尔津县',
    654322: '富蕴县',
    654323: '福海县',
    654324: '哈巴河县',
    654325: '青河县',
    654326: '吉木乃县',
    659001: '石河子市',
    659002: '阿拉尔市',
    659003: '图木舒克市',
    659004: '五家渠市',
    659005: '北屯市',
    659006: '铁门关市',
    659007: '双河市',
    659008: '可克达拉市',
    659009: '昆玉市',
    710101: '中正区',
    710102: '大同区',
    710103: '中山区',
    710104: '松山区',
    710105: '大安区',
    710106: '万华区',
    710107: '信义区',
    710108: '士林区',
    710109: '北投区',
    710110: '内湖区',
    710111: '南港区',
    710112: '文山区',
    710199: '其它区',
    710201: '新兴区',
    710202: '前金区',
    710203: '芩雅区',
    710204: '盐埕区',
    710205: '鼓山区',
    710206: '旗津区',
    710207: '前镇区',
    710208: '三民区',
    710209: '左营区',
    710210: '楠梓区',
    710211: '小港区',
    710241: '苓雅区',
    710242: '仁武区',
    710243: '大社区',
    710244: '冈山区',
    710245: '路竹区',
    710246: '阿莲区',
    710247: '田寮区',
    710248: '燕巢区',
    710249: '桥头区',
    710250: '梓官区',
    710251: '弥陀区',
    710252: '永安区',
    710253: '湖内区',
    710254: '凤山区',
    710255: '大寮区',
    710256: '林园区',
    710257: '鸟松区',
    710258: '大树区',
    710259: '旗山区',
    710260: '美浓区',
    710261: '六龟区',
    710262: '内门区',
    710263: '杉林区',
    710264: '甲仙区',
    710265: '桃源区',
    710266: '那玛夏区',
    710267: '茂林区',
    710268: '茄萣区',
    710299: '其它区',
    710301: '中西区',
    710302: '东区',
    710303: '南区',
    710304: '北区',
    710305: '安平区',
    710306: '安南区',
    710339: '永康区',
    710340: '归仁区',
    710341: '新化区',
    710342: '左镇区',
    710343: '玉井区',
    710344: '楠西区',
    710345: '南化区',
    710346: '仁德区',
    710347: '关庙区',
    710348: '龙崎区',
    710349: '官田区',
    710350: '麻豆区',
    710351: '佳里区',
    710352: '西港区',
    710353: '七股区',
    710354: '将军区',
    710355: '学甲区',
    710356: '北门区',
    710357: '新营区',
    710358: '后壁区',
    710359: '白河区',
    710360: '东山区',
    710361: '六甲区',
    710362: '下营区',
    710363: '柳营区',
    710364: '盐水区',
    710365: '善化区',
    710366: '大内区',
    710367: '山上区',
    710368: '新市区',
    710369: '安定区',
    710399: '其它区',
    710401: '中区',
    710402: '东区',
    710403: '南区',
    710404: '西区',
    710405: '北区',
    710406: '北屯区',
    710407: '西屯区',
    710408: '南屯区',
    710431: '太平区',
    710432: '大里区',
    710433: '雾峰区',
    710434: '乌日区',
    710435: '丰原区',
    710436: '后里区',
    710437: '石冈区',
    710438: '东势区',
    710439: '和平区',
    710440: '新社区',
    710441: '潭子区',
    710442: '大雅区',
    710443: '神冈区',
    710444: '大肚区',
    710445: '沙鹿区',
    710446: '龙井区',
    710447: '梧栖区',
    710448: '清水区',
    710449: '大甲区',
    710450: '外埔区',
    710451: '大安区',
    710499: '其它区',
    710507: '金沙镇',
    710508: '金湖镇',
    710509: '金宁乡',
    710510: '金城镇',
    710511: '烈屿乡',
    710512: '乌坵乡',
    710614: '南投市',
    710615: '中寮乡',
    710616: '草屯镇',
    710617: '国姓乡',
    710618: '埔里镇',
    710619: '仁爱乡',
    710620: '名间乡',
    710621: '集集镇',
    710622: '水里乡',
    710623: '鱼池乡',
    710624: '信义乡',
    710625: '竹山镇',
    710626: '鹿谷乡',
    710701: '仁爱区',
    710702: '信义区',
    710703: '中正区',
    710704: '中山区',
    710705: '安乐区',
    710706: '暖暖区',
    710707: '七堵区',
    710799: '其它区',
    710801: '东区',
    710802: '北区',
    710803: '香山区',
    710899: '其它区',
    710901: '东区',
    710902: '西区',
    710999: '其它区',
    711130: '万里区',
    711132: '板桥区',
    711133: '汐止区',
    711134: '深坑区',
    711135: '石碇区',
    711136: '瑞芳区',
    711137: '平溪区',
    711138: '双溪区',
    711139: '贡寮区',
    711140: '新店区',
    711141: '坪林区',
    711142: '乌来区',
    711143: '永和区',
    711144: '中和区',
    711145: '土城区',
    711146: '三峡区',
    711147: '树林区',
    711148: '莺歌区',
    711149: '三重区',
    711150: '新庄区',
    711151: '泰山区',
    711152: '林口区',
    711153: '芦洲区',
    711154: '五股区',
    711155: '八里区',
    711156: '淡水区',
    711157: '三芝区',
    711158: '石门区',
    711287: '宜兰市',
    711288: '头城镇',
    711289: '礁溪乡',
    711290: '壮围乡',
    711291: '员山乡',
    711292: '罗东镇',
    711293: '三星乡',
    711294: '大同乡',
    711295: '五结乡',
    711296: '冬山乡',
    711297: '苏澳镇',
    711298: '南澳乡',
    711299: '钓鱼台',
    711387: '竹北市',
    711388: '湖口乡',
    711389: '新丰乡',
    711390: '新埔镇',
    711391: '关西镇',
    711392: '芎林乡',
    711393: '宝山乡',
    711394: '竹东镇',
    711395: '五峰乡',
    711396: '横山乡',
    711397: '尖石乡',
    711398: '北埔乡',
    711399: '峨眉乡',
    711414: '中坜区',
    711415: '平镇区',
    711417: '杨梅区',
    711418: '新屋区',
    711419: '观音区',
    711420: '桃园区',
    711421: '龟山区',
    711422: '八德区',
    711423: '大溪区',
    711425: '大园区',
    711426: '芦竹区',
    711487: '中坜市',
    711488: '平镇市',
    711489: '龙潭乡',
    711490: '杨梅市',
    711491: '新屋乡',
    711492: '观音乡',
    711493: '桃园市',
    711494: '龟山乡',
    711495: '八德市',
    711496: '大溪镇',
    711497: '复兴乡',
    711498: '大园乡',
    711499: '芦竹乡',
    711520: '头份市',
    711582: '竹南镇',
    711583: '头份镇',
    711584: '三湾乡',
    711585: '南庄乡',
    711586: '狮潭乡',
    711587: '后龙镇',
    711588: '通霄镇',
    711589: '苑里镇',
    711590: '苗栗市',
    711591: '造桥乡',
    711592: '头屋乡',
    711593: '公馆乡',
    711594: '大湖乡',
    711595: '泰安乡',
    711596: '铜锣乡',
    711597: '三义乡',
    711598: '西湖乡',
    711599: '卓兰镇',
    711736: '员林市',
    711774: '彰化市',
    711775: '芬园乡',
    711776: '花坛乡',
    711777: '秀水乡',
    711778: '鹿港镇',
    711779: '福兴乡',
    711780: '线西乡',
    711781: '和美镇',
    711782: '伸港乡',
    711783: '员林镇',
    711784: '社头乡',
    711785: '永靖乡',
    711786: '埔心乡',
    711787: '溪湖镇',
    711788: '大村乡',
    711789: '埔盐乡',
    711790: '田中镇',
    711791: '北斗镇',
    711792: '田尾乡',
    711793: '埤头乡',
    711794: '溪州乡',
    711795: '竹塘乡',
    711796: '二林镇',
    711797: '大城乡',
    711798: '芳苑乡',
    711799: '二水乡',
    711982: '番路乡',
    711983: '梅山乡',
    711984: '竹崎乡',
    711985: '阿里山乡',
    711986: '中埔乡',
    711987: '大埔乡',
    711988: '水上乡',
    711989: '鹿草乡',
    711990: '太保市',
    711991: '朴子市',
    711992: '东石乡',
    711993: '六脚乡',
    711994: '新港乡',
    711995: '民雄乡',
    711996: '大林镇',
    711997: '溪口乡',
    711998: '义竹乡',
    711999: '布袋镇',
    712180: '斗南镇',
    712181: '大埤乡',
    712182: '虎尾镇',
    712183: '土库镇',
    712184: '褒忠乡',
    712185: '东势乡',
    712186: '台西乡',
    712187: '仑背乡',
    712188: '麦寮乡',
    712189: '斗六市',
    712190: '林内乡',
    712191: '古坑乡',
    712192: '莿桐乡',
    712193: '西螺镇',
    712194: '二仑乡',
    712195: '北港镇',
    712196: '水林乡',
    712197: '口湖乡',
    712198: '四湖乡',
    712199: '元长乡',
    712451: '崁顶乡',
    712467: '屏东市',
    712468: '三地门乡',
    712469: '雾台乡',
    712470: '玛家乡',
    712471: '九如乡',
    712472: '里港乡',
    712473: '高树乡',
    712474: '盐埔乡',
    712475: '长治乡',
    712476: '麟洛乡',
    712477: '竹田乡',
    712478: '内埔乡',
    712479: '万丹乡',
    712480: '潮州镇',
    712481: '泰武乡',
    712482: '来义乡',
    712483: '万峦乡',
    712484: '莰顶乡',
    712485: '新埤乡',
    712486: '南州乡',
    712487: '林边乡',
    712488: '东港镇',
    712489: '琉球乡',
    712490: '佳冬乡',
    712491: '新园乡',
    712492: '枋寮乡',
    712493: '枋山乡',
    712494: '春日乡',
    712495: '狮子乡',
    712496: '车城乡',
    712497: '牡丹乡',
    712498: '恒春镇',
    712499: '满州乡',
    712584: '台东市',
    712585: '绿岛乡',
    712586: '兰屿乡',
    712587: '延平乡',
    712588: '卑南乡',
    712589: '鹿野乡',
    712590: '关山镇',
    712591: '海端乡',
    712592: '池上乡',
    712593: '东河乡',
    712594: '成功镇',
    712595: '长滨乡',
    712596: '金峰乡',
    712597: '大武乡',
    712598: '达仁乡',
    712599: '太麻里乡',
    712686: '花莲市',
    712687: '新城乡',
    712688: '太鲁阁',
    712689: '秀林乡',
    712690: '吉安乡',
    712691: '寿丰乡',
    712692: '凤林镇',
    712693: '光复乡',
    712694: '丰滨乡',
    712695: '瑞穗乡',
    712696: '万荣乡',
    712697: '玉里镇',
    712698: '卓溪乡',
    712699: '富里乡',
    712794: '马公市',
    712795: '西屿乡',
    712796: '望安乡',
    712797: '七美乡',
    712798: '白沙乡',
    712799: '湖西乡',
    712896: '南竿乡',
    712897: '北竿乡',
    712898: '东引乡',
    712899: '莒光乡',
    810101: '中西区',
    810102: '湾仔区',
    810103: '东区',
    810104: '南区',
    810201: '九龙城区',
    810202: '油尖旺区',
    810203: '深水埗区',
    810204: '黄大仙区',
    810205: '观塘区',
    810301: '北区',
    810302: '大埔区',
    810303: '沙田区',
    810304: '西贡区',
    810305: '元朗区',
    810306: '屯门区',
    810307: '荃湾区',
    810308: '葵青区',
    810309: '离岛区',
    820101: '澳门半岛',
    820201: '离岛' },

  env: 'https://www.softcasing.com'
  // env: 'https://wwjwxm.iask.in',
};exports.default = _default;

/***/ }),

/***/ 35:
/*!***********************************************************!*\
  !*** D:/wx_project/wx_question/util/question_change.json ***!
  \***********************************************************/
/*! exports provided: question, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"question\":[{\"title\":\"1、您的孩子是否曾经患过过敏性疾病？（至少2次）【如湿疹、荨麻疹、哮喘、过敏性鼻炎等】\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":0}]},{\"title\":\"2、您的孩子直系亲属【如爸爸、妈妈、姥姥、姥爷、爷爷、奶奶、叔叔、姑姑、姨、舅等】有过敏性疾病么？\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":0}]},{\"title\":\"3、您的孩子体型符合以下哪种情况？【可多选】\",\"isImage\":\"false\",\"more\":\"true\",\"select\":[{\"item\":\"A.体型正常或结实\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":2,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.体型偏矮\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"C.体型偏瘦\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4}]},{\"title\":\"4、您的孩子精力符合以下哪种情况?\",\"isImage\":\"true\",\"imageurl\":\"\",\"select\":[{\"item\":\"A.精力充沛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.容易劳累、没精神\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"5、您的孩子肌肉符合以下哪种情况?(用手捏孩子上臂肌肉感觉暄软，相比身体其他部位仅肚子软)\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.肌肉松软（如四肢、肚子）\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":2,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.仅肚子肥软\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":2,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"6、您的孩子脸色偏黄么?\",\"isImage\":\"true\",\"select\":[{\"item\":\"\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"7、您的孩子口唇颜色符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.口唇颜色偏淡\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.口唇颜色偏红\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"8、您的孩子皮肤干燥或容易瘙痒么?\",\"isImage\":\"true\",\"select\":[{\"item\":\"\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"9、您的孩子舌头符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.舌红\",\"imageurl\":\"https://www.softcasing.com/images/question/E.jpg\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":2,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.舌红苔黄\",\"imageurl\":\"https://www.softcasing.com/images/question/F.jpg\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.舌红苔黄腻\",\"imageurl\":\"https://www.softcasing.com/images/question/G.jpg\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"10、您的孩子鼻子、眼睛符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.下眼睑浮肿\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.起床眼屎多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.揉鼻子、揉眼睛或眨眼\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"11、您的孩子对冷热反应符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.怕冷\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":5,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.怕热\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"12、您的孩子出汗符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.睡觉出汗多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.出汗黏\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"13、您的孩子吃饭符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.饮食均衡、不挑食\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.饭量小\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.吃凉的食物容易出现腹泻、腹痛\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"14、您的孩子睡觉符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.入睡快，睡眠比较安稳\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.上床后需要较长时间才能入睡\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.夜卧睡眠不踏实，来回翻滚\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"15、您的孩子大小便符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.大便不干不稀，能定时排便每日1~2次\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.大便干燥（例如球状、粗条状）\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":5,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.大便量多、不成形\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.大便粘便盆，不易冲刷干净\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":5,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.大便味臭\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"16、您的孩子身体状况及常见表现符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.身体健康、很少生病\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"否\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.患病后很快康复\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":3,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.说话声音小\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.口气重\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.手脚心热\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.手脚凉\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.肚子痛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":3,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.干呕\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.身上起湿疹\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"I\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"J.皮肤搔抓后有隆起刮痕\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"J\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":3,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"K.在以下情况下出现打喷嚏、流鼻涕、鼻塞、咳嗽【换季、温度变化、接触花粉或带毛的小动物、装修等可能存在过敏原的地方\",\"imageurl\":\"\",\"focus\":\"K\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"L.接触或食用某过敏原后易起荨麻疹或皮肤痒\",\"imageurl\":\"\",\"focus\":\"L\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"M.不喜欢潮湿的环境或在潮湿环境下身体有不适表现（如起皮疹、胸闷、哮喘发作等）\",\"imageurl\":\"\",\"focus\":\"M\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"17、您的孩子每年患呼吸道感染（包括感冒、支气管炎、肺炎）的频率?\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.≥6次/每年\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.2~5次/每年\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":2,\"status\":0},{\"item\":\"C.<2次/每年\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":0}]},{\"title\":\"18、您的孩子性格表现符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.喜欢安静、不喜运动\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.性格开朗、爱笑\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":3,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.闷闷不乐、唉声叹气\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.胆子小，不喜欢冒险\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.脾气急躁\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.遇事易紧张\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.敏感，在乎别人的说法及做法\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]}]}");

/***/ }),

/***/ 36:
/*!********************************************************!*\
  !*** D:/wx_project/wx_question/util/question_two.json ***!
  \********************************************************/
/*! exports provided: question, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"question\":[{\"title\":\"1、您的孩子是否曾经患过过敏性疾病？（至少2次）【如湿疹、荨麻疹、哮喘、过敏性鼻炎等】?\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":0}]},{\"title\":\"2、您的孩子直系亲属【如爸爸、妈妈、姥姥、姥爷、爷爷、奶奶、叔叔、姑姑、姨、舅等】有过敏性疾病么?\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":0}]},{\"title\":\"3、您的孩子体型符合以下哪种情况？【可多选】\",\"isImage\":\"false\",\"more\":\"true\",\"select\":[{\"item\":\"A.体型正常或结实\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":2,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.体型偏矮\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"C.体型偏瘦\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"D.体型偏胖\",\"focus\":\"D\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4}]},{\"title\":\"4、您的孩子精力符合以下哪种情况?\",\"isImage\":\"true\",\"imageurl\":\"\",\"select\":[{\"item\":\"A.精力充沛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.精力旺盛，喜动或活动多\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"imageurl\":\"\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.容易劳累、没精神\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":5,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"5、您的孩子肌肉符合以下哪种情况?(用手捏孩子上臂肌肉感觉暄软，相比身体其他部位仅肚子软)\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.肌肉紧实\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.肌肉松软\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":2,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.肚子大、软\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":2,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"6、您的孩子脸色符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.脸色红润有光泽\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.脸色偏黄\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.脸色偏白、没有光泽\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":5},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.脸部油腻\",\"imageurl\":\"\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"7、您的孩子口唇颜色符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.口唇颜色淡红\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":2,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.口唇颜色偏淡\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":5,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":5},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.口唇颜色偏红\",\"imageurl\":\"\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"8、您的孩子皮肤符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.皮肤润泽\",\"imageurl\":\"\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.皮肤干燥或瘙痒\",\"imageurl\":\"\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":4},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"9、您的孩子头发符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.头发细\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":2},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.头发颜色偏黄\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":4},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"10、您的孩子舌头符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.舌淡红苔薄白\",\"imageurl\":\"https://www.softcasing.com/images/question/A.jpg\",\"value\":{\"ph_value\":2,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"focus\":\"A\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.舌淡\",\"imageurl\":\"https://www.softcasing.com/images/question/B.jpg\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":3},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.舌淡胖，苔白滑\",\"imageurl\":\"https://www.softcasing.com/images/question/C.png\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":2,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.舌淡苔白\",\"imageurl\":\"https://www.softcasing.com/images/question/D.jpg\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.舌红\",\"imageurl\":\"https://www.softcasing.com/images/question/E.jpg\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":2,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.舌红苔黄\",\"imageurl\":\"https://www.softcasing.com/images/question/F.jpg\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.舌红苔黄腻\",\"imageurl\":\"https://www.softcasing.com/images/question/G.jpg\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.地图舌或者舌苔少\",\"imageurl\":\"https://www.softcasing.com/images/question/s_h.png\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":5,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.舌胖大，苔腻\",\"imageurl\":\"https://www.softcasing.com/images/question/I.jpg\",\"error\":\"false\",\"focus\":\"I\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"i_iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"11、您的孩子鼻子、眼睛符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.下眼睑浮肿\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.起床眼屎多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.揉鼻子、揉眼睛或眨眼\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"12、您的孩子喝水符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.喜欢喝水（不包括饮料）\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.不喜欢喝水\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"13、您的孩子对冷热反应符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.怕冷\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":5,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.怕热\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"14、您的孩子出汗符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.活动后汗多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.睡觉出汗多\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":2,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.出汗黏\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"15、您的孩子吃饭符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.饮食均衡、不挑食\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.饭量小\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":2,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.吃肉食偏多\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":2,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.吃凉的食物会不舒服\",\"imageurl\":\"\",\"focus\":\"D\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"16、您的孩子睡觉符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.入睡快，睡眠比较安稳\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.睡眠时间充足的情况下，白天也会打哈欠、犯困\",\"focus\":\"B\",\"imageurl\":\"\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":5,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.上床后需要较长时间才能入睡\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.夜卧睡眠不踏实，来回翻滚\",\"imageurl\":\"\",\"focus\":\"D\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E. 睡觉时眼睛微张（有缝隙）\",\"imageurl\":\"\",\"focus\":\"D\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":2,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"17、您的孩子大小便符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.大便不干不稀，能定时排便每日1~2次\",\"imageurl\":\"\",\"focus\":\"A\",\"error\":\"false\",\"value\":{\"ph_value\":5,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.大便干燥（例如球状、粗条状）\",\"imageurl\":\"\",\"focus\":\"B\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":5,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.大便量多、不成形\",\"imageurl\":\"\",\"focus\":\"C\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.大便粘便盆，不易冲刷干净\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":5,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.大便味臭\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.正常饮水量情况下，仍小便黄（6~12岁儿童每天正常饮水量【包括奶类、水果、蔬菜等中的水分】：1500~2000ml，约3~4个矿泉水瓶）\",\"imageurl\":\"\",\"focus\":\"F\",\"error\":\"false\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":3,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.正常饮水量情况下，小便次数多或量多【6~12岁儿童小便正常量600~1400ml/天，小便正常次数4~7次/天】\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"18、您的孩子身体状况及常见表现符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.身体健康、很少生病\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"否\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.患病后很快康复\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":3,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.起口疮、咽痛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.流鼻血（外伤导致除外）\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":3,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.说话声音小\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":2,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.口气重\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.手脚心热\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":3,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.手脚凉\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.肚子痛\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"I\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":3,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"J.干呕\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"J\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"K.头晕\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"K\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":3},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"L.心慌\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"L\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":4},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"M.尿床\",\"imageurl\":\"\",\"focus\":\"M\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":3,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"N.觉得嗓子有痰\",\"imageurl\":\"\",\"focus\":\"N\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":3,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"O.身上起湿疹\",\"imageurl\":\"\",\"focus\":\"O\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"P.皮肤搔抓后有隆起刮痕\",\"imageurl\":\"\",\"focus\":\"P\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":3,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"Q.在以下情况下出现打喷嚏、流鼻涕、鼻塞、咳嗽【换季、温度变化、接触花粉或带毛的小动物、装修等可能存在过敏原的地方】\",\"imageurl\":\"\",\"focus\":\"Q\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":4,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"R.接触或食用某过敏原后易起荨麻疹或皮肤痒\",\"imageurl\":\"\",\"focus\":\"R\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":5,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"S.不喜欢潮湿的环境或在潮湿环境下身体有不适应表现(如起皮疹、胸闷、哮喘发作等)\",\"imageurl\":\"\",\"focus\":\"S\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":4,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]},{\"title\":\"19、您的孩子每年患呼吸道感染（包括感冒、支气管炎、肺炎）的频率?\",\"isImage\":\"false\",\"more\":\"false\",\"select\":[{\"item\":\"A.≥5次/每年\",\"focus\":\"A\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":4},{\"item\":\"B.2~4次/每年\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"data\":2,\"status\":0},{\"item\":\"C.<2次/每年\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":4,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"status\":0,\"data\":0}]},{\"title\":\"20、您的孩子性格表现符合以下哪种情况?\",\"isImage\":\"true\",\"select\":[{\"item\":\"A.喜欢安静、不喜运动\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"A\",\"value\":{\"ph_value\":0,\"qx_value\":4,\"yx_value\":0,\"ya_value\":3,\"ts_value\":3,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"B.性格开朗、爱笑\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"B\",\"value\":{\"ph_value\":3,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"C.闷闷不乐、唉声叹气\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"C\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"D.胆子小，不喜欢冒险\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"D\",\"value\":{\"ph_value\":0,\"qx_value\":3,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"E.脾气急躁\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"E\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":4,\"ya_value\":0,\"ts_value\":0,\"sr_value\":4,\"qy_value\":0,\"tb_value\":0,\"yr_value\":4,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"F.性格温和，脾气好，不易起急\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"F\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":3,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"G.遇事易紧张\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"G\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"H.敏感，在乎别人的说法及做法\",\"imageurl\":\"\",\"error\":\"false\",\"focus\":\"H\",\"value\":{\"ph_value\":0,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":4,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0},{\"item\":\"I.在搬家或换学校后能较快适应环境（包括日常生活、健康状态、心理状态等）\",\"focus\":\"I\",\"imageurl\":\"\",\"value\":{\"ph_value\":4,\"qx_value\":0,\"yx_value\":0,\"ya_value\":0,\"ts_value\":0,\"sr_value\":0,\"qy_value\":0,\"tb_value\":0,\"yr_value\":0,\"xk_value\":0},\"error\":\"false\",\"color\":{\"itemImageBgc\":\"#FCFCFC\",\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\",\"questionImageSelect\":[{\"label\":\"总是\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":4,\"status\":0}},{\"label\":\"经常\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":3,\"status\":0}},{\"label\":\"有时\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":2,\"status\":0}},{\"label\":\"偶尔\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":1,\"status\":0}},{\"label\":\"从不\",\"color\":{\"ftcolor\":\"#B3ABAB\",\"t_iconBgc\":\"#707070\",\"t_borBgc\":\"#D8D8D8\",\"bgc\":\"#FCFCFC\",\"t_innericonBgc\":\"#FFFFFF\",\"value\":0,\"status\":0}}]},\"status\":0}]}]}");

/***/ }),

/***/ 4:
/*!********************************************!*\
  !*** D:/wx_project/wx_question/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 45:
/*!*****************************************************!*\
  !*** D:/wx_project/wx_question/libs/bmap-wx.min.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _classCallCheck(t, a) {if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");}var _createClass = function () {function t(t, a) {for (var e = 0; e < a.length; e++) {var i = a[e];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);}}return function (a, e, i) {return e && t(a.prototype, e), i && t(a, i), a;};}(),BMapWX = function () {function t(a) {_classCallCheck(this, t), this.ak = a.ak;}return _createClass(t, [{ key: "getWXLocation", value: function value(t, a, e, i) {t = t || "gcj02", a = a || function () {}, e = e || function () {}, i = i || function () {}, wx.getLocation({ type: t, success: a, fail: e, complete: i });} }, { key: "search", value: function value(t) {var a = this;t = t || {};var e = { query: t.query || "生活服务$美食&酒店", scope: t.scope || 1, filter: t.filter || "", coord_type: t.coord_type || 2, page_size: t.page_size || 10, page_num: t.page_num || 0, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", radius: t.radius || 2e3, ret_coordtype: "gcj02ll" },i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () {}, fail: t.fail || function () {} },n = function n(t) {e.location = t.latitude + "," + t.longitude, wx.request({ url: "https://api.map.baidu.com/place/v2/search", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {var a = t.data;if (0 === a.status) {var e = a.results,n = {};n.originalData = a, n.wxMarkerData = [];for (var s = 0; s < e.length; s++) {n.wxMarkerData[s] = { id: s, latitude: e[s].location.lat, longitude: e[s].location.lng, title: e[s].name, iconPath: i.iconPath, iconTapPath: i.iconTapPath, address: e[s].address, telephone: e[s].telephone, alpha: i.alpha, width: i.width, height: i.height };}i.success(n);} else i.fail({ errMsg: a.message, statusCode: a.status });}, fail: function fail(t) {i.fail(t);} });},s = function s(t) {i.fail(t);},o = function o(t) {};if (t.location) {var c = t.location.split(",")[1];n({ errMsg: "input location", latitude: t.location.split(",")[0], longitude: c });} else a.getWXLocation("gcj02", n, s, o);} }, { key: "suggestion", value: function value(t) {var a = this;t = t || {};var e = { query: t.query || "", region: t.region || "全国", city_limit: t.city_limit || !1, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", ret_coordtype: "gcj02ll" },i = { success: t.success || function () {}, fail: t.fail || function () {} };wx.request({ url: "https://api.map.baidu.com/place/v2/suggestion", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {var a = t.data;0 === a.status ? i.success(a) : i.fail({ errMsg: a.message, statusCode: a.status });}, fail: function fail(t) {i.fail(t);} });} }, { key: "regeocoding", value: function value(t) {var a = this;t = t || {};var e = { coordtype: t.coordtype || "gcj02ll", ret_coordtype: "gcj02ll", radius: t.radius || 1e3, ak: a.ak, sn: t.sn || "", output: t.output || "json", callback: t.callback || function () {}, extensions_poi: t.extensions_poi || 1, extensions_road: t.extensions_road || !1, extensions_town: t.extensions_town || !1, language: t.language || "zh-CN", language_auto: t.language_auto || 0 },i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () {}, fail: t.fail || function () {} },n = function n(t) {e.location = t.latitude + "," + t.longitude, wx.request({ url: "https://api.map.baidu.com/reverse_geocoding/v3", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(a) {var e = a.data;if (0 === e.status) {var n = e.result,s = {};s.originalData = e, s.wxMarkerData = [], s.wxMarkerData[0] = { id: 0, latitude: t.latitude, longitude: t.longitude, address: n.formatted_address, iconPath: i.iconPath, iconTapPath: i.iconTapPath, desc: n.sematic_description, business: n.business, alpha: i.alpha, width: i.width, height: i.height }, i.success(s);} else i.fail({ errMsg: e.message, statusCode: e.status });}, fail: function fail(t) {i.fail(t);} });},s = function s(t) {i.fail(t);},o = function o(t) {};if (t.location) {var c = t.location.split(",")[1];n({ errMsg: "input location", latitude: t.location.split(",")[0], longitude: c });} else a.getWXLocation("gcj02", n, s, o);} }, { key: "geocoding", value: function value(t) {var a = this;t = t || {};var e = { address: t.address || "", city: t.city || "", ret_coordtype: t.coordtype || "gcj02ll", ak: a.ak, sn: t.sn || "", output: t.output || "json", callback: t.callback || function () {} },i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () {}, fail: t.fail || function () {} };if (t.address) wx.request({ url: "https://api.map.baidu.com/geocoding/v3", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {var a = t.data;if (0 === a.status) {var e = a.result,n = a;n.originalData = a, n.wxMarkerData = [], n.wxMarkerData[0] = { id: 0, latitude: e.location.lat, longitude: e.location.lng, iconPath: i.iconPath, iconTapPath: i.iconTapPath, alpha: i.alpha, width: i.width, height: i.height }, i.success(n);} else i.fail({ errMsg: a.message, statusCode: a.status });}, fail: function fail(t) {i.fail(t);} });else {var n = { errMsg: "input address!" };i.fail(n);}} }, { key: "weather", value: function value(t) {var a = this;t = t || {};var e = { coord_type: t.coord_type || "gcj02", output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "" },i = { success: t.success || function () {}, fail: t.fail || function () {} },n = function n(t) {e.location = t.longitude + "," + t.latitude, wx.request({ url: "https://api.map.baidu.com/telematics/v3/weather", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {var a = t.data;if (0 === a.error && "success" === a.status) {var e = a.results,n = {};n.originalData = a, n.currentWeather = [], n.currentWeather[0] = { currentCity: e[0].currentCity, pm25: e[0].pm25, date: e[0].weather_data[0].date, temperature: e[0].weather_data[0].temperature, weatherDesc: e[0].weather_data[0].weather, wind: e[0].weather_data[0].wind }, i.success(n);} else i.fail({ errMsg: a.message, statusCode: a.status });}, fail: function fail(t) {i.fail(t);} });},s = function s(t) {i.fail(t);},o = function o(t) {};if (t.location) {var c = t.location.split(",")[0];n({ errMsg: "input location", latitude: t.location.split(",")[1], longitude: c });} else a.getWXLocation("gcj02", n, s, o);} }]), t;}();module.exports.BMapWX = BMapWX;

/***/ }),

/***/ 62:
/*!*****************************************************!*\
  !*** D:/wx_project/wx_question/util/que_ashma.json ***!
  \*****************************************************/
/*! exports provided: question, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"question\":[{\"title\":\"1、您的孩子是否曾经诊断为哮喘？\",\"type\":\"1\",\"more\":\"false\",\"select\":[{\"item\":\"A.是\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"focus\":\"A\"},{\"item\":\"B.否\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0}]},{\"title\":\"\",\"type\":\"2\",\"more\":\"false\",\"select\":[{\"label\":[{\"b_text\":\"2、您的孩子患哮喘的年龄是\",\"status\":0,\"focus\":\"A\",\"value\":\"\",\"input\":1,\"a_text\":\"\"},{\"b_text\":\"岁\",\"status\":0,\"focus\":\"A\",\"value\":\"\",\"input\":1,\"a_text\":\"月\"}],\"color\":{\"itemBgc\":\"#8ECDFF\"},\"status\":0}]},{\"title\":\"3、哮喘的治疗方案【可多选】？\",\"type\":\"1\",\"more\":\"true\",\"select\":[{\"item\":\"A、吸入激素治疗（如布地奈德）\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"focus\":\"A\",\"data\":4},{\"item\":\"B、口服孟鲁斯特纳\",\"focus\":\"B\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"data\":0},{\"item\":\"C、脱敏治疗\",\"focus\":\"C\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"data\":0},{\"item\":\"D、遵照医嘱规律治疗\",\"focus\":\"D\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"data\":0},{\"item\":\"E、未规律治疗\",\"focus\":\"E\",\"color\":{\"fontColor\":\"#000\",\"iconBgc\":\"#000\",\"itemBgc\":\"#F7F7F7\"},\"status\":0,\"data\":0}]}]}");

/***/ }),

/***/ 95:
/*!*****************************************************************************!*\
  !*** D:/wx_project/wx_question/js_sdk/gsq-image-tools/image-tools/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
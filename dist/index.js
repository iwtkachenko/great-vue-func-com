'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Copyright (c) 2017 by Igor Tkachenko <vash.igor@gmail.com>. All Rights Reserved.
// This code is provided under the MIT license.
// You can find the full text in the package you get this file with.

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-enable import/no-extraneous-dependencies */

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _greatVueHocHelper = require('great-vue-hoc-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Module export.
 * This function generate Vue component from render functions.
 */


/**
 * Types that are used in the module.
 */
exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (com) {
    return _vue2.default.extend(_extends({}, (0, _lodash2.default)(options, 'options', {}), {

      name: 'great-func-com',

      props: options.props ? options.props : {},

      mixins: [].concat(_toConsumableArray(options.options && options.options.mixins ? options.options.mixins : []), [{
        created: function created() {
          this.$hocMetadata = (0, _greatVueHocHelper.castMetadata)(this, options).metadata;
        },
        destroyed: function destroyed() {
          (0, _greatVueHocHelper.destroyMetadata)(this);
        }
      }]),

      render: function render(h) {
        return com(h, this.$props, this.$children, _extends({
          self: this
        }, (0, _greatVueHocHelper.castMetadata)(this, options)));
      }
    }));
  };
};

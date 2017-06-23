// @flow

// Copyright (c) 2017 by Igor Tkachenko <vash.igor@gmail.com>. All Rights Reserved.
// This code is provided under the MIT license.
// You can find the full text in the package you get this file with.

/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
/* eslint-enable import/no-extraneous-dependencies */

import get from 'lodash.get';

import { castMetadata, destroyMetadata } from 'great-vue-hoc-helper';

/**
 * Types that are used in the module.
 */
export interface Options<T> {
  // Inject props values into the child component
  injectProps?: (props: T, self?: Vue, options?: Options<T>, metadata?: any) => T,
  // Prepare vue vm render data object
  prepareData?: (self: Vue, options?: Options<T>) => any,
  // Additional props definitions
  props?: T,
  // This object has to have shape of Vue component options
  options?: any,
  /**
   * Initial values for unbinded data for vnode instance.
   * The idea is that all vue data object (with props, data, methods etc.)
   * is under tight control by things like proxies, observers, watchers,
   * and any other things that can influnce or react on your values some way or
   * prevent you from operating it the way you want.
   * This is a safe place to keep some data that relates to your HOC.
   */
  metadata?: any,
}

/**
 * Types that are used in the module.
 */
export interface RenderPayload<T> {
  self: Vue,
  props?: T,
  metadata?: any,
}

export type RenderFunction<T> = (
  h: any,
  props?: T,
  children: Vue[],
  payload?: RenderPayload<T>
) => any


/**
 * Module export.
 * This function generate Vue component from render functions.
 */
export default <T>(options: Options<T> = {}) => (com: RenderFunction<T>) =>
  Vue.extend({
    ...get(options, 'options', {}),

    name: 'great-func-com',

    props: options.props ? options.props : {},

    mixins: [
      ...(options.options && options.options.mixins ? options.options.mixins : []),
      {
        created() {
          this.$hocMetadata = castMetadata(this, options).metadata;
        },

        destroyed() {
          destroyMetadata(this, options);
        },
      },
    ],

    render(h) {
      return com(h, this.$props, this.$children, {
        self: this,
        ...castMetadata(this, options),
      });
    },
  });

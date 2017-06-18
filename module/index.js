
import wrap from 'great-vue-hoc-helper';


export interface Options {
  // Inject props values into the child component
  injectProps?: (props: any, self?: any, options?: Options, metadata?: any) => any,
  // Prepare vue vm render data object
  prepareData?: (self: any, options?: Options) => any,
  // Additional props definitions
  props?: any,
  // If you want to render decorator rendere youself, you can use this property
  render?: (h: any, payload?: RenderPayload) => any,
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

// @TODO Deprecate in hoc-helper
export type RenderFunction = (h: any, payload?: RenderPayload) => any


export default (options: Options = {}) => (com: RenderFunction) => {
  const injectedOptions = get(options, 'options', {});

  // @TODO Import mixins creating function
  const mixins = [
    ...(options.options && options.options.mixins ? options.options.mixins : []),
    {
      created() {
        this.$hocMetadata = castMetadata(this, options).metadata;
      },

      destroyed() {
        destroyMetadata(this, options);
      },
    },
  ];

  // We can transform some function to component instead of wrapping one.
  return Vue.extend({
    ...injectedOptions,

    name: 'great-func-com',

    props: options.props ? options.props : {},

    mixins,

    render(h) {
      return com(h, {
        props: this.$props,
        children: this.$children,
        self: this,
        ...castMetadata(this, options),
      });
    },
  });
}

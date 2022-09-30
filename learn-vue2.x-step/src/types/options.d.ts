type InjectKey = string | Symbol

declare type InternalComponentOptions = {
  _isComponent: true
  parent: Component
  _parentVnode: VNode
  render?: Function
  staticRenderFns?: Array<Function>
}

declare type ComponentOptions = {
  componentId?: string
  // data
  data: Object | Function | void
  props?: { [key: string]: PropOptions }
  propsData?: ?Object
  computed?: {
    [key: string]:
      | Function
      | {
          get?: Function
          set?: Function
          cache?: boolean
        }
  }
  methods?: { [key: string]: Function }
  watch?: { [key: string]: string | Function | Object | Array }
  // DOM
  el?: string | Element
  template?: string
  render: (h: () => VNode) => VNode
  renderError?: (h: () => VNode, err: Error) => VNode
  staticRenderFns?: Array<() => VNode>
  // lifecycle
  beforeCreate?: Function
  created?: Function
  beforeMount?: Function
  mounted?: Function
  beforeUpdate?: Function
  updated?: Function
  activated?: Function
  deactivated?: Function
  beforeDestroy?: Function
  destroyed?: Function
  errorCaptured?: (err: Error, vm: Component, info: string) => ?boolean
  servePrefetch?: Function
  // assets
  directives?: { [key: string]: Object }
  filters?: { [key: string]: Function }
  components?: { [key: string]: Class<Component> }
  transitions?: { [key: string]: Object }

  // context
  provide?:
    | { [key: string | Symbol]: any }
    | (() => { [key: string | Symbol]: any })
  inject?:
    | { [key: string]: InjectKey | { from?: InjectKey; default?: any } }
    | Array<string>

  // component v-model customization
  model: {
    prop?: string
    event?: string
  }
  // misc
  parent?: Component
  mixins?: Array<Object>
  name?: string
  extends?: Class<Component> | Object
  delimiters?: [string, string]
  comments?: boolean
  inheritAttrs?: boolean
  // private
  _isComponent?: true
  _propKeys?: Array<string>
  _parentVnode?: VNode
  _parentListeners?: ?Object
  _renderChildren?: ?Array<VNode>
  _componentTag: ?string
  _scopedId: ?string
  _base: Class<Component>
}

declare type PropOptions = {
  type:
    | Function
    | Array<Function>
    | String
    | Number
    | Boolean
    | Object
    | Date
    | Function
    | Symbol
  default: any
  required: ?boolean
  validator: ?Function
}

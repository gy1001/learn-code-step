declare interface Component {
  // constructor information
  cid: number
  options: Object
  // extend

  // public properties
  $options: ComponentOptions

  // private properties
  _uid: number | string
  _isVue: true
  _self: Component
  _renderProxy: Component
  _renderContext: ?Component
}

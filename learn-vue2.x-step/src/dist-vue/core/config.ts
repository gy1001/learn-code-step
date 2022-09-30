import { noop } from '../shared/util'

export type Config = {
  optionMergeStrategies: { [key: string]: Function }
  silent: boolean
  productionTip: boolean
  performance: boolean
  warnHandler?: ((msg: string, vm: Component, trace: string) => void) | null
}

const configObj: Config = {
  optionMergeStrategies: Object.create(null),
  /**
   * 是否记录性能
   */
  performance: false,
  productionTip: process.env.NODE_ENV !== 'production',
  warnHandler: null,
  silent: false,
}

export default configObj

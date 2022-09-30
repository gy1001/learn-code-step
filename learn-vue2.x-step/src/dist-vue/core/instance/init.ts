import config from '../config'
import { mergeOptions, extend } from '../util'
import { mark } from '../util/perf'

let uid = 0

export function initMixin(Vue: any) {
  Vue.prototype._init = function (options?: any) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    // performance 设置为true 可以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪，
    // 只适用于开发模式和支持 performance.mark API的浏览器上

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }
    // a flag to avoid this being observed
    vm._isVue = true

    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      console.log(
        1,
        mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        )
      )
      // vm.$options = mergeOptions(
      //   resolveConstructorOptions(vm.constructor),
      //   options || {},
      //   vm
      // )
    }

    console.log('被调用了init方法')
  }
}

export function initInternalComponent(
  vm: Component,
  options: InternalComponentOptions
) {
  console.log('init---initInternalComponent')
}

export function resolveConstructorOptions(Ctor: any) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions(Ctor: any): Object | null {
  let modified: any
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}

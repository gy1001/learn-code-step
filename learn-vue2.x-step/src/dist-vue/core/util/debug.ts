import { noop } from '../../shared/util'
import config from '../config'

export let warn = noop
export let generateComponentTrace = noop // work around flow check
export let formatComponentName = noop

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  const classifyRE = /(?:^|[-_])(\w)/g
  const classify = (str: string) =>
    str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, '')

  warn = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''
    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace as string)
    } else if (hasConsole && !config.silent) {
    }
  }

  formatComponentName = (vm, includeFile) => {
    if (vm.$root === vm) {
      return '<Root>'
    }
    const options =
      typeof vm === 'function' && vm.cid !== null
        ? vm.options
        : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm
    let name = options.name || options._componentTag
    const file = options.__file
    if (!name && file) {
      const match = file.match(/([^/\\]+).vue$/)
      name = match && match[1]
    }
    return name
      ? `<${classify}>`
      : `<Anonymous>` + (file && includeFile !== false ? `at ${file}` : '')
  }

  generateComponentTrace = (vm) => {
    if (vm._isVue && vm.$parent) {
      const tree: any = []
      let currentRecursiveSequence = 0
      while (vm) {
        if (tree.length > 0) {
          const last = tree[tree.length - 1]
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++
            vm = vm.$parent
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence]
            currentRecursiveSequence = 0
          }
        }
        tree.push(vm)
        vm = vm.$parent
      }
      return '\n\nfound in\n\n'
    } else {
      return `\n\n(found in ${formatComponentName(vm)})`
    }
  }
}

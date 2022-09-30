import { inBrowser } from './env'

export let mark: any
export let measure: any

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMarks) {
    mark = (tag: any) => perf.mark(tag)
    measure = (name: string, startTag: string, endTag: string) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
    }
  }
}

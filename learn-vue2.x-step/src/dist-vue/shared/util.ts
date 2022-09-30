export function noop(a?: any, b?: any, c?: any) {
  console.log(a, b, c)
}

export function extend(to: any, _from: any): any {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const val = eval(value.slice(1))
      console.log(val);
      return val
    } catch (e) {
      return value
    }
  }
  return value
}

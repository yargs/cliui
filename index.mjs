// Bootstrap cliui with CommonJS dependencies:
import { cliui } from './build/lib/index.js'
import wrap from 'wrap-ansi';
import stripAnsi from 'strip-ansi';

export default function ui (opts) {
  return cliui(opts, {
    stringWidth: (str) => {
      return [...str].length
    },
    stripAnsi,
    wrap
  })
}

// Bootstrap cliui with CommonJS dependencies:
import { cliui, UIOptions } from './index.js'
import stringWidth from 'string-width'
import stripAnsi from 'strip-ansi'
import wrap from 'wrap-ansi'

export default function ui (opts: UIOptions) {
  return cliui(opts, {
    stringWidth,
    stripAnsi,
    wrap
  })
}

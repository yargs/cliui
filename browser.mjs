// Bootstrap cliui with esm dependencies:
import { cliui } from './build/lib/index.js'
import stringWidth from 'https://esm.sh/string-width@^6'
import stripAnsi from 'https://esm.sh/strip-ansi@^7'
import wrap from 'https://esm.sh/wrap-ansi@^8'

export default function ui (opts) {
  return cliui(opts, {
    stringWidth,
    stripAnsi,
    wrap
  })
}

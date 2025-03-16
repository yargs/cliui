// Bootstrap cliui with CommonJS dependencies:
import { cliui, UI } from './build/lib/index.js'
import type { UIOptions } from './build/lib/index.d.ts'
import stringWidth from 'string-width'
import stripAnsi from 'strip-ansi'
import wrapAnsi from 'wrap-ansi'

export default function ui (opts: UIOptions): UI {
  return cliui(opts, {
    stringWidth,
    stripAnsi,
    wrap: wrapAnsi
  })
}

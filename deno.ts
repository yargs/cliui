// Bootstrap cliui with CommonJS dependencies:
import { cliui, UI } from './build/lib/index.js'
import type { UIOptions } from './build/lib/index.d.ts'
import stringWidth from 'string-width'
import { stripVTControlCharacters } from 'node:util'
import wrapAnsi from 'wrap-ansi'

export default function ui (opts: UIOptions): UI {
  return cliui(opts, {
    stringWidth,
    stripAnsi: stripVTControlCharacters,
    wrap: wrapAnsi
  })
}

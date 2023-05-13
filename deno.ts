// Bootstrap cliui with esm dependencies:
import { cliui, UI } from './build/lib/index.js'
import type { UIOptions } from './build/lib/index.d.ts'

import stringWidth from 'https://esm.sh/string-width@6'
import stripAnsi from 'https://esm.sh/strip-ansi@7'
import wrap from 'https://esm.sh/wrap-ansi@8'

export default function ui (opts?: UIOptions): UI {
  let optsWithWidth = opts ?? {}
  if (!optsWithWidth.width) {
    const { columns } = Deno.consoleSize()
    if (columns) {
      optsWithWidth = Object.assign(optsWithWidth, { width: columns })
    }
  }

  return cliui(optsWithWidth, {
    stringWidth,
    stripAnsi,
    wrap
  })
}

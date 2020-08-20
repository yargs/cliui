// Bootstrap cliui with CommonJS dependencies:
import { cliui, UIOptions, UI } from './build/lib/index.js'
import { wrap, stripAnsi } from './build/lib/string-utils.js'

export default function ui (opts: UIOptions): UI {
  return cliui(opts, {
    stringWidth: (str: string) => {
      return [...str].length
    },
    stripAnsi,
    wrap
  })
}

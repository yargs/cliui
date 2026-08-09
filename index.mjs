// Bootstrap cliui with CommonJS dependencies:
import { cliui } from './build/lib/index.js'
import stringWidth from 'string-width'
import wrapAnsi from 'wrap-ansi'
import { stripVTControlCharacters } from 'node:util'

export default function ui (opts) {
  return cliui(opts, {
    stringWidth,
    stripAnsi: stripVTControlCharacters,
    wrap: wrapAnsi
  })
}

export {ui as 'module.exports'};

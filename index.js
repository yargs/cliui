import { cliui } from './build/lib/index.js'
import wrap from 'wrap-ansi'
import stripAnsi from 'strip-ansi'

import  wcswidth from '@topcli/wcwidth'

export default function ui (opts) {
  return cliui(opts, {
    stringWidth: (str) => {
      return wcswidth(stripAnsi(str))
    },
    stripAnsi,



    wrap,
  })
}

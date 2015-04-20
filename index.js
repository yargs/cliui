var wrap = require('wordwrap'),
  align = {
    right: require('right-align'),
    center: require('center-align')
  },
  // top = 0,
  right = 1,
  // bottom = 2,
  left = 3

function UI (opts) {
  this.width = opts.width
  this.rows = []
}

UI.prototype.row = function () {
  var cols = []

  for (var i = 0, arg; (arg = arguments[i]) !== undefined; i++) {
    if (typeof arg === 'string') cols.push(this._colFromString(arg))
    else cols.push(arg)
  }

  this.rows.push(cols)
}

UI.prototype._colFromString = function (str) {
  return {
    text: str
  }
}

UI.prototype.toString = function () {
  var _this = this,
    str = ''

  _this.rows.forEach(function (row, i) {
    if (i) str += '\n'
    str += _this.rowToString(row)
  })

  return str
}

UI.prototype.rowToString = function (row) {
  var widths = this._columnWidths(row),
    rrows = this._rasterize(row, widths),
    str = '',
    ts

  rrows.forEach(function (rrow, r) {
    if (r) str += '\n'
    rrow.forEach(function (col, c) {
      ts = ''
      for (var i = 0; i < widths[c]; i++) {
        ts += col.charAt(i) || ' '
      }

      // align the string within its column.
      if (row[c].align && row[c].align !== 'left') {
        ts = align[row[c].align](ts.trim() + '\n' + new Array(widths[c] + 1).join(' '))
          .split('\n')[0]
        if (ts.length < widths[c]) ts += new Array(widths[c] - ts.length).join(' ')
      }

      str += ts
    })
  })

  return str
}

UI.prototype._rasterize = function (row, widths) {
  var rrow,
    rrows = []

  // word wrap all columns, and create
  // a data-structure that is easy to rasterize.
  row.forEach(function (col, c) {
    wrap.hard(widths[c])(col.text).split('\n').forEach(function (str, r) {
      if (!rrows[r]) rrows.push([])
      rrow = rrows[r]
      for (var i = 0; i < c; i++) {
        if (rrow[i] === undefined) rrow.push('')
      }
      rrow.push(str)
    })
  })

  return rrows
}

UI.prototype._columnWidths = function (row) {
  var widths = [],
    unset = row.length,
    unsetWidth,
    remainingWidth = this.width

  // column widths can be set in config.
  row.forEach(function (col, i) {
    if (col.width) {
      unset--
      widths[i] = col.width
      remainingWidth -= col.width
    } else {
      widths[i] = undefined
    }
  })

  // any unset widths should be calculated.
  if (unset) unsetWidth = Math.floor(remainingWidth / unset)
  widths.forEach(function (w, i) {
    if (w === undefined) widths[i] = Math.max(unsetWidth, _minWidth(row[i]))
  })

  return widths
}

// calculates the minimum width of
// a column, based on padding preferences.
function _minWidth (col) {
  var padding = col.padding || []

  return 1 + (padding[left] || 0) + (padding[right] || 0)
}

module.exports = function (opts) {
  return new UI({
    width: (opts || {}).width || 80
  })
}

var wrap = require('wordwrap'),
  align = {
    right: require('right-align'),
    center: require('center-align')
  },
  top = 0,
  right = 1,
  bottom = 2,
  left = 3

function UI (opts) {
  this.width = opts.width
  this.wrap = opts.wrap
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
  var _this = this,
    rrows = this._rasterize(row),
    str = '',
    ts,
    width,
    wrapWidth

  rrows.forEach(function (rrow, r) {
    if (r) str += '\n'
    rrow.forEach(function (col, c) {
      ts = '' // temporary string used during alignment/padding.
      width = row[c].width // the width with padding.
      wrapWidth = _this._negatePadding(row[c]) // the width without padding.

      for (var i = 0; i < Math.max(wrapWidth, col.length); i++) {
        ts += col.charAt(i) || ' '
      }

      // align the string within its column.
      if (row[c].align && row[c].align !== 'left' && _this.wrap) {
        ts = align[row[c].align](ts.trim() + '\n' + new Array(wrapWidth + 1).join(' '))
          .split('\n')[0]
        if (ts.length < wrapWidth) ts += new Array(width - ts.length).join(' ')
      }

      // add left/right padding and print string.
      if (row[c].padding && row[c].padding[left]) str += new Array(row[c].padding[left] + 1).join(' ')
      str += ts
      if (row[c].padding && row[c].padding[right]) str += new Array(row[c].padding[right] + 1).join(' ')
    })

    // remove trailing whitespace.
    str = str.replace(/ +$/, '')
  })

  return str
}

UI.prototype._rasterize = function (row) {
  var _this = this,
    i,
    rrow,
    rrows = [],
    widths = this._columnWidths(row),
    wrapped

  // word wrap all columns, and create
  // a data-structure that is easy to rasterize.
  row.forEach(function (col, c) {
    // leave room for left and right padding.
    col.width = widths[c]
    if (_this.wrap) wrapped = wrap.hard(_this._negatePadding(col))(col.text).split('\n')
    else wrapped = col.text.split('\n')

    // add top and bottom padding.
    if (col.padding) {
      for (i = 0; i < (col.padding[top] || 0); i++) wrapped.unshift('')
      for (i = 0; i < (col.padding[bottom] || 0); i++) wrapped.push('')
    }

    wrapped.forEach(function (str, r) {
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

UI.prototype._negatePadding = function (col) {
  var wrapWidth = col.width
  if (col.padding) wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0)
  return wrapWidth
}

UI.prototype._columnWidths = function (row) {
  var _this = this,
    widths = [],
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
    if (!_this.wrap) widths[i] = row[i].width || row[i].text.length
    else if (w === undefined) widths[i] = Math.max(unsetWidth, _minWidth(row[i]))
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
    width: (opts || {}).width || 80,
    wrap: typeof opts.wrap === 'boolean' ? opts.wrap : true
  })
}

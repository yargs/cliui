/* global describe, it */

require('chai').should()

var cliui = require('../')

describe('cliui', function () {
  describe('toString', function () {
    it("wraps text at 'width' if a single column is given", function () {
      var ui = cliui({
        width: 10
      })

      ui.row('i am a string that should be wrapped')

      ui.toString().split('\n').forEach(function (row) {
        row.length.should.be.lte(10)
      })
    })

    it('evenly divides text across columns if multiple tds are given', function () {
      var ui = cliui({
        width: 40
      })

      ui.row(
        {text: 'i am a string that should be wrapped', width: 15},
        'i am a second string that should be wrapped',
        'i am a third string that should be wrapped'
      )

      // total width of all columns is <=
      // the width cliui is initialized with.
      ui.toString().split('\n').forEach(function (row) {
        row.length.should.be.lte(40)
      })

      // it should wrap each column appropriately.
      var expected = [
       'i am a string  i am a      i am a third',
       'that should be second      string that ',
       'wrapped        string that should be   ',
       '               should be   wrapped     ',
       '               wrapped     '
      ]

      ui.toString().split('\n').should.eql(expected)
    })
  })

  describe('_columnWidths', function () {
    it('uses same width for each column by default', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{}, {}, {}])

      widths[0].should.equal(13)
      widths[1].should.equal(13)
      widths[2].should.equal(13)
    })

    it('divides width over remaining columns if first width specified', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{width: 20}, {}, {}])

      widths[0].should.equal(20)
      widths[1].should.equal(10)
      widths[2].should.equal(10)
    })

    it('divides width over remaining columns if middle width specified', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{}, {width: 10}, {}])

      widths[0].should.equal(15)
      widths[1].should.equal(10)
      widths[2].should.equal(15)
    })

    it('assigns remaining width if multiple widths specified', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{width: 20}, {width: 12}, {}])

      widths[0].should.equal(20)
      widths[1].should.equal(12)
      widths[2].should.equal(8)
    })

    it('uses a sane default if impossible widths are specified', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{width: 30}, {width: 30}, {padding: [0, 2, 0, 1]}])

      widths[0].should.equal(30)
      widths[1].should.equal(30)
      widths[2].should.equal(4)
    })
  })

  describe('alignment', function () {
    it('allows a column to be right-aligned', function () {
      var ui = cliui({
        width: 40
      })

      ui.row(
        'i am a string',
        {text: 'i am a second string', align: 'right'},
        'i am a third string that should be wrapped'
      )

      // it should wrap each column appropriately.
      var expected = [
       'i am a stringi am a secondi am a third ',
       '                    stringstring that  ',
       '                          should be    ',
       '                          wrapped      '
      ]

      ui.toString().split('\n').should.eql(expected)
    })
  })

  describe('padding', function () {
    it('allows for top/bottom padding', function () {
      var ui = cliui({
        width: 80
      })

      ui.row(
        'i am a string',
        {text: 'i am a second string', padding: [2, 0, 0, 0]},
        {text: 'i am a third string that should be wrapped', padding: [0, 0, 0, 2]}
      )

      console.log(ui.toString())

      // ui.toString().split('\n').should.eql(expected)
    })
  })
})

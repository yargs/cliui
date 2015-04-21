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

    it('evenly divides text across columns if multiple columns are given', function () {
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

    it('divides width over remaining columns if first column has width specified', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{width: 20}, {}, {}])

      widths[0].should.equal(20)
      widths[1].should.equal(10)
      widths[2].should.equal(10)
    })

    it('divides width over remaining columns if middle column has width specified', function () {
      var ui = cliui({
          width: 40
        }),
        widths = ui._columnWidths([{}, {width: 10}, {}])

      widths[0].should.equal(15)
      widths[1].should.equal(10)
      widths[2].should.equal(15)
    })

    it('keeps track of remaining width if multiple columns have width specified', function () {
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
    it('allows a column to be right aligned', function () {
      var ui = cliui({
        width: 40
      })

      ui.row(
        'i am a string',
        {text: 'i am a second string', align: 'right'},
        'i am a third string that should be wrapped'
      )

      // it should right-align the second column.
      var expected = [
       'i am a stringi am a secondi am a third ',
       '                    stringstring that  ',
       '                          should be    ',
       '                          wrapped      '
      ]

      ui.toString().split('\n').should.eql(expected)
    })

    it('allows a column to be center aligned', function () {
      var ui = cliui({
        width: 60
      })

      ui.row(
        'i am a string',
        {text: 'i am a second string', align: 'center', padding: [0, 2, 0, 2]},
        'i am a third string that should be wrapped'
      )

      // it should right-align the second column.
      var expected = [
       'i am a string          i am a second       i am a third string ',
       '                           string          that should be      ',
       '                                           wrapped             '
      ]

      ui.toString().split('\n').should.eql(expected)
    })
  })

  describe('padding', function () {
    it('handles left/right padding', function () {
      var ui = cliui({
        width: 40
      })

      ui.row(
        {text: 'i have padding on my left', padding: [0, 0, 0, 4]},
        {text: 'i have padding on my right', padding: [0, 2, 0, 0], align: 'center'},
        {text: 'i have no padding', padding: [0, 0, 0, 0]}
      )

      // it should add left/right padding to columns.
      var expected = [
       '    i have     i have      i have no    ',
       '    padding  padding on    padding      ',
       '    on my     my right     ',
       '    left     '
      ]

      ui.toString().split('\n').should.eql(expected)
    })

    it('handles top/bottom padding', function () {
      var ui = cliui({
        width: 40
      })

      ui.row(
        'i am a string',
        {text: 'i am a second string', padding: [2, 0, 0, 0]},
        {text: 'i am a third string that should be wrapped', padding: [0, 0, 1, 0]}
      )

      // it should add top/bottom padding to second
      // and third columns.
      var expected = [
       'i am a string             i am a third ',
       '                          string that  ',
       '             i am a secondshould be    ',
       '             string       wrapped      ',
       '                                       '
      ]

      ui.toString().split('\n').should.eql(expected)
    })
  })
})

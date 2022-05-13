'use strict'

/* global describe, it */

require('chai').should()

// Force chalk to enable color, if it's disabled the test fails.
process.env.FORCE_COLOR = 1

const cliui = require('../build/index.cjs')

describe('cliui', () => {
  describe('resetOutput', () => {
    it('should set lines to empty', () => {
      const ui = cliui()
      ui.div('i am a value that would be in a line')
      ui.resetOutput()
      ui.toString().length.should.be.equal(0)
    })
  })

  describe('div', () => {
    it("wraps text at 'width' if a single column is given", () => {
      const ui = cliui({
        width: 10
      })

      ui.div('i am a string that should be wrapped')

      ui.toString().split('\n').forEach(row => {
        row.length.should.be.lte(10)
      })
    })

    it('evenly divides text across columns if multiple columns are given', () => {
      const ui = cliui({
        width: 40
      })

      ui.div(
        { text: 'i am a string that should be wrapped', width: 15 },
        'i am a second string that should be wrapped',
        'i am a third string that should be wrapped'
      )

      // total width of all columns is <=
      // the width cliui is initialized with.
      ui.toString().split('\n').forEach(row => {
        row.length.should.be.lte(40)
      })

      // it should wrap each column appropriately.
      const expected = [
        'i am a string  i am a      i am a third',
        'that should be second      string that',
        'wrapped        string that should be',
        '               should be   wrapped',
        '               wrapped'
      ]

      ui.toString().split('\n').should.eql(expected)
    })

    it('allows for a blank row to be appended', () => {
      const ui = cliui({
        width: 40
      })

      ui.div()

      // it should wrap each column appropriately.
      const expected = ['']

      ui.toString().split('\n').should.eql(expected)
    })
  })

  describe('_columnWidths', () => {
    it('uses same width for each column by default', () => {
      const ui = cliui({
        width: 40
      })
      const widths = ui.columnWidths([{}, {}, {}])

      widths[0].should.equal(13)
      widths[1].should.equal(13)
      widths[2].should.equal(13)
    })

    it('divides width over remaining columns if first column has width specified', () => {
      const ui = cliui({
        width: 40
      })
      const widths = ui.columnWidths([{ width: 20 }, {}, {}])

      widths[0].should.equal(20)
      widths[1].should.equal(10)
      widths[2].should.equal(10)
    })

    it('divides width over remaining columns if middle column has width specified', () => {
      const ui = cliui({
        width: 40
      })
      const widths = ui.columnWidths([{}, { width: 10 }, {}])

      widths[0].should.equal(15)
      widths[1].should.equal(10)
      widths[2].should.equal(15)
    })

    it('keeps track of remaining width if multiple columns have width specified', () => {
      const ui = cliui({
        width: 40
      })
      const widths = ui.columnWidths([{ width: 20 }, { width: 12 }, {}])

      widths[0].should.equal(20)
      widths[1].should.equal(12)
      widths[2].should.equal(8)
    })

    it('uses a sane default if impossible widths are specified', () => {
      const ui = cliui({
        width: 40
      })
      const widths = ui.columnWidths([{ width: 30 }, { width: 30 }, { padding: [0, 2, 0, 1] }])

      widths[0].should.equal(30)
      widths[1].should.equal(30)
      widths[2].should.equal(4)
    })
  })

  describe('alignment', () => {
    it('allows a column to be right aligned', () => {
      const ui = cliui({
        width: 40
      })

      ui.div(
        'i am a string',
        { text: 'i am a second string', align: 'right' },
        'i am a third string that should be wrapped'
      )

      // it should right-align the second column.
      const expected = [
        'i am a stringi am a secondi am a third',
        '                    stringstring that',
        '                          should be',
        '                          wrapped'
      ]

      ui.toString().split('\n').should.eql(expected)
    })

    it('allows a column to be center aligned', () => {
      const ui = cliui({
        width: 60
      })

      ui.div(
        'i am a string',
        { text: 'i am a second string', align: 'center', padding: [0, 2, 0, 2] },
        'i am a third string that should be wrapped'
      )

      // it should right-align the second column.
      const expected = [
        'i am a string          i am a second       i am a third string',
        '                           string          that should be',
        '                                           wrapped'
      ]

      ui.toString().split('\n').should.eql(expected)
    })
  })
})

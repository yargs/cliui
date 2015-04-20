# cliui

easily create complex multi-column command-line-interfaces.

```js
var ui = require('cliui')({
  width: 80
});

ui.row('Usage: $0 [command] [options]')

ui.row({
  text: 'Options:',
  padding: [2, 0, 2, 0]
})

ui.row(
  {
    text: "-f, --file",
    width: 40,
    padding: [0, 4, 0, 4]
  },
  {
    text: "the file to load",
    width: 25
  },
  {
    text: "[required]",
    align: 'right'
  }
)

console.log(ui.toString());
```

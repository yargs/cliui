import cliui from './index.js'
import chalk from 'chalk';

console.log('ui width:', 40);
const ui = cliui({ width: 40 });

ui.div('    leading whitespaces (4)')
ui.div(`      ${chalk.red('leading whitespace (6)')}`)
ui.div({ text: `i am a string that will be wrapped (width: ${30})`, width: 30 })
ui.div({ text: 'align: right item', align: 'right' })
console.log(ui.toString());

const kWidths = [40, 80]
const kLorem = `Cras commodo malesuada justo, at pretium ante sodales nec. Aliquam ${chalk.green('blandit')} tempus augue molestie ${chalk.green('blandit')}. Donec non fringilla nulla, et pellentesque purus. Vestibulum elit purus, tempor vel tristique et, ${chalk.red('aliquam')}.`

for (const width of kWidths) {
  console.log('ui width:', width);
  const ui = cliui({ width })

  ui.div(
    { text: kLorem, width: width / 2, padding: [0, 0, 0, 0], border: true },
    { text: kLorem, width: width / 2, padding: [1, 0, 0, 0], border: true },
  );
  console.log(ui.toString())
}

for (const width of kWidths) {
  console.log('ui width:', width);
  const ui = cliui({ width })
 
  ui.div('DSL example')
  ui.div(
    'Usage: node ./bin/foo.js\n' +
  '  <regex>\t  provide a regex\n' +
  '  <glob>\t  provide a glob\t [required]'
  );
  ui.div('-');
  ui.div('Basic Example')
  ui.div('Usage: $0 [command] [options]')
  ui.div({ text: 'Options:', padding: [2, 0, 1, 0] })
  ui.div(
    {
      text: "-f, --file",
      width: 20,
      padding: [0, 4, 0, 4]
    },
    {
      text: "the file to load (width: 20)." +
        chalk.cyan("(if this description is long it wraps).")
      ,
      width: width/2
    },
    {
      text: chalk.red("[required]"),
      align: 'right'
    }
  )
  console.log(ui.toString())
}

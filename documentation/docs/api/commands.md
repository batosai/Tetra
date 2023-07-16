---
id: commands
title: Commands line
---

## Introduction

Run the following code to see the list of available Tetra commands:

```
npx tetra
```

```
tetra <options> [command]

Options:
  -h, --help ........................ Display help for command

Commands:
  informations ...................... Show application informations
  setup ............................. Initialize configuration(database)
  cache:clear ....................... Clear cache
  install ........................... Install tetra module
  remove ............................ Remove tetra module
  link .............................. Link tetra module
  unlink ............................ Unlink tetra module
  database:model
  database:reset
  database:seed
```

## Creating Commands

Let’s build an Tetra command to show random number  output them to the terminal.
In your module, create folder commands.

Add commands/number.js

Register your newly created command inside the commands/index.js file:

```js
module.exports.number = require('./number')

```

## Showing numbers

Insert everything inside the command file with the following code:

```js
const { Command } = require('@tetrajs/cli')

module.exports = class Number extends Command {
  configure() {
    this.name = 'number'

    // optionals
    this.alias = 'n'
    this.description = 'Random number'
    this.addOption('-e, --env <env>', 'Set environment', 'development')

    return super.configure()
  }

  // optional
  syntax() {
    console.log(this.kleur.green(`tetra <options> ${this.name}`))
  }

  async execute(args, options) {
    console.log(Math.random())
    console.log(options.env)
  }
}

```

## Questions

Within your command, you can prompt users for answers and accept values by asking interactive questions.

**prompts(Array)**
Prompt the user for textual input:
```js
async execute(args, options) {
  const response = await this.prompts([
    {
      type: 'text',
      name: 'lastname',
      message: 'Lastname:',
      initial: 'John',
    }
  ])

  console.log(response)
}
```

Tetra uses prompts npm package, For more information, [please this documentation](https://github.com/terkelg/prompts#readme)

## Colorful Output

Tetra uses [kleur](https://github.com/lukeed/kleur#readme) to output colorful log messages to the terminal.

```js
  syntax() {
    console.log(this.kleur.green(`tetra <options> ${this.name}`))
  }
```

## Table

Tetra uses [cli-table3](https://github.com/cli-table/cli-table3) to output table log messages to the terminal.

```js
async execute(args, options) {
  var table = this.table({ head: ["", "Top Header 1", "Top Header 2"] });

  table.push(
      { 'Left Header 1': ['Value Row 1 Col 1', 'Value Row 1 Col 2'] }
    , { 'Left Header 2': ['Value Row 2 Col 1', 'Value Row 2 Col 2'] }
  );

  console.log(table.toString());
}
```

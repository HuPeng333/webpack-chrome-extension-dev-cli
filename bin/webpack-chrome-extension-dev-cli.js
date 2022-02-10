#!/usr/bin/env node
const shellUtils = require('../util/shellUtils')
const create = require('../scripts/create')
process.stdin.resume()
process.stdin.setEncoding('utf-8')



async function run(argv) {
  let projectName = argv[0]

  if (!projectName) {
    process.stdout.write('project name: ')
    projectName = await shellUtils.nextString()
  }
  executeScript('create', projectName)
}

function executeScript(name, ...args) {
  if (name === 'create') {
    create(args[0])
  }
}

run(process.argv.slice(2)).then()

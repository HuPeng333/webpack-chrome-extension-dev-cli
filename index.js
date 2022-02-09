#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const shellUtils = require('./util/shellUtils')

process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdout.write('project name: ')
process.stdin.on('data', (data) => {
  data = data.toString().trim()
  console.log('downloading template from github...')
  const TEMPLATE_PATH = path.resolve(process.cwd(), data)

  shellUtils.executeShell(`git clone https://github.com/HuPeng333/webpack-chrome-extension-dev-template -b master ./${data}`).then(async () => {
    deleteFolder(path.resolve(TEMPLATE_PATH, '.git'))
    await shellUtils.executeShell('git init', TEMPLATE_PATH)
    await shellUtils.executeShell('git add .', TEMPLATE_PATH)
    await shellUtils.executeShell('git commit -m "init"', TEMPLATE_PATH)
    console.log('download success')
    console.log(`use "cd ${data}" to enter your project`)
    process.stdin.pause()
  })

})

function deleteFolder(path) {
  let files = [];
  if(fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file){
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}




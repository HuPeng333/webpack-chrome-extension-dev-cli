#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const shellUtils = require('./util/shellUtils')
const fsUtils = require('./util/fsUtils')

process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdout.write('project name: ')
process.stdin.on('data', (projectName) => {
  projectName = projectName.toString().trim()
  console.log('downloading template from github...')
  const TEMPLATE_PATH = path.resolve(process.cwd(), projectName)

  shellUtils.executeShell(`git clone https://github.com/HuPeng333/webpack-chrome-extension-dev-template -b master ./${projectName}`).then(async () => {
    // 处理git
    fsUtils.deleteFolder(path.resolve(TEMPLATE_PATH, '.git'))
    await shellUtils.executeShell('git init', TEMPLATE_PATH)
    await shellUtils.executeShell('git add .', TEMPLATE_PATH)
    await shellUtils.executeShell('git commit -m "init"', TEMPLATE_PATH)

    // 修改package.json
    const PACKAGE_JSON_PATH = path.resolve(TEMPLATE_PATH, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
    packageJson.name = projectName
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson))

    // 修改package-lock.json
    const PACKAGE_JSON_LOCK_PATH = path.resolve(TEMPLATE_PATH, 'package.json')
    const packageJsonLock = JSON.parse(fs.readFileSync(PACKAGE_JSON_LOCK_PATH, 'utf-8'))
    packageJsonLock.name = projectName
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJsonLock))

    // 下载完毕
    console.log('download success\n')
    console.log(`use "cd ${projectName}" to enter your project`)
    process.stdin.pause()
  })

})




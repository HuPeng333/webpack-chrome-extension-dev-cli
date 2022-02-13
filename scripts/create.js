const path = require("path")
const shellUtils = require("../util/shellUtils")
const fs = require("fs")
const fsUtils = require("../util/fsUtils")

module.exports = create = (projectName) => {
  console.log('downloading template from github...')
  const TEMPLATE_PATH = path.resolve(process.cwd(), projectName)

  // 克隆项目
  shellUtils.executeShellSync(`git clone https://github.com/HuPeng333/webpack-chrome-extension-dev-template -b master ./${projectName}`)

  // 修改package.json
  const PACKAGE_JSON_PATH = path.resolve(TEMPLATE_PATH, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
  packageJson.name = projectName
  packageJson.version = '1.0.0'
  packageJson.keywords = undefined
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson))

  // 处理git
  fsUtils.deleteFolder(path.resolve(TEMPLATE_PATH, '.git'))
  shellUtils.executeShellSync('git init', {cwd: TEMPLATE_PATH, hideOutput: true})
  shellUtils.executeShellSync('git add .', {cwd: TEMPLATE_PATH, hideOutput: true})
  shellUtils.executeShellSync('git commit -m "init"', {cwd: TEMPLATE_PATH, hideOutput: true})

  // 下载完毕
  console.log('\ndownload success\n')
  console.log(`use "cd ${projectName}" to enter your project`)
  process.stdin.pause()
}

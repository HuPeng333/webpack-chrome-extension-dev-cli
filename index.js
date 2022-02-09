const shell = require('child_process')
const path = require('path')
const fs = require('fs')

process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdout.write('project name: ')
process.stdin.on('data', (data) => {
  shell.exec('git clone https://github.com/HuPeng333/webpack-chrome-extension-dev-template', () => {
    const BASE_URL = path.resolve(__dirname, data).trim()
    fs.renameSync(path.resolve(__dirname, 'webpack-chrome-extension-dev-template'), BASE_URL)
    deleteFolder(path.resolve(BASE_URL, '.git'))
    shell.exec(`git init ${BASE_URL}`)
    process.stdin.pause()
  })
})

function deleteFolder(path) {
  let files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
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




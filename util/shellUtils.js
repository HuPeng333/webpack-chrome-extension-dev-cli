const shell = require('child_process')
module.exports.executeShell = (order, cwd = process.cwd()) => {
  return new Promise((resolve, reject) => {
    shell.exec(order, {cwd}, (error, stdout, stderr) => {
      if (error) {
        console.log(stderr)
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

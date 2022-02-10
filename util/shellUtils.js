const cp = require('child_process')
/**
 * @param order {string}
 * @param options {{cwd: string, hideOutput: boolean}}
 * @return {Promise<unknown>}
 */
module.exports.executeShell = (order, options = {
  cwd: process.cwd(),
  hideOutput: false
}) => {
  return new Promise((resolve, reject) => {
    const exec = cp.exec(order, {cwd: options.cwd}, (error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
    if (!options.hideOutput) {
      exec.stdout.on('data', (data) => {
        console.log(data)
      })

      exec.stderr.on('data', (data) => {
        console.error(data)
      })
    }
  })
}
module.exports.executeShellSync = (order, options = {}) => {
  return cp.execSync(order, {
    cwd: options.cwd ? options.cwd : process.cwd(),
    stdio: options.hideOutput ? 'ignore' : 'inherit'
  })
}
module.exports.nextString = async () => {
  return new Promise(resolve => {
    process.stdin.on('data', (data) => {
      resolve(data.toString().trim())
    })
  })
}

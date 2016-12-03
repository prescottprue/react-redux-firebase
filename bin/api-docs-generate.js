const exec = require('child_process').exec
const files = [
  {
    src: 'connect.js',
    dest: 'connect.md'
  },
  {
    src: 'compose.js',
    dest: 'compose.md'
  },
  {
    src: 'helpers.js',
    dest: 'helpers.md'
  },
  {
    src: 'reducer.js',
    dest: 'reducer.md'
  }
]
const pathToDocumentationJs = 'node_modules/documentation/bin/documentation.js'

const generateDocForFile = (file) => {
  return new Promise((resolve, reject) => {
    exec(`${pathToDocumentationJs} build src/${file.src} -f md -o docs/api/${file.dest}`, (error, stdout) => {
      if (error !== null) {
        return reject(error)
      }
      resolve(stdout)
    })
  })
}

(function () {
  files.forEach(file => {
    generateDocForFile(file)
      .then((res) => {
        console.log('\nSuccessfully generated', file) // eslint-disable-line no-console
      })
      .catch((err) => {
        console.log('error generating doc: ', err) // eslint-disable-line no-console
      })
  })
})()

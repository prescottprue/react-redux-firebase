const exec = require('child_process').exec
const files = [
  {
    src: 'firebaseConnect.js',
    dest: 'connect.md'
  },
  {
    src: 'firestoreConnect.js',
    dest: 'firestoreConnect.md'
  },
  {
    src: 'withFirebase.js',
    dest: 'withFirebase.md'
  },
  {
    src: 'withFirestore.js',
    dest: 'withFirestore.md'
  },
  {
    src: 'createFirebaseInstance.js',
    dest: 'firebaseInstance.md'
  },
  {
    src: 'enhancer.js',
    dest: 'enhancer.md'
  },
  {
    src: 'helpers.js',
    dest: 'helpers.md'
  },
  {
    src: 'reducer.js',
    dest: 'reducer.md'
  },
  {
    src: 'constants.js',
    dest: 'constants.md'
  }
]
const pathToDocumentationJs = 'node_modules/documentation/bin/documentation.js'

const generateDocForFile = (file) => {
  return new Promise((resolve, reject) => {
    exec(`${pathToDocumentationJs} build src/${file.src} -f md -o docs/api/${file.dest} --shallow`, (error, stdout) => {
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
        console.log('Successfully generated', file) // eslint-disable-line no-console
      })
      .catch((err) => {
        console.log('error generating doc: ', err) // eslint-disable-line no-console
      })
  })
})()

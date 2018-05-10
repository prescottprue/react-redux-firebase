/* eslint-disable no-console */
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
    src: 'reducers.js',
    dest: 'reducers.md'
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

function generateDocForFile(file) {
  return new Promise((resolve, reject) => {
    exec(
      `$(npm bin)/documentation build src/${file.src} -f md -o docs/api/${
        file.dest
      } --shallow`,
      (error, stdout) => {
        if (error !== null) {
          console.log('error generating doc: ', error.message || error)
          reject(error)
        } else {
          console.log('Successfully generated', file)
          resolve(stdout)
        }
      }
    )
  })
}

;(async function() {
  console.log(
    'Generating API documentation (docs/api) from JSDoc comments within src...'
  )
  await Promise.all(files.map(generateDocForFile))
  console.log('API documentation generated successfully!')
})()

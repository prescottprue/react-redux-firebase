/* eslint-disable no-console */
const exec = require('child-process-promise').exec

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
  },
  {
    src: 'reactReduxFirebase.js',
    dest: 'compose.md'
  }
]

function generateDocForFile(file) {
  return exec(
    `$(npm bin)/documentation build src/${file.src} -f md -o docs/api/${
      file.dest
    } --shallow`
  )
    .then(res => {
      console.log('Successfully generated', file.dest || file)
      return res
    })
    .catch(error => {
      console.log('error generating doc: ', error.message || error)
      return Promise.reject(error)
    })
}

;(async function() {
  console.log(
    'Generating API documentation (docs/api) from JSDoc comments within src...\n'
  )
  try {
    await Promise.all(files.map(generateDocForFile))
    console.log('\nAPI documentation generated successfully!')
    process.exit(0)
  } catch (err) {
    console.log('Error generating API documentation: ', err.message || err)
    process.exit(1)
  }
})()

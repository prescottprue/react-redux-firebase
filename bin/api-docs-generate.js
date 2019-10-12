/* eslint-disable no-console */
const exec = require('child-process-promise').exec
const fs = require('fs')

const SRC_FOLDER = 'src'
const pathsToSkip = ['index.js', 'utils', '.DS_Store', 'actions']
const fileRenames = {
  'createFirebaseInstance.js': 'firebaseInstance'
}

/**
 * @param {object} file - File object for which to generate docs
 * @returns {Promise} Resolves after running docs generation
 */
function generateDocForFile(file) {
  return exec(
    `$(npm bin)/documentation build ${SRC_FOLDER}/${
      file.src
    } -f md -o docs/api/${file.dest} --shallow`
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

/**
 * Get a list of file names
 * @returns {Promise} Resolves with a list of file names
 */
function getFileNames() {
  return new Promise((resolve, reject) => {
    fs.readdir(SRC_FOLDER, (err, files) => {
      console.log('files:', files)
      if (err) {
        return reject(err)
      }
      const cleanedFileNames = files.filter(
        fileName => !pathsToSkip.includes(fileName)
      )
      const mappedFileNames = cleanedFileNames.map(fileName => {
        const newName = fileRenames[fileName] || fileName
        return { src: newName, dest: `${newName.replace('.js', '')}.md` }
      })
      console.log('mapped file names', mappedFileNames)
      resolve(mappedFileNames)
    })
  })
}

;(async function() {
  console.log(
    'Generating API documentation (docs/api) from JSDoc comments within src...\n'
  )
  const files = await getFileNames()
  try {
    await Promise.all(files.map(generateDocForFile))
    console.log('\nAPI documentation generated successfully!')
    process.exit(0)
  } catch (err) {
    console.log('Error generating API documentation: ', err.message || err)
    process.exit(1)
  }
})()

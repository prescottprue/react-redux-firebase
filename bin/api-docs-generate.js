/* eslint-disable no-console */
const exec = require('child-process-promise').exec
const fs = require('fs')
const { promisify } = require('util')

const readFilePromise = promisify(fs.readFile)
const writeFilePromise = promisify(fs.writeFile)

const SRC_FOLDER = 'src'
const API_DOCS_FOLDER = 'docs/api'
const pathsToSkip = ['index.js', 'utils', '.DS_Store', 'actions']
const fileRenames = {
  'createFirebaseInstance.js': 'firebaseInstance'
}

/**
 * Remove see field from markdown file
 * @param {string} filePath - Path of file to remove see field from
 * @returns {Promise} Resolves after all instances of see parameter are removed
 */
function removeSeeFromMarkdown(filePath) {
  return readFilePromise(filePath).then(fileContentsBuffer => {
    const fileContents = fileContentsBuffer.toString()
    const cleanedContents = fileContents.replace(/\n-.*\*\*See.*/g, '')
    return writeFilePromise(filePath, cleanedContents)
  })
}

/**
 * @param {object} file - File object for which to generate docs
 * @returns {Promise} Resolves after running docs generation
 */
function generateDocForFile(file) {
  return exec(
    `$(npm bin)/documentation build ${SRC_FOLDER}/${
      file.src
    } -f md -o ${API_DOCS_FOLDER}/${file.dest} --shallow`
  )
    .then(res => {
      console.log('Successfully generated', file.dest || file)
      return removeSeeFromMarkdown(
        `${process.cwd()}/${API_DOCS_FOLDER}/${file.dest}`
      )
      // return res
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
      if (err) {
        return reject(err)
      }
      const cleanedFileNames = files.filter(
        fileName => !pathsToSkip.includes(fileName)
      )
      const mappedFileNames = cleanedFileNames.map(fileName => {
        const newName = fileRenames[fileName] || fileName
        return { src: fileName, dest: `${newName.replace('.js', '')}.md` }
      })
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

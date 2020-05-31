const exec = require('child-process-promise').exec
const version = require('../package.json').version

/**
 * NOTE: Split into two arrays because gsutil acts differently when
 * no files exist at a location. First array includes at least one file for each
 * folder that will be copied in the second.
 */
const first = [
  '_book/index.html',
  '_book/search_index.json',
  '_book/gitbook/gitbook.js',
  '_book/docs/GLOSSARY.md'
]

const second = ['_book/gitbook/**', '_book/docs/**']

const project = 'docs.react-redux-firebase.com'

/**
 * Run shell command with error handling.
 * @param  {string} cmd - Command to run
 * @returns {Promise} Resolves with stdout of running command
 * @private
 */
function runCommand(cmd) {
  return exec(cmd).catch((err) =>
    Promise.reject(
      err.message && err.message.indexOf('not found') !== -1
        ? new Error(`${cmd.split(' ')[0]} must be installed to upload`)
        : err
    )
  )
}

/**
 * Upload file or folder to cloud storage. gsutil is used instead of
 * google-cloud/storage module so that folders can be uploaded.
 * @param  {string} entityPath - Local path for entity (file/folder) to upload
 * @returns {Promise} Resolve with an object containing stdout and uploadPath
 * @private
 */
function upload(entityPath) {
  const prefix = `history/v${version.split('-')[0]}`
  const uploadPath = `${project}/${prefix}/${entityPath
    .replace('_book/', '')
    .replace('/**', '')}`
  const command = `gsutil -m cp -r -a public-read ${entityPath} gs://${uploadPath}`
  return runCommand(command).then(({ stdout, stderr }) =>
    stdout ? Promise.reject(stdout) : { output: stderr, uploadPath }
  )
}

/**
 * Upload list of files or folders to Google Cloud Storage
 * @param  {Array} files - List of files/folders to upload
 * @returns {Promise} Resolves with an array of upload results
 * @private
 */
function uploadList(files) {
  return Promise.all(
    files.map((file) =>
      upload(file)
        .then(({ uploadPath, output }) => {
          console.log(`Successfully uploaded: ${uploadPath}`) // eslint-disable-line no-console
          return output
        })
        .catch((err) => {
          console.log('Error uploading:', err.message || err) // eslint-disable-line no-console
          return Promise.reject(err)
        })
    )
  )
}

;(function () {
  runCommand('gsutil') // check for existence of gsutil
    .then(() => uploadList(first))
    .then(() => uploadList(second))
    .then(() => {
      console.log('Docs uploaded successfully') // eslint-disable-line no-console
      process.exit(0)
    })
    .catch((err) => {
      console.log('Error uploading docs:', err.message) // eslint-disable-line no-console
      process.exit(1)
    })
})()

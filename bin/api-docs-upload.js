const exec = require('child-process-promise').exec
const { version } = require('../package.json')

/**
  NOTE: Split into two arrays because gsutil acts differently when
  no files exist at a location. First array includes at least one file for each
  folder that will be copied in the second.
*/
const first = [
  '_book/index.html',
  '_book/search_index.json',
  '_book/gitbook/gitbook.js',
  '_book/docs/README.md'
]

const second = [
  '_book/gitbook/**',
  '_book/docs/**'
]

const project = 'docs.react-redux-firebase.com'

const runCommand = (cmd) => {
  const baseCommand = cmd.split(' ')[0]
  return exec(baseCommand)
    .catch((err) => {
      if (err.message.indexOf('not found') !== -1) {
        return Promise.reject(new Error(`${baseCommand} must be installed to upload`))
      }
      return Promise.reject(err)
    })
}

const upload = (fileOrFolder) => {
  const prefix = `history/testing2/${version.split('-')[0]}`
  const uploadPath = `${project}/${prefix}/${fileOrFolder.replace('_book/', '').replace('/**', '')}`
  return runCommand(`gsutil -m cp -r -a public-read ${fileOrFolder} gs://${uploadPath}`)
    .then((stdout) => ({ stdout, uploadPath }))
}

const uploadList = (files) => {
  return Promise.all(
    files.map(file =>
      upload(file)
        .then(({ uploadPath }) => {
          console.log(`Successfully uploaded: ${uploadPath}`) // eslint-disable-line no-console
          return file
        })
    )
  )
}

(function () {
  uploadList(first)
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

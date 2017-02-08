/* eslint-disable import/no-extraneous-dependencies */
const _debug = require('debug') // eslint-disable-line no-underscore-dangle
const exec = require('child_process').exec

const debug = _debug('app:build:deploy')
const {
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST,
  FIREBASE_TOKEN,
  NODE_ENV
} = process.env
let projectName = 'dev' // default project

const deployToFirebase = (cb) => {
  debug('Checking for deploy...')
  if (!!TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST !== 'false') {
    debug('Skipping Firebase Deploy - Build is a Pull Request')
    return
  }

  if (TRAVIS_BRANCH !== 'prod' && TRAVIS_BRANCH !== 'stage' && TRAVIS_BRANCH !== 'master') {
    debug('Skipping Firebase Deploy - Build is a not a Build Branch', TRAVIS_BRANCH)
    return
  }

  if (!FIREBASE_TOKEN) {
    debug('Error: FIREBASE_TOKEN env variable not found.\n' +
      'Use firebase-tools to run the firebase login:ci command to generate a'+
      'token and make sure it is set to the TOKEN env variable.'
    )
    cb('Error: FIREBASE_TOKEN env variable not found', null)
    return
  }

  debug('Deploying to Firebase...')

  if (TRAVIS_BRANCH === 'prod' || TRAVIS_BRANCH === 'stage') {
    projectName = TRAVIS_BRANCH
  }

  exec(`firebase deploy --token ${FIREBASE_TOKEN} --project ${projectName}`, (error, stdout) => {
    if (error !== null) {
      if (cb) {
        cb(error, null)
        return
      }
    }
    if (cb) {
      cb(null, stdout)
    }
  })
};

(function () { // eslint-disable-line
  deployToFirebase((err, stdout) => {
    if (err || !stdout) {
      debug('error deploying to Firebase: ', err)
      return
    }
    debug(stdout) // log output of firebase cli
    debug('\nSuccessfully deployed to Firebase')
  })
})()

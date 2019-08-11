module.exports = {
  extends: '../.eslintrc.js',

globals:{ 
  sinon: true,
  expect: true,
  after: true,
  afterEach: true,
  before: true,
  beforeEach: true,
  it: true,
  describe: true,
  Firebase: true,
  firebase: true,
  fbConfig: true,
  uid: true,
  existingProfile: true
},

rules: {
 'no-unused-expressions': [0]
}
}

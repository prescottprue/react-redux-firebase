import { validateConfig } from '../../../src/utils'
const validConfig = {
  databaseURL: 'asdfasdf',
  authDomain: 'asdfasdf',
  apiKey: 'asdfasdf'
}
const invalidConfig = {
  fileMetadataFactory: 'asdfasdf'
}
describe('Utils: Index', () => {
  describe('validateConfig', () => {
    it('throws for missing param', () => {
      expect(() => validateConfig(Object.assign(invalidConfig))).to.throw('databaseURL is a required config parameter for react-redux-firebase')
    })
    it('throws for function param not being function', () => {
      expect(() => validateConfig(Object.assign(validConfig, invalidConfig))).to.throw('fileMetadataFactory parameter in react-redux-firebase config must be a function. check your compose function.')
    })
  })
})

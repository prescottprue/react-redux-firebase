/* global describe expect it beforeEach */
import {
  watchEvent,
  unWatchEvent,
  watchEvents,
  unWatchEvents
} from '../../../src/actions/query'
import Firebase from 'firebase'
const apiKey = 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots'
const authDomain = 'redux-firebasev3.firebaseapp.com'
const databaseURL = 'https://redux-firebasev3.firebaseio.com'
const testFbConfig = {
  databaseURL,
  apiKey,
  authDomain
}
let firebase
describe('Actions: Query', () => {
  beforeEach(() => {
    // TODO: Set up a firebase (real for now, fake later) and store (for dispatch)
    // Initialize Firebase
    try {
      Firebase.initializeApp(testFbConfig)
    } catch (err) {}

    firebase = Object.defineProperty(Firebase, '_', {
      value: {
        watchers: {},
        config: testFbConfig,
        authUid: null
      },
      writable: true,
      enumerable: true,
      configurable: true
    })
  })
  describe('watchEvent', () => {
    it('is exported', () => {
      expect(watchEvent).to.be.a.function
    })
    it('runs given basic params', () => {
      watchEvent(firebase, () => {}, { type: 'once', path: 'projects' }, 'projects', 'projects')
    })

    describe.skip('populate', () => {
      it('populates id with string', () => {
        // TODO: Confirm that SET action is dispatched with populated data
      })
      it('populates id with object', () => {
        // TODO: Confirm that SET action is dispatched with populated data
      })
      it('handles invalid population id', () => {
        // TODO: Confirm that SET action is dispatched with populated data
      })
    })
    describe.skip('query types', () => {
      it('once query', () => {
        // TODO: Test that SET action is dispatched with data
      })
      it('on query', () => {
        // TODO: Confirm that stubbed version of firebase is called
        // TODO: Confirm that SET action is dispatched correctly
      })
    })
    describe.skip('filters', () => {
      it('orderByValue', () => {

      })
      it('orderByPriority', () => {

      })
      it('orderByKey', () => {

      })
      it('orderByChild', () => {

      })
      it('limitToFirst', () => {

      })
      it('limitToLast', () => {

      })
      it('equalTo', () => {

      })
      it('startAt', () => {

      })
      it('endAt', () => {

      })
    })
  })
  describe('unWatchEvent', () => {
    it('is exported', () => {
      expect(unWatchEvent).to.be.a.function
    })
    it('runs given basic params', () => {
      unWatchEvent(firebase, () => {}, 'once', 'projects', 'projects')
    })
  })
  describe('watchEvents', () => {
    it('is exported', () => {
      expect(watchEvents).to.be.a.function
    })
    it('runs given basic params', () => {
      watchEvents(firebase, () => {}, [{type: 'once', path: 'test'}])
    })
  })
  describe('unWatchEvents', () => {
    it('is exported', () => {
      expect(unWatchEvents).to.be.a.function
    })
    it('runs given basic params', () => {
      unWatchEvents(firebase, [{type: 'value', path: 'test'}])
    })
  })
})

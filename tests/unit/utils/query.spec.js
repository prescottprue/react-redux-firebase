/* global describe expect it beforeEach */
import {
  getWatchPath,
  setWatcher,
  getWatcherCount,
  unsetWatcher,
  getQueryIdFromPath,
  applyParamsToQuery
} from '../../../src/utils/query'
let createQueryFromParams = (queryParams) =>
  applyParamsToQuery(queryParams, Firebase.database().ref())
const dispatch = () => {}
describe('Utils: Query', () => {
  describe('getWatchPath', () => {
    it('handles basic path', () => {
      expect(getWatchPath('once', '/todos')).to.be.a.string
    })
    it('throws for no event', () => {
      expect(() => getWatchPath(null, '/todos')).to.throw('Event and path are required')
    })
    it('throws for no path', () => {
      expect(() => getWatchPath(null, null)).to.throw('Event and path are required')
    })
  })

  describe('setWatcher', () => {
    beforeEach(() => {
      Firebase._.watchers = {
        'once:/todos': 1
      }
    })
    it('handles incrementating path watcher count', () => {
      setWatcher(Firebase, 'once', '/todos')
      expect(Firebase._.watchers['once:/todos']).to.equal(2)
    })
    it('handles basic path', () => {
      setWatcher(Firebase, 'once', '/todo')
      expect(Firebase._.watchers['once:/todo']).to.equal(1)
    })
  })

  describe('getWatcherCount', () => {
    it('returns watcher count', () => {
      expect(getWatcherCount(Firebase, 'once', '/todos')).to.equal(1)
    })
  })

  describe('unsetWatcher', () => {
    beforeEach(() => {
      Firebase._.watchers = {
        'value:/todos': 1,
        'value:/todo': 2
      }
    })
    it('removes single watcher', () => {
      unsetWatcher(Firebase, dispatch, 'value', '/todos')
      expect(Firebase._.watchers['value:/todos']).to.be.undefined
    })
    it('decrements existings watcher count', () => {
      unsetWatcher(Firebase, dispatch, 'value', '/todo')
      expect(Firebase._.watchers['value:/todos']).to.equal(1)
    })
  })

  describe('getQueryIdFromPath', () => {
    it('handles basic path', () => {
      expect(getQueryIdFromPath('/todos')).to.be.a.string
    })
    it('handles split param', () => {
      expect(getQueryIdFromPath('/todos#orderByChild=uid')).to.be.a.string
    })
    it('handles query id in path', () => {
      expect(getQueryIdFromPath('/todos#queryId=value:/todos')).to.be.a.string
    })
  })

  describe('applyParamsToQuery', () => {
    it('orderByValue', () => {
      expect(createQueryFromParams(['orderByValue=uid'])).to.be.an.object
    })
    it('orderByPriority', () => {
      expect(createQueryFromParams(['orderByPriority=uid'])).to.be.an.object
    })
    it('orderByKey', () => {
      expect(createQueryFromParams(['orderByKey'])).to.be.an.object
    })
    it('orderByChild', () => {
      expect(createQueryFromParams(['orderByChild=uid'])).to.be.an.object
    })
    it('limitToFirst', () => {
      expect(createQueryFromParams(['limitToFirst=1'])).to.be.an.object
    })
    it('limitToLast', () => {
      expect(createQueryFromParams(['limitToLast=1'])).to.be.an.object
    })
    it('equalTo', () => {
      expect(createQueryFromParams(['equalTo=uid'])).to.be.an.object
    })
    it('startAt', () => {
      expect(createQueryFromParams(['startAt=uid'])).to.be.an.object
    })
    it('endAt', () => {
      expect(createQueryFromParams(['endAt=uid'])).to.be.an.object
    })
  })
})

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

describe('Utils: Query', () => {
  describe('getWatchPath', () => {
    it('handles basic path', () => {
      expect(getWatchPath('once', '/todos')).to.be.a.string
    })
  })
  describe('setWatcher', () => {
    it('handles basic path', () => {
      expect(setWatcher(Firebase, 'once', '/todos')).to.be.a.string
    })
  })
  describe('getWatcherCount', () => {
    it('returns watcher count', () => {
      expect(getWatcherCount(Firebase, 'once', '/todos')).to.equal(1)
    })
  })
  describe('unsetWatcher', () => {
    it('returns watcher count', () => {
      expect(unsetWatcher(Firebase, 'value', '/todos'))
    })
  })
  describe('getQueryIdFromPath', () => {
    it('handles basic path', () => {
      expect(getQueryIdFromPath('/todos')).to.be.a.string
    })
    it('handles split param', () => {
      expect(getQueryIdFromPath('/todos#orderByChild=uid')).to.be.a.string
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

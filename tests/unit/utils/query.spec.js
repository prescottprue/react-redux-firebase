import {
  getWatchPath,
  setWatcher,
  getWatcherCount,
  unsetWatcher,
  getQueryIdFromPath,
  applyParamsToQuery
} from '../../../src/utils/query'
const fakeFirebase = {
  _: {
    authUid: '123',
    config: {
      userProfile: 'users',
      disableRedirectHandling: true
    }
  },
  database: () => ({
    ref: () => ({
      orderByValue: () => ({
        on: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      }),
      orderByPriority: () => ({
        startAt: (startParam) => startParam,
        toString: () => 'priority'
      }),
      orderByChild: (child) => ({
        equalTo: (equalTo) => ({
          child,
          equalTo
        }),
        toString: () => child
      }),
      orderByKey: () => ({ }),
      limitToFirst: () => ({ }),
      limitToLast: () => ({ }),
      equalTo: () => ({ }),
      startAt: () => ({ }),
      endAt: () => ({ })
    })
  })
}
let createQueryFromParams = (queryParams) =>
  applyParamsToQuery(queryParams, fakeFirebase.database().ref())
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

    describe('orderByPriority', () => {
      it('handles single parameter', () => {
        expect(createQueryFromParams(['orderByPriority']).toString())
          .to.equal('priority')
      })

      describe('with startAt', () => {
        it('string containing number', () => {
          const startAt = '123abc'
          expect(createQueryFromParams(['orderByPriority', `startAt=${startAt}`]).toString())
            .to.equal(startAt)
        })
      })
    })

    it('orderByKey', () => {
      expect(createQueryFromParams(['orderByKey'])).to.be.an.object
    })

    describe('orderByChild', () => {
      it('handles single parameter', () => {
        const queryParams = createQueryFromParams(['orderByChild=uid'])
        expect(queryParams.toString()).to.equal('uid')
      })

      describe('with equalTo', () => {
        it('number', () => {
          const child = 'emailAddress'
          const equalTo = 1
          const queryParams = createQueryFromParams([`orderByChild=${child}`, `equalTo=${equalTo}`])
          expect(queryParams.child)
            .to
            .equal(child)
          expect(queryParams.equalTo)
            .to
            .equal(equalTo)
        })
        it('boolean', () => {
          const child = 'completed'
          const equalTo = false
          const queryParams = createQueryFromParams([`orderByChild=${child}`, `equalTo=${equalTo}`])
          expect(queryParams.child)
            .to
            .equal(child)
          expect(queryParams.equalTo)
            .to
            .equal(equalTo)
        })
        it('string containing a boolean', () => {
          const child = 'emailAddress'
          const equalTo = 'true'
          const queryParams = createQueryFromParams([`orderByChild=${child}`, `equalTo=${equalTo}`])
          expect(queryParams.child)
            .to
            .equal(child)
          expect(queryParams.equalTo)
            .to
            .equal(true)
        })
        it('string containing null', () => {
          const child = 'emailAddress'
          const equalTo = 'null'
          const queryParams = createQueryFromParams([`orderByChild=${child}`, `equalTo=${equalTo}`])
          expect(queryParams.child)
            .to
            .equal(child)
          expect(queryParams.equalTo)
            .to
            .equal(null)
        })
        it('string containing a number', () => {
          const child = 'emailAddress'
          const equalTo = '123example@gmail.com'
          const queryParams = createQueryFromParams([`orderByChild=${child}`, `equalTo=${equalTo}`])
          expect(queryParams.child)
            .to
            .equal(child)
          expect(queryParams.equalTo)
            .to
            .equal(equalTo)
        })
      })
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

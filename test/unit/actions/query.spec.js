import {
  watchEvent,
  unWatchEvent,
  watchEvents,
  unWatchEvents,
  remove
} from '../../../src/actions/query'
import { actionTypes } from '../../../src/constants'
let spy
const dispatch = () => {}

describe('Actions: Query', () => {
  beforeEach(() => {
    spy = sinon.spy(dispatch)
  })

  describe('watchEvent', () => {
    it('is exported', () => {
      expect(watchEvent).to.be.a.function
    })

    it('throws if Firebase database has not been included', () => {
      expect(() => watchEvent({})).to.Throw(
        'Firebase database is required to create watchers'
      )
    })

    it('runs given basic params', () => {
      expect(
        watchEvent(
          firebase,
          dispatch,
          { type: 'once', path: 'projects' },
          'projects'
        )
      ).to.eventually.be.an.object
    })

    it('runs given first_child', () => {
      expect(
        watchEvent(
          firebase,
          dispatch,
          { type: 'first_child', path: 'projects' },
          'projects'
        )
      ).to.eventually.be.an.object
    })

    it('runs value query', () => {
      expect(
        watchEvent(
          firebase,
          dispatch,
          { type: 'value', path: 'projects' },
          'projects'
        )
      )
    })

    it('handles populates', () => {
      expect(
        watchEvent(
          firebase,
          dispatch,
          {
            type: 'value',
            path: 'projects',
            populates: [{ child: 'uid', root: 'users' }]
          },
          'projects'
        )
      )
    })

    it('throws for null type', () => {
      expect(() =>
        watchEvent(firebase, dispatch, { path: 'projects' }, 'projects')
      ).to.Throw
    })

    it('refcounts watching and unwatching of equal path', () => {
      let projectPath = { type: 'value', path: 'projects/test' }
      let numWatchers = () => Object.values(firebase._.watchers).length
      let numWatchersBefore = numWatchers()
      expect(watchEvent(firebase, dispatch, projectPath, 'projects'))
      expect(watchEvent(firebase, dispatch, projectPath, 'projects'))
      expect(numWatchers() - numWatchersBefore).to.be.equal(1)
      expect(unWatchEvent(firebase, dispatch, projectPath, 'projects'))
      expect(numWatchers() - numWatchersBefore).to.be.equal(1)
      expect(unWatchEvent(firebase, dispatch, projectPath, 'projects'))
      expect(numWatchers() - numWatchersBefore).to.be.equal(0)
    })
  })

  describe('unWatchEvent', () => {
    it('is exported', () => {
      expect(unWatchEvent).to.be.a.function
    })

    it('runs given basic params', () => {
      expect(
        unWatchEvent(firebase, dispatch, { type: 'once', path: 'projects' })
      ).to.be.a.function
    })
  })

  describe('watchEvents', () => {
    it('is exported', () => {
      expect(watchEvents).to.be.a.function
    })

    it('runs given basic params', () => {
      const events = [{ type: 'once', path: 'test' }]
      spy = sinon.spy(events, 'map')
      watchEvents(firebase, dispatch, events)
      expect(spy).to.be.calledOnce
    })

    it('throws if not passed array', () => {
      expect(() => watchEvents(firebase, dispatch, {})).to.Throw(
        'Events config must be an Array'
      )
    })
  })

  describe('unWatchEvents', () => {
    it('is exported', () => {
      expect(unWatchEvents).to.be.a.function
    })

    it('runs given basic params', () => {
      const events = [{ type: 'value', path: 'test' }]
      spy = sinon.spy(events, 'forEach')
      unWatchEvents(firebase, dispatch, events)
      expect(spy).to.be.calledOnce
    })

    it('throws for bad type', () => {
      const events = [{ path: 'test' }]
      spy = sinon.spy(events, 'forEach')
      expect(() => unWatchEvents(firebase, dispatch, events)).to.Throw
    })
  })

  describe('remove', () => {
    it('calls firebase.remove', async () => {
      const path = 'test'
      const removeSpy = sinon.spy(() => Promise.resolve({}))
      const fake = {
        database: () => ({ ref: () => ({ remove: removeSpy }) }),
        _: firebase._
      }
      await remove(fake, dispatch, path)
      expect(removeSpy).to.have.been.calledOnce
    })

    it('dispatches REMOVE action if dispatchRemoveAction: true', async () => {
      const path = 'test'
      const dispatchSpy = sinon.spy()
      firebase._.config.dispatchRemoveAction = true
      await remove(firebase, dispatchSpy, path)
      expect(dispatchSpy).to.have.been.calledOnce
      expect(dispatchSpy).to.have.been.calledWith({
        type: actionTypes.REMOVE,
        path
      })
      firebase._.config.dispatchRemoveAction = false
    })

    it.skip('calls onComplete if provided', async () => {
      const path = 'test'
      const onCompleteSpy = sinon.spy()
      await remove(firebase, dispatch, path, onCompleteSpy)
      expect(onCompleteSpy).to.have.been.calledOnce
    })

    it('dispatches ERROR if remove call has an error', async () => {
      const path = 'test'
      const dispatchSpy = sinon.spy()
      const removeSpy = sinon.spy(() => Promise.reject(path)) // eslint-disable-line prefer-promise-reject-errors
      const fake = {
        database: () => ({ ref: () => ({ remove: removeSpy }) }),
        _: firebase._
      }
      // Wrap in try/catch to catch thrown error
      try {
        await remove(fake, dispatchSpy, path)
        expect(dispatchSpy).to.have.been.calledOnce
        expect(dispatchSpy).to.have.been.calledWith({
          type: actionTypes.REMOVE,
          path
        })
      } catch (err) {
        // confirm the thrown error is the one from the test
        expect(err).to.equal(path)
      }
    })

    describe('options', () => {
      it('dispatchAction: false prevents dispatch of REMOVE action', async () => {
        const dispatchSpy = sinon.spy()
        const options = { dispatchAction: false }
        await remove(firebase, dispatchSpy, 'test', options)
        expect(dispatchSpy).to.have.callCount(0)
      })
    })
  })
})

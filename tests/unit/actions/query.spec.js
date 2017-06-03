import queryAction from '../../../src/actions/query'
import {
  watchEvent,
  unWatchEvent,
  watchEvents,
  unWatchEvents
} from '../../../src/actions/query'
import {
  unsetWatcher
} from '../../../src/utils/query'
let spy, unWatch
const dispatch = () => {

}
describe('Actions: Query', () => {
  beforeEach(() => {
    spy = sinon.spy(dispatch)
  })
  describe('watchEvent', () => {
    it('is exported', () => {
      expect(watchEvent).to.be.a.function
    })
    it('runs given basic params', () => {
      return watchEvent(firebase, dispatch, { type: 'once', path: 'projects' }, 'projects')
        .then((snap) => {
          expect(snap).to.be.an.object
        })
    }, 4000)
    it('runs given first_child', () => {
      return watchEvent(firebase, dispatch, { type: 'first_child', path: 'projects' }, 'projects')
        .then((snap) => {
          expect(snap).to.be.an.object
        })
    })
    it('runs value query', () => {
      expect(watchEvent(firebase, dispatch, { type: 'value', path: 'projects' }, 'projects'))
    })
    it('handles populates', () => {
      expect(watchEvent(firebase, dispatch, { type: 'value', path: 'projects', populates: [{ child: 'uid', root: 'users' }] }, 'projects'))
    })
    it('throws for null type', () => {
      expect(() => watchEvent(firebase, dispatch, { path: 'projects' }, 'projects')).to.Throw
    })
  })

  describe('unWatchEvent', () => {
    it('is exported', () => {
      expect(unWatchEvent).to.be.a.function
    })
    it('runs given basic params', () => {
      expect(unWatchEvent(firebase, dispatch, { type: 'once', path: 'projects' })).to.be.a.function
    })
  })

  describe('watchEvents', () => {
    it('is exported', () => {
      expect(watchEvents).to.be.a.function
    })
    it('runs given basic params', () => {
      const events = [{type: 'once', path: 'test'}]
      spy = sinon.spy(events, 'forEach')
      watchEvents(firebase, dispatch, events)
      expect(spy).to.be.calledOnce
    })
  })

  describe('unWatchEvents', () => {
    it('is exported', () => {
      expect(unWatchEvents).to.be.a.function
    })
    it('runs given basic params', () => {
      const events = [{type: 'value', path: 'test'}]
      spy = sinon.spy(events, 'forEach')
      unWatchEvents(firebase, dispatch, events)
      expect(spy).to.be.calledOnce
    })
    it('throws for bad type', () => {
      const events = [{path: 'test'}]
      spy = sinon.spy(events, 'forEach')
      expect(() => unWatchEvents(firebase, dispatch, events)).to.Throw
    })
  })
})

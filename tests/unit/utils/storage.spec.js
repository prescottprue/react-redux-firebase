import { deleteFile } from '../../../src/utils/storage'

const fakeFirebase = {
  _: {
    authUid: '123',
    config: {
      userProfile: 'users',
      disableRedirectHandling: true
    }
  },
  storage: () => ({
    ref: () => ({
      delete: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
    })
  }),
  database: () => ({
    ref: () => ({
      remove: () => Promise.resolve({ }),
      child: () => ({
        on: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      })
    })
  })
}

describe('Utils: Storage', () => {
  describe('deleteFile', () => {
    it('returns dbPath', () =>
      expect(deleteFile(fakeFirebase, { path: 'some', dbPath: 'some' })).to.eventually.have.keys(['path', 'dbPath'])
    )
    it('returns dbPath', () =>
      expect(deleteFile(fakeFirebase, { path: 'some' })).to.eventually.have.keys('path')
    )
  })
})

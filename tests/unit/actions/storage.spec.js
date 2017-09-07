import {
  uploadFileWithProgress,
  uploadFile,
  uploadFiles,
  deleteFile
} from '../../../src/actions/storage'

let spy
let unListen = sinon.spy()
const dispatch = () => {}
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
      child: () => ({
        on: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      }),
      remove: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
    })
  }),
  storage: () => ({
    ref: () => ({
      put: () => ({
        on: (event, funcsObj) => {
          funcsObj.next({bytesTransferred: 12, totalBytes: 12})
          funcsObj.error()
          funcsObj.complete()
          return () => unListen
        },
        then: () => Promise.resolve({})
      }),
      delete: () => Promise.resolve(({

      }))
    })
  })
}

fakeFirebase.storage.TaskEvent = { STATE_CHANGED: 'asdf' }

describe('Actions: Storage', () => {
  describe('uploadFileWithProgress', () => {
    beforeEach(() => {
      spy = sinon.spy(dispatch)
    })

    it('is exported', () => {
      expect(uploadFileWithProgress).to.be.a.function
    })

    // unListen is not a function due to storage not being mocked correctly
    it.skip('runs given basic params', () =>
      uploadFileWithProgress(dispatch, fakeFirebase, { path: 'projects', file: { name: 'test.png' } })
        .then((snap) => {
          expect(spy).to.have.been.calledOnce
          expect(snap).to.be.an.object
        })
    )
  })

  describe('uploadFile', () => {
    beforeEach(() => {
      spy = sinon.spy(dispatch)
    })

    it('is exported', () => {
      expect(uploadFile).to.be.a.function
    })

    it('runs given basic params', () =>
      expect(uploadFile(dispatch, fakeFirebase, { path: 'projects', file: { name: 'test.png' } }))
        .to
        .eventually
        .become({})
    )

    it('handles dbPath', () =>
      expect(uploadFile(dispatch, fakeFirebase, { path: 'projects', file: { name: 'test.png' }, dbPath: 'projects' }))
        .to
        .eventually
        .become({})
    )
  })

  describe('uploadFiles', () => {
    it('is exported', () => {
      expect(uploadFiles).to.be.a.function
    })
    // skipped due to unListen being undefined
    it.skip('runs given basic params', () =>
      uploadFiles(dispatch, fakeFirebase, { path: 'projects', files: { name: 'test.png' } })
        .then((snap) => {
          expect(snap).to.be.an.object
        })
    )
  })

  describe('deleteFile', () => {
    it('is exported', () => {
      expect(deleteFile).to.be.a.function
    })

    it('runs given path', () =>
      expect(deleteFile(dispatch, fakeFirebase, { path: 'projects' }))
        .to
        .eventually
        .become({path: 'projects'})
    )

    it('runs given basic params', () => {
      const metaObj = { path: 'projects/test.png', dbPath: 'test.png' }
      return expect(deleteFile(dispatch, fakeFirebase, metaObj))
        .to
        .eventually
        .become(metaObj)
    })
  })
})

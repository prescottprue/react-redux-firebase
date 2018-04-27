import {
  uploadFileWithProgress,
  uploadFile,
  uploadFiles,
  deleteFile
} from '../../../src/actions/storage'
import { fakeFirebase } from '../../utils'

let spy
const dispatch = () => {}
const defaultFileMeta = { path: 'projects', file: { name: 'test.png' } }

fakeFirebase.storage.TaskEvent = { STATE_CHANGED: 'asdf' }

describe('Actions: Storage', () => {
  describe('uploadFileWithProgress', () => {
    beforeEach(() => {
      spy = sinon.spy(dispatch)
    })

    it('is exported', () => {
      expect(uploadFileWithProgress).to.be.a.function
    })

    it.skip('runs given basic params', () =>
      uploadFileWithProgress(dispatch, fakeFirebase, {
        path: 'projects',
        file: { name: 'test.png' }
      }).then(snap => {
        expect(spy).to.have.been.calledOnce
        expect(snap).to.be.an.object
      }))
  })

  describe('uploadFile', () => {
    beforeEach(() => {
      spy = sinon.spy(dispatch)
    })

    it('is exported', () => {
      expect(uploadFile).to.be.a.function
    })

    it('throws if storage does not exist', async () => {
      expect(() => uploadFile(dispatch, {})).to.Throw(
        'Firebase storage is required to upload files'
      )
    })

    it('runs given basic params', async () => {
      const putSpy = sinon.spy(() => Promise.resolve({}))
      const fake = {
        storage: () => ({ ref: () => ({ put: putSpy }) }),
        _: firebase._
      }
      await uploadFile(spy, fake, {
        path: 'projects',
        file: { name: 'test.png' }
      })
      // firebase.storage() put method is called
      expect(putSpy).to.have.been.calledOnce
      // dispatch is called twice (once for FILE_UPLOAD_START, the other for FILE_UPLOAD_COMPLETE)
      expect(spy).to.have.been.calledTwice
    })

    it('skips straight to dispatch if firebase.database does not exist when dbPath is included', async () => {
      const putSpy = sinon.spy(() => Promise.resolve({}))
      const fake = {
        storage: () => ({ ref: () => ({ put: putSpy }) }),
        _: firebase._
      }
      await uploadFile(spy, fake, { ...defaultFileMeta, dbPath: 'test' })
      // firebase.storage() put method is called
      expect(putSpy).to.have.been.calledOnce
      // dispatch is called twice (once for FILE_UPLOAD_START, the other for FILE_UPLOAD_COMPLETE)
      expect(spy).to.have.been.calledTwice
    })

    it('handles dbPath', async () => {
      const res = await uploadFile(dispatch, fakeFirebase, {
        ...defaultFileMeta,
        dbPath: 'projects'
      })
      expect(res).to.be.an.object
    })

    it('calls database.push', async () => {
      const putSpy = sinon.spy(() =>
        Promise.resolve({
          metadata: {
            name: 'file.png',
            fullPath: 'test',
            downloadURLs: [{ path: 'asdf' }]
          }
        })
      )
      const pushSpy = sinon.spy(() => Promise.resolve({}))
      const fake = {
        storage: () => ({ ref: () => ({ put: putSpy }) }),
        database: Object.assign(() => ({ ref: () => ({ push: pushSpy }) }), {
          ServerValue: { TIMESTAMP: 123 }
        }),
        _: firebase._
      }
      await uploadFile(spy, fake, { ...defaultFileMeta, dbPath: 'test' })
      // firebase.storage() put method is called
      expect(putSpy).to.have.been.calledOnce
      // firebase.storage() put method is called
      expect(pushSpy).to.have.been.calledOnce
      // dispatch is called twice (once for FILE_UPLOAD_START, the other for FILE_UPLOAD_COMPLETE)
      expect(spy).to.have.been.calledTwice
    })

    it('dispatches for errors and rejects', async () => {
      const putSpy = sinon.spy(() => Promise.reject(new Error('Test')))
      const fake = {
        storage: () => ({ ref: () => ({ put: putSpy }) }),
        _: firebase._
      }
      try {
        await uploadFile(spy, fake, { ...defaultFileMeta, dbPath: 'test' })
      } catch (err) {
        expect(err.message).to.equal('Test')
      }
      // firebase.storage() put method is called
      expect(putSpy).to.have.been.calledOnce
      // dispatch is called twice (once for FILE_UPLOAD_START, the other for FILE_UPLOAD_COMPLETE)
      expect(spy).to.have.been.calledTwice
    })

    describe('options', () => {
      let putSpy
      let fake
      let refSpy

      beforeEach(() => {
        putSpy = sinon.spy(() =>
          Object.assign(Promise.resolve({}), { on: sinon.spy() })
        )
        refSpy = sinon.spy(() => ({ put: putSpy }))
        fake = {
          storage: Object.assign(
            () => ({
              ref: refSpy
            }),
            {
              TaskEvent: { STATE_CHANGED: 'STATE_CHANGED' }
            }
          ),
          _: firebase._
        }
      })

      describe('name option', () => {
        it('renames file given a string', async () => {
          const options = { name: 'newname.png' }
          await uploadFile(spy, fake, { ...defaultFileMeta, options })
          // dispatch is called
          expect(putSpy).to.have.been.calledWith({
            name: defaultFileMeta.file.name
          })
        })

        it('renames file name given a function', async () => {
          const nameFunc = sinon.spy()
          const options = { name: nameFunc }
          await uploadFile(spy, fakeFirebase, { ...defaultFileMeta, options })
          // firebase.storage() put method is called
          expect(nameFunc).to.have.been.calledOnce
        })
      })

      describe('progress option', () => {
        it('dispatches FILE_UPLOAD_START and FILE_UPLOAD_COMPLETE', async () => {
          const options = { progress: true }
          await uploadFile(spy, fake, { ...defaultFileMeta, options })
          // firebase.storage() put method is called
          expect(putSpy).to.have.been.calledOnce
          // dispatch is called twice (once for FILE_UPLOAD_START, next for FILE_UPLOAD_COMPLETE)
          expect(spy).to.have.been.calledTwice
        })

        it('works with name option', async () => {
          const options = { progress: true, name: 'someName' }
          await uploadFile(spy, fake, { ...defaultFileMeta, options })
          // firebase.storage() put method is called
          expect(refSpy).to.have.been.calledWith(
            `${defaultFileMeta.path}/${options.name}`
          )
          expect(putSpy).to.have.been.calledWith({
            name: defaultFileMeta.file.name
          })
        })
      })
    })
  })

  describe('uploadFiles', () => {
    it('is exported', () => {
      expect(uploadFiles).to.be.a.function
    })

    it('runs given basic params', () =>
      uploadFiles(dispatch, fakeFirebase, {
        path: 'projects',
        file: { name: 'test.png' }
      }).then(snap => {
        expect(snap).to.be.an.object
      }))
  })

  describe('deleteFile', () => {
    it('is exported', () => {
      expect(deleteFile).to.be.a.function
    })

    it('runs given path', () =>
      expect(
        deleteFile(dispatch, fakeFirebase, { path: 'projects' })
      ).to.eventually.become({ path: 'projects' }))

    it('runs given basic params', () => {
      const metaObj = { path: 'projects/test.png', dbPath: 'test.png' }
      return expect(
        deleteFile(dispatch, fakeFirebase, metaObj)
      ).to.eventually.become(metaObj)
    })
  })
})

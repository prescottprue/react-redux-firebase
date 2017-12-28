import { deleteFile } from '../../../src/utils/storage'
import { fakeFirebase } from '../../utils'

describe('Utils: Storage', () => {
  describe('deleteFile', () => {
    it('returns dbPath', () =>
      expect(deleteFile(fakeFirebase, { path: 'some', dbPath: 'some' }))
        .to.eventually.have.keys(['path', 'dbPath'])
    )
    it('returns dbPath', () =>
      expect(deleteFile(fakeFirebase, { path: 'some' }))
        .to.eventually.have.keys('path')
    )
  })
})

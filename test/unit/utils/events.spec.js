import { getEventsFromInput } from '../../../src/utils/events'

describe('Utils: Events', () => {
  describe('getEventsFromInput', () => {
    it('handles null path array', () => {
      expect(getEventsFromInput()).to.be.an.array
    })

    describe('path types', () => {
      it('throws for null', () => {
        expect(() => getEventsFromInput([null])).to.throw(Error)
      })

      it('accepts string', () => {
        expect(getEventsFromInput(['some'])[0]).to.include.keys('path')
      })

      describe('accepts object', () => {
        it('that is valid', () => {
          expect(getEventsFromInput([{ path: 'some' }])[0]).to.include.keys(
            'path'
          )
        })

        it('that has queryParams', () => {
          expect(
            getEventsFromInput([
              { path: 'some', queryParams: ['orderByChild=uid'] }
            ])[0]
          ).to.include.keys('path')
        })

        it('that is invalid', () => {
          expect(() => getEventsFromInput([{ type: 'value' }])).to.throw(
            'Path is a required parameter within definition object'
          )
        })
      })

      it('accepts array', () => {
        expect(getEventsFromInput([['somechild']])[0]).to.include.keys('path')
      })
    })

    describe('populate', () => {
      it('populates parameter set populates exist', () => {
        expect(
          getEventsFromInput(['some#populate=uid:users'])[0]
        ).to.include.keys('populates')
      })

      it('populates parameter not set if none exists', () => {
        expect(getEventsFromInput(['some'])[0]).to.not.include.keys('populates')
      })
    })
  })
})

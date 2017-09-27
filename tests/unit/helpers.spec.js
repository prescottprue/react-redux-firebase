import * as helpers from '../../src/helpers'

const exampleData = {
  data: {
    some: 'data',
    projects: {
      CDF: {
        owner: 'ABC',
        notes: {
          123: true
        },
        collaborators: {
          ABC: true,
          abc: true
        }
      },
      GHI: {
        owner: 'ABC'
      },
      OKF: {
        owner: 'asdfasdf',
        notes: {
          123: true
        },
        collaborators: {
          ABC: true,
          abc: true
        }
      },
      QRS: {
        owner: 'ABC',
        nested: {
          owner: 'ABC'
        },
        notes: {
          123: true
        },
        collaborators: {
          ABC: true,
          abc: true
        }
      }
    },
    users: {
      ABC: {
        displayName: 'scott'
      }
    },
    notes: {
      123: {
        text: 'Some Text'
      }
    },
    missing: {
      data: null
    }
  },
  ordered: {
    projects: [
      {
        owner: 'ABC',
        notes: {
          123: true
        },
        collaborators: {
          ABC: true,
          abc: true
        }
      }
    ]
  },
  timestamp: { 'some/path': { test: 'key' } },
  snapshot: { some: 'snapshot' }
}

describe('Helpers:', () => {
  describe.skip('ordered', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('ordered')
    })

    it('passes notSetValue', () => {
      expect(helpers.ordered(null, '/some', exampleData))
        .to
        .equal(exampleData)
    })

    it('gets data from state', () => {
      const path = 'projects'
      expect(JSON.stringify(helpers.ordered(exampleData, path, exampleData)))
        .to
        .equal(JSON.stringify(exampleData.ordered[path]))
    })

    it('returns state if its not an immutable Map', () => {
      const fakeState = { }
      expect(helpers.ordered(fakeState, 'asdf'))
        .to
        .equal(fakeState)
    })
  })

  describe('populate', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('populate')
    })

    it('passes notSetValue', () => {
      expect(helpers.populate(null, '/some', [], exampleData))
        .to
        .equal(exampleData)
    })

    it('returns undefined for non existant path', () => {
      expect(helpers.populate(exampleData, '/asdfasdfadsf', []))
        .to
        .equal(undefined)
    })

    it('returns null for null data', () => {
      expect(helpers.populate(exampleData, '/missing/data', []))
        .to
        .equal(null)
    })

    it('returns unpopulated data for no populates', () => {
      const path = 'projects'
      expect(helpers.populate(exampleData, path, []).CDF.owner)
        .to
        .equal(exampleData.data[path].CDF.owner)
    })

    describe('single', () => {
      describe('param', () => {
        it('populates value', () => {
          const path = 'projects/CDF'
          const rootName = 'users'
          const populates = [{ child: 'owner', root: rootName }]
          expect(helpers.populate(exampleData, path, populates).owner)
            .to
            .have
            .property('displayName', 'scott')
        })

        it('handles child path', () => {
          const path = 'projects/QRS'
          const rootName = 'users'
          const populates = [{ child: 'nested.owner', root: rootName }]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData.nested.owner)
            .to
            .have
            .property('displayName', 'scott')
        })
        it('populates childParam', () => {
          const path = 'projects/CDF'
          const rootName = 'users'
          expect(helpers.populate(exampleData, path, [{ child: 'owner', root: rootName, childParam: 'displayName' }]).owner)
            .to
            .have
            .equal('scott')
        })
        it('keeps non-existant children', () => {
          const path = 'projects/OKF'
          const rootName = 'users'
          expect(helpers.populate(exampleData, path, [{ child: 'owner', root: rootName }]).owner)
            .to
            .have
            .equal('asdfasdf')
        })
      })
      describe('list param', () => {
        it('populates values', () => {
          const path = 'projects/OKF'
          const rootName = 'users'
          const populates = [
            { child: 'collaborators', root: rootName }
          ]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData)
            .to
            .have
            .deep
            .property(`collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
        })
      })

      describe('config as function', () => {
        it('populates values', () => {
          const path = 'projects/CDF'
          const rootName = 'users'
          const populates = (projectKey, projectData) => ([
            // configure populates with key / data tuple...
            { child: 'owner', root: rootName }
          ])
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData.owner)
            .to
            .have
            .property('displayName', 'scott')
        })
      })
    })

    describe('list', () => {
      describe('single param', () => {
        it('populates value', () => {
          const path = 'projects'
          const rootName = 'users'
          const valName = 'CDF'
          expect(helpers.populate(exampleData, path, [{ child: 'owner', root: rootName }])[valName].owner)
            .to
            .have
            .property('displayName', 'scott')
        })

        it('populates childParam', () => {
          const path = 'projects'
          const rootName = 'users'
          const valName = 'CDF'
          expect(helpers.populate(exampleData, path, [{ child: 'owner', root: rootName, childParam: 'displayName' }])[valName].owner)
            .to
            .have
            .equal('scott')
        })
      })

      describe('list param', () => {
        it('populates values', () => {
          const path = 'projects'
          const rootName = 'users'
          const valName = 'OKF'
          const populates = [
            { child: 'collaborators', root: rootName }
          ]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData)
            .to
            .have
            .deep
            .property(`${valName}.collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
        })

        it('keeps non-existant children', () => {
          const path = 'projects'
          const rootName = 'users'
          const valName = 'OKF'
          const populates = [
            { child: 'collaborators', root: rootName }
          ]
          expect(helpers.populate(exampleData, path, populates))
            .to
            .have
            .deep
            .property(`${valName}.collaborators.abc`, true)
          expect(helpers.populate(exampleData, path, populates))
            .to
            .have
            .deep
            .property(`${valName}.collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
        })
      })
    })

    describe('multiple populates', () => {
      it('from different roots', () => {
        const path = 'projects'
        const rootName = 'users'
        const valName = 'CDF'
        const populates = [
          { child: 'owner', root: rootName },
          { child: 'notes', root: 'notes' }
        ]
        // check that notes are populated
        expect(helpers.populate(exampleData, `/${path}`, populates))
          .to
          .have
          .deep
          .property(`${valName}.notes.123.text`, exampleData.data.notes['123'].text)
        // check that owner is populated
        expect(helpers.populate(exampleData, `/${path}`, populates))
          .to
          .have
          .deep
          .property(`${valName}.owner.displayName`, exampleData.data.users['ABC'].displayName)
      })

      // Skipped since this is not currently supported
      it('from same root', () => {
        const path = 'projects'
        const rootName = 'users'
        const valName = 'CDF'
        const populates = [
          { child: 'owner', root: rootName },
          { child: 'collaborators', root: rootName }
        ]
        // TODO: Test both children are populated
        expect(helpers.populate(exampleData, `/${path}`, populates))
          .to
          .have
          .deep
          .property(`${valName}.owner.displayName`, exampleData.data[rootName].ABC.displayName)
        expect(helpers.populate(exampleData, `/${path}`, populates))
          .to
          .have
          .deep
          .property(`${valName}.collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
      })
    })
  })

  describe('isLoaded', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('isLoaded')
    })

    it('defaults to true when no arguments passed', () => {
      expect(helpers.isLoaded()).to.be.true
    })

    it('returns true when is loaded', () => {
      expect(helpers.isLoaded('some')).to.be.true
    })

    it('returns false when on argument is not loaded', () => {
      expect(helpers.isLoaded(undefined, {})).to.be.false
    })
  })

  describe('isEmpty', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('isEmpty')
    })

    it('returns false when not loaded', () => {
      expect(helpers.isEmpty('asdf')).to.be.false
    })

    it('returns true when is loaded', () => {
      expect(helpers.isEmpty([{}])).to.be.false
    })
  })
})

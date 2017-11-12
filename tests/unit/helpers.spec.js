import { get } from 'lodash'
import { exampleData } from '../mockData'
import * as helpers from '../../src/helpers'

describe('Helpers:', () => {
  describe('getVal', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('getVal')
    })
    it('passes notSetValue', () => {
      expect(helpers.getVal(null, 'some', []))
        .to
        .be
        .empty
    })

    it('gets top level data', () => {
      expect(helpers.getVal(exampleData, 'data/some'))
        .to
        .equal('data')
    })

    it('gets nested data', () => {
      expect(helpers.getVal(exampleData, 'data/projects/CDF'))
        .to
        .have
        .property('owner', 'ABC')
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

    describe('profile', () => {
      it('returns unpopulated data for no populates', () => {
        const path = 'profile'
        expect(helpers.populate(exampleData, path, []))
          .to
          .have
          .property('role', 'tester')
      })

      it('returns unpopulated data for invalid populate', () => {
        const path = 'profile'
        const populates = [{ child: 'role', root: 'users' }]
        expect(helpers.populate(exampleData, path, populates))
          .to
          .deep
          .property('role', 'tester')
      })

      it('populates a single parameter', () => {
        const path = 'profile'
        const populates = [{ child: 'role', root: 'roles' }]
        expect(helpers.populate(exampleData, path, populates))
          .to
          .deep
          .property('role.somePermission', true)
      })

      it('populates a list parameter', () => {
        const path = 'profile'
        const populates = [{ child: 'notes', root: 'notes' }]
        expect(helpers.populate(exampleData, path, populates))
          .to
          .deep
          .property('notes.123.text', get(exampleData, 'data.notes.123.text'))
      })
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

      it('works with ordered', () => {
        const path = 'ordered/projects/0'
        const rootName = 'users'
        const populates = [
          { child: 'owner', root: rootName }
        ]
        const populated = helpers.populate(exampleData, path, populates)
        expect(populated)
          .to
          .have
          .deep
          .property(`value.owner.displayName`, get(exampleData, `data.${rootName}.ABC.displayName`))
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

        it('populates value even when others are missing', () => {
          const path = 'projects'
          const rootName = 'users'
          const catRootName = 'categories'
          const valName = 'TUV'
          const populates = [
            { child: 'owner', root: rootName },
            { child: 'category', root: catRootName }
          ]
          expect(helpers.populate(exampleData, path, populates))
            .to
            .have
            .deep
            .property(`${valName}.owner.displayName`, 'scott')
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
          // Non matching collaborator
          expect(helpers.populate(exampleData, path, populates))
            .to
            .have
            .deep
            .property(`${valName}.collaborators.abc`, true)
          // Matching collaborator
          expect(helpers.populate(exampleData, path, populates))
            .to
            .have
            .deep
            .property(`${valName}.collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
        })
      })

      describe('config as function', () => {
        it('populates values', () => {
          const path = 'projects'
          const rootName = 'users'
          const valName = 'OKF'
          const populates = (projectKey, projectData) => ([
            // configure populates with key / data tuple...
            { child: 'collaborators', root: rootName }
          ])
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData)
            .to
            .have
            .deep
            .property(`${valName}.collaborators.ABC.displayName`, get(exampleData, `data.${rootName}.ABC.displayName`))
        })
      })

      describe('works with ordered data', () => {
        it('with list child', () => {
          const path = 'ordered/projects'
          const rootName = 'users'
          const populates = [
            { child: 'collaborators', root: rootName }
          ]
          const populatedArr = helpers.populate(exampleData, path, populates)
          expect(populatedArr[0])
            .to
            .have
            .deep
            .property(`value.collaborators.ABC.displayName`, get(exampleData, `data.${rootName}.ABC.displayName`))
        })

        it('with multiple populates', () => {
          const path = 'ordered/projects'
          const rootName = 'users'
          const populates = [
            { child: 'random' },
            { child: 'collaborators', root: rootName }
          ]
          const populatedArr = helpers.populate(exampleData, path, populates)
          expect(populatedArr[0])
            .to
            .have
            .deep
            .property(`value.collaborators.ABC.displayName`, get(exampleData, `data.${rootName}.ABC.displayName`))
        })

        it('with none existing child', () => {
          const path = 'ordered/projects'
          const populates = [
            { child: 'random' }
          ]
          const populatedArr = helpers.populate(exampleData, path, populates)
          expect(populatedArr[0])
            .to
            .have
            .deep
            .property(`value.collaborators.ABC`, true)
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

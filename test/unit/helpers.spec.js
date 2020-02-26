import { get } from 'lodash'
import { exampleData } from '../mockData'
import * as helpers from 'helpers'

let path
let valName
let rootName
let populates
let child

describe('Helpers:', () => {
  describe('getVal', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('getVal')
    })
    it('passes notSetValue', () => {
      expect(helpers.getVal(null, 'some', [])).to.be.empty
    })

    it('gets top level data', () => {
      expect(helpers.getVal(exampleData, 'data/some')).to.equal('data')
    })

    it('gets nested data', () => {
      expect(helpers.getVal(exampleData, 'data/projects/CDF')).to.have.property(
        'owner',
        'ABC'
      )
    })
  })

  describe('populate', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('populate')
    })

    it('passes notSetValue', () => {
      expect(helpers.populate(null, '/some', [], exampleData)).to.equal(
        exampleData
      )
    })

    it('returns undefined for non existant path', () => {
      expect(helpers.populate(exampleData, '/asdfasdfadsf', [])).to.equal(
        undefined
      )
    })

    it('returns null for null data', () => {
      expect(helpers.populate(exampleData, '/missing/data', [])).to.be.null
    })

    it('returns unpopulated data for no populates', () => {
      path = 'projects'
      expect(helpers.populate(exampleData, path, []).CDF.owner).to.equal(
        exampleData.data[path].CDF.owner
      )
    })

    describe('profile', () => {
      it('returns unpopulated data for no populates', () => {
        path = 'profile'
        expect(helpers.populate(exampleData, path, [])).to.have.property(
          'role',
          'tester'
        )
      })

      it('returns unpopulated data for invalid populate', () => {
        path = 'profile'
        populates = [{ child: 'role', root: 'users' }]
        expect(helpers.populate(exampleData, path, populates)).to.deep.property(
          'role',
          'tester'
        )
      })

      it('populates a single parameter', () => {
        path = 'profile'
        populates = [{ child: 'role', root: 'roles' }]
        expect(helpers.populate(exampleData, path, populates)).to.deep.property(
          'role.somePermission',
          true
        )
      })

      it('populates a list parameter', () => {
        path = 'profile'
        populates = [{ child: 'notes', root: 'notes' }]
        expect(helpers.populate(exampleData, path, populates)).to.deep.property(
          'notes.123.text',
          get(exampleData, 'data.notes.123.text')
        )
      })
    })

    describe('single', () => {
      beforeEach(() => {
        rootName = 'users'
      })

      describe('param', () => {
        it('populates value', () => {
          path = 'projects/CDF'
          populates = [{ child: 'owner', root: rootName }]
          expect(
            helpers.populate(exampleData, path, populates).owner
          ).to.have.property('displayName', 'scott')
        })

        it('handles child path', () => {
          path = 'projects/QRS'
          populates = [{ child: 'nested.owner', root: rootName }]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData.nested.owner).to.have.property(
            'displayName',
            'scott'
          )
        })

        it('populates childParam', () => {
          path = 'projects/CDF'
          expect(
            helpers.populate(exampleData, path, [
              { child: 'owner', root: rootName, childParam: 'displayName' }
            ])
          ).to.have.property('owner', 'scott')
        })

        it('populates childAlias', () => {
          path = 'projects/CDF'
          const child = 'owner'
          const childAlias = 'ownerObj'
          expect(
            helpers.populate(exampleData, path, [
              { child, root: rootName, childAlias }
            ])
          ).to.have.deep.property(`${childAlias}.displayName`, 'scott')
        })

        it('keeps non-existant children', () => {
          path = 'projects/OKF'
          expect(
            helpers.populate(exampleData, path, [
              { child: 'owner', root: rootName }
            ])
          ).to.have.property('owner', 'asdfasdf')
        })
      })

      describe('list param', () => {
        beforeEach(() => {
          rootName = 'users'
        })

        it('populates values by rtdb or firestore Map type', () => {
          path = 'projects/OKF'
          populates = [{ child: 'collaborators', root: rootName }]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData).to.have.deep.property(
            `collaborators.ABC.displayName`,
            exampleData.data[rootName].ABC.displayName
          )
        })

        it('populates values by firestore List type', () => {
          path = 'projects/CDF'
          populates = [{ child: 'userRank', root: rootName }]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData.userRank).to.be.instanceof(Array)
          expect(populatedData).to.have.deep.property(
            `userRank.0.displayName`,
            exampleData.data[rootName].user2.displayName
          )
        })
      })

      describe('config as function -', () => {
        it('populates values', () => {
          path = 'projects/CDF'
          populates = (projectKey, projectData) => [
            // configure populates with key / data tuple...
            { child: 'owner', root: rootName }
          ]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData.owner).to.have.property('displayName', 'scott')
        })
      })

      it('works with ordered', () => {
        path = 'ordered/projects/0'
        populates = [{ child: 'owner', root: rootName }]
        const populated = helpers.populate(exampleData, path, populates)
        expect(populated).to.have.deep.property(
          `value.owner.displayName`,
          get(exampleData, `data.${rootName}.ABC.displayName`)
        )
      })
    })

    describe('list', () => {
      describe('single param', () => {
        beforeEach(() => {
          path = 'projects'
          rootName = 'users'
        })

        it('populates value', () => {
          valName = 'CDF'
          expect(
            helpers.populate(exampleData, path, [
              { child: 'owner', root: rootName }
            ])[valName].owner
          ).to.have.property('displayName', 'scott')
        })

        it('populates value even when others are missing', () => {
          const catRootName = 'categories'
          valName = 'TUV'
          populates = [
            { child: 'owner', root: rootName },
            { child: 'category', root: catRootName }
          ]
          expect(
            helpers.populate(exampleData, path, populates)
          ).to.have.deep.property(`${valName}.owner.displayName`, 'scott')
        })

        it('populates childParam', () => {
          valName = 'CDF'
          const child = 'owner'
          const childParam = 'displayName'
          expect(
            helpers.populate(exampleData, path, [
              { child, root: rootName, childParam }
            ])
          ).to.have.deep.property(`${valName}.${child}`, 'scott')
        })

        it('populates childAlias', () => {
          const child = 'owner'
          const childAlias = 'ownerObj'
          valName = 'CDF'
          expect(
            helpers.populate(exampleData, path, [
              { child, root: rootName, childAlias }
            ])
          ).to.have.deep.property(
            `${valName}.${childAlias}.displayName`,
            'scott'
          )
        })
      })

      describe('list param', () => {
        beforeEach(() => {
          path = 'projects'
          rootName = 'users'
          valName = 'OKF'
        })

        it('populates values', () => {
          populates = [{ child: 'collaborators', root: rootName }]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData).to.have.deep.property(
            `${valName}.collaborators.ABC.displayName`,
            exampleData.data[rootName].ABC.displayName
          )
        })

        it('keeps non-existant children', () => {
          populates = [{ child: 'collaborators', root: rootName }]
          // Non matching collaborator
          expect(
            helpers.populate(exampleData, path, populates)
          ).to.have.deep.property(`${valName}.collaborators.abc`, true)
          // Matching collaborator
          expect(
            helpers.populate(exampleData, path, populates)
          ).to.have.deep.property(
            `${valName}.collaborators.ABC.displayName`,
            exampleData.data[rootName].ABC.displayName
          )
        })

        it('supports childParam', () => {
          populates = [
            {
              child: 'collaborators',
              root: rootName,
              childParam: 'displayName'
            }
          ]
          // Non matching collaborator
          expect(
            helpers.populate(exampleData, path, populates)
          ).to.have.deep.property(`${valName}.collaborators.abc`, true)
          // Matching collaborator
          expect(
            helpers.populate(exampleData, path, populates)
          ).to.have.deep.property(
            `${valName}.collaborators.ABC`,
            exampleData.data[rootName].ABC.displayName
          )
        })

        describe('populateByKey', () => {
          it('populates non key true', () => {
            path = 'projects'
            rootName = 'users'
            valName = 'OKF'
            let child = 'nonKeyTrue'
            populates = [
              {
                child,
                root: rootName,
                populateByKey: true
              }
            ]
            // Non matching collaborator
            expect(
              helpers.populate(exampleData, path, populates)
            ).to.have.deep.property(
              `${valName}.${child}.abc`,
              exampleData.data[path][valName][child].abc
            )
            // Matching collaborator
            expect(
              helpers.populate(exampleData, path, populates)
            ).to.have.deep.property(
              `${valName}.${child}.ABC.displayName`,
              exampleData.data[rootName].ABC.displayName
            )
          })

          it('does not populate if false', () => {
            path = 'projects'
            rootName = 'users'
            valName = 'OKF'
            child = 'nonKeyTrue'
            populates = [
              {
                child,
                root: rootName,
                populateByKey: false
              }
            ]
            // Non matching collaborator
            expect(
              helpers.populate(exampleData, path, populates)
            ).to.have.deep.property(
              `${valName}.${child}.abc`,
              exampleData.data[path][valName][child].abc
            )
            // Matching collaborator
            expect(
              helpers.populate(exampleData, path, populates)
            ).to.have.deep.property(
              `${valName}.${child}.ABC`,
              exampleData.data[path][valName][child].ABC
            )
          })
        })
      })

      describe('config as function', () => {
        it('populates values', () => {
          path = 'projects'
          rootName = 'users'
          valName = 'OKF'
          populates = (projectKey, projectData) => [
            // configure populates with key / data tuple...
            { child: 'collaborators', root: rootName }
          ]
          const populatedData = helpers.populate(exampleData, path, populates)
          expect(populatedData).to.have.deep.property(
            `${valName}.collaborators.ABC.displayName`,
            get(exampleData, `data.${rootName}.ABC.displayName`)
          )
        })
      })

      describe('works with ordered data', () => {
        beforeEach(() => {
          path = 'ordered/projects'
          rootName = 'users'
        })

        it('with list child', () => {
          populates = [{ child: 'collaborators', root: rootName }]
          const populatedArr = helpers.populate(exampleData, path, populates)
          expect(populatedArr[0]).to.have.deep.property(
            `value.collaborators.ABC.displayName`,
            get(exampleData, `data.${rootName}.ABC.displayName`)
          )
        })

        it('with multiple populates', () => {
          populates = [
            { child: 'random' },
            { child: 'collaborators', root: rootName }
          ]
          const populatedArr = helpers.populate(exampleData, path, populates)
          expect(populatedArr[0]).to.have.deep.property(
            `value.collaborators.ABC.displayName`,
            get(exampleData, `data.${rootName}.ABC.displayName`)
          )
        })

        it('with none existing child', () => {
          populates = [{ child: 'random' }]
          const populatedArr = helpers.populate(exampleData, path, populates)
          expect(populatedArr[0]).to.have.deep.property(
            `value.collaborators.ABC`,
            true
          )
        })
      })
    })

    describe('multiple populates', () => {
      beforeEach(() => {
        rootName = 'users'
        path = 'projects'
        valName = 'CDF'
      })

      it('from different roots', () => {
        populates = [
          { child: 'owner', root: rootName },
          { child: 'notes', root: 'notes' }
        ]
        // check that notes are populated
        expect(
          helpers.populate(exampleData, `/${path}`, populates)
        ).to.have.deep.property(
          `${valName}.notes.123.text`,
          exampleData.data.notes['123'].text
        )
        // check that owner is populated
        expect(
          helpers.populate(exampleData, `/${path}`, populates)
        ).to.have.deep.property(
          `${valName}.owner.displayName`,
          exampleData.data.users['ABC'].displayName
        )
      })

      it('from same root', () => {
        populates = [
          { child: 'owner', root: rootName },
          { child: 'collaborators', root: rootName }
        ]
        // TODO: Test both children are populated
        expect(
          helpers.populate(exampleData, `/${path}`, populates)
        ).to.have.deep.property(
          `${valName}.owner.displayName`,
          exampleData.data[rootName].ABC.displayName
        )
        expect(
          helpers.populate(exampleData, `/${path}`, populates)
        ).to.have.deep.property(
          `${valName}.collaborators.ABC.displayName`,
          exampleData.data[rootName].ABC.displayName
        )
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

  describe('fixPath', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('fixPath')
    })

    it('returns original path if no fix is required', () => {
      const originalPath = '/asdf'
      expect(helpers.fixPath(originalPath)).to.equal(originalPath)
    })

    it('adds / to beginning of path', () => {
      expect(helpers.fixPath('asdf')).to.equal('/asdf')
    })
  })
})

export const exampleData = {
  data: {
    some: 'data',
    projects: {
      CDF: {
        owner: 'ABC',
        category: 'cat1',
        notes: {
          123: true
        },
        collaborators: {
          ABC: true,
          abc: true
        }
      },
      GHI: {
        owner: 'ABC',
        category: 'cat2'
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
        category: 'cat1',
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
      },
      TUV: {
        owner: 'ABC',
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
    categories: {
      cat1: {
        displayName: 'magic'
      },
      cat2: {
        displayName: 'animals'
      }
    },
    notes: {
      123: {
        text: 'Some Text'
      }
    },
    missing: {
      data: null
    },
    roles: {
      tester: {
        somePermission: true
      }
    }
  },
  ordered: {
    projects: [
      {
        value: {
          owner: 'ABC',
          notes: {
            123: true
          },
          collaborators: {
            ABC: true,
            abc: true
          }
        },
        key: 'JKF'
      }
    ]
  },
  timestamp: { 'some/path': { test: 'key' } },
  snapshot: { some: 'snapshot' },
  profile: {
    role: 'tester',
    notes: {
      123: true
    }
  }
}

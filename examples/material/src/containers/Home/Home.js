import React, { Component, PropTypes } from 'react' // eslint-disable-line
import { connect } from 'react-redux'
import { map } from 'lodash'

import CircularProgress from 'material-ui/CircularProgress'

import './Home.css'

// redux-firebasev3
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, dataToJS } = helpers

@firebase(['/cars'])
@connect(
  // Map state to props
  ({firebase}) => ({
    cars: dataToJS(firebase, '/cars')
  })
)
export default class Home extends Component {
  static propTypes = {
    cars: PropTypes.object
  }

  render () {
    const { cars } = this.props
    return (
      <div className='Home'>
        <div>
          <div className='Home-Hero'>
            <div className='Home-Logo'>
              {
                isLoaded
                ? map(cars, (project, i) =>
                    <div key={`Project-${i}`}>
                      <span>
                        { project.name || 'no name'}
                      </span>
                    </div>
                  )
                : <CircularProgress size={2} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

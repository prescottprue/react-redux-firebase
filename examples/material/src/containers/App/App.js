import React, { Component, PropTypes } from 'react'

// Components
import Navbar from '../Navbar/Navbar'

// Themeing/Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './App.css'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class Main extends Component {

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme)
    }
  )

  render () {
    return (
      <div className='App'>
        <Navbar router={this.context.router}/>
        {this.props.children}
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import Todos from './Todos'
import LoginView from './LoginView'

function Home({ auth }) {
  // handle initial loading of auth
  if (!isLoaded(auth)) {
    return <div>Loading...</div>
  }

  // User is not logged in, show login view
  if (isEmpty(auth)) {
    return <LoginView />
  }

  return <Todos uid={auth.uid} />
}

Home.propTypes = {
  auth: PropTypes.object
}

export default connect(state => ({
  auth: state.firebase.auth
}))(Home)

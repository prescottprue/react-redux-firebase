import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

const Home = ({ auth }) => {
  // handle initial loading of auth
  if (!isLoaded(auth)) {
    return <div>Loading...</div>
  }

  if (isEmpty(auth)) {
    return <LoginView />
  }

  return <TodosView auth={auth} />
}

Home.propTypes = {
  auth: PropTypes.object
}

export default connect(
  ({ firebase: { auth } }) => ({ auth })
)(Home)

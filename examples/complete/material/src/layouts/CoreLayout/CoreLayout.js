import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'containers/Navbar'
import classes from './CoreLayout.scss'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className={classes.container}>
    <Navbar />
    <div className={classes.children}>{children}</div>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout

import React, { Component } from 'react' // eslint-disable-line

// Components
import Theme from 'theme'

import classes from './Home.scss'

export const Home = () => (
  <div className={classes['container']} style={{ color: Theme.palette.primary2Color }}>
    <h2>Home</h2>
  </div>
)

export default Home

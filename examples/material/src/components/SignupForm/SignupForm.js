import React, {Component, PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import './SignupForm.css'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '96%', marginBottom: '.5rem' }

export default class SignupForm extends Component {

  static propTypes = {
    account: PropTypes.object,
    onSignup: PropTypes.func.isRequired
  }

  state = { errors: {} }

  reset = () =>
    this.setState({
      errors: {},
      username: null,
      email: null,
      name: null
    })

  handleSignup = e => {
    e.preventDefault()
    const { username, email, password, errors } = this.state
    if (!username || !email || !password) {
      if (!username) errors.username = 'Username Is Required'
      if (!email) errors.email = 'Username Is Required'
      if (!password) errors.password = 'Username Is Required'
      return this.setState({ errors })
    }
    this.props.onSignup(this.state)
  }


  render () {
    const { errors } = this.state
    return (
      <form className='SignupForm' onSubmit={this.handleSignup}>
        <TextField
          hintText='username'
          floatingLabelText='Username'
          errorText={errors.username}
          onChange={({ target }) => { this.setState({username: target.value}) }}
          style={fieldStyle}
        />
        <TextField
          hintText='email'
          floatingLabelText='Email'
          errorText={errors.email}
          onChange={({ target }) => { this.setState({email: target.value}) }}
          style={fieldStyle}
        />
        <TextField
          hintText='password'
          floatingLabelText='Password'
          errorText={errors.password}
          onChange={({ target }) => { this.setState({password: target.value}) }}
          style={fieldStyle}
          type='password'
        />
        <div className='SignupForm-Submit'>
          <RaisedButton
            label='Sign Up'
            secondary
            type='submit'
            style={buttonStyle}
          />
        </div>
      </form>
    )
  }
}

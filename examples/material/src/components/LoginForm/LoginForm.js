import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import './LoginForm.css'
import TextField from 'material-ui/TextField'

const buttonStyle = { width: '100%' }
const fieldStyle = { width: '80%' }

export default class LoginForm extends Component {

  static propTypes = {
    account: PropTypes.object,
    onLogin: PropTypes.func
  }

  state = {
    errors: { email: null, password: null }
  }

  render () {
    const { account, onLogin } = this.props
    const { errors } = this.state
    return (
      <form className='LoginForm' onSubmit={onLogin}>
        <TextField
          floatingLabelText='Email'
          name="email"
          errorText={errors.email}
          style={fieldStyle}
        />
        <TextField
          floatingLabelText='Password'
          name='password'
          errorText={errors.password}
          style={fieldStyle}
        />
        <div className='LoginForm-Submit'>
          <RaisedButton
            label='Login'
            secondary
            type='submit'
            disabled={account && account.isFetching}
            style={buttonStyle}
          />
        </div>
        <div className='LoginForm-Options'>
          <div className='LoginForm-Remember'>
            <Checkbox
              name='remember'
              value='remember'
              label='Remember'
              labelStyle={{ fontSize: '.8rem' }}
            />
          </div>
          <Link className='LoginForm-Recover-Link' to='/recover'>
            Forgot Password?
          </Link>
        </div>
      </form>
    )
  }
}

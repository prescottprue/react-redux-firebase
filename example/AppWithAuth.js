import React, {Component, PropTypes} from 'react'
import { Provider } from 'react-redux'
import {connect} from 'react-redux'
import {firebase, helpers} from '../redux-react-firebase'
import { map } from 'lodash'


const {isLoaded, isEmpty,  dataToJS, pathToJS} = helpers

@firebase()
class TodoItem extends Component {
  render(){
    const {firebase, todo, id} = this.props
    const toggleDone = () => {
      firebase.set(`/todos/${id}/done`, !todo.done)
    }

    const deleteTodo = (event) => {
       firebase.remove(`/todos/${id}`)
    }
    return (
      <li>
        <input type="checkbox" checked={todo.done} onChange={toggleDone}/>
        {todo.text}
        <button onClick={deleteTodo}>Delete</button>
      </li>)
  }
}


@firebase( [
  ['/todos']
])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, '/todos'),
    profile: pathToJS(firebase, 'profile'),
  })
)
class Todos extends Component {

  render() {
    const {firebase, todos, profile} = this.props;

    const handleAdd = () => {
      const {newTodo} = this.refs
      firebase.push('/todos', {text:newTodo.value, done:false})
      newTodo.value = ''
    }

    const todosList = (!isLoaded(todos, profile)) ?
                          'Loading'
                        : (isEmpty(todos)) ?
                                'Todo list is empty'
                              : map(todos, (todo, id) => (<TodoItem key={id} id={id} todo={todo}/>) )


    const name = profile ? profile.name : ''
    return (
      <div>
        <p>Welcome {name}</p>
        <h1>Todos</h1>
        <ul>
          {todosList}
        </ul>
        <input type="text" ref="newTodo" />
        <button onClick={handleAdd}>Add</button>
      </div>
    )
  }

}

@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
  })
)
class Signup extends Component {
  render(){
    const {firebase, authError} = this.props

    const handleSignup = () => {
      const {email, password, name} = this.refs

      const credentials = {
        email: email.value,
        password: password.value
      }


      firebase.createUser(credentials, {name: name.value})
    }

    const error = (authError) ? authError.toString() : ''

    return(
      <div>
        <h1>Signup</h1>
        <input type='email' placeholder='Email' ref='email' /><br/>
        <input type='password' placeholder='Password' ref='password' /><br/>
        <input type='text' placeholder='Name' ref='name' />
        <p>{error}</p>
        <button onClick={handleSignup}>Signup</button>
      </div>
    )
  }
}


@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
  })
)
class Login extends Component {
  constructor(){
    super()
    this.state = {loading:false}
  }

  render(){
    const {firebase, authError} = this.props

    const handleLogin = () => {
      const {email, password} = this.refs

      const credentials = {
        email: email.value,
        password: password.value
      }


      firebase.login(credentials)
      this.state.loading = true
      this.setState(this.state)
    }

    const error = (authError) ?
                      authError.toString()
                    : (this.state.loading) ?
                              'loading'
                            : ''

    return(
      <div>
        <h1>Login</h1>
        <input type='email' placeholder='Email' ref='email' /><br/>
        <input type='password' placeholder='Password' ref='password' />
        <p>{error}</p>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}

@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
  })
)
class ResetPassword extends Component {
  constructor(){
    super()
    this.state = {loading:false}
  }

  render(){
    const {firebase, authError} = this.props

    const handleResetPassword = () => {
      const {email} = this.refs

      const credentials = {
        email: email.value
      }


      firebase.resetPassword(credentials)
      this.state.loading = true
      this.setState(this.state)
    }

    const error = (authError) ?
                      authError.toString()
                    : (this.state.loading) ?
                              'loading'
                            : ''

    return(
      <div>
        <h1>Reset Password</h1>
        <input type='email' placeholder='Email' ref='email' /><br/>
        <p>{error}</p>
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
    )
  }
}

@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
  })
)
class ChangePassword extends Component {
  constructor(){
    super()
    this.state = {loading:false}
  }

  render(){
    const {firebase, authError} = this.props

    const handleChangePassword = () => {
      const {email, oldPassword, newPassword} = this.refs

      const credentials = {
        email: email.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
      }


      firebase.changePassword(credentials)
      this.state.loading = true
      this.setState(this.state)
    }

    const error = (authError) ?
                      authError.toString()
                    : (this.state.loading) ?
                              'loading'
                            : ''

    return(
      <div>
        <h1>Reset Password</h1>
        <input type='email' placeholder='Email' ref='email' /><br/>
        <input type='password' placeholder='Old Password' ref='oldPassword' /><br/>
        <input type='password' placeholder='New Password' ref='newPassword' />
        <p>{error}</p>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    )
  }
}

@firebase()
@connect(
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile'),
  })
)
class Container extends Component {
  render(){
    const {firebase, auth, profile} = this.props

    const handleLogout = () => {
      firebase.logout()
    }

    const app = (<div>
                    <Todos />
                    <button onClick={handleLogout}>Logout</button>
                  </div>)

    const loading = '<div>Loading</div>'

    const login = (<div>
                      <Login />
                      <p>- or -</p>
                      <ResetPassword />
                      <p>- or -</p>
                      <ChangePassword />
                      <p>- or -</p>
                      <Signup />
                    </div>)

    if(auth === undefined) {
      return loading
    }

    if(!auth){
      return login
    }

    return app
  }
}


export default class AppWithAuth extends React.Component {

  render () {
    return (
        <Provider store={this.props.store}>
          <Container />
        </Provider>
    );
  }

}

import React, { PropTypes, Component } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS
} from 'react-redux-firebase'
import TodoItem from './TodoItem'

@connect(
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth')
  })
)
@firebaseConnect(({ auth }) => ([
  {
    path: 'projects',
    storeAs: 'myProjects',
    queryParams: [ `orderByChild=owner`, `equalTo=${auth ? auth.uid : '' }`] },
  {
    path: 'projects',
    storeAs: 'anonymousProjects',
    queryParams: [ `orderByChild=owner`, `equalTo=Anonymous`]
  },
]))
@connect(
  ({firebase}) => ({
    personalProjects: dataToJS(firebase, '/myProjects'), // path matches storeAs
    anonymousProjects: dataToJS(firebase, '/anonymousProjects') // path matches storeAs
  })
)
export default class App extends Component {
  static propTypes = {
    personalProjects: PropTypes.object,
    anonymousProjects: PropTypes.object
  }

  render () {
    const { personalProjects, anonymousProjects } = this.props

    const personalProjectsList = !isLoaded(personalProjects)
      ? 'Loading'
      : (isEmpty(personalProjects))
        ? 'Todo list is empty'
        : map(personalProjects, (todo, id) =>
            <TodoItem key={id} id={id} todo={todo} />
          )

    const anonymousProjectsList = !isLoaded(anonymousProjects)
                        ? 'Loading'
                        : isEmpty(anonymousProjects)
                          ? 'Todo list is empty'
                          : map(anonymousProjects, (todo, id) =>
                              <TodoItem key={id} id={id} todo={todo} />
                            )
    return (
      <div>
        <div>
          <h2>react-redux-firebase multiple queries demo</h2>
        </div>
        <div>
          <h4>Todos List</h4>
          {personalProjectsList}
          {anonymousProjectsList}
        </div>
      </div>
    )
  }
}

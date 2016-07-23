# redux-react-firebase
Use Firebase with React and Redux in ES6

## Features
- Integrated into redux
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed`
- queries support ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo` right now )
- Automatic binding/unbinding
- Declarative decorator syntax for React components
- Support for nested props
- Out of the box support for authentication (with auto load user profile)
- Lots of helper functions

## Install
```
$ npm install --save redux-react-firebase
```

## Use

Include redux-react-firebase in your store

```javascript
import {createStore, combineReducers, compose} from 'redux'
import {reduxReactFirebase, firebaseStateReducer} from 'redux-react-firebase'

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})
const config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
const createStoreWithFirebase = compose(
    reduxReactFirebase(config),
)(createStore)


store = createStoreWithFirebase(rootReducer, initialState)
```

In the components
```javascript
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

const {isLoaded, isEmpty, dataToJS} = helpers

@firebase( [
  'todos'
])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
  })
)
class Todos extends Component {

  render() {
    const {firebase, todos} = this.props;


    const todosList = (!isLoaded(todos)) ?
                          'Loading'
                        : (isEmpty(todos) ) ?
                              'Todo list is empty'
                            : _.map(todos, (todo, id) => (<TodoItem key={id} id={id} todo={todo}/>) )

    return (
      <div>
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

```

## API
See [API](API.md)

## Example
You can see a complete example [here](example)

## In the future
- Add support for new  Firebase version ( lib ver 3.x )
- Ideas are welcome :)

## Contributors
- [Tiberiu Craciun](https://github.com/tiberiuc)
- [Rahav Lussto](https://github.com/RahavLussato)

# Performance

**Note**: Performance documentation is still in progress. Please feel free to reach out with over [gitter](https://gitter.im/redux-firebase/Lobby) or through issues/pull requests with questions or input.

## Avoid Re-Renders
When optimizing performance in React application, minimizing re-renders of your components often comes first.

#### How?
Wait until after the `connect` function to convert to JS object from ImmutableJS map (`toJS` helper functions) if they are even necessary at all. This way common simple props comparison can correctly check for equality.

##### ES6 Class (React's `PureComponent`)
React [exports `PureComponent`](https://facebook.github.io/react/docs/react-api.html#react.purecomponent), which implements `shouldComponentUpdate()` with shallow prop and state comparison.

```js
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { isLoaded, isEmpty, toJS } from 'react-redux-firebase';

class Todos extends PureComponent {
  render() {
    const { todos } = this.props
    if (!isLoaded(todos)) {
      return <div>Loading...</div>
    }
    if (!isEmpty(todos)) {
      return <div>There are no todos</div>
    }
    return (
      toJS(todos) // convert ImmutableJS Map to Array
        .map((todo, idx) => {
          return (
            <div key={`${todo.key}-${idx}`}> // key is unique to todo and its location in the list
              <span>{todo.owner}</span>
            </div>
          )
        })
    )
  }
}

export default compose(
  firebaseConnect([
    'todos' // { path: 'todos' } // object notation
  ]),
  connect((state) => {
    todos: state.firebase.getIn(['ordered', 'todos']) // pass the immutable map instead of converting to JS
  })
)(Todos)
```

##### Functional (recompose's `pure`)

What about with functional components? [`recompose`](https://github.com/acdlite/recompose) is a utility library for easily creating/working with functional components. One of the utilities `recompose` exports is called `pure`, which can be used like so:

```js
import React from 'react';
import { compose } from 'redux';
import { pure } from 'recompose';
import { isLoaded, isEmpty, toJS } from 'react-redux-firebase';

export const Todos = ({ todos }) => {
  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }
  if (!isEmpty(todos)) {
    return <div>There are no todos</div>
  }
  return (
    toJS(todos) // convert ImmutableJS Map to Array
      .map((todo, idx) => {
        return (
          <div key={`${todo.key}-${idx}`}> // key is unique to todo and its location in the list
            <span>{todo.owner}</span>
          </div>
        )
      })
  )
}

export default compose(
  firebaseConnect([
    'todos' // { path: 'todos' } // object notation
  ]),
  connect((state) => {
    todos: state.firebase.getIn(['ordered', 'todos']) // pass the immutable map instead of converting to JS
  }),
  pure
)(Todos)
```

#### Why?
Converting from an ImmutableJS Map object (how state is stored in `react-redux-firebase` v1) to a normal JS object (normally done with `toJS`, `dataToJS`, or `pathToJS`) creates a new "reference" any time the data changes. This in turn causes you component to re-render even if associated data has not changed.

Immutable JS Map objects are supported by React's prop's comparison, which means that passing down a Map object will only cause a re-render when data has actually changed.

Due to the difficult in usage this causes, `react-redux-firebase` v2 has been designed without ImmutableJS. There is plans to have future support for using Immutable, but it has not yet made it to the [Roadmap](/docs/roadmap.md).

#### Other Options

1. Use `react-redux-firebase` v2, which was designed to work without ImmutableJS (partially for this reason)
1. Make custom `shouldComponentUpdate` hooks for your Components

#### Related Issues
* [#84](https://github.com/prescottprue/react-redux-firebase/issues/84)

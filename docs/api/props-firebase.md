# props.firebase
`props.firebase` can be accessed on a component by wrapping it with the `firebaseConnect` higher order component like so:

```js
import { firebaseConnect } from 'react-redux-firebase'

export default firebaseConnect()(SomeComponent)

// or with decorators

@firebaseConnect()
export default class SomeComponent extends Component {

}
```

The methods which are available are documented in [firebaseInstance](/docs/api/firebaseInstance.md)

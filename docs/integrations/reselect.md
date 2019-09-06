# Reselect

There are a number of reasons to use state selectors, as mentioned in the [relesect docs](https://github.com/reduxjs/reselect):

> * Selectors can compute derived data, allowing Redux to store the minimal possible state.
> * Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
> * Selectors are composable. They can be used as input to other selectors.

For more information, about why this is important, checkout the [motivation for memoized selectors sections of the reselect docs](https://github.com/reduxjs/reselect#motivation-for-memoized-selectors)

## State Selectors

Select only what you need from state in your selectors instead of the whole firebase/firestore state object:

```js
import { createSelector } from 'reselect';
import { connect } from 'react-redux'
import { get, sumBy } from 'lodash'

const netTotalSelector  = createSelector(
  state => get(state, 'firestore.data.products'),
  products => sumBy(products, 'price')
)

connect((state) => ({
  netTotal: netTotalSelector(state)
}))(Component)
```

In this case Reselect will memoize the products object. That means that even if there's any update to other parts of redux state (including firebase/firestore), the memoized products object will stay the same until there is an update to the products themselves.

See [issue #614](https://github.com/prescottprue/react-redux-firebase/issues/614) for more info.
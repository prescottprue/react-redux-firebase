import PropTypes from 'prop-types'
import { some, pick } from 'lodash'
import {
  compose,
  withContext,
  getContext,
  renderComponent,
  branch,
  mapProps
} from 'recompose'
import { isLoaded } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'

export const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object })
)

export const withRouter = compose(
  withContext({ router: PropTypes.object }, () => {}),
  getContext({ router: PropTypes.object })
)

export const withStoreAndRouter = compose(
  withContext(
    {
      router: PropTypes.object,
      store: PropTypes.object
    },
    () => {}
  ),
  getContext({ router: PropTypes.object, store: PropTypes.object })
)

/**
 * Show a loading spinner when a condition is truthy. Used within
 * spinnerWhileLoading. Accepts a test function and a higher-order component.
 * branch(
 *   test: (props: Object) => boolean,
 *   right: ?HigherOrderComponent
 * ): HigherOrderComponent
 * @param  {Function} condition - Condition function for when to show spinner
 * @return {HigherOrderComponent}
 */
export const spinnerWhile = condition =>
  branch(condition, renderComponent(LoadingSpinner))

/**
 * Show a loading spinner while props are loading . Checks
 * for undefined, null, or a value (as well as handling `auth.isLoaded` and
 * `profile.isLoaded`). **NOTE:** Meant to be used with props which are passed
 * as props from state.firebase using connect (from react-redux), which means
 * it could have unexpected results for other props
 * @param  {Array} propNames - List of prop names to check loading for
 * @return {HigherOrderComponent}
 */
export const spinnerWhileLoading = propNames =>
  spinnerWhile(props => some(propNames, name => !isLoaded(props[name])))

/**
 * HOC that logs props using console.log. Accepts an array list of prop names
 * to log, if none provided all props are logged. **NOTE:** Only props at
 * available to the HOC will be logged.
 * @param  {Array} propNames [description]
 * @return {React.Component}           [description]
 */
export const logProps = (propNames, logName = '') =>
  mapProps(ownerProps => {
    console.log(
      `${logName} props:`,
      propNames ? pick(ownerProps, propNames) : ownerProps
    )
    return ownerProps
  })

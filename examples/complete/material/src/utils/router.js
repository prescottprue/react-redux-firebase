import { UserAuthWrapper } from 'redux-auth-wrapper'
import { browserHistory } from 'react-router'
import { LIST_PATH } from 'constants'
import { pathToJS } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'

const AUTHED_REDIRECT = 'AUTHED_REDIRECT'
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT'

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAuthenticated = UserAuthWrapper({
  // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsAuthenticated',
  LoadingComponent: LoadingSpinner,
  authSelector: ({ firebase: { auth } }) => auth,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  predicate: auth => !auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc)
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})

/**
 * @description Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = UserAuthWrapper({
  // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  LoadingComponent: LoadingSpinner,
  failureRedirectPath: (state, props) =>
    // redirect to page user was on or to list path
    props.location.query.redirect || LIST_PATH,
  authSelector: ({ firebase: { auth } }) => auth,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  predicate: auth => auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc)
    dispatch({ type: AUTHED_REDIRECT })
  }
})

export default {
  UserIsAuthenticated,
  UserIsNotAuthenticated
}

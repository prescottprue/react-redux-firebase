import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import createHistory from 'history/createBrowserHistory'
import LoadingSpinner from 'components/LoadingSpinner'
import { LIST_PATH } from 'constants/paths'

const locationHelper = locationHelperBuilder({})
const history = createHistory()

const AUTHED_REDIRECT = 'AUTHED_REDIRECT'
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT'

/**
 * Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) =>
    !auth.isEmpty && !!auth.uid,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  redirectAction: newLoc => dispatch => {
    // Use push, replace, and go to navigate around.
    history.push(newLoc)
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})

/**
 * Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || LIST_PATH,
  redirectAction: newLoc => dispatch => {
    // Use push, replace, and go to navigate around.
    history.push(newLoc)
    dispatch({
      type: AUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})

import { size, map } from 'lodash'

/**
 * @description Detect whether items are loaded yet or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is loaded
 * @example
 * import React, { Component, PropTypes } from 'react'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isLoaded, dataToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase: { data: { todos } } }) => ({
 *     todos,
 *   })
 * )
 * class Todos extends Component {
 *   static propTypes = {
 *     todos: PropTypes.object
 *   }
 *
 *   render() {
 *     const { todos } = this.props;
 *
 *     // Show loading while todos are loading
 *     if(!isLoaded(todos)) {
 *        return <span>Loading...</span>
 *     }
 *
 *     return <ul>{todosList}</ul>
 *   }
 * }
 */
export const isLoaded = () => {
  if (!arguments || !arguments.length) {
    return true
  }

  return map(arguments, a => a !== undefined).reduce((a, b) => a && b)
}

/**
 * @description Detect whether items are empty or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is empty
 * @example
 * import React, { Component, PropTypes } from 'react'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isEmpty, dataToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase: { data: { todos } } }) => ({
 *     todos
 *   })
 * )
 * class Todos extends Component {
 *   static propTypes = {
 *     todos: PropTypes.object
 *   }
 *
 *   render() {
 *     const { todos } = this.props;
 *
 *     // Message for if todos are empty
 *     if(isEmpty(todos)) {
 *        return <span>No Todos Found</span>
 *     }
 *
 *     return <ul>{todosList}</ul>
 *   }
 * }
 */
export const isEmpty = data => !(data && size(data))

export default {
  isLoaded,
  isEmpty
}

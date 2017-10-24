import PropTypes from 'prop-types'
import { compose, withContext, getContext } from 'recompose'

export const createWithStore = (storeKey = 'store') => compose(
  withContext({ [storeKey]: PropTypes.object }, () => {}),
  getContext({ [storeKey]: PropTypes.object })
)

export default createWithStore()

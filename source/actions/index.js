import * as authActions from './auth'
import * as queryActions from './query'

export { authActions, queryActions }
export default Object.assign({}, authActions, queryActions)

import { Loadable } from 'utils/components'
import { SIGNUP_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Signup' */ './components/SignupPage')
  })
}

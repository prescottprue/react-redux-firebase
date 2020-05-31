import Loadable from 'react-loadable'
import LoadingSpinner from 'components/LoadingSpinner'

export default {
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'NotFound' */ './components/NotFoundPage'),
    loading: LoadingSpinner
  })
}

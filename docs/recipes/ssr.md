# Server Side Rendering

### Disable Redirect Handling

By default a redirect handling listener is set up, which will not work if not in an environment with HTTP. Currently, for SSR, you must disable this redirect handling listener to keep an error from appearing (see [#251](https://github.com/prescottprue/react-redux-firebase/issues/251) for more info).

Support automatically detecting non-HTTP environments (so that `enableRedirectHandling: false` is not required) is [on the roadmap](http://docs.react-redux-firebase.com/history/v2.0.0/docs/roadmap.html#under-consideration).

```js
// disable redirect listener setup (happens by default)
const config = {
  enableRedirectHandling: false
}

reactReduxFirebase(firebaseInstance, config)
```


### Include XMLHttpRequest

```js
// needed to fix "Error: The XMLHttpRequest compatibility library was not found."
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
```

If you find adding this extra code to be an annoyance or you would like to discuss a different way to do it, please feel free to open an issue/pull request or reach out on [gitter](https://gitter.im/redux-firebase/Lobby).



## Implement with Webpack

### Make Sure Loaders are setup appropriately
Note, make sure that you have excluded `node_modules` in your webpack loaders

```js
// webpack 1
exclude: /node_modules/,
// or webpack 2
options: { presets: [ [ 'es2015', { modules: false } ] ] }
```

# Server Side Rendering

### Disable Redirect Handling

Support automatically detecting non-HTTP environments has been added as of [`v2.0.0-beta.7`](https://github.com/prescottprue/react-redux-firebase/releases/tag/v2.0.0-beta.7), which means you can skip the rest of this section.

If using earlier than `v2.0.0-beta.7`:

By default a redirect handling listener is set up, which will not work in environments without HTTP. Currently, for SSR, you must disable this redirect handling listener to keep an error from appearing (see [#251](https://github.com/prescottprue/react-redux-firebase/issues/251) for more info).


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

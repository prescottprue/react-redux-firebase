# Server Side Rendering

## Preload Data
Preloading data is a common step to in serverside rendering. How it is done differs based on whether you are using Real Time Database or Firestore.

**Real Time Database**
`promiseEvents`, which is similar to `firebaseConnect` expected it is presented as a function instead of a React Component.

After creating your store:

```js
store.firebase // getFirebase can also be used
  .promiseEvents([
    { path: 'todos' },
    { path: 'users' }
  ])
  .then(() => {
    console.log('data is loaded into redux store')
  })
```

**Firestore**
Its just as simple as calling the built in get method with your query config:

```js
store.firestore.get({ collection: 'todos' }) // or .get('todos')
  .then(() => {
    console.log('data is loaded into redux store')
  })
```

## Troubleshooting

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
// or webpack 2/3
options: { presets: [ [ 'es2015', { modules: false } ] ] }
```

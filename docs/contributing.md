# Contributing

1. Fork to your account
1. Make changes and push to YOUR fork of the repo (linting is run automatically on push, and tests/coverage are run on [Travis](https://travis-ci.org/prescottprue/react-redux-firebase))
1. Test the changes within your project by npm linking your local version of ([described below]())
1. Create a pull request on [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase) with a description of your changes
1. Confirm that you have no merge conflicts that will keep the code from being merged
1. Keep an eye on the Pull Request for comments/updates

## Docs

All docs are written in Markdown and contained within the `docs` folder.

The API reference section of the docs lives within `docs/api` and is generated from JSDoc comments within the `src` when calling `npm run docs:build`.

### Updating API Docs

1. Go to the source code of the function which is having docs updated
1. Change associated section of the comment above the function (i.e `@example` or `@description`)
1. Run `npm run build:docs`
1. Remove any `gitbook-` dependencies added to `package.json` during the process (due to but in gitbook-cli, see note below)
1. Create a PR with from your fork to the `master` branch of this repo

**NOTE**: Currently, during the build stage, gitbook adds gitbook dependencies to the `dependencies` section of `package.json`. This is not desired behavior - if you are making a PR with changes to the docs, make sure you have removed any `gitbook-*` dependencies from the package.json that may have been added while building docs

## Library Source

### NPM Linking

It is often convenient to run a local version of `react-redux-firebase` within a project to debug issues. The can be accomplished by doing the following:

1. Fork `react-redux-firebase` then clone to your local machine
1. Go into your local `react-redux-firebase` folder and run `npm link`
1. Go into your project or one of the examples and run `npm link react-redux-firebase`
1. Go Back in your `react-redux-firebase` folder
1. Add/Change some code (placing a simple `console.log` is a nice way to confirm things are working)
1. run `npm run build` to build a new version with your changes
1. Your local version should now run when using `react-redux-firebase` within your project

**NOTE**
`npm run watch` can be used in your local `react-redux-firebase` folder to run a watch server that will rebuild as you make changes. Only the `commonjs` version is rebuild when using `npm run watch`. If using a different version, such as the `es` version, add watch flag to specific npm build command (i.e. `npm run build:es -- --watch`) to only rebuild that version when files are changed.

#### Troubleshooting

* `Module build failed: ReferenceError: Unknown plugin`:

  **Common Solution**

  Include symlinked version of react-redux-firebase in your babel-loader excludes:

  **Webpack 1**

  ```js
  {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /react-redux-firebase\/dist/, // browser version (most common in Webpack 1)
          /react-redux-firebase\/lib/, // commonjs version
          /react-redux-firebase\/es/ // es version
        ],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'react']
        }
      }
    ]

  }
  ```

  **Webpack 2 & 3**

  ```js
  {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /react-redux-firebase\/es/ // es version (since webpack 2/3 uses module field of package.json)
        ],
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              plugins: ['transform-decorators-legacy'],
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    ]
  }
  ```

  **What Happened?**

  This error most often appears due to Webpack config. A common pattern is to provide `exclude: [/node_modules/]` setting to [babel-loader](https://github.com/babel/babel-loader), which keeps the loader from transforming code within the `node_modules` folder. Now that we have used `npm link`, your project points to your local version of `react-redux-firebase` instead of the one in your `node_modules` folder, so we have to tell the loader to also exclude transforming `react-redux-firebase`.

* `Invalid hook call. Hooks can only be called inside of the body of a function component`:

  **Common Solution**

  Add `react` as an alias in Webpack:
  
  **Webpack**
  
  ```js
  {
    resolve: {  
      alias: {  
        react: path.resolve('./node_modules/react')
      }
    }
  }
  ```
    
  **What Happened?**
  
  This error often occurs when you have multiple instances of React loading after using `npm link`. The easiest fix is by setting React as an alias in Webpack.

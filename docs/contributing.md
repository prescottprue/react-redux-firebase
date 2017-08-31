# Contributing

1. Fork to your account
2. Make changes and push to YOUR fork of the repo (linting is run automatically on push, and tests/coverage are run on [Travis](https://travis-ci.org/prescottprue/react-redux-firebase))
3. Create a pull request on [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase) with a description of your changes
4. Confirm that you have no merge conflicts that will keep the code from being merged
5. Keep an eye on the Pull Request for comments/updates


## NPM Linking

It is often convenient to run a local version of `react-redux-firebase` within a project to debug issues. The can be accomplished by doing the following:

1. Fork `react-redux-firebase` then cloning to your local machine (or download and unzip)
1. Run `npm link` within your local `react-redux-firebase` folder
1. Run `npm link react-redux-firebase` in your project (or one of the examples)
1. Run `npm run watch` in your local `react-redux-firebase` folder to run a watch server that will rebuild as you make changes
1. Your project should now be pointing to your local version of `react-redux-firebase`

**NOTE** The `commonjs` version is what is build when using `npm run watch`. If using a different version, use `npm run build` to build after you make changes.

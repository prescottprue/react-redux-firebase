# React Redux Firebase

React Higher Order component library for Firebase with Redux integration

## Demo

View deployed version of Material Example [here](https://redux-firebasev3.firebaseapp.com/)


## Features
- Higher Order Component (HOC) for react
- Integrated into redux
- [Population](/populate.md) capability (similar to mongo `populate` or SQL `JOIN`)
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- [queries support](/queries.md) ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo` right now )
- Automatic binding/unbinding
- Declarative decorator syntax for React components
- Firebase v3+ support
- Support for updating and nested props
- Out of the box support for authentication (with auto load user profile)
- Lots of helper functions


## [Examples](examples)

#### [Simple Example](examples/simple)

A simple example that was created using [create-react-app](https://github.com/facebookincubator/create-react-app)'s. Shows a list of todo items and allows you to add to them.

#### [Decorators Example](examples/decorators)

The simple example implemented using decorators built from the output of [create-react-app](https://github.com/facebookincubator/create-react-app)'s eject command. Shows a list of todo items and allows you to add to them.

#### [Material Example](examples/material)

An example that user Material UI built on top of the output of [create-react-app](https://github.com/facebookincubator/create-react-app)'s eject command.  Shows a list of todo items and allows you to add to them. This is what is deployed to [redux-firebasev3.firebaseapp.com](https://redux-firebasev3.firebaseapp.com/).


## Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) uses react-redux-firebase when opting to include redux

## Contributors
- [Prescott Prue](https://github.com/prescottprue)
- [Tiberiu Craciun](https://github.com/tiberiuc)
- [Bojhan](https://github.com/Bojhan)
- [Rahav Lussto](https://github.com/RahavLussato)
- [Justin Handley](https://github.com/justinhandley)

## Thanks

Special thanks to [Tiberiu Craciun](https://github.com/tiberiuc) for creating [redux-react-firebase](https://github.com/tiberiuc/redux-react-firebase), which this project is heavily based on.

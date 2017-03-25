# React Native Complete Example

## Getting Started

**NOTE** This example assumes you have `react-native` installed

1. Clone main repo
1. Enter example folder by running `cd examples/complete/react-native`
1. Install dependencies using `yarn install` or `npm install`
1. Run using `react-native run-ios`

## Dev Scripts
* `npm run dev` - starts watcher and packager together concurrently

## Application Structure

```
.
├─ src                      # Application source code
│  ├── index.js             # Application bootstrap and rendering
│  └── Home.js              # Main page
├- ios                      # Platform specific code, config and dependencies for iOS
│  ├─ GoogleService-info.plist # iOS app config file downloaded from Firebase
├─ scripts                  # Development helper scripts
│  └── watch-and-copy.js    # Development helper that watches and copies changed files
└─ index.ios.js             # iOS Application Mounting (connects iOS -> `/src`)
```


## Running Your Own

If you are planning on running your own `react-native` project based on this one. Please make sure you follow the new setup steps in the [react-native recipe](/docs/recipes/react-native.md)

# Helpers

### `isLoaded(objects...)`
Check if all the objects passed to function are loaded ( not `undefined` )
- `null` mean we have feedback from firebase but there is no data
- `undefined` mean still waiting from Firebase

#### Return
`true` or `false`

### `isEmpty(object)`
Check if an object is empty (`null` if value was requested or empty object `{}` if array was requested)

#### Return
`true` or `false`

### `toJS(immutableData)`
Short for `immutableData.toJS()` but take care if `immutableData` is `null` or `undefined`

### `pathToJS(immutableData, pathAsString, notSetValut)`
Short for `immutableData.getIn(pathAsString.split(/\//), notSetValue).toJS()` but take care if `immutableData` is null or undefined

### `dataToJS(immutableData, pathAsString, notSetValue)`
Short for ``pathToJS(immutableData, `data/${pathAsString}`, notSetValue)``

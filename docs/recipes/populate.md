# Populate

### Populate Profile Parameters

To Populate parameters within profile/user object, include the `profileParamsToPopulate` parameter when [calling `reactReduxFirebase` in your compose function](/api/compose).

#### Examples

##### Populate List of Items

```javascript
const config = {
  userProfile: 'users',
  profileParamsToPopulate: [ 'todos:todos' ] // populate list of todos from todos ref
}
```

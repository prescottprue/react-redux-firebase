# Storage

Firebase Storage is available within components by using `this.props.firebase.storage()`. This method is equivalent to Firebase's `firebase.storage()` method, meaning you can reference the [Firebase Storage Docs](https://firebase.google.com/docs/storage/web/upload-files) for full list of methods and examples.

### File Upload Example

#### Example

```javascript
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
export default class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      storage: PropTypes.func.isRequired
    })
  }

  render() {
    const { firebase: { storage } } = this.props;

    const addTestFile = () => {
      const {newTodo} = this.refs
      const storageRef = storage().ref()
      const fileRef = storageRef.child('test.txt')
      fileRef.putString('Some File Contents')
        .then(snap => console.log('upload successful', snap))
        .catch(err => console.error('error uploading file', err))
    }

    return (
      <div>
        <h1>Example Upload</h1>
        <button onClick={addTestFile}>
          Upload Example File
        </button>
      </div>
    )
  }
}
```
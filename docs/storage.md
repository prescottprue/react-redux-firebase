# Storage

Firebase Storage is available within components by using `this.props.firebase.storage()`. This method is equivalent to Firebase's `firebase.storage()` method, meaning you can reference the [Firebase Storage Docs](https://firebase.google.com/docs/storage/web/upload-files) for full list of methods and examples.

For Examples of how to use these methods, please visit the [recipes section](/docs/recipes).

### uploadFiles

Upload an array of files to a location on Firebase storage. This includes the option to also write meta data for the object to Firebase database.

Available on `this.props.firebase` and `getFirebase`.

#### Parameters
-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path within Firebase Storage at which to upload File.
-   `files` **[Blob](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Array of File Blobs to upload to Firebase Storage.
-   `databasePath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path within Firebase Database at which to write files metadata.

### uploadFile

Upload a single file to a location.

Available on `this.props.firebase` and `getFirebase`.

#### Parameters
-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path within Firebase Storage at which to upload File.
-   `file` **[Blob](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** File Blob to upload to Firebase Storage.
-   `databasePath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path within Firebase Database at which to write file metadata.

#### Examples

##### [Dropzone File Upload/Delete](/docs/recipes/upload.html#file-dragdrop-upload-with-delete)

### deleteFile

Delete a file from Firebase storage.

Available on `this.props.firebase` and `getFirebase`.

#### Parameters
-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path within Firebase Storage of File to delete.
-   `databasePath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path within Firebase Database from which to remove File metadata.

#### Example

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
export default class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      deleteFile: PropTypes.func.isRequired
    })
  }

  render() {
    const { deleteFile } = this.props;

    return (
      <div>
        <h1>Example File Delete</h1>
        <span>Deletes `index.txt` from storage</span>
        <button onClick={() => deleteFile('index.txt')}>
          Delete
        </button>
      </div>
    )
  }
}
```

### Other Storage Methods

Access to Firebase's `storage` is available. This is useful for calling methods such as `putString`. Below is an example of Uploading a string as a File to Firebase Storage.

#### Example

##### File String Upload

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
export default class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.object
  }

  render() {
    const { firebase: { storage } } = this.props;

    const addTestFile = () => {
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

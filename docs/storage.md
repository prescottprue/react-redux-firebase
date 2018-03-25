# Storage

Firebase Storage is available within components by using `this.props.firebase.storage()`. This method is equivalent to Firebase's `firebase.storage()` method, meaning you can reference the [Firebase Storage Docs](https://firebase.google.com/docs/storage/web/upload-files) for the full list of methods and examples.

For Examples of how to use these methods, please visit the [recipes section](/docs/recipes).

### uploadFiles

Upload an array of files to a location on Firebase storage. This includes the option to also write meta data for the object to Firebase database.

Available on `props.firebase` if using `firebaseConnect` HOC or using `getFirebase`.

#### Parameters
-   `path` [**String**][string-url] - Path within Firebase Storage at which to upload File.
-   `files` [**Array**][array-url] - Array of File Blobs to upload to Firebase Storage.
-   `databasePath` [**String**][string-url] - Path within Firebase Database at which to write files metadata.
-   `options` [**Object**][object-url] - Options for upload
-   `options.name` [**String**][string-url] | [**Function**][function-url] - Name of file or function that returns the name of the file. If a function is passed the argument syntax is `(file, internalFirebase, uploadConfig)` where `file` is the file object (`file.name` is used as default if no name option is passed).

##### Returns
[**Promise**][promise-url] Resolves with an array of [`uploadFile` promises results (described below)](#uploadFile).

### uploadFile

Upload a single file to a location.

Available on `props.firebase` if using `firebaseConnect` HOC or using `getFirebase`.

#### Parameters
-   `path` [**String**][string-url] - Path within Firebase Storage at which to upload File.
-   `file` [**Blob**][blob-url] - File Blob to upload to Firebase Storage.
-   `databasePath` [**String**][string-url] - Path within Firebase Database at which to write file metadata.
-   `options` [**Object**][object-url] - Options for upload
-   `options.name` [**String**][string-url] | [**Function**][function-url] - Name of file or function that returns the name of the file. If a function is passed the argument syntax is `(file, internalFirebase, uploadConfig)` where `file` is the file object (`file.name` is used as default if no name option is passed).

##### Returns
[**Promise**][promise-url] Resolves with an object containing `uploadTaskSnapshot` which is the [**firebase.storage.UploadTaskSnapshot**][upload-task-snapshot-url] returned from the `storageRef.put` call which happens internally. If `databasePath` is provided `snapshot`, `key`, `File`, and `metaDataSnapshot` parameters are also included.

#### Examples

##### [Dropzone File Upload/Delete](/docs/recipes/upload.html#file-dragdrop-upload-with-delete)

### deleteFile

Delete a file from Firebase storage with the option to remove metadata from real time database.

Available on `props.firebase` if using `firebaseConnect` HOC or using `getFirebase`.

#### Parameters
-   `path` [**String**][string-url] - Path within Firebase Storage of File to delete.
-   `databasePath` [**String**][string-url] - Path within Firebase Database from which to remove File metadata.

##### Returns
[**Promise**][promise-url]

#### Example

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

const Uploader = ({ deleteFile }) =>
  <div>
    <h1>Example File Delete</h1>
    <span>Deletes `index.txt` from storage</span>
    <button onClick={() => deleteFile('index.txt')}>
      Delete
    </button>
  </div>

Uploader.propTypes = {
  firebase: PropTypes.shape({ // comes from firebaseConnect
    deleteFile: PropTypes.func.isRequired
  })
}

export default firebaseConnect()(Uploader)
```

### Other Storage Methods

Access to Firebase's `storage` is available. This is useful for calling methods such as `putString`. Below is an example of Uploading a string as a File to Firebase Storage.

#### Example

##### File String Upload

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.object
  }

  addTestFile = () => {
    const { firebase: { storage } } = this.props;
    const storageRef = storage().ref()
    const fileRef = storageRef.child('test.txt')
    return fileRef.putString('Some File Contents')
      .then(snap => console.log('upload successful', snap))
      .catch(err => console.error('error uploading file', err))
  }

  render() {
    return (
      <div>
        <h1>Example Upload</h1>
        <button onClick={this.addTestFile}>
          Upload Example File
        </button>
      </div>
    )
  }
}

export default firebaseConnect()(Uploader)
```

[promise-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[array-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[object-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[function-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[blob-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Blob
[upload-task-snapshot-url]:https://firebase.google.com/docs/reference/js/firebase.storage.UploadTaskSnapshot

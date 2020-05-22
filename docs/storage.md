# Storage

Firebase Storage is available within components by using `this.props.firebase.storage()`. This method is equivalent to Firebase's `firebase.storage()` method, meaning you can reference the [Firebase Storage Docs](https://firebase.google.com/docs/storage/web/upload-files) for the full list of methods and examples.

For Examples of how to use these methods, please visit the [recipes section](/docs/recipes).

### uploadFiles

Upload an array of files to a location on Firebase storage. This includes the option to also write meta data for the object to Firebase database.

Available on `props.firebase` if using `firebaseConnect` HOC.

#### Parameters

- `path` [**String**][string-url] - Path within Firebase Storage at which to upload File.
- `files` [**Array**][array-url] - Array of File Blobs to upload to Firebase Storage.
- `databasePath` [**String**][string-url] - Path within Firebase Database at which to write files metadata.
- `options` [**Object**][object-url] - Options for upload
- `options.name` [**String**][string-url] | [**Function**][function-url] - Name of file or function that returns the name of the file. If a function is passed the argument syntax is `(file, internalFirebase, uploadConfig)` where `file` is the file object (`file.name` is used as default if no name option is passed).
- `options.metadata` [**Object**][object-url] - Sets the metadata associated with a file uploaded to firebase
- `options.metadataFactory` [**Function**][function-url] - A function that returns the object that will get stored in the database after a file is uploaded to storage. The argument syntax is `(uploadRes, firebase, metadata, downloadURL)` where `uploadRes` is firebase's response from the file upload and `metadata` is the metadata uploaded with the file. If no value is provided the `options.metadata` object will be used.
- `options.documentId` [**String**][string-url] | [**Function**][function-url] - If using firestore for your database you can specify the documentId of a document to update instead of creating a new one. If no document is found with the specified documentId a new document with that Id will be created and populated by the metadata object. You can specify either a string or a function that returns the documentId. If a function is passed the argument syntax is the same as the `options.metadataFactory` function. The corresponding document will be updated with the key value pairs returned by the metadata factory function. If no value is provided a new document will be created.
- `options.useSetForMetadata` [**Boolean**][boolean-url] - If using firestore as your database and you are also uploading to a specific document using the `documentId` property then this allows you to choose between a `set with merge` or an `upload` operation. `Set with merge` is the default and will create a new document if the supplied `documentId` is not found, `upload` will fail if the `documentId` is not found.

##### Returns

[**Promise**][promise-url] Resolves with an array of [`uploadFile` promises results (described below)](#uploadFile).

### uploadFile

Upload a single file to a location.

Available on `props.firebase` if using `firebaseConnect` HOC.

#### Parameters

- `path` [**String**][string-url] - Path within Firebase Storage at which to upload File.
- `file` [**Blob**][blob-url] - File Blob to upload to Firebase Storage.
- `databasePath` [**String**][string-url] - Path within Firebase Database at which to write file metadata.
- `options` [**Object**][object-url] - Options for upload
- `options.name` [**String**][string-url] | [**Function**][function-url] - Name of file or function that returns the name of the file. If a function is passed the argument syntax is `(file, internalFirebase, uploadConfig)` where `file` is the file object (`file.name` is used as default if no name option is passed).
- `options.metadata` [**Object**][object-url] - Sets the metadata associated with a file uploaded to firebase
- `options.metadataFactory` [**Function**][function-url] - A function that returns the object that will get stored in the database after a file is uploaded to storage. The argument syntax is `(uploadRes, firebase, metadata, downloadURL)` where `uploadRes` is firebase's response from the file upload and `metadata` is the metadata uploaded with the file. If no value is provided the `options.metadata` object will be used.
- `options.documentId` [**String**][string-url] | [**Function**][function-url] - If using firestore for your database you can specify the documentId of a document to update instead of creating a new one. If no document is found with the specified documentId a new document with that Id will be created and populated by the metadata object. You can specify either a string or a function that returns the documentId. If a function is passed the argument syntax is the same as the `options.metadataFactory` function. The corresponding document will be updated with the key value pairs returned by the metadata factory function. If no value is provided a new document will be created.
- `options.useSetForMetadata` [**Boolean**][boolean-url] - If using firestore as your database and you are also uploading to a specific document using the `documentId` property then this allows you to choose between a `set with merge` or an `upload` operation. `Set with merge` is the default and will create a new document if the supplied `documentId` is not found, `upload` will fail if the `documentId` is not found.

##### Returns

[**Promise**][promise-url] Resolves with an object containing `uploadTaskSnapshot` which is the [**firebase.storage.UploadTaskSnapshot**][upload-task-snapshot-url] returned from the `storageRef.put` call which happens internally. If `databasePath` is provided `snapshot`, `key`, `File`, and `metaDataSnapshot` parameters are also included.

#### Examples

##### [Dropzone File Upload/Delete](/docs/recipes/upload.html#file-dragdrop-upload-with-delete)

### deleteFile

Delete a file from Firebase storage with the option to remove metadata from real time database.

Available on `props.firebase` if using `firebaseConnect` HOC.

#### Parameters

- `path` [**String**][string-url] - Path within Firebase Storage of File to delete.
- `databasePath` [**String**][string-url] - Path within Firebase Database from which to remove File metadata.

##### Returns

[**Promise**][promise-url]

#### Example

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import React from 'react'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'

export default function Uploader() {
  const firebase = useFirebase()

  function deleteTestFile() {
    return firebase.deleteFile('index.txt')
  }

  return (
    <div>
      <h1>Example File Delete</h1>
      <span>Deletes `index.txt` from storage</span>
      <button onClick={deleteTestFile}>Delete</button>
    </div>
  )
}
```

### Other Storage Methods

Access to Firebase's `storage` is available. This is useful for calling methods such as `putString`. Below is an example of Uploading a string as a File to Firebase Storage.

#### Example

##### File String Upload

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'

export default function Uploader() {
  const firebase = useFirebase()

  function addTestFile() {
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child('test.txt')
    return fileRef
      .putString('Some File Contents')
      .then((snap) => console.log('upload successful', snap))
      .catch((err) => console.error('error uploading file', err))
  }

  return (
    <div>
      <h1>Example Upload</h1>
      <button onClick={addTestFile}>Upload Example File</button>
    </div>
  )
}
```

[promise-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[array-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[object-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[function-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[blob-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Blob
[boolean-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[upload-task-snapshot-url]: https://firebase.google.com/docs/reference/js/firebase.storage.UploadTaskSnapshot

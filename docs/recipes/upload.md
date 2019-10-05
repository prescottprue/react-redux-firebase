# Upload

## File Drag/Drop Upload with Delete
This example component uses `react-dropzone` to allow for drag/drop uploading directly to Firebase storage. `props.uploadFiles()` provides the capability to update Firebase database with Files metadata, which is perfect for showing your upload results cleaning in the same component.

**NOTE:** The third argument provided to the `uploadFiles` and `deleteFiles` calls below is the database path where File Metadata will be written/deleted from. This is out of convenience only, simply remove the third argument if you don't want metadata written/deleted to/from database.

```js
import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';

// Path within Database for metadata (also used for file Storage path)
const filesPath = 'uploadedFiles';

export default function Uploader({ uploadedFiles, onFileDelete, onFilesDrop }) {
  const firebase = useFirebase()
  const uploadedFiles = useSelector(({ firebase: { data } }) => data[filesPath])

  function onFilesDrop(files) {
    return firebase.uploadFiles(filesPath, files, filesPath);
  }
  function onFileDelete(file, key) {
    return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  }

  return (
    <div>
      <Dropzone onDrop={onFilesDrop}>
        <div>Drag and drop files here or click to select</div>
      </Dropzone>
      {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles, (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
              <button onClick={() => onFileDelete(file, key)}>Delete File</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Change File Metadata
When uploading files as in the above example, you can modify how the file's meta data is written to the database.

```js

// within your createStore.js or store.js file include the following config
const config = {
  fileMetadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
    // upload response from Firebase's storage upload
    const { metadata: { name, fullPath } } = uploadRes
    // default factory includes name, fullPath, downloadURL
    return {
      name,
      fullPath,
      downloadURL
    }
  }
}
```

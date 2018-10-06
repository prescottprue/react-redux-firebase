# Upload

## File Drag/Drop Upload with Delete
This example component uses `react-dropzone` to allow for drag/drop uploading directly to Firebase storage. `props.uploadFiles()` provides the capability to update Firebase database with Files metadata, which is perfect for showing your upload results cleaning in the same component.

**NOTE:** The third argument provided to the `uploadFiles` and `deleteFiles` calls below is the database path where File Metadata will be written/deleted from. This is out of convenience only, simply remove the third argument if you don't want metadata written/deleted to/from database.

```js
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { compose, withHandlers, setPropTypes } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';

// Path within Database for metadata (also used for file Storage path)
const filesPath = 'uploadedFiles';

const handlers = {
  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop: props => files => {
    // uploadFiles(storagePath, files, dbPath)
    return props.firebase.uploadFiles(filesPath, files, filesPath);
  },
  onFileDelete: props => (file, key) => {
    // deleteFile(storagePath, dbPath)
    return props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  }
};

const enhancerPropsTypes = {
  firebase: PropTypes.object.isRequired
};

// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedFiles
const enhance = compose(
  // Create listeners for Real Time Database which write to redux store
  firebaseConnect([{ path: filesPath }]),
  // connect redux state to props
  connect(({ firebase: { data } }) => ({
    uploadedFiles: data[filesPath]
  })),
  // Set proptypes of props used within handlers
  setPropTypes(enhancerPropsTypes),
  // Add handlers as props
  withHandlers(handlers)
);

const Uploader = ({ uploadedFiles, onFileDelete, onFilesDrop }) => (
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

Uploader.propTypes = {
  firebase: PropTypes.object.isRequired,
  uploadedFiles: PropTypes.object
};

// Apply enhancer to component on export
export default enhance(Uploader);
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

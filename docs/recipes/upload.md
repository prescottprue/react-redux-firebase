# Upload

### File Drag/Drop Upload with Delete
This example component uses `react-dropzone` to allow for drag/drop uploading directly to Firebase storage. `this.props.uploadFiles()` provides the capability to update Firebase database with Files metadata, which is perfect for showing your upload results cleaning in the same component.

**NOTE:** The third argument provided to the `uploadFiles` and `deleteFiles` calls below is the database path where File Metadata will be written/deleted from. This is out of connivence only, simply remove the third argument if you don't want metadata written/deleted to/from database.

```js
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
import { map } from 'lodash'
import Dropzone from 'react-dropzone'

const { dataToJS } = helpers

// Path within Storage for file and Database for metadata
const filesPath = 'uploadedFiles'

@firebaseConnect([
  filesPath
])
@connect(
  ({ firebase }) => ({
    uploadedFiles: dataToJS(firebase, filesPath)
  })
)
export default class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.object
  }

  onFilesDrop = (files) => {
    // Uploads files and push's objects containing metadata to database at dbPath
    // uploadFiles(storagePath, files, dbPath)
    this.props.firebase.uploadFiles(filesPath, files, filesPath)
  }

  onFileDelete = (file, key) => {
    // Deletes file and removes metadata from database
    // deleteFile(storagePath, dbPath)
    this.props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
  }

  render () {
    const { uploadedFiles } = this.props
    return (
      <div>
        <Dropzone onDrop={this.onFilesDrop}>
          <div>
            Drag and drop files here
            or click to select
          </div>
        </Dropzone>
        {
          uploadedFiles &&
            <div>
              <h3>
                Uploaded file(s):
              </h3>
              {
                map(uploadedFiles, (file, key) => (
                  <div key={file.name + key}>
                    <span>{file.name}</span>
                    <button onClick={() => this.onFileDelete(file, key)}>
                      Delete File
                    </button>
                  </div>
                ))
              }
            </div>
          }
      </div>
    )
  }
}
```

### Change File Metadata
When uploading files as in the above example, you can modify how the file's meta data is written to the database.

```js

// within your createStore.js or store.js file include the following config
const config = {
  fileMetadataFactory: (uploadRes) => {
    // upload response from Firebase's storage upload
    const { metadata: { name, fullPath, downloadURLs } } = uploadRes
    // default factory includes name, fullPath, downloadURL
    return {
      name,
      fullPath,
      downloadURL: downloadURLs[0]
    }
  }
}

```

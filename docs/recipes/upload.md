# Upload

### File Drag/Drop Upload with Delete

```javascript
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
import { map } from 'lodash'
import Dropzone from 'react-dropzone'

const { dataToJS } = helpers

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
    // uploadFiles(storagePath, files, dbPath)
    // Uploads files and push's objects containing metadata to database at dbPath
    this.props.firebase.uploadFiles(filesPath, files, filesPath)
  }

  onFileDelete = (file, key) => {
    // deleteFile(storagePath, dbPath)
    // Deletes file and removes file object from database
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

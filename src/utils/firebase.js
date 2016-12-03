export const deleteFile = (firebase, { path, dbPath }) =>
  firebase.storage()
    .ref(path)
    .delete()
    .then(() =>
      !dbPath
        ? ({ path, dbPath })
        : firebase // Handle option for removing file info from database
            .database()
            .ref(dbPath)
            .remove()
            .then(() => ({ path, dbPath }))
    )

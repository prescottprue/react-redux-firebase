export const getWatchPath = (event, path) =>
  `${event}:${((path.substring(0, 1) === '/') ? '' : '/')}${path}`

/**
 * @description Set a new watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
export const setWatcher = (firebase, event, path, queryId = undefined) => {
  const id = queryId ? `${event}:/${queryId}` : getWatchPath(event, path)

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++
  } else {
    firebase._.watchers[id] = 1
  }

  return firebase._.watchers[id]
}

/**
 * @description Get count of currently attached watchers
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
export const getWatcherCount = (firebase, event, path, queryId = undefined) => {
  const id = queryId ? `${event}:/${queryId}` : getWatchPath(event, path)
  return firebase._.watchers[id]
}

/**
 * @description Remove/Unset a watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
export const unsetWatcher = (firebase, event, path, queryId = undefined) => {
  let id = queryId || getQueryIdFromPath(path)
  path = path.split('#')[0]

  if (!id) {
    id = getWatchPath(event, path)
  }

  if (firebase._.watchers[id] <= 1) {
    delete firebase._.watchers[id]
    if (event !== 'first_child') {
      firebase.database().ref().child(path).off(event)
    }
  } else if (firebase._.watchers[id]) {
    firebase._.watchers[id]--
  }
}

/**
 * @description Get query id from query path
 * @param {String} path - Path from which to get query id
 */
export const getQueryIdFromPath = (path) => {
  const origPath = path
  let pathSplitted = path.split('#')
  path = pathSplitted[0]

  const isQuery = pathSplitted.length > 1
  const queryParams = isQuery ? pathSplitted[1].split('&') : []
  const queryId = isQuery ? queryParams.map((param) => {
    let splittedParam = param.split('=')
    if (splittedParam[0] === 'queryId') {
      return splittedParam[1]
    }
  }).filter(q => q) : undefined
  return (queryId && queryId.length > 0)
    ? queryId[0]
    : ((isQuery) ? origPath : undefined)
}

/**
 * @description Modify query to include methods based on query parameters (such as orderByChild)
 * @param {Array} queryParams - Array of query parameters to apply to query
 * @param {Object} query - Query object on which to apply query parameters
 */
export const applyParamsToQuery = (queryParams, query) => {
  let doNotParse = false
  if (queryParams) {
    queryParams.forEach(param => {
      param = param.split('=')
      switch (param[0]) {
        case 'orderByValue':
          query = query.orderByValue()
          doNotParse = true
          break
        case 'orderByPriority':
          query = query.orderByPriority()
          doNotParse = true
          break
        case 'orderByKey':
          query = query.orderByKey()
          doNotParse = true
          break
        case 'orderByChild':
          query = query.orderByChild(param[1])
          break
        case 'limitToFirst':
          // TODO: Handle number not being passed as param
          query = query.limitToFirst(parseInt(param[1], 10))
          break
        case 'limitToLast':
          // TODO: Handle number not being passed as param
          query = query.limitToLast(parseInt(param[1], 10))
          break
        case 'equalTo':
          let equalToParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
          equalToParam = equalToParam === 'null' ? null : equalToParam
          equalToParam = equalToParam === 'false' ? false : equalToParam
          equalToParam = equalToParam === 'true' ? true : equalToParam
          query = param.length === 3
            ? query.equalTo(equalToParam, param[2])
            : query.equalTo(equalToParam)
          break
        case 'startAt':
          let startAtParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
          startAtParam = startAtParam === 'null' ? null : startAtParam
          query = param.length === 3
            ? query.startAt(startAtParam, param[2])
            : query.startAt(startAtParam)
          break
        case 'endAt':
          let endAtParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
          endAtParam = endAtParam === 'null' ? null : endAtParam
          query = param.length === 3
            ? query.endAt(endAtParam, param[2])
            : query.endAt(endAtParam)
          break
      }
    })
  }

  return query
}

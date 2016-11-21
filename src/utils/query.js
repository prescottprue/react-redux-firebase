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
        query = query.limitToFirst(parseInt(param[1], 10))
        break
      case 'limitToLast':
        query = query.limitToLast(parseInt(param[1], 10))
        break
      case 'equalTo':
        let equalToParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
        equalToParam = equalToParam === 'null' ? null : equalToParam
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
      default:
        break
    }
  })
  return query
}

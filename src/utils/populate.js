import { filter } from 'lodash'

export const getPopulateObject = (str) => {
  let pathArray = str.split('#')
  const path = pathArray[0]
  const params = pathArray[1].split('&')
  console.log('path, params', { path, params })
  // Get list of populates
  const populates = filter(params, param =>
    param.indexOf('populate') !== -1
  ).map(p => p.split('=')[1])
  console.log('populates', { path, populates })
  return { path, populates }
  // pattern to make:
  // { path: '', populates: [ { child: '', root: '' } ] }
}

export default { getPopulateObject }

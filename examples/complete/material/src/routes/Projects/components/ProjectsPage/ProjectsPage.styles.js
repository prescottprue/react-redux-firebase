export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(4),
    flexGrow: '2',
    boxSizing: 'border-box',
    overflowY: 'scroll'
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '-webkit-flex-flow': 'row wrap'
  }
})

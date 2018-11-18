export default theme => ({
  root: {
    ...theme.flexRowCenter,
    alignItems: 'center',
    cursor: 'pointer',
    height: '200px',
    width: '300px',
    margin: theme.spacing.unit * 0.5,
    padding: theme.spacing.unit * 1.3,
    overflow: 'hidden'
  }
})

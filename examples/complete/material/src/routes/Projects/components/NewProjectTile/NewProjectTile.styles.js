export default theme => ({
  root: {
    ...theme.flexRowCenter,
    alignItems: 'center',
    cursor: 'pointer',
    height: '200px',
    width: '300px',
    margin: theme.spacing(0.5),
    padding: theme.spacing(1.3),
    overflow: 'hidden'
  }
})

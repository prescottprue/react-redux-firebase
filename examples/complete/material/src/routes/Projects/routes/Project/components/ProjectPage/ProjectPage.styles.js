export default theme => ({
  root: {
    padding: theme.spacing(2)
  },
  progress: {
    ...theme.flexRowCenter,
    alignItems: 'center',
    paddingTop: theme.spacing(8)
  }
})

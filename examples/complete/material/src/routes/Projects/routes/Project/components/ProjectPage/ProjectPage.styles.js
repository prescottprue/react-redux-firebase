export default theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  progress: {
    ...theme.flexRowCenter,
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 8
  }
})

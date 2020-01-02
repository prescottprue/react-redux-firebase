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
  },
  newIcon: {
    width: '6rem',
    height: '6rem',
    transition: 'all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms',
    '&:hover': {
      color: '#757575'
    }
  }
})

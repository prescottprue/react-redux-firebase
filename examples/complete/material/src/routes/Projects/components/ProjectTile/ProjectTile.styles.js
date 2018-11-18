export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '200px',
    width: '300px',
    margin: theme.spacing.unit * 0.5,
    padding: theme.spacing.unit * 1.3
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  name: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    ':hover': {
      color: ''
    },
    ':visited': {
      textDecoration: 'none'
    }
  }
})

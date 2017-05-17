import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './NewProjectDialog.scss'

@reduxForm({
  form: 'newProject'
})
export default class NewProjectDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired, // added by redux-form
    handleSubmit: PropTypes.func.isRequired // added by redux-form
  }

  state = {
    open: this.props.open || false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.open) {
      this.setState({ open: true })
    }
  }

  close = () => {
    this.setState({ open: false })
    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    }
  }

  render () {
    const { open } = this.state
    const { handleSubmit } = this.props

    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onClick={this.close}
      />,
      <FlatButton
        label='Create'
        primary
        onClick={this.props.submit}
      />
    ]

    return (
      <Dialog
        title='New Project'
        modal={false}
        actions={actions}
        open={open}
        onRequestClose={this.close}
        contentClassName={classes.container}>
        <div className={classes.inputs}>
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              component={TextField}
              validate={[required]}
              label='Project Name'
            />
          </form>
        </div>
      </Dialog>
    )
  }
}

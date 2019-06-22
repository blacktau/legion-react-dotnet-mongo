import React, { PureComponent } from 'react'
import { TableRow, TableCell, Button, withStyles, withTheme, Checkbox } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  buttonCell: {
    width: theme.spacing.unit * 25
  },
  thumbNailCell: {
    width: '75px'
  }
})

class PhotographListRow extends PureComponent {
  handlePublishClicked = () => {
    const {onPublish, value} = this.props
    if (onPublish) {
      onPublish(value)
    }
  }

  handleSuppressClicked = () => {
    const {onSuppress, value} = this.props
    if (onSuppress) {
      onSuppress(value)
    }
  }

  render = () => {
    const { classes, value } = this.props

    return (
      <TableRow key={value.id}>
        <TableCell><Checkbox /></TableCell>
        <TableCell className={classes.thumbNailCell}>
          <img src={'/images/' + value.id + '.jpg?height=50'} alt={value.description} />
        </TableCell>

        <TableCell>{value.title}</TableCell>
        <TableCell>{value.uploadedDate}</TableCell>
        <TableCell>{value.publishedDate}</TableCell>
        <TableCell className={classes.buttonCell}>
          <Button variant='fab' color='primary' aria-label='Edit' className={classes.button} component={Link} to={'/photograph/' + value.id}><EditIcon /></Button>
          {!value.isPublished
            ? <Button variant='fab' color='primary' aria-label='Publish' className={classes.button} onClick={this.handlePublishClicked}><VisibilityIcon /></Button>
            : <Button variant='fab' color='primary' aria-label='Suppress' className={classes.button} onClick={this.handleSuppressClicked}><VisibilityOffIcon /></Button>
          }
        </TableCell>
      </TableRow>

    )
  }
}

PhotographListRow.propTypes = {
  classes: PropTypes.object.isRequired,
  onPublish: PropTypes.func.isRequired,
  onSuppress: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default withTheme()(withStyles(styles)(PhotographListRow))

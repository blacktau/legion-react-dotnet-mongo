import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell, LinearProgress, Typography, withStyles, withTheme } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import WarningIcon from '@material-ui/icons/Warning'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  itemRow: {
    height: 33
  },
  error: {
    color: theme.palette.error.light
  },
  icon: {
    height: '1em',
    width: '1em',
    verticalAlign: 'bottom'
  },
  nameCell: {
    width: '50%'
  }
})

const ProgressItem = (props) => {
  const { classes, item, theme } = props

  return (
    <TableRow key={item.key} className={classes.itemRow}>
      <TableCell className={classes.nameCell}>
        {item.name}
      </TableCell>
      <TableCell className={classes.progressCell}>
        <span>
          {item.progress && !item.error && !item.success && <LinearProgress variant='determinate' value={item.progress} />}
          {!item.progress && <Typography>Awaiting Start</Typography>}
          {item.success && <DoneIcon className={classes.icon} nativeColor={green[500]} />}
          {item.error && <Typography className={classes.error}><WarningIcon className={classes.icon} nativeColor={theme.palette.error.main} /> {item.error}</Typography>}
        </span>
      </TableCell>
    </TableRow>
  )
}

ProgressItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default withTheme()(withStyles(styles)(ProgressItem))

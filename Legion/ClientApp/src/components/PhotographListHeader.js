import React, { PureComponent } from 'react'
import { TableRow, TableCell, TableHead, Checkbox, withStyles, withTheme, Tooltip, TableSortLabel } from '@material-ui/core'
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

class PhotographListHeader extends PureComponent {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property)
  }

  render () {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, columns } = this.props
    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          <TableCell className={classes.thumbNailCell}>Image</TableCell>
          {columns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title='Sort'
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
          <TableCell className={classes.buttonCell}>Functions</TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

PhotographListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default withTheme()(withStyles(styles)(PhotographListHeader))

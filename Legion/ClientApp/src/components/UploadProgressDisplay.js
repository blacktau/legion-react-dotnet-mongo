import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Table, CardHeader, TableHead, TableRow, TableCell, TableBody, CardActions, Button } from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import ProgressItem from './ProgressItem'

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class UploadProgressDisplay extends PureComponent {
  render = () => {
    const { classes, uploads, reset, onReset } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader title='Uploading Photographs' />
          <CardContent className={classes.cardContent}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Filename</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map(item => {
                  return (!item || !item.key)
                    ? null
                    : <ProgressItem key={item.key} item={item} />
                })}
              </TableBody>
            </Table>
          </CardContent>
          {reset &&
            <CardActions>
              <Button onClick={onReset}>Clear</Button>
            </CardActions>
          }
        </Card>
      </div>
    )
  }
}

UploadProgressDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  uploads: PropTypes.array.isRequired,
  reset: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired
}

export default withTheme()(withStyles(styles)(UploadProgressDisplay))

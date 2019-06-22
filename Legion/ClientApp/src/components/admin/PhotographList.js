import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import PhotographListRow from './PhotographListRow'
import PhotographListHeader from './PhotographListHeader'

class PhotographList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selected: [],
      columns: this.createColumns()
    }
  }

  createColumns = () => {
    return [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'uploadedDate', numeric: false, disablePadding: true, label: 'Date Uploaded' },
      { id: 'publishedDate', numeric: false, disablePadding: true, label: 'Date Published' }
    ]
  }

  render = () => {
    const { photographs, onPublish, onSuppress } = this.props
    const { selected, order, orderBy, columns } = this.state

    if (!photographs || photographs.length === 0) {
      return <Typography>No Photographs!</Typography>
    }

    return (
      <Table>
        <PhotographListHeader
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={this.handleRequestSort}
          rowCount={photographs.length}
          columns={columns} />
        <TableBody>
          {photographs.map(p => {
            return (
              <PhotographListRow key={p.id} onPublish={onPublish} onSuppress={onSuppress} value={p} />
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

PhotographList.propTypes = {
  classes: PropTypes.object.isRequired,
  photographs: PropTypes.array,
  onPublish: PropTypes.func.isRequired,
  onSuppress: PropTypes.func.isRequired
}

export default withTheme()(withStyles(styles)(PhotographList))

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class PhotographListHeader extends PureComponent {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property)
  }

  render () {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns } = this.props
    return (
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Image</th>
          {columns.map(column => {
            return (
              <th
                key={column.id}>
                {/* <Tooltip
                  title='Sort'
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <th
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </th>
                </Tooltip> */}
              </th>
            )
          }, this)}
          <th>Functions</th>
        </tr>
      </thead>
    )
  }
}

PhotographListHeader.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.string.isRequired,
  // orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired
}

export default PhotographListHeader

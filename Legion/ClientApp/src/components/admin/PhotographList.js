import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import PhotographListRow from './PhotographListRow'
import { HTMLTable } from '@blueprintjs/core'

class PhotographList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selected: []
    }
  }

  handleItemSelected = (item) => {

  }

  render = () => {
    const { photographs, onPublish, onSuppress } = this.props
    const { selected, order, orderBy, columns } = this.state

    if (!photographs || photographs.length === 0) {
      return <div>No Photographs!</div>
    }

    return (
      <HTMLTable bordered condensed striped>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Title</th>
            <th>Uploaded</th>
            <th>Published</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {photographs.map(p => {
            return (
              <PhotographListRow
                key={p.id}
                onPublish={onPublish}
                onSuppress={onSuppress}
                value={p}
                onSelected={this.handleItemSelected} />
            )
          })}
        </tbody>
      </HTMLTable>
    )
  }
}

PhotographList.propTypes = {
  photographs: PropTypes.array
}

export default PhotographList

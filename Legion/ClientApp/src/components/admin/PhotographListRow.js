import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Intent, Icon, ButtonGroup, Checkbox } from '@blueprintjs/core'

class PhotographListRow extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  handlePublishClicked = () => {
    const { onPublish, value } = this.props
    if (onPublish) {
      onPublish(value)
    }
  }

  handleSuppressClicked = () => {
    const { onSuppress, value } = this.props
    if (onSuppress) {
      onSuppress(value)
    }
  }

  handleSelectionChanged = () => {
    const { selected } = this.state
    const { onSelected, value, onDeselected } = this.props
    if (selected) {
      onSelected(value)
    } else {
      onDeselected(value)
    }
  }

  render = () => {
    const { value } = this.props

    return (
      <tr key={value.id}>
        <td>
          <Checkbox onChange={this.handleSelectionChanged} />
        </td>
        <td>
          <img src={'/images/' + value.id + '.jpg?height=50'} alt={value.description} />
        </td>
        <td>{value.title}</td>
        <td>{value.uploadedDate}</td>
        <td>{value.publishedDate}</td>
        <td className='actionButtons'>
          <ButtonGroup>
            <Button intent={Intent.PRIMARY} component={Link} to={'/admin/photograph/' + value.id}><Icon icon='edit' /></Button>
            <Button intent={Intent.WARNING} onClick={this.handleDeleteClicked}><Icon icon='delete' /></Button>
            {!value.isPublished
              ? <Button intent={Intent.SUCCESS} onClick={this.handlePublishClicked}><Icon icon='eye-on' /></Button>
              : <Button intent={Intent.WARNING} onClick={this.handleSuppressClicked}><Icon icon='eye-off' /></Button>
            }
          </ButtonGroup>
        </td>
      </tr>

    )
  }
}

PhotographListRow.propTypes = {
  onPublish: PropTypes.func.isRequired,
  onSuppress: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  onDeselected: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default PhotographListRow

import React, { useState } from 'react'
import { Button, Intent, Icon, ButtonGroup, Checkbox } from '@blueprintjs/core'
import { Photograph } from '../../types/Photograph'
import moment from 'moment'

type PhotographListRowProps = {
  value: Photograph
}

const PhotographListRow = ({ value }: PhotographListRowProps) => {
  const [selected, setSelected] = useState(false)

  // handlePublishClicked = () => {
  //   const { onPublish, value } = this.props
  //   if (onPublish) {
  //     onPublish(value)
  //   }
  // }

  // handleSuppressClicked = () => {
  //   const { onSuppress, value } = this.props
  //   if (onSuppress) {
  //     onSuppress(value)
  //   }
  // }

  // handleSelectionChanged = () => {
  //   const { selected } = this.state
  //   const { onSelected, value, onDeselected } = this.props
  //   if (selected) {
  //     onSelected(value)
  //   } else {
  //     onDeselected(value)
  //   }
  // }

  return (
    <tr key={value.id}>
      <td>
        <Checkbox onChange={() => setSelected(!selected)} checked={selected} />
      </td>
      <td>
        <img src={'/images/' + value.id + '.jpg?height=50'} alt={value.description} />
      </td>
      <td>{value.title}</td>
      <td>{value.uploadedDate ? moment(value.uploadedDate).format('DD/MM/YY hh:mm') : '-'}</td>
      <td>{value.publishedDate ? moment(value.publishedDate).format('DD/MM/YY hh:mm') : '-'}</td>
      <td className='actionButtons'>
        <ButtonGroup>
          <Button intent={Intent.PRIMARY}>
            <Icon icon='edit' />
          </Button>
          <Button intent={Intent.WARNING}>
            <Icon icon='delete' />
          </Button>
          {!value.isPublished ? (
            <Button intent={Intent.SUCCESS}>
              <Icon icon='eye-on' />
            </Button>
          ) : (
            <Button intent={Intent.WARNING}>
              <Icon icon='eye-off' />
            </Button>
          )}
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default PhotographListRow

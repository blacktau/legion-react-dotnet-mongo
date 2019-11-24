import React, { useState } from 'react'
import { Intent, ButtonGroup, Checkbox } from '@blueprintjs/core'
import { Photograph } from '../../types/Photograph'
import moment from 'moment'
import { useInView } from 'react-intersection-observer'
import { PhotographActionButton } from './PhotographActionButton'
import { publishPhotograph } from '../../webapi/photographs/publishPhotograph-client'
import { managePhotographsActions } from '../../actions/managePhotographActions'
import { retractPhotograph } from '../../webapi/photographs/retractPhotograph-client'

type PhotographListRowProps = {
  value: Photograph
}

const PhotographListRow = ({ value }: PhotographListRowProps) => {
  const [selected, setSelected] = useState(false)

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

  const [ref, inView, entry] = useInView({
    threshold: 0,
    rootMargin: '0px 0px 50px 0px',
    triggerOnce: true
  })

  return (
    <tr key={value.id}>
      <td>
        <Checkbox onChange={() => setSelected(!selected)} checked={selected} />
      </td>
      <td>
        <img src={inView ? `/images/${value.id}.jpg?height=50` : ''} alt={value.description} className={'photographRowImage'} ref={ref} />
      </td>
      <td>{value.title}</td>
      <td>{value.uploadedDate ? moment(value.uploadedDate).format('DD/MM/YY hh:mm') : '-'}</td>
      <td>{value.publishedDate ? moment(value.publishedDate).format('DD/MM/YY hh:mm') : '-'}</td>
      <td className='actionButtons'>
        <ButtonGroup>
          {/*
          <PhotographActionButton intent={Intent.PRIMARY} icon='edit'  />
          <PhotographActionButton intent={Intent.WARNING} icon='delete' />
          
*/}
          {!value.isPublished ? (
            <PhotographActionButton intent={Intent.SUCCESS} icon='eye-on' apiClient={publishPhotograph} photograph={value} actionFactory={managePhotographsActions.published} />
          ) : (
            <PhotographActionButton intent={Intent.WARNING} icon='eye-off' apiClient={retractPhotograph} photograph={value} actionFactory={managePhotographsActions.retracted} />
          )}
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default PhotographListRow

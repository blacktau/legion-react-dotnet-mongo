import React, { useState } from 'react'
import { Intent, ButtonGroup, Checkbox, Button, Icon } from '@blueprintjs/core'
import Photograph from 'types/Photograph'
import moment from 'moment'
import { useInView } from 'react-intersection-observer'
import { PhotographActionButton } from './PhotographActionButton'

import { Link } from 'react-router-dom'
import { publishPhotograph, retractPhotograph } from './managePhotographsApi'
import { updatePhotographList } from './ManagePhotographsSlice'

interface PhotographListRowProps {
  value: Photograph
}

const PhotographListRow = ({ value }: PhotographListRowProps) => {
  const [selected, setSelected] = useState(false)

  const [ref, inView] = useInView({
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
          <Link to={`/admin/photograph/${value.id}/edit`}>
            <Button intent={Intent.PRIMARY}>
              <Icon icon='edit' />
            </Button>
          </Link>
          {!value.isPublished
            ? (
            <PhotographActionButton intent={Intent.SUCCESS} icon='eye-on' apiClient={publishPhotograph} photograph={value} actionFactory={updatePhotographList} />
              )
            : (
            <PhotographActionButton intent={Intent.WARNING} icon='eye-off' apiClient={retractPhotograph} photograph={value} actionFactory={updatePhotographList} />
              )}
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default PhotographListRow

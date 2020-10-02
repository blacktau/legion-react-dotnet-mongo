import React, { useState } from 'react'
import Photograph from 'types/Photograph'
import moment from 'moment'
import { useInView } from 'react-intersection-observer'
import { PhotographActionButton } from './PhotographActionButton'

import { publishPhotograph, retractPhotograph } from './managePhotographsApi'
import { updatePhotographList } from './ManagePhotographsSlice'
import { ButtonGroup, Checkbox, IconButton, Link, TableCell, TableRow } from '@material-ui/core'
import { Edit as EditIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

interface PhotographListRowProps {
  value: Photograph
}

const PhotographListRow = ({ value }: PhotographListRowProps) => {
  const [selected, setSelected] = useState(false)
  const history = useHistory()

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '0px 0px 50px 0px',
    triggerOnce: true
  })

  return (
    <TableRow key={value.id}>
      <TableCell>
        <Checkbox onChange={() => setSelected(!selected)} checked={selected} />
      </TableCell>
      <TableCell>
        <img src={inView ? `/images/${value.id}.jpg?height=50` : ''} alt={value.description} className={'photographRowImage'} ref={ref} />
      </TableCell>
      <TableCell>{value.title}</TableCell>
      <TableCell>{value.uploadedDate ? moment(value.uploadedDate).format('DD/MM/YY hh:mm') : '-'}</TableCell>
      <TableCell>{value.publishedDate ? moment(value.publishedDate).format('DD/MM/YY hh:mm') : '-'}</TableCell>
      <TableCell className='actionButtons'>
        <ButtonGroup>
          <IconButton onClick={() => history.push(`/admin/photograph/${value.id}/edit`)}>
            <EditIcon />
          </IconButton>
          {!value.isPublished ? (
            <PhotographActionButton apiClient={publishPhotograph} photograph={value} actionFactory={updatePhotographList}>
              <VisibilityIcon />
            </PhotographActionButton>
          ) : (
            <PhotographActionButton apiClient={retractPhotograph} photograph={value} actionFactory={updatePhotographList}><VisibilityOffIcon/></PhotographActionButton>
          )}
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}

export default PhotographListRow

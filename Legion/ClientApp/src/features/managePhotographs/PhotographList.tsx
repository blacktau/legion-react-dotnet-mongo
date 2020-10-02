import React from 'react'
import PhotographListRow from './PhotographListRow'
import Photograph from '../../types/Photograph'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

interface PhotographListProps {
  photographs: Photograph[]
}

const PhotographList = ({ photographs }: PhotographListProps) => {
  if (!photographs || photographs.length === 0) {
    return <div>No Photographs!</div>
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Uploaded</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {photographs.map(p => {
          return <PhotographListRow key={p.id} value={p} />
        })}
      </TableBody>
    </Table>
  )
}

export default PhotographList

import React from 'react'
import PhotographListRow from './PhotographListRow'
import { HTMLTable } from '@blueprintjs/core'
import { Photograph } from '../../types/Photograph'

type PhotographListProps = {
  photographs: Array<Photograph>
  // onPublish: any
  // onSuppress: any
}

const PhotographList = ({ photographs }: PhotographListProps) => {
  if (!photographs || photographs.length === 0) {
    return <div>No Photographs!</div>
  }

  return (
    <HTMLTable bordered condensed striped>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Uploaded</th>
          <th>Published</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {photographs.map(p => {
          return <PhotographListRow key={p.id} value={p} />
        })}
      </tbody>
    </HTMLTable>
  )
}

export default PhotographList

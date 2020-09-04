import React from 'react'
import { Card, Button, Classes, HTMLTable } from '@blueprintjs/core'
import FileUpload from 'types/FileUpload'
import ProgressItem from './ProgressItem'

interface UploadProgressDisplayProps {
  uploads: FileUpload[]
  onReset: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const UploadProgressDisplay = ({ uploads, onReset }: UploadProgressDisplayProps) => {
  if (!uploads || uploads.length === 0) {
    return (<></>)
  }

  const incomplete = uploads.some(p => {
    return !(p.success || p.error)
  })

  return (
    <div>
      <Card className={Classes.DARK + ' uploadProgressCard'}>
        <h3 className={Classes.PANEL_STACK_HEADER}>Uploading Photographs</h3>
        <HTMLTable bordered condensed striped>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Progress</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map(item => {
              return !item || !item.key ? null : <ProgressItem key={item.key} item={item} />
            })}
          </tbody>
        </HTMLTable>
        <Button onClick={onReset} disabled={incomplete}>
          Clear
        </Button>
      </Card>
    </div>
  )
}

export default UploadProgressDisplay

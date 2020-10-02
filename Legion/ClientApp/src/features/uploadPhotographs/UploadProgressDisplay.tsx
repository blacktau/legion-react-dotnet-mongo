import { Button, Card, CardActionArea, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
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
      <Card className='uploadProgressCard'>
        <CardHeader>
          Uploading Photographs
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Filename</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploads.map(item => {
                return !item || !item.key ? null : <ProgressItem key={item.key} item={item} />
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardActionArea>
          <Button onClick={onReset} disabled={incomplete}>
            Clear
          </Button>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default UploadProgressDisplay

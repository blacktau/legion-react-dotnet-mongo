import { CircularProgress, LinearProgress, Popover, TableCell, TableRow, Typography } from '@material-ui/core'
import { Check as TickIcon, Warning as WarningIcon } from '@material-ui/icons'
import React, { useState } from 'react'
import FileUpload from 'types/FileUpload'

interface ProgressItemProps {
  item: FileUpload
  key: string
}

const ProgressItem = ({ item }: ProgressItemProps) => {
  const [showError, setShowError] = useState(false)

  return (
    <TableRow key={item.key}>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <span>
          <LinearProgress variant="determinate" value={item.progress} />
        </span>
      </TableCell>
      <TableCell>
        {!item.success && !item.error && <CircularProgress size={20} />}
        {item.success && <TickIcon />}
        {item.error && (
          <><WarningIcon color='error' onMouseEnter={() => setShowError(true)} onMouseLeave={() => setShowError(false)} />
            <Popover open={showError}>
              <Typography>{item.error.message}</Typography>
            </Popover></>
        )}
      </TableCell>
    </TableRow>
  )
}

export default ProgressItem

import React from 'react'
import { ProgressBar, Icon, Spinner, Intent, Popover, PopoverInteractionKind, Card } from '@blueprintjs/core'
import FileUpload from 'types/FileUpload'

interface ProgressItemProps {
  item: FileUpload
  key: string
}

const ProgressItem = ({ item }: ProgressItemProps) => {
  return (
    <tr key={item.key}>
      <td>{item.name}</td>
      <td>
        <span>
          <ProgressBar value={item.progress} intent={item.progress === 100 ? Intent.SUCCESS : Intent.PRIMARY} animate={item.progress < 100} />
        </span>
      </td>
      <td>
        {!item.success && !item.error && <Spinner size={Spinner.SIZE_SMALL} intent={Intent.PRIMARY} />}
        {item.success && <Icon icon="tick" intent={Intent.SUCCESS} />}
        {item.error && (
          <Popover hoverOpenDelay={150} interactionKind={PopoverInteractionKind.HOVER} >
            <Icon icon="warning-sign" intent={Intent.DANGER} />
            <Card>
              {item.error.message}
            </Card>
          </Popover>
        )}
      </td>
    </tr>
  )
}

export default ProgressItem

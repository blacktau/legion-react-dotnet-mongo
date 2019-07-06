import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ProgressItem from './ProgressItem'
import { Card, Button, Classes, HTMLTable } from '@blueprintjs/core'

class UploadProgressDisplay extends PureComponent {
  render = () => {
    const { uploads, onReset } = this.props
    const incomplete = uploads.some((p) => { return !(p.success || p.error) })
    return (
      <div>
        <Card className={Classes.DARK + ' uploadProgressCard'}>
          <h3 className={Classes.PANEL_STACK_HEADER}>Uploading Photographs</h3>
          <p>
            <HTMLTable bordered condensed striped>
              <thead>
                <th>
                  Filename
                </th>
                <th>
                  Progress
                </th>
                <th>&nbsp;</th>
              </thead>
              <tbody>
                {uploads.map(item => {
                  return (!item || !item.key)
                    ? null
                    : <ProgressItem key={item.key} item={item} />
                })}
              </tbody>
            </HTMLTable>
          </p>
          <Button onClick={onReset} disabled={incomplete}>Clear</Button>
        </Card>
      </div>
    )
  }
}

UploadProgressDisplay.propTypes = {
  uploads: PropTypes.array.isRequired,
  reset: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired
}

export default UploadProgressDisplay

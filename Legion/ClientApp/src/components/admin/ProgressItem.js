import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBar, Icon, Spinner, Intent } from '@blueprintjs/core'

const ProgressItem = (props) => {
  const { item } = props

  return (
    <tr key={item.key}>
      <td>
        {item.name}
      </td>
      <td>
        <span>
          <ProgressBar value={item.progress} intent={item.progress === 100 ? Intent.SUCCESS : Intent.PRIMARY} animate={(item.progress < 100)} />
        </span>
      </td>
      <td>
        {!item.success && !item.error && <Spinner size={Spinner.SIZE_SMALL} intent={Intent.PRIMARY} />}
        {item.success && <Icon icon='tick' intent={Intent.SUCCESS} />}
        {item.error && <p><Icon icon='warning-sign' intent={Intent.DANGER} /> {item.error}</p>}
      </td>
    </tr>
  )
}

ProgressItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default ProgressItem

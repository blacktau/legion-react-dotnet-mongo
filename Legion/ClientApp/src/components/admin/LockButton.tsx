import React from 'react'
import { Button, Intent, Tooltip } from '@blueprintjs/core'

type LockButtonProps = {
  showPassword: boolean
  disabled?: boolean
  setShowPassword: (value: boolean) => void
}

const LockButton = ({ showPassword, disabled, setShowPassword }: LockButtonProps) => {
  return (
    <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`} disabled={disabled}>
      <Button disabled={disabled} icon={showPassword ? 'unlock' : 'lock'} intent={Intent.WARNING} minimal onClick={() => setShowPassword(!showPassword)} />
    </Tooltip>
  )
}

export default LockButton

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControlGroup, Classes, Popover, InputGroup, Icon, Intent, PopoverPosition, PopoverInteractionKind } from '@blueprintjs/core'

import React from 'react'

interface RequiredInputGroupProps {
  disabled: boolean
  value: any
  type: any
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  rightElement?: JSX.Element
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  supplied: boolean
  autoComplete?: string
}

const RequiredInputGroup = ({ disabled, value, type, placeholder, onChange, rightElement, onKeyPress, supplied, autoComplete }: RequiredInputGroupProps) => {
  return (
    <ControlGroup fill vertical={false}>
      <InputGroup
        disabled={disabled}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        rightElement={rightElement}
        onKeyPress={onKeyPress}
        required
        intent={!supplied ? Intent.DANGER : Intent.NONE}
        autoComplete={autoComplete}
      />
      {!supplied && (
        <Popover popoverClassName={Classes.POPOVER_CONTENT_SIZING} position={PopoverPosition.AUTO_END} className={Classes.FIXED} interactionKind={PopoverInteractionKind.HOVER} inheritDarkTheme>
          <Icon icon="error" className={Classes.FIXED} style={{ marginLeft: '10px', marginTop: '5px' }} />
          <div>{placeholder} is required.</div>
        </Popover>
      )}
    </ControlGroup>
  )
}

export default RequiredInputGroup

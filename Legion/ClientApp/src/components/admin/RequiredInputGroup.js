import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ControlGroup, Classes, Popover, InputGroup, Icon, Intent, PopoverPosition, PopoverInteractionKind } from '@blueprintjs/core'

class RequiredInputGroup extends Component {
  render () {
    const {
      disabled,
      value,
      type,
      placeholder,
      onChange,
      rightElement,
      onKeyPress,
      supplied

    } = this.props

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
          intent={!supplied ? Intent.DANGER : Intent.NONE} />
        { !supplied &&
          <Popover
            popoverClassName={Classes.POPOVER_CONTENT_SIZING}
            position={PopoverPosition.AUTO_END}
            className={Classes.FIXED}
            interactionKind={PopoverInteractionKind.HOVER}
            inheritDarkTheme>
            <Icon icon='error' className={Classes.FIXED} style={{ marginLeft: '10px', marginTop: '5px' }} />
            <div>
              {placeholder} is required.
            </div>
          </Popover> }
      </ControlGroup>
    )
  }
}

RequiredInputGroup.propTypes = {
  reqired: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  rightElement: PropTypes.node,
  onKeyPress: PropTypes.func,
  supplied: PropTypes.bool
}

export default RequiredInputGroup

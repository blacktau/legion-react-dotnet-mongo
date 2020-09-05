import { IconName } from '@blueprintjs/icons'
import React, { useCallback, useState} from 'react'
import {Icon} from '@blueprintjs/core'

interface InputBoxProps {
  onChange?: (value: string) => void
  icon?: IconName
}

const InputBox = ({ onChange, icon }: InputBoxProps) => {
  const [value, setValue] = useState<string>()

  const handleValueChange = useCallback((e) => {
    setValue(e.value)
    if (onChange) {
      onChange(e.value)
    }
  }, [onChange])
  return (
    <div className='inputBox'>
      <input type='text' onChange={handleValueChange} value={value}/>
      {icon && <Icon icon={icon} />}
    </div>
  )
}

export default InputBox

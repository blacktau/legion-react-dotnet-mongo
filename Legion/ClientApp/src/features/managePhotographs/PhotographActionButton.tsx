/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Button, Icon, IconName, Intent, Toast, Toaster } from '@blueprintjs/core'
import React, { useCallback, useState } from 'react'
import { MaybeElement } from '@blueprintjs/core/src/common/props'
import Photograph from 'types/Photograph'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { RequestError } from 'types/RequestError'

interface PhotographActionButtonProps {
  icon?: IconName | MaybeElement
  apiClient: (photograph: Photograph) => Promise<void | Photograph>
  photograph: Photograph
  actionFactory: (photograph: Photograph) => Action<string>
  intent?: Intent
}

const PhotographActionButton = ({ icon, apiClient, photograph, actionFactory, ...buttonProps }: PhotographActionButtonProps) => {
  const dispatch = useDispatch()
  const [error, setError] = useState<RequestError | undefined>(undefined)

  const onClick = useCallback(async () => {
    try {
      const result = await apiClient(photograph)
      if (result) {
        dispatch(actionFactory(result))
      }
    } catch (error) {
      setError(error)
    }
  }, [actionFactory, apiClient, dispatch, photograph])

  return (
    <>
      {error && (
        <Toaster>
          <Toast message={error.message} intent={Intent.DANGER} onDismiss={() => setError(undefined)} />
        </Toaster>
      )}
      <Button {...buttonProps} onClick={onClick}>
        {icon && <Icon icon={icon} />}
      </Button>
    </>
  )
}

export { PhotographActionButton }

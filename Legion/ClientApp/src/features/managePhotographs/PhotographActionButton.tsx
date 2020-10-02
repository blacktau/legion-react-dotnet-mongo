/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React, { ReactNode, useCallback, useState } from 'react'
import Photograph from 'types/Photograph'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { RequestError } from 'types/RequestError'
import { IconButton, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

interface PhotographActionButtonProps {
  children: ReactNode
  apiClient: (photograph: Photograph) => Promise<void | Photograph>
  photograph: Photograph
  actionFactory: (photograph: Photograph) => Action<string>
}

const PhotographActionButton = ({ children, apiClient, photograph, actionFactory, ...buttonProps }: PhotographActionButtonProps) => {
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
        <Snackbar>
          <Alert severity='error' onClose={() => setError(undefined)}>{error.message}</Alert>
        </Snackbar>
      )}
      <IconButton {...buttonProps} onClick={onClick}>
        {children}
      </IconButton>
    </>
  )
}

export { PhotographActionButton }

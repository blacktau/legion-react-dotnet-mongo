import React, { useState, useEffect } from 'react'
import { Button, Classes, Dialog, Intent, Toaster, Toast } from '@blueprintjs/core'
import { authoriseActions } from '../../actions/authoriseActions'
import RequiredInputGroup from './RequiredInputGroup'
import LockButton from './LockButton'
import { authenticateUser } from '../../webapi/account'
import { User } from '../../types/User'
import { useDispatch } from 'react-redux'
import { RequestError } from '../../webapi/api-client'

const LoginDialog = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [triggerRequest, setTriggerRequest] = useState(false)
  const [error, setError] = useState<RequestError | undefined>(undefined)
  const [inProgress, setInProgress] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!triggerRequest) {
      return
    }

    setSubmitted(true)
    if (username && password) {
      setInProgress(true)
      authenticateUser(username, password)
        .then((user: User) => {
          dispatch(authoriseActions.success(user))
          setInProgress(false)
        })
        .catch((error: RequestError) => {
          setError(error)
          setInProgress(false)
        })
        .finally(() => {
          setTriggerRequest(false)
        })
    } else {
      setTriggerRequest(false)
    }
  }, [triggerRequest, dispatch, password, username])

  return (
    <>
      {error && (
        <Toaster>
          <Toast message={error.message} intent={Intent.DANGER} onDismiss={() => setError(undefined)} />
        </Toaster>
      )}
      <Dialog isOpen autoFocus enforceFocus icon='log-in' className={Classes.DARK} title='Login' onClose={() => setError(undefined)}>
        <div className={Classes.DIALOG_BODY}>
          <RequiredInputGroup
            disabled={inProgress}
            value={username}
            type='text'
            placeholder='Username'
            onChange={event => {
              if (error) {
                setError(undefined)
              }
              setUsername(event.target.value)
            }}
            supplied={!(submitted && (username == null || username.length <= 1))}
          />
          <br />
          <RequiredInputGroup
            disabled={inProgress}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            onChange={event => {
              if (error) {
                setError(undefined)
              }
              setPassword(event.target.value)
            }}
            rightElement={<LockButton setShowPassword={setShowPassword} showPassword={showPassword} />}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                setTriggerRequest(true)
                event.preventDefault()
              }
            }}
            supplied={!(submitted && (password == null || password.length <= 1))}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              onClick={() => {
                setTriggerRequest(true)
              }}
              disabled={inProgress}
              icon='log-in'
              loading={inProgress}
            >
              Login
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default LoginDialog

import React, { useState, ChangeEvent, useEffect } from 'react'
import { Dialog, Classes, Button, Intent, Toast, Alert, Toaster } from '@blueprintjs/core'
import { useDispatch } from 'react-redux'
import { push, RouterAction } from 'react-router-redux'
import RequiredInputGroup from './RequiredInputGroup'
import LockButton from './LockButton'
import { changePassword } from '../../webapi/account'
import { RequestError } from '../../webapi/api-client'

const ChangePasswordDialog = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('')
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [triggerRequest, setTriggerRequest] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState<RequestError | undefined>(undefined)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!triggerRequest) {
      return
    }

    setSubmitted(true)
    if (currentPassword && newPassword && repeatedNewPassword) {
      setInProgress(true)
      changePassword(currentPassword, newPassword, repeatedNewPassword)
        .then(() => {
          setInProgress(false)
          setPasswordChanged(true)
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
  }, [triggerRequest])

  return (
    <>
      {error && (
        <Toaster>
          <Toast message={error.message} intent={Intent.DANGER} onDismiss={() => setError(undefined)} />
        </Toaster>
      )}
      <Alert
        isOpen={passwordChanged}
        confirmButtonText='Okay'
        onConfirm={() => {
          dispatch(push('/admin'))
        }}
        className={Classes.DARK}
      >
        <p>Password Successfully Updated</p>
      </Alert>
      <Dialog isOpen autoFocus enforceFocus icon='lock' className={Classes.DARK} title='Change Password' onClose={(): RouterAction => dispatch(push('/admin'))}>
        <div className={Classes.DIALOG_BODY}>
          <RequiredInputGroup
            disabled={inProgress}
            value={currentPassword}
            type={showCurrentPassword ? 'text' : 'password'}
            autoComplete='current-password'
            placeholder='Current Password'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setError(undefined)
              setCurrentPassword(event.target.value)
            }}
            rightElement={<LockButton setShowPassword={setShowCurrentPassword} showPassword={showCurrentPassword} />}
            supplied={!(submitted && (!currentPassword || currentPassword.length < 1))}
          />
          <br />
          <RequiredInputGroup
            disabled={inProgress}
            value={newPassword}
            type='password'
            autoComplete='new-password'
            placeholder='New Password'
            onChange={event => {
              setError(undefined)
              setNewPassword(event.target.value)
            }}
            supplied={!(submitted && (!newPassword || newPassword.length < 1))}
          />
          <br />
          <RequiredInputGroup
            disabled={inProgress}
            value={repeatedNewPassword}
            type='password'
            autoComplete='new-password'
            placeholder='Repeat New Password'
            onChange={event => {
              setError(undefined)
              setRepeatedNewPassword(event.target.value)
            }}
            supplied={!(submitted && (!repeatedNewPassword || repeatedNewPassword.length < 1))}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.PRIMARY} onClick={() => setTriggerRequest(true)} disabled={inProgress} loading={inProgress}>
              Change Password
            </Button>
            <Button onClick={() => dispatch(push('/admin'))} disabled={inProgress} loading={inProgress}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
      {passwordChanged && <Toast intent={Intent.PRIMARY} />}
    </>
  )
}

export default ChangePasswordDialog

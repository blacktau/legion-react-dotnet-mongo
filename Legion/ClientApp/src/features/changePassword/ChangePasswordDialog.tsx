import React, { useState, ChangeEvent, useCallback, Dispatch, SetStateAction } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Slide, Snackbar, TextField } from '@material-ui/core'
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { changePassword } from './changePasswordApi'
import { RequestError } from '../../types/RequestError'

const ChangePasswordDialog = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('')
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState<RequestError | undefined>(undefined)
  const history = useHistory()

  const submitRequest = useCallback(async () => {
    setSubmitted(true)
    if (currentPassword && newPassword && repeatedNewPassword) {
      setInProgress(true)
      try {
        await changePassword(currentPassword, newPassword, repeatedNewPassword)
        setInProgress(false)
        setPasswordChanged(true)
      } catch (error) {
        setError(error)
        setInProgress(false)
      }
    }
  }, [currentPassword, newPassword, repeatedNewPassword])

  const gotoAdmin = useCallback(() => {
    history.push('/admin')
  }, [history])

  const setValue = useCallback((event: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>) => {
    setError(undefined)
    setter(event.target.value)
  }, [setError])

  return (
    <>
      <Snackbar open={!!error} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={Slide}>
        <Alert severity='error' onClose={() => setError(undefined)}>{error?.message}</Alert>
      </Snackbar>
      <Snackbar open={passwordChanged} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={Slide}>
        <Alert severity='success' onClose={gotoAdmin}>Password Changed.</Alert>
      </Snackbar>
      <Dialog open={true} onClose={gotoAdmin}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            disabled={inProgress}
            value={currentPassword}
            type={showCurrentPassword ? 'text' : 'password'}
            autoComplete='current-password'
            placeholder='Current Password'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event, setCurrentPassword)}
            margin='normal'
            error={!(submitted && (!currentPassword || currentPassword.length <= 1))}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} size='small'>
                    {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}/>
          <TextField
            fullWidth
            disabled={inProgress}
            value={newPassword}
            type={'password'}
            autoComplete='new-password'
            placeholder='New Password'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event, setNewPassword)}
            margin='normal'
            error={!(submitted && (!newPassword || newPassword.length <= 1))} />
          <TextField
            fullWidth
            disabled={inProgress}
            value={repeatedNewPassword}
            type={'password'}
            autoComplete='new-password'
            placeholder='Repeat New Password'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event, setRepeatedNewPassword)}
            margin='normal'
            error={!(submitted && (!repeatedNewPassword || repeatedNewPassword.length <= 1))} />
        </DialogContent>
        <DialogActions>
          {inProgress && <CircularProgress size={30} />}
          <Button variant='contained' onClick={submitRequest} disabled={inProgress} color='primary'>Change Password</Button>
          <Button variant='contained' onClick={gotoAdmin} disabled={inProgress} color='secondary'>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/*
      <Dialog isOpen autoFocus enforceFocus icon='lock' className={Classes.DARK} title='Change Password' onClose={gotoAdmin}>
        <div className={Classes.DIALOG_BODY}>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.PRIMARY} onClick={submitRequest} disabled={inProgress} loading={inProgress}>
              Change Password
            </Button>
            <Button onClick={gotoAdmin} disabled={inProgress} loading={inProgress}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
      {passwordChanged && <Toast intent={Intent.PRIMARY} />} */}
    </>
  )
}

export default ChangePasswordDialog

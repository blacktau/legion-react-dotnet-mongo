/* eslint-disable  */
import React, { useState, useCallback, ChangeEvent } from 'react'
import { TextField, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, InputAdornment, Slide } from '@material-ui/core'
import { Person as PersonIcon, Lock as LockIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { authenticateUser, authenticationError, clearAuthenticationError, authenticationInProgress } from './AuthenticationSlice'

const LoginDialog = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const error = useSelector(authenticationError)
  const inProgress = useSelector(authenticationInProgress)

  const dispatch = useDispatch()

  const clearError = useCallback(() => {
    dispatch(clearAuthenticationError({}))
  }, [dispatch])

  const submitLogin = useCallback(async () => {
    setSubmitted(true)
    if (username && password) {
      dispatch(authenticateUser([username, password]))
    }
  }, [password, username, dispatch])

  const setInput = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter) => {
    setter(evt.target.value)
  },[])

  console.log(!!error)

  return (
    <>
      <Snackbar open={!!error} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={Slide}>
        <Alert severity='error' onClose={() => clearError()}>{error?.message}</Alert>
      </Snackbar>
      <Dialog open={true} onClose={() => clearError()}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            disabled={inProgress}
            value={username}
            onChange={evt => setInput(evt, setUsername)}
            placeholder='Username'
            required
            name='username'
            autoComplete='username'
            margin='normal'
            error={!(submitted && (!username || username.length <= 1))}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              )}}/>
          <TextField
            disabled={inProgress}
            value={password}
            onChange={evt => setInput(evt, setPassword)}
            fullWidth
            placeholder='Password'
            required
            margin='normal'
            name='password'
            autoComplete='current-password'
            error={!(submitted && (!password || password.length <= 1))}
            type='password'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockIcon />
                </InputAdornment>
              )}}/>
        </DialogContent>
        <DialogActions>
          {inProgress && <CircularProgress size={30} />}
          <Button
            variant='contained'
            color='primary'
            disabled={inProgress}
            onClick={submitLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginDialog

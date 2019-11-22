import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router-dom'
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core'
import { Action } from 'redux'

import { uploadPhotographActions } from '../../actions/uploadPhotographsActions'
import { getUploadingPhotographs, isAuthenticated } from '../../selectors'
import DropTarget from '../../components/admin/DropTarget'
import UploadProgressDisplay from '../../components/admin/UploadProgressDisplay'
import { UploadProgressItem } from '../../types/UploadProgressItem'

const PhotographUpload = () => {
  const authenticated = useSelector(isAuthenticated)

  const [showReset, setShowReset] = useState(false)
  const [showComplete, setShowComplete] = useState(false)

  const photographs = useSelector(getUploadingPhotographs)

  const dispatch = useDispatch()

  const initialisePhotographUpload = useCallback(
    accepted => {
      dispatch(uploadPhotographActions.initialise(accepted))
    },
    [dispatch]
  )

  const resetPhotographUpload = useCallback(() => dispatch(uploadPhotographActions.reset()), [dispatch])

  const goToAdmin = useCallback(() => dispatch(push('/admin')), [dispatch])

  if (!authenticated) {
    return <Redirect to='/admin/login' />
  }

  const isIncomplete = photographs && photographs.some((p: UploadProgressItem) => p.progress < 100)

  const preUpload = !photographs || photographs.length === 0

  return (
    <>
      {preUpload && (
        <DropTarget
          accept='image/jpeg'
          onDrop={(accepted, rejected) => {
            if (!accepted || accepted.length === 0) {
              return
            }

            initialisePhotographUpload(accepted)
          }}
        />
      )}
      {!preUpload && <UploadProgressDisplay uploads={photographs} onReset={(): Action<string> => resetPhotographUpload()} />}
      <Dialog isOpen={showComplete && !isIncomplete}>
        <div className={Classes.DIALOG_HEADER}>Upload Complete</div>
        <div className={Classes.DRAWER_BODY}>
          {photographs && !photographs.some((p: UploadProgressItem) => p.error) && <p>Upload Complete</p>}
          {photographs && photographs.some((p: UploadProgressItem) => p.error) && <p>Upload complete with errors</p>}
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <Button
            onClick={() => {
              if (photographs && !photographs.some((p: UploadProgressItem) => p.error)) {
                resetPhotographUpload()
                goToAdmin()
              } else {
                setShowReset(true)
                setShowComplete(false)
              }
            }}
            intent={Intent.PRIMARY}
          >
            OK
          </Button>
        </div>
      </Dialog>
    </>
  )
}

export default PhotographUpload

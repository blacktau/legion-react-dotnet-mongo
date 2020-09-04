import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core'
import { Action } from 'redux'

import DropTarget from 'components/DropTarget'
import UploadProgressDisplay from './UploadProgressDisplay'
import FileUpload from 'types/FileUpload'
import { selectUploads, initializeUploads, resetUploads } from './UploadPhotographsSlice'
import { useHistory } from 'react-router-dom'
import { uploadPhotograph } from './fileUploadApi'

const UploadPhotographsPage = () => {
  const [showComplete, setShowComplete] = useState(false)
  const history = useHistory()

  const currentUploads = useSelector(selectUploads)

  const dispatch = useDispatch()

  const initialisePhotographUpload = useCallback(
    (accepted) => {
      const uploads: FileUpload[] = accepted.map((f: File) => ({
        name: f.name,
        key: f.name,
        progress: 0,
        success: false,
        error: undefined
      }))

      dispatch(initializeUploads(uploads))
      uploads.forEach((upload: FileUpload) => {
        const file = accepted.find((f: File) => f.name === upload.name)
        if (file) {
          void uploadPhotograph(upload, dispatch, file)
        }
      })
    },
    [dispatch]
  )

  const resetPhotographUpload = useCallback(() => dispatch(resetUploads()), [dispatch])

  const goToAdmin = useCallback(() => dispatch(history.push('/admin')), [dispatch, history])

  const isIncomplete = currentUploads?.some((p: FileUpload) => p.progress < 100)

  const preUpload = currentUploads?.length === 0

  return (
    <>
      {preUpload && (
        <DropTarget
          accept='image/jpeg'
          onDrop={(accepted, _) => {
            if (!accepted || accepted.length === 0) {
              return
            }

            initialisePhotographUpload(accepted)
          }}
        />
      )}
      <UploadProgressDisplay uploads={currentUploads} onReset={(): Action<string> => resetPhotographUpload()} />
      <Dialog isOpen={showComplete && !isIncomplete}>
        <div className={Classes.DIALOG_HEADER}>Upload Complete</div>
        <div className={Classes.DRAWER_BODY}>
          {!currentUploads?.some((p: FileUpload) => p.error) && <p>Upload Complete</p>}
          {currentUploads?.some((p: FileUpload) => p.error) && <p>Upload complete with errors</p>}
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <Button
            onClick={() => {
              if (currentUploads && !currentUploads.some((p: FileUpload) => p.error)) {
                resetPhotographUpload()
                goToAdmin()
              } else {
                setShowComplete(false)
              }
            }}
            intent={Intent.PRIMARY}>
            OK
          </Button>
        </div>
      </Dialog>
    </>
  )
}

export default UploadPhotographsPage

import React, { useEffect, useState, useCallback } from 'react'
import { Card, Classes, Spinner } from '@blueprintjs/core'
import PhotographList from './PhotographList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPhotographs } from './managePhotographsApi'
import { initializePhotographs, selectPhotographs } from './ManagePhotographsSlice'

const ManagePhotographsPage = () => {
  const [inProgress, setInProgress] = useState(false)
  const photographs = useSelector(selectPhotographs)
  const dispatch = useDispatch()

  const fetchAllPhotographs = useCallback(async () => {
    if (inProgress || photographs) {
      return
    }

    setInProgress(true)
    try {
      const allPhotographs = await getAllPhotographs()
      dispatch(initializePhotographs(allPhotographs))
    } finally {
      setInProgress(false)
    }
  }, [dispatch, inProgress, photographs])

  useEffect(() => {
    void fetchAllPhotographs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className={Classes.DARK + ' photographList'}>
      <div>
        {inProgress && <Spinner />}
        {!inProgress && photographs && <PhotographList photographs={photographs} />}
      </div>
    </Card>
  )
}

export default ManagePhotographsPage

import React, { useEffect, useState, useCallback } from 'react'
import PhotographList from './PhotographList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPhotographs } from './managePhotographsApi'
import { fetchAllPhotographs, initializePhotographs, selectPhotographs } from './ManagePhotographsSlice'
import { Card, CircularProgress, Container, Paper } from '@material-ui/core'

const ManagePhotographsPage = () => {
  const [inProgress, setInProgress] = useState(false)
  const photographs = useSelector(selectPhotographs)
  const dispatch = useDispatch()

  //   if (inProgress || photographs) {
  //     return
  //   }

  //   setInProgress(true)
  //   try {
  //     const allPhotographs = await getAllPhotographs()
  //     dispatch(initializePhotographs(allPhotographs))
  //   } finally {
  //     setInProgress(false)
  //   }
  // }, [dispatch, inProgress, photographs])

  useEffect(() => {
    if (inProgress) {
      return
    }

    setInProgress(true)
    dispatch(fetchAllPhotographs())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper>
      <Container>{inProgress && <CircularProgress />}</Container>
      {!inProgress && photographs && <PhotographList photographs={photographs} />}
    </Paper>
  )
}

export default ManagePhotographsPage

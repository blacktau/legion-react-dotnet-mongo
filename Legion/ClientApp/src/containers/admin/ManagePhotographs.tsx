import React, { useCallback, useEffect, useState } from 'react'
import { Card, Classes, Spinner } from '@blueprintjs/core'
import PhotographList from '../../components/admin/PhotographList'
import { getAllPhotographs } from '../../webapi/photographs'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotographsToManage } from '../../selectors'
import { managePhotographsActions } from '../../actions/managePhotographActions'

const ManagePhotographs = () => {
  const [inProgress, setInProgress] = useState(false)
  const photographs = useSelector(getPhotographsToManage)
  const dispatch = useDispatch()

  const loadAllPhotographs = useCallback(async () => {
    if (inProgress) {
      return
    }
    setInProgress(true)

    const allPhotographs = await getAllPhotographs()
    dispatch(managePhotographsActions.initialise(allPhotographs))

    setInProgress(false)
  }, [dispatch, inProgress])

  useEffect(() => {
    loadAllPhotographs()
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

export default ManagePhotographs

import React, { useEffect, useState } from 'react'
import { Card, Classes, Spinner } from '@blueprintjs/core'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import PhotographList from '../../components/admin/PhotographList'
import { isAuthenticated } from '../../selectors'
import { getAllPhotographs } from '../../webapi/photographs/getAllPhotographs-client'
import { Photograph } from '../../types/Photograph'

const ManagePhotographs = () => {
  const authenticated = useSelector(isAuthenticated)
  const [inProgress, setInProgress] = useState(false)
  const [photographs, setPhotographs] = useState<Array<Photograph> | undefined>(undefined)

  useEffect(() => {
    if (!authenticated || inProgress) {
      return
    }

    setInProgress(true)
    getAllPhotographs()
      .then(result => {
        setPhotographs(result)
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [])

  if (!authenticated) {
    return <Redirect to='/admin/login' />
  }

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

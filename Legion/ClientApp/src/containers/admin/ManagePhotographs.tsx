import React, { useEffect, useState } from 'react'
import { Card, Classes, Spinner } from '@blueprintjs/core'
import PhotographList from '../../components/admin/PhotographList'
import { getAllPhotographs } from '../../webapi/photographs'
import { Photograph } from '../../types/Photograph'

const ManagePhotographs = () => {
  const [inProgress, setInProgress] = useState(false)
  const [photographs, setPhotographs] = useState<Array<Photograph> | undefined>(undefined)

  useEffect(() => {
    if (inProgress) {
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

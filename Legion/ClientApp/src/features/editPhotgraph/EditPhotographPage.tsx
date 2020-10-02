import { Card, CircularProgress, TextField, Typography } from '@material-ui/core'
import { getAllKeywords } from 'features/manageKeywords/manageKeywordsApi'
import { savePhotograph } from 'features/managePhotographs/managePhotographsApi'
import { updatePhotographList } from 'features/managePhotographs/ManagePhotographsSlice'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'store'
import Photograph from 'types/Photograph'
import { getPhotograph } from './editPhotographApi'

const EditPhotographPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [inProgress, setInProgress] = useState(false)
  const [photograph, setPhotograph] = useState<Photograph>()
  const [keywordList, setKeywordList] = useState<string[]>()

  useEffect(() => {
    if (inProgress || !id) {
      return
    }

    const fetchData = async () => {
      setInProgress(true)

      try {
        const toRun: [Promise<Photograph>, Promise<string[]>] = [getPhotograph(id), getAllKeywords()]
        const result = await Promise.all(toRun)
        setPhotograph(result[0])
        setKeywordList(result[1])
      } finally {
        setInProgress(false)
      }
    }

    void fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePhotographUpdated = useCallback(async () => {
    if (!photograph) {
      return
    }

    const updated = await savePhotograph(photograph)
    setPhotograph(updated)
    dispatch(updatePhotographList(updated))
  }, [dispatch, photograph])

  return (
    <Card className={' photographList'}>
      {inProgress && <CircularProgress />}
      {!inProgress && photograph && (
        <div>
          <img src={`/images/${photograph.id}.jpg?width=500`} alt={photograph.description} className='editImage' placeholder={'Add Title'} />
          <TextField onChange={evt => setPhotograph({ ...photograph, title: evt.target.value })} value={photograph.title} placeholder='Add Title' />
          <TextField multiline={true} value={photograph.description} onChange={evt => setPhotograph({ ...photograph, description: evt.target.value })} placeholder={'Add Description'} rows={3} />
        </div>
      )}
    </Card>
  )
}

export default EditPhotographPage

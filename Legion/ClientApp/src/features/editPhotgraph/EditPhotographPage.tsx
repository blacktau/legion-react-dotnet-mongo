import { Card, Classes, EditableText, H1, Spinner } from '@blueprintjs/core'
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
    <Card className={Classes.DARK + ' photographList'}>
      {inProgress && <Spinner />}
      {!inProgress && photograph && (
        <div>
          <img src={`/images/${photograph.id}.jpg?width=500`} alt={photograph.description} className='editImage' placeholder={'Add Title'} />
          <H1>
            <EditableText onChange={title => setPhotograph({ ...photograph, title })} value={photograph.title} placeholder='Add Title' onConfirm={handlePhotographUpdated} />
          </H1>
          <EditableText multiline={true} value={photograph.description} onChange={description => setPhotograph({ ...photograph, description })} placeholder={'Add Description'} minLines={3} onConfirm={handlePhotographUpdated} />
        </div>
      )}
    </Card>
  )
}

export default EditPhotographPage

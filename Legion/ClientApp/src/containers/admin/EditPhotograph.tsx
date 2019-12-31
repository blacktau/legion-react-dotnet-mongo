import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Classes, EditableText, H1, Spinner } from '@blueprintjs/core'
import { Photograph } from '../../types/Photograph'
import { getPhotograph } from '../../webapi/photographs'
import { savePhotograph } from '../../webapi/photographs/savePhotograph'
import { getAllKeywords } from '../../webapi/photographs/getAllKeywords'
import { KeywordListEditor } from '../../components/admin/KeywordListEditor'

const EditPhotograph = () => {
  const { id } = useParams()
  const [inProgress, setInProgress] = useState(false)
  const [photograph, setPhotograph] = useState<Photograph | undefined>(undefined)
  const [error, setError] = useState<unknown | undefined>(undefined)
  const [keywordList, setKeywordList] = useState<string[]>(new Array<string>())

  useEffect(() => {
    if (inProgress || !id || photograph) {
      return
    }

    setInProgress(true)

    Promise.all([getPhotograph(id), getAllKeywords()])
      .then(values => {
        setPhotograph(values[0])
        setKeywordList(values[1].map(kw => kw.keyword).sort((k1, k2) => k1.localeCompare(k2)))
      })
      .catch(e => {
        console.error(e)
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [id, inProgress, photograph, keywordList])

  const handlePhotographUpdated = useCallback(() => {
    if (!photograph) {
      return
    }

    savePhotograph(photograph)
      .then(photo => {
        setPhotograph(photo)
      })
      .catch(e => {
        setError(e)
      })
  }, [photograph])

  return (
    <Card className={Classes.DARK + ' photographList'}>
      {inProgress && <Spinner />}
      {!inProgress && photograph && (
        <div>
          <img src={`/images/${photograph.id}.jpg?width=500`} alt={photograph.description} className='editImage' placeholder={'Add Title'} />
          <H1>
            <EditableText onChange={title => setPhotograph({ ...photograph, title })} value={photograph.title} placeholder='Add Title' onConfirm={handlePhotographUpdated} />
          </H1>
          <EditableText multiline={true} value={photograph.description} onChange={description => setPhotograph({ ...photograph, description })} placeholder={'Add Description'} minLines={3} />
          {keywordList && <KeywordListEditor availableKeywords={keywordList} selectedKeywords={photograph.keywords} />}
        </div>
      )}
    </Card>
  )
}

export { EditPhotograph }

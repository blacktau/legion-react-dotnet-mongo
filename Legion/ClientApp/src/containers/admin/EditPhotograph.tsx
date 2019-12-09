import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Classes, EditableText, H1, Spinner } from '@blueprintjs/core'
import { Photograph } from '../../types/Photograph'
import { getPhotograph } from '../../webapi/photographs'

const EditPhotograph = () => {
  const { id } = useParams()
  const [inProgress, setInProgress] = useState(false)
  const [photograph, setPhotograph] = useState<Photograph | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(photograph ? photograph.title : undefined)
  const [description, setDescription] = useState<string | undefined>(photograph ? photograph.description : undefined)

  useEffect(() => {
    if (inProgress || !id || photograph) {
      return
    }

    setInProgress(true)

    getPhotograph(id)
      .then(photo => {
        setPhotograph(photo)
        setTitle(photo.title)
        setDescription(photo.description)
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [id, inProgress, photograph])

  return (
    <Card className={Classes.DARK + ' photographList'}>
      {inProgress && <Spinner />}
      {!inProgress && photograph && (
        <div>
          <H1>
            <EditableText value={title} onChange={e => setTitle(e)} />
          </H1>
          <img src={`/images/${photograph.id}.jpg?height=500`} alt={photograph.description} className='editImage' />
          <EditableText multiline={true} value={description} onChange={e => setDescription(e)} />
        </div>
      )}
    </Card>
  )
}

export { EditPhotograph }

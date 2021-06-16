import Masonry from './Masonry'
import { Tile } from './Tile'
import React, { useEffect, useCallback } from 'react'
import { Spinner } from '@blueprintjs/core'
import { useSelector, useDispatch } from 'react-redux'
import { getWallPhotographs, initializePhotographs } from './PhotowallSlice'
import { getPublishedPhotographs } from './photographsApi'

const breakPoints = [350, 500, 750, 1200]

const PhotoWall = () => {
  const wallPhotographs = useSelector(getWallPhotographs)
  const dispatch = useDispatch()

  const fetchPhotographs = useCallback(async () => {
    const photographs = await getPublishedPhotographs()
    dispatch(initializePhotographs(photographs))
  }, [dispatch])

  useEffect(() => {
    void fetchPhotographs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return wallPhotographs
    ? (
    <div className='masonry-container'>
      <Masonry breakpoints={breakPoints}>
        {wallPhotographs.map(photograph => {
          return <Tile key={photograph.id} photograph={photograph} />
        })}
      </Masonry>
    </div>
      )
    : (
    <div className='photowall-loading'>
      <Spinner />
    </div>
      )
}

export default PhotoWall

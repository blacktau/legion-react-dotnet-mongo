import Masonry from './Masonry'
import { Tile } from './Tile'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPublishedPhotographs, getWallPhotographs } from './PhotowallSlice'

const breakPoints = [350, 500, 750, 1200]

const PhotoWall = () => {
  const wallPhotographs = useSelector(getWallPhotographs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPublishedPhotographs())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='masonry-container'>
      <Masonry breakpoints={breakPoints}>
        {wallPhotographs.map(photograph => {
          return <Tile key={photograph.id} photograph={photograph} />
        })}
      </Masonry>
    </div>
  )
}

export default PhotoWall

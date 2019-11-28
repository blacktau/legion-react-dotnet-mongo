import React, { useCallback, useEffect, useState } from 'react'

import 'typeface-poiret-one'
import Header from '../components/Header'
import { Photograph } from '../types/Photograph'
import { getPublishedPhotographs } from '../webapi/photographs'
import { Masonry } from '../components/Masonry'
import { Tile } from '../components/Tile'

const breakPoints = [350, 500, 750]

const Home = () => {
  const [photographs, setPhotographs] = useState<Array<Photograph> | undefined>(undefined)

  const refreshPhotographs = useCallback(async () => {
    try {
      const result = await getPublishedPhotographs()
      setPhotographs(result)
    } catch (error) {
      console.error(`Unable to fetch photographs: ${error}`)
    }
  }, [])

  useEffect(() => {
    refreshPhotographs()
  }, [refreshPhotographs])

  return (
    <>
      <Header />
      {photographs && (
        <div className='container'>
          <div className='masonry-container'>
            <Masonry breakpoints={breakPoints}>
              {photographs.map(photograph => {
                return <Tile key={photograph.id} photograph={photograph} />
              })}
            </Masonry>
          </div>
        </div>
      )}
    </>
  )
}

/*
        <Masonry breakpointCols={5} className='gallery' columnClassName='gallery-column'>
          {photographs.map((value: Photograph) => (
            <div key={value.id} className='photo'>
              <img src={inView ? `/images/${value.id}.jpg?width=200` : ''} alt={value.description} ref={ref} className='wallPhoto' />
            </div>
          ))}
        </Masonry>
*/

export default Home

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Masonry from 'react-masonry-css'

import 'typeface-poiret-one'
import Header from '../components/Header'
import { Photograph } from '../types/Photograph'
import { getPublishedPhotographs } from '../webapi/photographs'

const breakPointColumns = {
  default: 5
}

const Home = () => {
  const [refreshPhotographs, setRefreshPhotographs] = useState(true)
  const [photographs, setPhotographs] = useState<Array<Photograph> | undefined>(undefined)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!refreshPhotographs) {
      return
    }

    getPublishedPhotographs().then(result => {
      setPhotographs(result)
    })
    .catch(error => console.error(`Unable to fetch photographs: ${error}`))

    setRefreshPhotographs(false)
  }, [refreshPhotographs])

  return (
    <>
      <Header />
      {photographs && (
        <Masonry breakpointCols={5} className='gallery' columnClassName='gallery-column'>
          {photographs.map((value: Photograph) => (
            <div key={value.id} className='photo'>
              <img src={'/images/' + value.id + '.jpg?width=200'} alt={value.description} />
            </div>
          ))}
        </Masonry>
      )}
    </>
  )
}

export default Home

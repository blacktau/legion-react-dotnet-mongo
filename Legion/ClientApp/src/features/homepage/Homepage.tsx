import React from 'react'

import 'typeface-poiret-one'
import Header from './Header'
import PhotoWall from 'features/photowall/PhotoWall'

const Homepage = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <PhotoWall />
      </div>
    </>
  )
}

export default Homepage

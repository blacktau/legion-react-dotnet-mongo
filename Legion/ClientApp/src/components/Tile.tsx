import { Photograph } from '../types/Photograph'
import React from 'react'

type TileProps = {
  photograph: Photograph
}

const Tile = ({ photograph }: TileProps) => {
  return (
    <div className='tile'>
      <img src={`/images/${photograph.id}.jpg?width=400`} alt={photograph.description} />
    </div>
  )
}

export { Tile }

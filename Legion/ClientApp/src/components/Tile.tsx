import { Photograph } from '../types/Photograph'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type TileProps = {
  photograph: Photograph
}

const defaultWidth = 400

const Tile = ({ photograph }: TileProps) => {
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true })
  const [minHeight, setMinHeight] = useState(100)
  const imgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    if (!inView) {
      return
    }

    if (imgRef.current && imgRef.current.clientHeight > 0) {
      setMinHeight(imgRef.current.clientHeight)
    }
  }, [imgRef, inView])

  return (
    <div className='tile' ref={ref} style={{ minHeight: `${minHeight}px` }}>
      <img src={inView ? `/images/${photograph.id}.jpg?width=${defaultWidth}` : ''} alt={photograph.description} ref={imgRef} />
    </div>
  )
}

export { Tile }

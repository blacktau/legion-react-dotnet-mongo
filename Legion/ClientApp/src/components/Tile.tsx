import { Photograph } from '../types/Photograph'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Spinner } from '@blueprintjs/core'

type TileProps = {
  photograph: Photograph
}

const defaultWidth = 400

const Tile = ({ photograph }: TileProps) => {
  const [ref, inView, entry] = useInView({ threshold: 0, triggerOnce: true })
  const [minHeight, setMinHeight] = useState(150)
  const [imageLoaded, setImageLoaded] = useState(false)

  useLayoutEffect(() => {
    if (entry?.boundingClientRect.width) {
      setMinHeight(entry?.boundingClientRect.width / photograph.ratio)
    }
  }, [entry, photograph])

  const imgRef = useCallback(
    node => {
      if (node == null && !inView) {
        return
      }

      // clientHeight
      setMinHeight(node.getBoundingClientRect().height)
    },
    [inView]
  )

  return (
    <div className={'tile' + (imageLoaded ? '' : ' preload')} ref={ref} style={{ minHeight: `${minHeight}px` }}>
      {!imageLoaded && <Spinner />}
      {inView && <img className={imageLoaded ? 'loaded' : 'loading'} src={`/images/${photograph.id}.jpg?width=${defaultWidth}`} alt={photograph.description} ref={imgRef} onLoad={() => setImageLoaded(true)} />}
    </div>
  )
}

export { Tile }

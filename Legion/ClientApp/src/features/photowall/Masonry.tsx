import React, { ReactElement, ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react'

interface MasonryProps {
  breakpoints: number[]
  children?: ReactElement[]
}

const Masonry = ({ breakpoints, children }: MasonryProps) => {
  const [columns, setColumns] = useState(1)
  const masonryRef = useRef<HTMLDivElement>(null)

  const onResize = useCallback(() => {
    if (!masonryRef.current) {
      return
    }

    const width = masonryRef.current.offsetWidth
    const newColumns =
      breakpoints.reduceRight((prev, curr, idx) => {
        return curr < width ? prev : idx
      }, breakpoints.length) + 1

    if (newColumns !== columns) {
      setColumns(newColumns)
    }
  }, [masonryRef, breakpoints, columns])

  const mapChildren = useCallback(() => {
    const col: ReactElement[][] = []
    for (let i = 0; i < columns; ++i) {
      col.push(new Array<ReactElement>())
    }

    if (!children || !columns) {
      return
    }

    return children.reduce((accumulator, currNode, idx) => {
      const currCol = idx % columns
      if (accumulator[currCol] && currNode) {
        accumulator[currCol].push(currNode)
      }

      return accumulator
    }, col)
  }, [children, columns])

  useLayoutEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
  }, [onResize])

  const mappedChildren = mapChildren()

  return (
    <div className='masonry' ref={masonryRef}>
      {mappedChildren?.map((col, ci: number) => {
        return (
          <div className='column' key={ci} style={{ width: `${100 / columns}%` }}>
            {col.map((child: ReactNode) => {
              return child
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Masonry

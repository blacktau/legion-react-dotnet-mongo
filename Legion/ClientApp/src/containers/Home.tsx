import React, { useEffect, useState } from 'react'

import 'typeface-poiret-one'
import Header from '../components/Header'
import { Photograph } from '../types/Photograph'
import { getPublishedPhotographs } from '../webapi/photographs'
import { Masonry } from '../components/Masonry'
import { Tile } from '../components/Tile'

const breakPoints = [350, 500, 750]

const Home = () => {
  const [photographs, setPhotographs] = useState<Array<Photograph> | undefined>(undefined)
  const [keywords, setKeywords] = useState<Map<string, number>>(new Map<string, number>())
  const [inProgress, setInProgress] = useState(false)

  useEffect(() => {
    if (inProgress || photographs) {
      return
    }

    setInProgress(true)
    getPublishedPhotographs()
      .then(result => {
        setPhotographs(result)
        const newKeywords = new Map<string, number>()
        result.forEach(p => {
          if (!p.keywords) {
            return
          }

          p.keywords.forEach(k => {
            let v = newKeywords.has(k) ? newKeywords.get(k) : 0
            if (!v) {
              v = 0
            }

            newKeywords.set(k, v + 1)
          })
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const sorted = new Map<string, number>([...newKeywords.entries()].sort((a, b) => b[1] - a[1]))
        setKeywords(sorted)
        console.log(sorted)
      })
      .catch(error => {
        console.error(`Unable to fetch photographs: ${error}`)
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [inProgress, photographs])

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

export default Home

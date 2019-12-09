import React from 'react'
import { Callout } from '@blueprintjs/core'

const NoMatch = () => {
  return (
    <Callout title='404 Page Not Found'>
      <img src='/no-photo.png' alt='404 page not found' />
      <p>The page you were looking for was not found.</p>
    </Callout>
  )
}

export default NoMatch

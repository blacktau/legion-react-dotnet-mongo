import React from 'react'
import { Container } from '@material-ui/core'

const NoMatch = () => {
  return (
    <Container maxWidth='sm' title='404 Page Not Found'>
      <img src='/no-photo.png' alt='404 page not found' />
      <p>The page you were looking for was not found.</p>
    </Container>
  )
}

export default NoMatch

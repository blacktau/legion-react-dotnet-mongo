import React from 'react'
import { connect } from 'react-redux'
import { Callout } from '@blueprintjs/core'

const NoMatch = ({ token, classes }) => {
  return (
    <Callout title='404 Page Not Found'>
      <img src='/no-photo.png' alt='404 page not found' />
      <p>The page you were looking for was not found.</p>
    </Callout>
  )
}

NoMatch.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(NoMatch)

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasErrors: false }
  }

  static getDerivedStateFromError (error) {
    return { hasErrors: true }
  }

  render () {
    if (this.state.hasErrors) {
      return <h1>Something broke</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary

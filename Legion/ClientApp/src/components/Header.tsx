import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerLeft">
          <h1>
            <Link to="/">
              <span className="headerWord headerWord1">Black</span>
              <span className="headerWord headerWord2">tau</span>
            </Link>
          </h1>
          <h2>photography</h2>
        </div>
        <div className="headerRight">
          <Icon icon="filter" iconSize={32} className="headerIcon" />
          <Icon icon="menu" iconSize={32} className="headerIcon" />
        </div>
      </div>
      <div className="headerClear" />
    </>
  )
}

export default Header

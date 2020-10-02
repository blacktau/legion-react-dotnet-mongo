import React from 'react'
import { Link } from 'react-router-dom'
import KeywordFilter from 'features/photowall/KeywordFilter'

interface HeaderProps {
  keywords?: Map<string, number>
  onSelectedKeywordsChanged?: (selectedKeywords?: string[]) => void
}

const Header = ({ keywords, onSelectedKeywordsChanged }: HeaderProps) => {
  return (
    <>
      <div className='header'>
        <div className='headerLeft'>
          <h1>
            <Link to='/'>
              <span className='headerWord headerWord1'>Black</span>
              <span className='headerWord headerWord2'>tau</span>
            </Link>
          </h1>
          <h2>photography</h2>
        </div>
        <div className='headerCenter'/>
        <div className='headerRight'>
          <KeywordFilter />
        </div>
      </div>
      <div className='headerClear' />
    </>
  )
}

export default Header

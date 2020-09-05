import { Icon } from '@blueprintjs/core'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { getKeywords } from './PhotowallSlice'
import InputBox from 'components/InputBox'

const KeywordFilter = () => {
  const keywords = useSelector(getKeywords)
  const [visible, setVisible] = useState(false)
  const [matches, setMatches] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const keywordRenderer = useCallback((keyword, query) => {
    const keywordLower = keyword.toLowerCase()
    const queryLower = query.toLowerCase()
    const idx = keywordLower.indexOf(queryLower)
    const beforeMatch = keyword.substr(0, idx)
    const highlighted = keyword.substr(idx, query.length)
    const endIndex = idx + query.length
    const end = keyword.substr(endIndex)

    return (
      <li key={keyword}>{beforeMatch}<em>{highlighted}</em>{end}</li>
    )
  }, [])

  const handleSetQuery = useCallback((queryValue: string) => {
    setQuery(queryValue)
    if (queryValue.length > 0) {
      const matchedKeywords = keywords.filter((k) => k.toLowerCase().includes(queryValue.toLowerCase()))
      setMatches(matchedKeywords)
    } else {
      setMatches([])
    }
  }, [setQuery, setMatches, keywords])

  if (!keywords || keywords.length <= 0) {
    return <></>
  }

  return (
    <div className='photoFilter'>
      {matches && matches.length > 0 && <ul>
        {matches.map(match => keywordRenderer(match, query))}
      </ul>}
      <InputBox onChange={handleSetQuery} icon='filter' />
    </div>
  )
}

export default KeywordFilter

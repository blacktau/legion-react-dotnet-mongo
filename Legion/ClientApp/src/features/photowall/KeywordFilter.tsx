import { Icon, MenuItem, Popover } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { ItemRenderer, Select } from '@blueprintjs/select'
import Keyword from 'types/Keyword'

interface KeywordFilterProps {
  keywords?: Map<string, number>
  onSelectedKeywordsChanged?: (selectedKeywords?: string[]) => void
}

const KeywordSelect = Select.ofType<Keyword>()

const keywordRenderer: ItemRenderer<Keyword> = (keyword, { handleClick, modifiers }) => {
  return <MenuItem active={modifiers.active} disabled={modifiers.disabled} label={keyword.count.toString()} key={keyword.keyword} onClick={handleClick} text={keyword} />
}

const KeywordFilter = ({ keywords, onSelectedKeywordsChanged }: KeywordFilterProps) => {
  const [keywordList, setKeywordList] = useState<Keyword[]>(new Array<Keyword>())

  useEffect(() => {
    if (!keywords || keywords.size <= 0) {
      return
    }

    const kwList = new Array<Keyword>()

    keywords.forEach((value, key) => {
      kwList.push({
        keyword: key,
        count: value
      })
    })

    setKeywordList(kwList)
  }, [keywords])

  if (!keywords || keywords.size <= 0 || !onSelectedKeywordsChanged) {
    return <></>
  }

  return (
    <Popover usePortal={true} boundary={'window'} position={'bottom-left'}>
      <Icon icon='filter' iconSize={32} className='headerIcon' />
      <KeywordSelect items={keywordList} itemRenderer={keywordRenderer} onItemSelect={item => onSelectedKeywordsChanged([item.keyword])} />
    </Popover>
  )
}

export default KeywordFilter

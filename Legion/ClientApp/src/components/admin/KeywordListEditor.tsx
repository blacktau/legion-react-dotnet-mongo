import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select'
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { MenuItem } from '@blueprintjs/core'

const KeywordEditor = MultiSelect.ofType<string>()

const filterKeywords: ItemPredicate<string> = (query, keyword, _index, exactMatch) => {
  const normalisedKeyword = keyword.toLowerCase()
  const normaliseQuery = query.toLowerCase()

  if (exactMatch) {
    return normalisedKeyword === normaliseQuery
  } else {
    return `${normalisedKeyword}`.indexOf(normaliseQuery) >= 0
  }
}

const escapeRegExpChars = (text: string) => {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
}

const highlightText = (text: string, query: string) => {
  let lastIndex = 0
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars)
  if (words.length === 0) {
    return [text]
  }
  const regexp = new RegExp(words.join('|'), 'gi')
  const tokens: React.ReactNode[] = []
  while (true) {
    const match = regexp.exec(text)
    if (!match) {
      break
    }
    const length = match[0].length
    const before = text.slice(lastIndex, regexp.lastIndex - length)
    if (before.length > 0) {
      tokens.push(before)
    }
    lastIndex = regexp.lastIndex
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>)
  }

  const rest = text.slice(lastIndex)
  if (rest.length > 0) {
    tokens.push(rest)
  }

  return tokens
}

const renderKeyword: ItemRenderer<string> = (keyword, { modifiers, handleClick, query }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }

  return <MenuItem active={modifiers.active} text={highlightText(keyword, query)} key={keyword} onClick={handleClick} />
}

const renderCreateKeyword = (query: string, active: boolean, handleClick: MouseEventHandler<HTMLElement>) => {
  return <MenuItem icon='add' text={`Create "${query}"`} active={active} onClick={handleClick} shouldDismissPopover={false} />
}

type KeywordListEditorProps = {
  availableKeywords: string[]
  selectedKeywords: string[]
  onConfirm?: (keywords: string[]) => void
}

const KeywordListEditor = ({ availableKeywords, selectedKeywords, onConfirm }: KeywordListEditorProps) => {
  const [unselectKeywords, setUnselectedKeywords] = useState<string[]>(availableKeywords)
  const [selectedWords, setSelectedWords] = useState<string[]>(selectedKeywords)

  useEffect(() => {
    selectedWords.forEach(keyword => {
      if (unselectKeywords.indexOf(keyword) >= 0) {
        unselectKeywords.splice(unselectKeywords.indexOf(keyword), 1)
      }
      setUnselectedKeywords(unselectKeywords)
    })
  }, [availableKeywords, selectedWords, unselectKeywords])

  const addSelectedKeyword = useCallback(
    keyword => {
      if (selectedWords.indexOf(keyword) >= 0) {
        return
      }

      selectedWords.push(keyword)
      unselectKeywords.splice(unselectKeywords.indexOf(keyword), 1)
      setSelectedWords(selectedWords)
      setUnselectedKeywords(unselectKeywords)

      if (onConfirm) {
        onConfirm(selectedWords)
      }
    },
    [onConfirm, selectedWords, unselectKeywords]
  )

  const removeKeyword = useCallback(
    (keyword: string, index: number) => {
      console.log(`trying to remove: ${keyword}`)
      if (selectedWords.indexOf(keyword) < 0) {
        return
      }
      console.log(`removing: ${keyword}`)
      selectedWords.splice(selectedWords.indexOf(keyword), 1)
      unselectKeywords.push(keyword)
      unselectKeywords.sort()
      setUnselectedKeywords(unselectKeywords)
      setSelectedWords(selectedWords)
      console.log(selectedWords)
      if (onConfirm) {
        onConfirm(selectedWords)
      }
    },
    [selectedWords, unselectKeywords]
  )

  return (
    <KeywordEditor
      items={unselectKeywords}
      tagRenderer={(keyword: string) => keyword}
      itemRenderer={renderKeyword}
      selectedItems={selectedWords}
      placeholder='Add Tags (separate values with commas)'
      openOnKeyDown={true}
      tagInputProps={{
        tagProps: { minimal: true },
        large: true,
        onRemove: removeKeyword
      }}
      createNewItemFromQuery={query => query}
      createNewItemRenderer={renderCreateKeyword}
      itemPredicate={filterKeywords}
      onItemSelect={addSelectedKeyword}
      noResults={<MenuItem disabled={true} text='No results.' />}
      popoverProps={{ minimal: true }}
      resetOnSelect={true}
    />
  )
}

export { KeywordListEditor }

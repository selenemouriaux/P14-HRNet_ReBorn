import { ChangeEvent, KeyboardEvent, useState } from "react"
import searchIcon from "./icons/search.svg"
import deleteIcon from "./icons/trash.svg"
import { Icon } from "./styles"

type SearchBarProps = {
  onSearch: (query: string) => void
  isHidden?: boolean
  active?: boolean
  searchOnEnter?: boolean
  autoSearchAfter?: number
  searchOnlyFilteredColumns?: boolean
  query?: string
  setQuery?: (query: string) => void
}

const SearchBar = ({
  onSearch,
  isHidden = false,
  active = false,
  searchOnEnter = false,
  autoSearchAfter = 3,
  searchOnlyFilteredColumns = false,
  query,
  setQuery,
}: SearchBarProps) => {
  // const [query, setQuery] = useState<string>("")
  const [toggleIcon, setToggleIcon] = useState<boolean>(true)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setToggleIcon(true)
  }
  const handleSearch = () => {
    setToggleIcon(!toggleIcon)
    onSearch(query)
  }
  const ditchFilter = () => {
    setQuery("")
    onSearch("")
    setToggleIcon(!toggleIcon)
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    !isHidden && (
      <div className="guide right">
        <input
          className="searchField"
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
        />
        {toggleIcon ? (
          <button onClick={handleSearch} className="searchButton">
            <Icon src={searchIcon} />
          </button>
        ) : (
          <button onClick={ditchFilter} className="searchButton">
            <Icon src={deleteIcon} />
          </button>
        )}
      </div>
    )
  )
}

export default SearchBar

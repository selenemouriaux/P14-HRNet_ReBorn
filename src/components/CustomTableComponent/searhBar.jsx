import { useState } from "react"
import searchIcon from "./icons/search.svg"
import deleteIcon from "./icons/trash.svg"
import { Icon } from "./styles"

const SearchBar = ({
  onSearch,
  isHidden = false,
  active = false,
  searchOnEnter = false,
  autoSearchAfter = 3,
  searchOnlyFilteredColumns = false,
}) => {
  const [query, setQuery] = useState("")
  const [toggleIcon, setToggleIcon] = useState(true)
  const handleInputChange = (event) => {
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
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }
  console.log(query)
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

import PropTypes from "prop-types"
// import expandIcon from "./icons/expand.png"
import { useState } from "react"
import resetIcon from "./icons/reset.svg"
import sortIcon from "./icons/sort-button.svg"
import PaginationControls from "./paginationNav"
import SearchBar from "./searhBar"
import { ColumnTitle, Icon, Table, Wrapper } from "./styles"
import { RenderDataRow, sortingData, updateSort } from "./utils"

/**
 * This component turns an array of data into an actual table. Customizable and responsive.
 * @component
 * @param data is the array of objects to be displayed in the table
 * @param columns identifies each data by column to return either raw if no render method specified or processed if the object includes a render method: { title: 'title', data: data.fieldName, render: () => {} }
 * @param styles accepts some basics css rules which have default values if not specified and custom such as titleAlign which applies text-align on title
 * @param layout allows selection between rows or columns for data organization
 * @param infiniteScroll swaps from pagination to infinite scroll instead
 * @param sorting object with active prop enabling.disabling sorting buttons, column to associate a specific column and type for asc or desc
 * @example <SivTable data={data} columns[{title: 'First Name', data: 'firstName', render: field => {`hello ${field}`} }, ...], options={backgroundColor: '#ececec'} autoVertical=576/>
 * @returns a table of the passed data following standard lib output or options passed
 */
const SivTable = ({
  data = [],
  columns = Object.keys(data[0]) ?? null,
  styles = {
    colorDark: "#8d1313",
    contrast: "#541372",
    colorLight: "#fff",
    backgroundGrid: "#dcbdee",
    backgroundHeading: "#9466af",
    backgroundButtons: "#edf0ce",
    title: {},
  },
  title = false,
  // footerExtra = () => {},
  nbItemsPerPage,
  // darkMode = false,
  // detailComponent: DetailComponent,
}) => {
  const [newData, setNewData] = useState(data)
  const [sort, setSort] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [infiniteScroll, setInfiniteScroll] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(nbItemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = newData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(newData.length / itemsPerPage)

  // const [sortingIcon, setSortingIcon] = useState(sortIcon)
  const hasDetailsComponent = columns.some((column) => column.collapse === true)
  // const collapsingOrder = columns
  //   .filter((col) => col.collapse)
  //   .sort((a, b) => a.disappearanceOrder - b.disappearanceOrder)
  //   .map((col) => columns.indexOf(col))

  const onClickSort = (name, sort, disableSorting) => {
    setSort(updateSort(sort, name))
    if (!disableSorting) {
      setCurrentPage(1)
      const sortedData = sortingData(newData, sort)
      setNewData(sortedData)
    }
  }
  const resetSorting = () => {
    setSort([])
    setCurrentPage(1)
    setNewData(data)
  }
  // const collapsedColumns =
  // const sortIcon = sortingIcon(name, sort);

  const tableHeading = columns.map(
    ({
      title,
      name,
      disableSorting,
      width,
      // collapse,
      // isReference,
      // disappearanceOrder,
    }) => (
      <ColumnTitle
        id={`header-${name}`}
        key={`header-${name}`}
        width={width}
        onClick={() => onClickSort(name, sort, disableSorting)}
      >
        {title}
        {!disableSorting && <Icon src={sortIcon} size="1em" />}
      </ColumnTitle>
    )
  )

  const tableContent = (infiniteScroll ? newData : currentItems).map(
    (rowData, index) =>
      RenderDataRow(
        rowData,
        index,
        columns.map((col) => col.name)
      )
  )

  const handleSearch = (query) => {
    const matchs = data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    })
    setSort([])
    setNewData(matchs)
  }

  return (
    <Wrapper styles={styles}>
      {title && <div className="title">{title}</div>}
      <SearchBar hide={infiniteScroll} onSearch={handleSearch} />
      <div className="guide left">
        <button
          className={infiniteScroll ? "inactive" : "active"}
          onClick={() => setInfiniteScroll(!infiniteScroll)}
        >
          Pagination
        </button>
        {!infiniteScroll && (
          <div>
            Showing{" "}
            <input
              value={itemsPerPage}
              type="number"
              onChange={(event) => setItemsPerPage(Number(event.target.value))}
            />{" "}
            items per page
          </div>
        )}
      </div>
      <Table>
        <thead>
          <tr>
            {tableHeading}
            <th
              onClick={() => resetSorting()}
              key="expandIconsColumn"
              width="50px"
            >
              <Icon src={resetIcon} />
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </Table>
      <PaginationControls
        hide={infiniteScroll}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {!infiniteScroll && totalPages > 1 && (
        <div className="guide left">
          Entries {startIndex + 1} to {endIndex} of {newData.length} in total
        </div>
      )}
    </Wrapper>
  )
}

SivTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  styles: PropTypes.shape({
    colorDark: PropTypes.string,
    contrast: PropTypes.string,
    colorLight: PropTypes.string,
    backgroundGrid: PropTypes.string,
    backgroundHeading: PropTypes.string,
    backgroundButtons: PropTypes.string,
  }),
  title: PropTypes.string,
  footerExtra: PropTypes.func,
  nbItemsPerPage: PropTypes.number,
  darkMode: PropTypes.bool,
  detailComponent: PropTypes.element,
}

SivTable.defaultProps = {
  styles: {
    colorDark: "#8d1313",
    contrast: "#541372",
    colorLight: "#fff",
    backgroundGrid: "#dcbdee",
    backgroundHeading: "#9466af",
    backgroundButtons: "#edf0ce",
  },
  title: "",
  footerExtra: () => {},
  nbItemsPerPage: 10,
  darkMode: false,
  detailComponent: null,
}

export default SivTable

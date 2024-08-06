// import expandIcon from "./icons/expand.png"
import { useLayoutEffect, useState } from "react"
import { ICON_WIDTH } from "./constants.ts"
import resetIcon from "./icons/reset.svg"
import settingsIcon from "./icons/settings.svg"
import sortIcon from "./icons/sort-button.svg"
import PaginationControls from "./paginationNav"
import RenderDataRow from "./RenderDataRow.tsx"
import SearchBar from "./searchBar"
import { ColumnTitle, Icon, SubTable, Table, Wrapper } from "./styles"
import { SivTableProps, SortingOption } from "./types.ts"
import {
  getMinWidth,
  getPaginationItemsNbByHeight,
  getSizedReducedByScrollBarWidth,
  makeDatesGreatAgain,
  sortingData,
  updateSort,
} from "./utils.ts"

// footerExtra = () => {},
// darkMode = false,
// detailComponent: DetailComponent,

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
  height = "100px",
  data,
  columns = Object.keys(data[0]).map((key) => ({ name: key })),
  // columns = Object.keys(data[0]).map((key) => ({ name: key })),
  title,
  noSearchBar = false,
}: SivTableProps) => {
  const [newData, setNewData] = useState(makeDatesGreatAgain(data))
  const [sortingOptions, setSortingOptions] = useState<SortingOption[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [infiniteScroll, setInfiniteScroll] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  // const [settings, setSettings] = useState({ dateFormat: "" })
  const [adaptativeHeadingWidth, setAdaptativeHeadingWidth] = useState("")
  const [query, setQuery] = useState<string>("")

  useLayoutEffect(() => {
    setAdaptativeHeadingWidth(getSizedReducedByScrollBarWidth("titleTable"))
    setItemsPerPage(
      getPaginationItemsNbByHeight({ availableHeight: height, offset: 130 })
    )
  }, [])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex =
    startIndex + itemsPerPage <= newData.length
      ? startIndex + itemsPerPage
      : newData.length - (currentPage - 1) * itemsPerPage + startIndex
  const currentItems = newData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(newData.length / itemsPerPage)

  // const [sortingIcon, setSortingIcon] = useState(sortIcon)

  // const hasDetailsComponent = columns.some((column) => column.collapse === true)

  // const collapsingOrder = columns
  //   .filter((col) => col.collapse)
  //   .sort((a, b) => a.disappearanceOrder - b.disappearanceOrder)
  //   .map((col) => columns.indexOf(col))

  const onClickSort = (
    name: string,
    sort: SortingOption[],
    disableSorting: boolean
  ) => {
    setSortingOptions(updateSort(sort, name))
    if (!disableSorting) {
      setCurrentPage(1)
      const sortedData = sortingData(newData, sort)
      setNewData(makeDatesGreatAgain(sortedData))
    }
  }
  const resetSorting = () => {
    setSortingOptions([])
    setCurrentPage(1)
    setNewData(makeDatesGreatAgain(data))
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
        width={getMinWidth({
          text: title,
          iconWidth: disableSorting ? 0 : ICON_WIDTH,
          fixedWidth: width,
        })}
        onClick={() =>
          onClickSort(name, sortingOptions, (disableSorting = false))
        }
        $isMainCriterion={sortingOptions[0]?.name === name ?? false}
        $isSecondCriterion={sortingOptions[1]?.name === name ?? false}
      >
        {title || name}
        {!disableSorting && <Icon src={sortIcon} size="1em" />}
      </ColumnTitle>
    )
  )

  const headersWidthReport = columns.map(({ title, width, disableSorting }) => (
    <ColumnTitle
      width={getMinWidth({
        text: title,
        iconWidth: disableSorting ? 0 : ICON_WIDTH,
        fixedWidth: width,
      })}
    >
      sizing..
    </ColumnTitle>
  ))

  const tableContent = (infiniteScroll ? newData : currentItems).map(
    (rowData, index) =>
      RenderDataRow({
        dataRow: rowData,
        index,
        dataNames: columns
          .map((col) => col.name)
          .filter((name) => name !== undefined),
        query,
      })
  )

  const handleSearch = (query: string) => {
    const matchs = data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    })
    setSortingOptions([])
    setCurrentPage(1)
    setNewData(makeDatesGreatAgain(matchs))
  }

  return (
    <Wrapper>
      {title && <div className="title">{title}</div>}
      <SearchBar
        isHidden={noSearchBar}
        onSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />
      <div className="guide left">
        <button
          className={infiniteScroll ? "active" : "inactive"}
          onClick={() => setInfiniteScroll(!infiniteScroll)}
        >
          Switch to {infiniteScroll ? "Pagination" : "full list"}
        </button>
      </div>
      <Table height={height}>
        <SubTable
          id="titleTable"
          width={infiniteScroll ? adaptativeHeadingWidth : "100%"}
        >
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
        </SubTable>
        <div className="bodyContainer">
          <SubTable width="100%">
            <thead className="sizer">
              <tr>
                {headersWidthReport}
                <th width="50px">sizing..</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </SubTable>
        </div>
      </Table>
      <button>
        <Icon src={settingsIcon} />
      </button>
      <PaginationControls
        hide={infiniteScroll}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {!infiniteScroll && totalPages > 1 && (
        <div className="guide left">
          Entries {startIndex + 1} to {endIndex} over {totalPages} pages
        </div>
      )}
    </Wrapper>
  )
}

// SivTable.defaultProps = {
//   styles: {
//     colorDark: "#8d1313",
//     contrast: "#541372",
//     colorLight: "#fff",
//     backgroundGrid: "#dcbdee",
//     backgroundHeading: "#9466af",
//     backgroundButtons: "#edf0ce",
//   },
//   title: "",
//   footerExtra: () => {},
//   nbItemsPerPage: 10,
//   darkMode: false,
//   detailComponent: null,
//   noSearchBar: false,
// }

export default SivTable

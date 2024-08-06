import prevIcon from "./icons/caret-left.svg"
import nextIcon from "./icons/caret-right.svg"
import toFirstIcon from "./icons/toFirst.svg"
import toLastIcon from "./icons/toLast.svg"
import { Icon } from "./styles"

type PaginationControlProps = {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  hide: boolean
}

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
  hide,
}: PaginationControlProps) => {
  if (hide) return null

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(currentPage - 2, 1)
    let endPage = Math.min(currentPage + 2, totalPages)

    if (currentPage - 2 <= 0) {
      endPage = Math.min(maxPagesToShow, totalPages)
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()
  const showLeftEllipsis = pageNumbers[0] > 1
  const showRightEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages

  return (
    <div className="guide right">
      <button
        onClick={() => setCurrentPage(1)}
        className="searchButton"
        disabled={currentPage <= 1}
      >
        <Icon src={toFirstIcon} />
      </button>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="searchButton"
        disabled={currentPage <= 1}
      >
        <Icon src={prevIcon} />
      </button>
      {showLeftEllipsis && <span className="ellipsis">...</span>}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={currentPage === pageNumber ? "active big" : undefined}
        >
          {pageNumber}
        </button>
      ))}
      {showRightEllipsis && <span className="ellipsis">...</span>}
      <button
        onClick={() =>
          setCurrentPage(currentPage >= totalPages ? 1 : currentPage + 1)
        }
        className="searchButton"
        disabled={currentPage >= totalPages}
      >
        <Icon src={nextIcon} />
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        className="searchButton"
        disabled={currentPage >= totalPages}
      >
        <Icon src={toLastIcon} />
      </button>
    </div>
  )
}

export default PaginationControls

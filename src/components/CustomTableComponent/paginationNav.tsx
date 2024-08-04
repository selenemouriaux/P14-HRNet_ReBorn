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
  if (hide) return
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
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active big" : undefined}
        >
          {index + 1}
        </button>
      ))}
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

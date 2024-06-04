import prevIcon from "./icons/caret-left.svg"
import nextIcon from "./icons/caret-right.svg"
import { Icon } from "./styles"

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
  hide,
}) => {
  if (hide) return
  return (
    <div className="guide right">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="searchButton"
        disabled={currentPage <= 1}
      >
        <Icon src={prevIcon} />
      </button>
      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        )
        //   )
      )}
      <button
        onClick={() =>
          setCurrentPage(currentPage >= totalPages ? 1 : currentPage + 1)
        }
        className="searchButton"
        disabled={currentPage >= totalPages}
      >
        <Icon src={nextIcon} />
      </button>
    </div>
  )
}

export default PaginationControls

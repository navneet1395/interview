export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of pages to show
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Add first page if needed
    if (start > 1) {
      range.push(1);
      if (start > 2) range.push("...");
    }

    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) range.push("...");
      range.push(totalPages);
    }

    return range;
  };

  const pageRange = getPageRange();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageRange.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => setCurrentPage(Number(page))}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <span className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems} items
      </span>
    </div>
  );
};

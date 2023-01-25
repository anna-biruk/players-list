interface IPaginationProps {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  handlePagination,
}: IPaginationProps) => {
  const onNext = () => {
    handlePagination(page + 1);
  };

  const onPrevious = () => {
    handlePagination(page - 1);
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none flex-row ">
          <li className="page-item">
            <span
              onClick={() => {
                onPrevious();
              }}
              className="page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>

          <li className="page-item">
            <span className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
              {page}
            </span>
          </li>

          <li className="page-item">
            <span
              onClick={() => {
                onNext();
              }}
              className="page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

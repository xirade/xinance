// icons
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";

// styles
import "./Pagination.css";

export default function Pagination({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  setCurrentPage
}) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = [...Array(pageCount + 1).keys()].slice(1);
  return (
    <>
      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="flex items-center gap-1 list-style-none">
              <li className="page-item disabled">
                <button
                  className={`${
                    currentPage !== 1 ? "" : "pointer-events-none bg-gray-200"
                  } page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-200 focus:shadow-none`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  aria-disabled="true"
                >
                  <img className="w-5 h-5" src={ArrowLeft} alt="arrow-left" />
                </button>
              </li>
              {pages.map((page, i) => (
                <li
                  key={`page-item${i}`}
                  className={`page-item${
                    page === currentPage ? " active" : ""
                  }`}
                >
                  <button
                    onClick={() => onPageChange(page)}
                    className={`relative dark:text-white block w-8 h-8 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-200 focus:shadow-none${
                      page === currentPage
                        ? " text-white hover:text-white hover:bg-blue-600 bg-blue-600"
                        : " text-gray-800 hover:text-gray-800"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`${
                    pages.length !== currentPage ? "" : "pointer-events-none bg-gray-200"
                  } page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-200 focus:shadow-none`}
                >
                  <img className="w-5 h-5" src={ArrowRight} alt="arrow-right" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

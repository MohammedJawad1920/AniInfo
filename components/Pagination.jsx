import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const Pagination = ({ page, setPage, animes }) => {
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  // Calculate the start and end page numbers to display (centered around the current page)
  const maxDisplayedPages = 3;
  const totalPageCount = animes?.pageInfo?.lastPage;
  let startPage = Math.max(1, page - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(totalPageCount, startPage + maxDisplayedPages - 1);
  if (endPage - startPage + 1 < maxDisplayedPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }
  return (
    <div className="flex justify-center mt-4 p-5">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="p-1 md:p-2 rounded-full bg-amber-400 font-bold text-black mr-1 md:mr-2"
      >
        <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      {startPage !== 1 && (
        <button
          onClick={() => handlePageChange(1)}
          className={`px-1.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold text-sm md:text-base text-black mx-1 bg-slate-300`}
        >
          1
        </button>
      )}
      {startPage !== 1 && (
        <span className="px-1.5 py-0.5 md:px-3 md:py-1 mx-1 font-bold">
          <ChevronDoubleLeftIcon className="w-4 h-4 md:w-5 md:h-5  mt-1 text-white" />
        </span>
      )}
      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
        const pageNum = startPage + index;
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-1.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold text-sm md:text-base text-black mx-1 ${
              page === pageNum ? "bg-amber-400" : "bg-slate-300"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      {endPage !== totalPageCount && (
        <span className="px-1.5 py-0.5 md:px-3 md:py-1 mx-1 font-bold text-white">
          <ChevronDoubleRightIcon className="w-4 h-4 md:w-5 md:h-5  mt-1   text-white" />
        </span>
      )}
      {endPage !== totalPageCount && (
        <button
          onClick={() => handlePageChange(totalPageCount)}
          className={`px-1.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold text-sm md:text-base text-black mx-1 bg-slate-300`}
        >
          {totalPageCount}
        </button>
      )}
      <button
        onClick={handleNextPage}
        disabled={animes.pageInfo?.hasNextPage === false}
        className="p-1 md:p-2 rounded-full bg-amber-400 font-bold text-black ml-2"
      >
        <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 " />
      </button>
    </div>
  );
};

export default Pagination;

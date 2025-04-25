import React from "react";

const Pagination = ({ table, isFetching }) => {
  return (
    !isFetching && (
      <div className="flex items-center justify-between mt-4 p-2 bg-gray-50 dark:bg-gray-600 dark:text-gray-300 rounded">
        <div className="flex items-center gap-2">
          <span className="text-sm">Show:</span>
          <select
            className="border rounded p-1 text-sm"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm">items</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className={`px-3 py-1 border rounded transition-all duration-200 ${
              !table.getCanPreviousPage()
                ? "opacity-50 cursor-not-allowed "
                : "hover:bg-gray-200"
            }`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button
            className={`px-3 py-1 border rounded transition-all duration-200 ${
              !table.getCanPreviousPage()
                ? "opacity-50 cursor-not-allowed "
                : "hover:bg-gray-200"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹
          </button>
          <span className="px-3 py-1 text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            className={`px-3 py-1 border rounded transition-all duration-200 ${
              !table.getCanNextPage()
                ? "opacity-50 cursor-not-allowed "
                : "hover:bg-gray-200"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ›
          </button>
          <button
            className={`px-3 py-1 border rounded transition-all duration-200 ${
              !table.getCanNextPage()
                ? "opacity-50 cursor-not-allowed "
                : "hover:bg-gray-200"
            }`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </div>
      </div>
    )
  );
};

export default Pagination;

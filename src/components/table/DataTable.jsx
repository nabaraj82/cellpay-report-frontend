import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState, useRef } from "react";
import "./table.css";
import Fuse from "fuse.js";
import { useVirtualizer } from "@tanstack/react-virtual";
import Spinner from "@/components/common/Spinner";

// fuzzy filter function
const fuzzyFilter = (row, columnId, value) => {
  const fuse = new Fuse([row.original], {
    keys: [columnId],
    threshold: 0.3,
  });
  const results = fuse.search(value);
  return results.length > 0;
};

export function DataTable({
  data,
  columns,
  totalCount,
  pagination: controlledPagination,
  onPaginationChange,
  pageCount: controlledPageCount,
  isServerSide = false,
  isLoading = false,
  enableFuzzyFilter = false,
  enableVirtualization = false,
  virtualItemSize = 52,
  globalFilter,
  tableHeight = "lg",
}) {
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters, setColumnFilters] = useState([]);

  const pagination = isServerSide ? controlledPagination : internalPagination;
  const setPagination = isServerSide
    ? onPaginationChange
    : setInternalPagination;

  const pageCount = isServerSide
    ? controlledPageCount
    : Math.ceil(data.length / pagination.pageSize);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      columnFilters,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: isServerSide,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: enableFuzzyFilter ? "fuzzy" : undefined,
  });

  // Virtualization setup
  const tableContainerRef = useRef(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => virtualItemSize,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() -
        (virtualRows[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className="flex flex-col gap-4 ">
      {/* Global Filter */}
      {/* {enableFuzzyFilter && (
        <div className="p-2">
          <input
            type="text"
            value={globalFilter || ''}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            placeholder="Search all columns..."
            className="p-2 border rounded w-full max-w-md"
          />
        </div>
      )} */}

      {/* Column Filters */}
      {/* <div className="flex flex-wrap gap-2 p-2">
        {table.getAllLeafColumns().map((column) => {
          if (column.getCanFilter()) {
            return (
              <div key={column.id} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  {column.columnDef.header}
                </label>
                <input
                  type="text"
                  value={column.getFilterValue() || ''}
                  onChange={(e) => column.setFilterValue(e.target.value)}
                  placeholder={`Filter ${column.id}...`}
                  className="p-1 border rounded"
                />
              </div>
            );
          }
          return null;
        })}
      </div> */}

      {/* Table Container */}
      <div
        ref={tableContainerRef}
        className={`${
          enableVirtualization
            ? tableHeight === "sm"
              ? "h-[250px]"
              : "h-[500px]"
            : ""
        } overflow-auto relative`}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-600 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={
                      header.column.columnDef.meta?.sticky
                        ? "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky z-[2] right-0 bg-white dark:bg-gray-800"
                        : "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider bg-white dark:bg-gray-800"
                    }
                    style={{
                      width: header.getSize(),
                      [header.column.columnDef.meta?.sticky]: 0,
                    }}
                    data-sticky-header={
                      header.column.columnDef.meta?.sticky ? "true" : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="dark:bg-gray-600 divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-4 text-center">
                  <Spinner />
                </td>
              </tr>
            ) : enableVirtualization ? (
              <>
                {paddingTop > 0 && (
                  <tr>
                    <td style={{ height: `${paddingTop}px` }} />
                  </tr>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-200 dark:hover:bg-gray-500 duration-300 group"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={
                            cell.column.columnDef.meta?.sticky
                              ? "px-4 py-4 text-sm  sticky z-[1] right-0 bg-white dark:bg-gray-600 dark:text-gray-300 group-hover:bg-gray-200 duration-300 dark:group-hover:bg-gray-600"
                              : "px-4 py-4 text-sm xl:text-base  dark:bg-gray-600 dark:text-gray-300"
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {paddingBottom > 0 && (
                  <tr>
                    <td style={{ height: `${paddingBottom}px` }} />
                  </tr>
                )}
              </>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4"
                      data-sticky-td={
                        cell.column.columnDef.meta?.sticky ? "true" : undefined
                      }
                      data-sticky-first-right-td={
                        cell.column.columnDef.meta?.sticky === "right"
                          ? "true"
                          : undefined
                      }
                      style={{
                        position: cell.column.columnDef.meta?.sticky
                          ? "sticky"
                          : undefined,
                        [cell.column.columnDef.meta?.sticky]: 0,
                        background: "inherit",
                        zIndex: 1,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="px-2 border rounded disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button
            className="px-2 border rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹
          </button>
          <button
            className="px-2 border rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ›
          </button>
          <button
            className="px-2 border rounded disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          {isServerSide && totalCount && (
            <span className="text-xs text-gray-600">
              Total records: {totalCount}
            </span>
          )}
          <select
            className="border rounded p-1 text-xs"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

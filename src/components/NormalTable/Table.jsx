import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const Table = ({ data, columns, isFetching }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="h-full md:h-[450px] overflow-y-auto border-1 border-gray-300 rounded-md">
          <table className="min-w-full text-xs divide-y divide-gray-200  overflow-hidden">
            <TableHeader table={table} />
            <TableBody
              table={table}
              columns={columns}
              isFetching={isFetching}
            />
          </table>
        </div>
      </div>
      <Pagination table={table} isFetching={isFetching} />
    </div>
  );
};

export default Table;

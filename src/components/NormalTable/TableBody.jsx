import React from 'react'
import Spinner from '../common/Spinner';
import { flexRender } from '@tanstack/react-table';

const TableBody = ({ table, columns, isFetching }) => {
  return (
    <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200">
      {isFetching ? (
        <tr>
          <td colSpan={columns.length} className="py-8 text-center">
            <div className="flex justify-center">
              <Spinner />
            </div>
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-6 py-4 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableBody
import React from 'react'
import { Outlet } from 'react-router';

const Main = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </main>
  );
}

export default Main
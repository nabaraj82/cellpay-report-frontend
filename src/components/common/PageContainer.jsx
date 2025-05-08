import React from 'react'

const PageContainer = ({children}) => {
  return (
    <section className="dark:text-gray-300 container">
      {children}
    </section>
  );
}

export default PageContainer
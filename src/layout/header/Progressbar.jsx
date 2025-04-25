import { useIsFetching } from '@tanstack/react-query';
import React from 'react'

const Progressbar = () => {
      const fetching = useIsFetching();
  return (
    <>
      {fetching > 0 && (
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-green-500 dark:bg-green-400 animate-progress"
          style={{
            width: `${fetching}%`,
            transition: "width 0.3s ease-out",
          }}
        />
      )}
    </>
  );
}

export default Progressbar
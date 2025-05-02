import { useIsFetching } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const Progressbar = () => {
  const fetching = useIsFetching();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (fetching > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return 95;
          return prev + Math.random() * 10;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timeout);
    }
  }, [fetching]);

  return (
    <>
      {progress > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-green-500 dark:bg-green-400 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      )}
    </>
  );
};

export default Progressbar;

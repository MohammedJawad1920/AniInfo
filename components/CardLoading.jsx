import React from "react";

const CardLoading = () => {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2    animate-pulse "
        >
          <div className="h-48 md:h-48 lg:h-60 bg-prussianBlueAccent rounded"></div>
          <div className="h-3 w-full rounded   bg-prussianBlueAccent"></div>
          <div className="h-3 w-3/5 rounded  bg-prussianBlueAccent"></div>
        </div>
      ))}
    </div>
  );
};

export default CardLoading;

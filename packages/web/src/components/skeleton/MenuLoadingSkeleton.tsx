import React from "react";

const MenuLoadingSkeleton = () => {
  return (
    <div className="bg-gray-300 animate-pulse flex mx-4 p-4 rounded-xl">
      {/* image skeleton */}
      <div className="size-[80px] md:size-[100px] 2xl:size-[120px] rounded-2xl bg-gray-400 " />
      {/* text skeleton */}
      <div>
        <div className="h-6 w-[200px] bg-gray-400 m-2 rounded-xl" />
        <div className="h-6 w-[100px] bg-gray-400 m-2 rounded-xl" />
      </div>
    </div>
  );
};

export default MenuLoadingSkeleton;

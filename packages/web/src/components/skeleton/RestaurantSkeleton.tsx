import React from "react";
import MenuLoadingSkeleton from "./MenuLoadingSkeleton";

const RestaurantSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* image skeleton */}
      <div className="w-full aspect-[16/9] md:aspect-[16/6] lg:aspect-[16/4] overflow-hidden relative bg-gray-300" />
      {/* name text skeleton */}
      <div className="h-10 my-4 w-2/5 bg-gray-400 m-2 rounded-xl mx-auto" />

      <div className="flex flex-col gap-4 w-full lg:w-2/5 mx-auto">
        <MenuLoadingSkeleton />
        <MenuLoadingSkeleton />
        <MenuLoadingSkeleton />
      </div>
    </div>
  );
};

export default RestaurantSkeleton;

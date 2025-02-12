import React from "react";

const RestaurantCardSkeleton = () => {
  return (
    <div className="animate-pulse opacity-50">
      <div className="bg-[#50bd60] rounded-3xl py-6 relative hover:shadow-xl duration-200">
        {/* status skeleton */}
        <div className="absolute top-3 right-3 bg-gray-700 w-20 rounded-4xl h-8" />

        {/* image skeleton */}
        <div className="bg-gray-500 aspect-[16/9] w-full h-full" />

        {/* text skeleton */}
        <div className="absolute bottom-10 left-2 bg-gray-700 w-1/2 rounded-4xl h-6" />
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;

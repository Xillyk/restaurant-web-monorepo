import React from "react";

const BottomSheetSkeleton = () => {
  return (
    <div className="h-[500px] bg-gray-300 animate-pulse m-4 flex flex-col gap-4">
      {/* name skeleton */}
      <div className="h-10 bg-gray-400 m-4 rounded-xl" />

      {/* image skeleton */}
      <div className="h-[300px] bg-gray-400" />

      {/* text skeleton */}
      <div className="h-10 bg-gray-400 mx-4 rounded-xl" />
      <div className="h-10 bg-gray-400 mx-4 rounded-xl" />
      <div className="h-10 bg-gray-400 mx-4 rounded-xl" />
    </div>
  );
};

export default BottomSheetSkeleton;

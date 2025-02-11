import React from "react";

interface IOpenStatus {
  isOpen: boolean;
}

const OpenStatus = ({ isOpen }: IOpenStatus) => {
  return (
    <div
      className={`${
        isOpen ? "bg-green-500" : "bg-red-500"
      } w-fit px-6 py-1 rounded-xl text-white text-sm md:text-lg lg:text-lg xl:text-lg`}
    >
      <span>{isOpen ? "เปิด" : "ปิด"}</span>
    </div>
  );
};

export default OpenStatus;

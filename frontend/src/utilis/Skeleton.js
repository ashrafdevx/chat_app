import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-3 w-28"></div>
            <div className="skeleton h-3 w-36"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end  mt-2 gap-4 w-full">
        <div className="flex items-center flex-row-reverse  gap-4">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-3 w-28"></div>
            <div className="skeleton h-3 w-36"></div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-3 w-28"></div>
            <div className="skeleton h-3 w-36"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;

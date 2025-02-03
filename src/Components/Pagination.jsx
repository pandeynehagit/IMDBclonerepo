import React from "react";

const Pagination = ({ pageno, handlePageNext, handlePagePrev }) => {
  return (
    <div className="flex bg-gray-400 p-4 h-[50px] w-full mt-8 justify-center gap-2 m-5px">
      <div onClick={handlePagePrev} className="px-4 hover:cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div>{pageno}</div>
      <div onClick={handlePageNext} className="px-4 hover:cursor-pointer">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default Pagination;

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <svg
      className="w-10 h-10 animate-spin"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="yellow"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      ></circle>
    </svg>
  </div>
);

export default LoadingSpinner;
// import React from "react";

// const LoadingSpinner = () => {
//   return (
//     //<div className="flex items-center justify-center min-h-screen bg-gray-100">
//     <div className="flex space-x-2 animate-pulse">
//       <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
//       <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
//       <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
//     </div>
//     //</div>
//   );
// };

// export default LoadingSpinner;

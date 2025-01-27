// import React from 'react';

// export const Button = ({ children, onClick, className, type = 'button' }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
//     >
//       {children}
//     </button>
//   );
// };


// src/components/ui/button.js

import React from 'react';

export const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

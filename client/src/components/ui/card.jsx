// import React from 'react';

// export const Card = ({ children, className }) => {
//   return (
//     <div
//       className={`rounded-2xl border border-gray-300 shadow-md p-4 bg-white ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// export const CardContent = ({ children }) => {
//   return <div className="text-gray-800">{children}</div>;
// };


// src/components/ui/card.js

import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-800 text-white rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

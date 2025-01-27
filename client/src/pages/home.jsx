// import React, { useState } from 'react';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import ResultsPage from './result';

// const Home = () => {
//   const [videoLink, setVideoLink] = useState("");
//   const [showResults, setShowResults] = useState(false);

//   const handleAnalyzeComments = () => {
//     if (videoLink.trim() === "") {
//       alert("Please enter a YouTube video link.");
//       return;
//     }
//     setShowResults(true);
//   };

//   return (
//     <div className="bg-black text-white min-h-screen flex items-center justify-center">
//       {showResults ? (
//         <ResultsPage />
//       ) : (
//         <div className="w-full max-w-md p-4">
//           <Card>
//             <CardContent className="p-6">
//               <h1 className="text-2xl font-bold text-center mb-4">YouTube Comment Analyzer</h1>
//               <input
//                 type="text"
//                 placeholder="Enter a YouTube video URL"
//                 className="w-full p-3 mb-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none"
//                 value={videoLink}
//                 onChange={(e) => setVideoLink(e.target.value)}
//               />
//               <Button
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//                 onClick={handleAnalyzeComments}
//               >
//                 Analyze Comments
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };



// export default Home;





import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/ui/navbar";

const Home = ()=>{
    return (
        <>
        
        <Navbar />

     <Outlet/>
     </>
    
    )
};
export default Home;



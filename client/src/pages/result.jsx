




// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';

// const ResultsPage = () => {
//   const { state } = useLocation();
//   const { data } = state || {}; // Getting the data passed from Home

//   if (!data) {
//     return <div>Error: No data found!</div>;
//   }

//   const { videoTitle, videoDescription, sentimentAnalysis, comments } = data;

//   return (
//     <div className="p-6 w-full max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Analysis Results</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <Card className="bg-gray-800 text-white">
//           <CardContent className="p-4">
//             <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
//             <p>Agree: {((sentimentAnalysis.agree / sentimentAnalysis.totalComments) * 100).toFixed(1)}%</p>
//             <p>Disagree: {((sentimentAnalysis.disagree / sentimentAnalysis.totalComments) * 100).toFixed(1)}%</p>
//             <p>Neutral: {((sentimentAnalysis.neutral / sentimentAnalysis.totalComments) * 100).toFixed(1)}%</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-800 text-white">
//           <CardContent className="p-4 text-center">
//             <h2 className="text-xl font-bold mb-4">Total Comments</h2>
//             <p className="text-4xl font-bold">{sentimentAnalysis.totalComments}</p>
//             <div className="text-lg mt-2">
//               <p>{sentimentAnalysis.agree} Agree</p>
//               <p>{sentimentAnalysis.disagree} Disagree</p>
//               <p>{sentimentAnalysis.neutral} Neutral</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-gray-800 text-white">
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-4">Comment Distribution</h2>
//           <div className="flex space-x-4">
//             {comments.map((comment, index) => (
//               <div key={index} className="text-center">
//                 <p>{comment.author}: {comment.text}</p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Button
//         className="mt-6 bg-blue-600 hover:bg-blue-700"
//         onClick={() => window.location.reload()}
//       >
//         Back to Input
//       </Button>
//     </div>
//   );
// };

// export default ResultsPage;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import "tailwindcss";

const ResultsPage = () => {
  const { state } = useLocation();
  const { data } = state || {}; // Safely get the data passed from Home

  if (!data) {
    return <div>Error: No data found!</div>;
  }

  const { videoTitle, videoDescription, sentimentAnalysis, comments } = data;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // Logic for paginated comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // Calculate total number of pages
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8 w-full max-w-5xl mx-auto bg-gray-900 text-white">
      <h1 className="text-4xl font-semibold mb-10 text-center">Analysis Results</h1>

      {/* Video Information */}
      <Card className="bg-gray-800 shadow-lg mb-8">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Video Information</h2>
          <p className="text-lg mb-2"><strong>Title:</strong> {videoTitle}</p>
          <p className="text-lg"><strong>Description:</strong> {videoDescription}</p>
        </CardContent>
      </Card>

      {/* Sentiment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-800 shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Sentiment Analysis</h2>
            <div>
              <p>Agree: {((sentimentAnalysis.agree / sentimentAnalysis.totalComments) * 100).toFixed(1)}%</p>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(sentimentAnalysis.agree / sentimentAnalysis.totalComments) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <p>Disagree: {((sentimentAnalysis.disagree / sentimentAnalysis.totalComments) * 100).toFixed(1)}%</p>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(sentimentAnalysis.disagree / sentimentAnalysis.totalComments) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <p>Neutral: {((sentimentAnalysis.neutral / sentimentAnalysis.totalComments) * 100).toFixed(1)}%</p>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(sentimentAnalysis.neutral / sentimentAnalysis.totalComments) * 100}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Comments */}
        <Card className="bg-gray-800 shadow-lg">
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold mb-4">Total Comments</h2>
            <p className="text-5xl font-bold">{sentimentAnalysis.totalComments}</p>
            <div className="text-lg mt-4">
              <p>{sentimentAnalysis.agree} Agree</p>
              <p>{sentimentAnalysis.disagree} Disagree</p>
              <p>{sentimentAnalysis.neutral} Neutral</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comments Section */}
      <Card className="bg-gray-800 shadow-lg mb-8">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {currentComments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            <div className="flex flex-col space-y-4">
              {currentComments.map((comment, index) => (
                <div key={index} className="p-4 border-b border-gray-700">
                  <p className="font-semibold">{comment.author}</p>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-6">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white mr-4"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-white">{currentPage} / {totalPages}</span>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white ml-4"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Back to Input Button */}
      {/* <Button
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white w-full py-3"
        onClick={() => window.location.reload()}
      >
        Back to Input
      </Button> */}
      <Link  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white w-full py-3" to={'/'}>Home</Link>
    </div>
  );
};

export default ResultsPage;


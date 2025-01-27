

import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/navbar';

const Landing = () => {
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false); // To show loading state
  const navigate = useNavigate();

  const handleAnalyzeComments = async () => {
    if (videoLink.trim() === "") {
      alert("Please enter a YouTube video link.");
      return;
    }
    setLoading(true);

    try {
      // Send a POST request to the backend with the video URL
      // const response = await axios.post("http://localhost:5100/analyze", { videoLink });
      const response = await axios.post("https://youtube-analytics-ljdf.onrender.com/analyze", { videoLink });
      // If the request is successful, navigate to the results page and pass the data
      navigate("/result", { state: { data: response.data } });
    } catch (error) {
      console.error("Error analyzing video comments:", error);
      alert("Failed to analyze comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
     
      <div className="w-full max-w-md p-4">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-center mb-4">YouTube Comment Analyzer</h1>
            <input
              type="text"
              placeholder="Enter a YouTube video URL"
              className="w-full p-3 mb-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleAnalyzeComments}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Comments'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;

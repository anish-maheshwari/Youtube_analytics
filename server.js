
import express from "express";

import axios from "axios";
import path from 'path';


import { fileURLToPath } from 'url';
import cors from "cors";
import * as dotenv from "dotenv";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({
    origin:"https://youtube-analytics-ljdf.onrender.com",
  methods: ["GET", "POST"]
  }));


  

  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  app.use(express.static(path.resolve(__dirname, './public')));
  
// Replace with your YouTube Data API key
dotenv.config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;


const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
};

app.post("/analyze", async (req, res) => {
  const { videoLink } = req.body;

  if (!videoLink) {
    return res.status(400).json({ error: "Video link is required" });
  }

  const videoId = extractVideoId(videoLink);
  if (!videoId) {
    return res.status(400).json({ error: "Invalid YouTube video link" });
  }

  try {
    // Fetch video details
    const videoResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const videoDetails = videoResponse.data.items[0]?.snippet;

    if (!videoDetails) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Fetch comments
    const commentsResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}&maxResults=100`
    );
    
    const comments = commentsResponse.data.items.map((item) => ({
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      text: item.snippet.topLevelComment.snippet.textDisplay,
      
    }));

    // Simple sentiment analysis
    const sentimentAnalysis = {
      agree: comments.filter((comment) =>
        comment.text.toLowerCase().includes("agree")
      ).length,
      disagree: comments.filter((comment) =>
        comment.text.toLowerCase().includes("disagree")
      ).length,
      neutral: comments.length,
    };

    res.json({
      videoTitle: videoDetails.title,
      videoDescription: videoDetails.description,
      sentimentAnalysis,
      comments,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch video data" });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


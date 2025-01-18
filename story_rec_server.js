const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static("public"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Handle file uploads
app.post("/upload", upload.single("video"), (req, res) => {
  res.send({ message: "Video uploaded successfully!", file: req.file });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

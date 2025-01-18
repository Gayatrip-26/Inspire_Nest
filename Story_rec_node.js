const express = require("express");
const app = express();

app.use(express.static("public")); // Serve static files like index.html and JSON

app.get("/stories", (req, res) => {
  res.sendFile(__dirname + "/public/stories.json");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

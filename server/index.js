const express = require("express");
const cors = require("cors");

const app = express();

const {
  generateSongs,
} = require("./generators/songGenerator");
app.use(cors());
app.use(express.json());

app.get("/api/songs", (req, res) => {
  const {
    page = 1,
    seed = 1,
    locale = "en-US",
    likes = 3.7,
  } = req.query;

  const items = generateSongs({
    page: Number(page),
    seed,
    locale,
    likes: Number(likes),
  });

  res.json({
    page: Number(page),
    items,
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
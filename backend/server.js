// backend/server.js
const express = require("express");
const cors = require("cors");

const poemRoutes = require("./routes/poemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Poetry Journal Backend Running");
});

// Use the poem routes
app.use("/", poemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

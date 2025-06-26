const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "StartupPortal";
let startupCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    startupCollection = db.collection("startupIdeas");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve the form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "startup.html"));
});

// POST: Submit startup idea
app.post("/submit-idea", async (req, res) => {
  const { id, team_name, title, domain, funding_required } = req.body;

  const idea = {
    id,
    team_name,
    title,
    domain,
    funding_required: parseFloat(funding_required)
  };

  try {
    await startupCollection.insertOne(idea);
    res.json({ message: "Startup idea submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit idea." });
  }
});

// GET: Show EdTech ideas needing > 5 lakhs
app.get("/edtech-ideas", async (req, res) => {
  try {
    const results = await startupCollection
      .find({ domain: "EdTech", funding_required: { $gt: 5 } })
      .toArray();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ideas." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

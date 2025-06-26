const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "complaintDB";
let db, complaintsCollection;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Connect to MongoDB and setup collection
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    db = client.db(dbName);
    complaintsCollection = db.collection("complaints");
  })
  .catch(err => console.error(err));

app.get("/update-form", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

// POST: Submit new complaint
app.post("/submit", async (req, res) => {
  const { complaint_id, user_name, issue } = req.body;

  try {
    await complaintsCollection.insertOne({
      complaint_id,
      user_name,
      issue,
      status: "Pending",
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error submitting complaint.");
  }
});

// PUT: Update complaint status
// POST route that simulates PUT (no JS)
app.post("/update-status", async (req, res) => {
  const { complaint_id, status } = req.body;

  try {
    const result = await complaintsCollection.updateOne(
      { complaint_id },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      res.send("Complaint not found or status unchanged.");
    } else {
      res.send("Complaint status updated successfully.");
    }
  } catch (err) {
    res.status(500).send("Error updating complaint.");
  }
});


// GET: Retrieve all pending complaints
app.get("/pending", async (req, res) => {
  try {
    const pendingComplaints = await complaintsCollection.find({ status: "Pending" }).toArray();
    res.json(pendingComplaints);
  } catch (err) {
    res.status(500).send("Error retrieving complaints.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

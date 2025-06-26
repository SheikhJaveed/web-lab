const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "InternshipDB";
let internshipCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    internshipCollection = db.collection("internships");
  })
  .catch(err => console.error(err));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/update-form", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

// POST: Add internship data
app.post("/submit", async (req, res) => {
  const { student_id, name, company, duration, status } = req.body;

  const internship = {
    student_id,
    name,
    company,
    duration: parseInt(duration),
    status,
  };

  try {
    await internshipCollection.insertOne(internship);
    res.json({ message: "Internship data added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to insert data." });
  }
});

// GET: Infosys interns (JSON only)
app.get("/infosys-interns", async (req, res) => {
  try {
    const interns = await internshipCollection.find({ company: "Infosys" }).toArray();
    res.json(interns);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Infosys interns." });
  }
});

// POST: Simulate PUT to mark status as completed
app.post("/mark-completed", async (req, res) => {
  const { student_id } = req.body;

  try {
    const result = await internshipCollection.updateOne(
      { student_id },
      { $set: { status: "Completed" } }
    );

    if (result.modifiedCount === 0) {
      res.json({ message: "Student not found or already completed." });
    } else {
      res.json({ message: "Internship marked as completed." });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating status." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

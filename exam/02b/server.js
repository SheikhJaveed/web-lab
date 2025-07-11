const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "collegeDB";
let studentCollection;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    studentCollection = db.collection("students");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", async (req, res) => {
  const { name, usn, semester, exam_fee } = req.body;

  const student = {
    name,
    usn,
    semester: parseInt(semester),
    exam_fee: exam_fee ? parseFloat(exam_fee) : 0,
  };

  try {
    await studentCollection.insertOne(student);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error saving student details.");
  }
});

// Delete students with no exam fee
app.get("/delete-unpaid", async (req, res) => {
  try {
    const result = await studentCollection.deleteMany({
      $or: [
        { exam_fee: { $eq: 0 } },
        { exam_fee: { $exists: false } },
        { exam_fee: null }
      ]
    });

    res.send(`${result.deletedCount} student(s) without exam fee deleted.`);
  } catch (err) {
    res.status(500).send("Error deleting unpaid students.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

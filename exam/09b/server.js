const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "StudentAppDB";
let studentCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    studentCollection = db.collection("students");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve the student form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "student.html"));
});

// POST route: Add student
app.post("/add-student", async (req, res) => {
  const { user_name, branch, semester } = req.body;

  const student = {
    user_name,
    branch,
    semester: parseInt(semester)
  };

  try {
    await studentCollection.insertOne(student);
    res.json({ message: "Student added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add student." });
  }
});

// GET route: CSE + 6th Semester
app.get("/filter-students", async (req, res) => {
  try {
    const filteredStudents = await studentCollection
      .find({ branch: "CSE", semester: 6 })
      .toArray();
    res.json(filteredStudents);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

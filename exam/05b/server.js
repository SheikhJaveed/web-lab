const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "StudentDB_1223";
let studentCollection;

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

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve update.html
app.get("/update-form", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

// POST: Add new student
app.post("/add-student", async (req, res) => {
  const { name, usn, department, grade } = req.body;

  const student = { name, usn, department, grade };

  try {
    await studentCollection.insertOne(student);
    res.json({ message: "Student added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add student." });
  }
});

// POST: Update grade (simulate PUT)
app.post("/update-grade", async (req, res) => {
  const { name, grade } = req.body;

  try {
    const result = await studentCollection.updateOne(
      { name },
      { $set: { grade } }
    );

    if (result.modifiedCount === 0) {
      res.json({ message: "Student not found or grade already set." });
    } else {
      res.json({ message: "Grade updated successfully." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update grade." });
  }
});

// GET: View all students
app.get("/students", async (req, res) => {
  try {
    const students = await studentCollection.find({}).toArray();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching student records." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

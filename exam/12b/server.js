const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "ExamDB";
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

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "exam.html"));
});

// POST: Add student record
app.post("/add-student", async (req, res) => {
  const { student_id, name, subject, marks } = req.body;
  const numericMarks = parseInt(marks);

  const student = {
    student_id,
    name,
    subject,
    marks: numericMarks,
    eligibility_status: numericMarks < 20 ? "Not Eligible" : "Eligible"
  };

  try {
    await studentCollection.insertOne(student);
    res.json({ message: "Student record added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add student record." });
  }
});

// GET: Show students who are not eligible
app.get("/not-eligible", async (req, res) => {
  try {
    const students = await studentCollection
      .find({ eligibility_status: "Not Eligible" })
      .toArray();

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching not eligible students." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

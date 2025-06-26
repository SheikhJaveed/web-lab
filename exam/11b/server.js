const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "AttendanceDB";
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

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "attendance.html"));
});

// POST: Add attendance record
app.post("/add-attendance", async (req, res) => {
  const { student_id, name, course, total_attendance, classes_attended } = req.body;

  const total = parseInt(total_attendance);
  const attended = parseInt(classes_attended);
  const percentage = total > 0 ? ((attended / total) * 100).toFixed(2) : 0;

  const student = {
    student_id,
    name,
    course,
    total_attendance: total,
    classes_attended: attended,
    attendance_percentage: parseFloat(percentage)
  };

  try {
    await studentCollection.insertOne(student);
    res.json({ message: "Attendance record added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add attendance record." });
  }
});

// GET: Show students with attendance < 75%
app.get("/low-attendance", async (req, res) => {
  try {
    const students = await studentCollection
      .find({ attendance_percentage: { $lt: 75 } })
      .toArray();

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching low attendance students." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

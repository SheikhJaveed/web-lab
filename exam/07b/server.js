const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "CourseDB";
let enrollmentCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    enrollmentCollection = db.collection("enrollments");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve HTML forms
app.get("/enroll-form", (req, res) => {
  res.sendFile(path.join(__dirname, "enroll.html"));
});

app.get("/update-form", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

// POST: Enroll a student
app.post("/enroll", async (req, res) => {
  const { student_id, name, course_name, duration, status } = req.body;

  const enrollment = {
    student_id,
    name,
    course_name,
    duration,
    status
  };

  try {
    await enrollmentCollection.insertOne(enrollment);
    res.json({ message: "Enrollment successful." });
  } catch (err) {
    res.status(500).json({ error: "Enrollment failed." });
  }
});

// GET: Active enrollments
app.get("/active-enrollments", async (req, res) => {
  try {
    const enrollments = await enrollmentCollection
      .find({ status: "active" })
      .toArray();

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active enrollments." });
  }
});

// POST: Update enrollment status to "completed"
app.post("/mark-completed", async (req, res) => {
  const { query } = req.body;

  try {
    const result = await enrollmentCollection.updateOne(
      {
        $or: [
          { student_id: query },
          { course_name: query }
        ]
      },
      { $set: { status: "completed" } }
    );

    if (result.modifiedCount === 0) {
      res.json({ message: "No matching enrollment found or already completed." });
    } else {
      res.json({ message: "Enrollment status updated to completed." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update status." });
  }
});

// Redirect root to enrollment form
app.get("/", (req, res) => {
  res.redirect("/enroll-form");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

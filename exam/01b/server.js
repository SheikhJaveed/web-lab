const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  usn: String,
  name: String,
  subject_code: String,
  cie_marks: Number,
});

const Student = mongoose.model("Student", studentSchema);

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/", async (req, res) => {
  const { usn, name, subject_code, cie_marks } = req.body;
  const student = new Student({
    usn,
    name,
    subject_code,
    cie_marks: parseInt(cie_marks),
  });

  try {
    await student.save();
    res.redirect("/"); // redirect back to form
  } catch (err) {
    res.status(500).send("Error saving student.");
  }
});

// Show students with CIE < 20
app.get("/low-cie", async (req, res) => {
  try {
    const students = await Student.find({ cie_marks: { $lt: 20 } });

    res.json(students);
  } catch (err) {
    res.status(500).send("Error fetching students.");
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

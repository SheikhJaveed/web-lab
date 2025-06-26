const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "HR";
let employeeCollection;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    employeeCollection = db.collection("employees");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve the employee form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/add-employee", async (req, res) => {
  const { emp_name, email, phone, hire_date, job_title, salary } = req.body;

  const employee = {
    emp_name,
    email,
    phone,
    hire_date,
    job_title,
    salary: parseFloat(salary),
  };

  try {
    await employeeCollection.insertOne(employee);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error adding employee.");
  }
});

// GET: Show employees with salary > 50000
app.get("/high-salary", async (req, res) => {
  try {
    const employees = await employeeCollection
      .find({ salary: { $gt: 50000 } })
      .toArray();
    res.json(employees);
  } catch (err) {
    res.status(500).send("Error fetching employees.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

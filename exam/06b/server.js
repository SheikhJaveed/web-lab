const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "HospitalDB";
let hospitalCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    hospitalCollection = db.collection("hospitals");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve hospital.html
app.get("/hospital-form", (req, res) => {
  res.sendFile(path.join(__dirname, "hospital.html"));
});

// Serve patient.html
app.get("/patient-form", (req, res) => {
  res.sendFile(path.join(__dirname, "patient.html"));
});

// POST: Add hospital
app.post("/add-hospital", async (req, res) => {
  const { hospital_id, name, location, total_beds, occupied_beds } = req.body;

  const hospital = {
    hospital_id,
    name,
    location,
    total_beds: parseInt(total_beds),
    occupied_beds: parseInt(occupied_beds),
  };

  try {
    await hospitalCollection.insertOne(hospital);
    res.json({ message: "Hospital added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add hospital." });
  }
});

// POST: Admit patient (increment occupied_beds)
app.post("/admit-patient", async (req, res) => {
  const { hospital_id } = req.body;

  try {
    const hospital = await hospitalCollection.findOne({ hospital_id });

    if (!hospital) {
      return res.json({ message: "Hospital not found." });
    }

    if (hospital.occupied_beds >= hospital.total_beds) {
      return res.json({ message: "No available beds!" });
    }

    await hospitalCollection.updateOne(
      { hospital_id },
      { $inc: { occupied_beds: 1 } }
    );

    res.json({ message: "Patient admitted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error admitting patient." });
  }
});

// GET: Show hospitals with <10 available beds
app.get("/low-beds", async (req, res) => {
  try {
    const hospitals = await hospitalCollection
      .find({
        $expr: {
          $lt: [{ $subtract: ["$total_beds", "$occupied_beds"] }, 10],
        },
      })
      .toArray();

    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching hospitals." });
  }
});

// Redirect root to hospital form
app.get("/", (req, res) => {
  res.redirect("/hospital-form");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

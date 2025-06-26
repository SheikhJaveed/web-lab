const express = require("express");
const app = express();
const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to Our Engineering College</h1>
    <p><a href="/cse">Computer Science</a></p>
    <p><a href="/ece">Electronics & Communication</a></p>
    <p><a href="/mech">Mechanical Engineering</a></p>
  `);
});

// CSE Branch
app.get("/cse", (req, res) => {
  res.send(`
    <body style="background-color: #e0f7fa; font-family: Arial; color: #00695c;">
      <h1>Computer Science & Engineering (CSE)</h1>
      <p>CSE focuses on programming, algorithms, AI, web development, and data structures.</p>
      <a href="/">Go Back</a>
    </body>
  `);
});

// ECE Branch
app.get("/ece", (req, res) => {
  res.send(`
    <body style="background-color: #fff3e0; font-family: Georgia; color: #e65100;">
      <h1>Electronics & Communication Engineering (ECE)</h1>
      <p>ECE deals with embedded systems, signal processing, and communication technologies.</p>
      <a href="/">Go Back</a>
    </body>
  `);
});

// MECH Branch
app.get("/mech", (req, res) => {
  res.send(`
    <body style="background-color: #f3e5f5; font-family: Verdana; color: #6a1b9a;">
      <h1>Mechanical Engineering (ME)</h1>
      <p>Mechanical Engineering involves machines, thermodynamics, and manufacturing systems.</p>
      <a href="/">Go Back</a>
    </body>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

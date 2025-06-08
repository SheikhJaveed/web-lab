const express = require("express");
const app = express();
const PORT = 3000;
    
// Store visits in memory (basic and temporary)
const visitCounts = {};

// Logger middleware
function logger(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
}

// Visitor counter middleware
function visitorCounter(req, res, next) {
  const ip = req.ip;
  if (!visitCounts[ip]) {
    visitCounts[ip] = 1;
  } else {
    visitCounts[ip]++;
  }
  req.visitCount = visitCounts[ip];
  console.log("Visitor IP:", ip, "| Visit Count:", req.visitCount);
  next();
}

// Use the middleware
app.use(logger);
app.use(visitorCounter);

// Route
app.get("/", function (req, res) {
  res.send("You have visited this site " + req.visitCount + " times.");
});

// Start server
app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});

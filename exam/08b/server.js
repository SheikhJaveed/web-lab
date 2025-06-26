const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const url = "mongodb://localhost:27017";
const dbName = "ProductDB";
let productCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    productCollection = db.collection("products");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "product.html"));
});

// POST: Add Product with Final Price calculation
app.post("/add-product", async (req, res) => {
  const { product_id, name, price, discount, stock } = req.body;
  const originalPrice = parseFloat(price);
  const discountValue = parseFloat(discount);
  const finalPrice = originalPrice - (originalPrice * discountValue / 100);

  const product = {
    product_id,
    name,
    price: originalPrice,
    discount: discountValue,
    stock: parseInt(stock),
    final_price: parseFloat(finalPrice.toFixed(2)) // rounding to 2 decimals
  };

  try {
    await productCollection.insertOne(product);
    res.json({ message: "Product added successfully with Final Price." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product." });
  }
});

// GET: Show products with Final Price < 1000
app.get("/cheap-products", async (req, res) => {
  try {
    const cheapProducts = await productCollection
      .find({ final_price: { $lt: 1000 } })
      .toArray();

    res.json(cheapProducts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

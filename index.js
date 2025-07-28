require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow multiple origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173", // for local development
  "https://testing-ashy-six.vercel.app" // for deployed Vercel app
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// DB Connection
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

// Routes
const products_routes = require("./routes/product");

app.get("/", (req, res) => {
  res.send("Hi I AM Live");
});

app.use("/api/products", products_routes);

// Start Server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I Am Connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

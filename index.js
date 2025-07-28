require("dotenv").config()
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://testing-ashy-six.vercel.app/",
  })
);
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/product");

app.get("/", (req, res) => {
  res.send("Hi I AM Live");
});

// middleware or to set router
app.use("/api/products", products_routes);

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

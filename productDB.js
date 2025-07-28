require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const productJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany(); // 👉 आधीचं data clear करतो (optional)
    await Product.create(productJson); // 👉 JSON मधून insert
    console.log("👍 Success: Data inserted");
    process.exit(0); // 👉 script बंद करतो success नंतर
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1); // 👉 error असल्यास script बंद करतो
  }
};

start();

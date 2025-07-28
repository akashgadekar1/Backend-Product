const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  company: {
    type: String,
    enum: {
      values: ["Apple", "Samsung", "mi", "realme"],
      message: `{VALUE} is not supported`
    },
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, {
  timestamps: true   // ✅ Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("Product", productSchema);

const Product = require("../models/product");

// सर्व Products घेणारी API
const getAllProducts = async (req, res) => {
  // उदा: http://localhost:5000/api/products?company=Apple&xyd=ams
  const { company, sort, select, page = 1, limit = 10 } = req.query;

  // MongoDB साठी filter बनवतोय
  const queryObject = {};

  // जर company दिलं असेल तर filter मध्ये घालतो
  if (company) {
    queryObject.company = company;
    console.log(queryObject); // debugging साठी
  }

  // Query तयार करतो MongoDB साठी
  let apiData = Product.find(queryObject);

  // 👉 Sorting Logic
  // उदा: ?sort=-name,-price => name descending, price descending
  if (sort) {
    let sortFix = sort.split(",").join(" "); // "name,-price" -> "name -price"
    apiData = apiData.sort(sortFix); // sorting लागू करतो
  }

  // 👉 Field Selection Logic
  // उदा: ?select=name,price => फक्त name आणि price fields दाखव
  if (select) {
    let selectFix = select.split(",").join(" "); // "name,price" -> "name price"
    apiData = apiData.select(selectFix); // फक्त select केलेले fields आणतो
  }

  // 👉 Pagination Logic
  // page = 2, limit = 3 => skip = (2-1)*3 = 3 documents skip होतील
  const skip = (page - 1) * limit;

  // pagination लागू करतो
  apiData = apiData.skip(skip).limit(Number(limit));

  // final query execute करतो
  const Products = await apiData;

  // response परत करतो
  res.status(200).json({
    Products,
  });
};

// Testing साठी एक simple API
const getAllProductsTesting = async (req, res) => {
  // उदा: http://localhost:5000/api/products/testing?company=mi&name=Redmi Note 12
  // सध्या फक्त name field परत करतोय
  const data = await Product.find(req.query);

  res.status(200).json({
    data,
  });
};

// दोन्ही functions export करतोय
module.exports = { getAllProducts, getAllProductsTesting };

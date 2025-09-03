const express = require("express");
const connect = require("./Config/Config");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const app = express();

// ✅ define storage first
const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 

// Middlewares
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to support form-data text fields

// Database connection
connect();

// Routes
const Auth = require("./Routes/Auth");
const Category = require("./Routes/Category_Route");
const SubCategory = require("./Routes/SubCategory_Route");
const brandRoutes = require("./Routes/Brand_Route");
const FeaturedProduct = require("./Routes/Featured_Product_Route");
const Products = require('./Routes/Products_Route');

app.use("/api/auth", Auth);
app.use("/api/category", Category);
app.use("/api/subcategory", SubCategory);
app.use("/api/brands", brandRoutes);
app.use("/api/products", Products);
app.use("/api/featured/product", FeaturedProduct);

// Server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});

const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getDiscountPrice,
    createDiscountPrice,
    updateDiscountPrice,
    deleteDiscountPrice,
} = require("../Controllers/Products_Controller");
const upload = require("../Middlewares/upload");

const router = express.Router();


// Create Product (supports multiple images with field name "images")
router.post("/create", upload.array("images", 5), createProduct);

// Get All Products
router.get("/getallproduct", getProducts);

// Get Single Product
router.get("/getproduct/:id", getProductById);

// Update Product (allow new images upload)
router.put("/update/:id", upload.array("images", 5), updateProduct);

// Delete Product
router.delete("/delete/:id", deleteProduct);

// Discount CRUD Routes
router.get("/discount/:id", getDiscountPrice);          // Read discount
router.post("/discount/:id", createDiscountPrice);     // Create / set discount
router.put("/discount/:id", updateDiscountPrice);      // Update discount
router.delete("/discount/:id", deleteDiscountPrice);   // Delete / remove discount


module.exports = router;

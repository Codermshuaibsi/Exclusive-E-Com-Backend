const express = require("express");
const router = express.Router();
const { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } = require("../Controllers/Brand_Controller");

// Create brand
router.post("/create", createBrand);

// Get all brands
router.get("/getallbrand", getBrands);

// Get single brand by ID
router.get("/brand/:id", getBrandById);

// Update brand
router.put("/brand/:id", updateBrand);

// Delete brand
router.delete("/brand/:id", deleteBrand);

module.exports = router;

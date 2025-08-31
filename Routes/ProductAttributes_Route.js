const express = require("express");
const router = express.Router();
const {
  createAttribute,
  getAttributes,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
} = require("../Controllers/ProductAttributes_Controller");

// CRUD routes
router.post("/", createAttribute);        // Create new attribute
router.get("/", getAttributes);           // Get all attributes
router.get("/:id", getAttributeById);     // Get single attribute
router.put("/:id", updateAttribute);      // Update attribute
router.delete("/:id", deleteAttribute);   // Delete attribute

module.exports = router;

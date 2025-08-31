const ProductAttribute = require("../Models/ProductAttributes");

// CREATE attribute
exports.createAttribute = async (req, res) => {
  try {
    const { category, name, values } = req.body;

    // Check for duplicates (case-insensitive match)
    const existing = await ProductAttribute.findOne({
      category,
      name: { $regex: new RegExp("^" + name + "$", "i") }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Attribute "${name}" already exists for this category`
      });
    }

    const attribute = new ProductAttribute({ category, name, values });
    await attribute.save();

    res.status(201).json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create attribute",
      error: error.message
    });
  }
};

// GET all attributes
exports.getAttributes = async (req, res) => {
  try {
    const attributes = await ProductAttribute.find().populate("category", "name");
    res.status(200).json({ success: true, data: attributes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attributes",
      error: error.message
    });
  }
};

// GET single attribute by ID
exports.getAttributeById = async (req, res) => {
  try {
    const attribute = await ProductAttribute.findById(req.params.id).populate("category", "name");
    if (!attribute) {
      return res.status(404).json({ success: false, message: "Attribute not found" });
    }
    res.status(200).json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attribute",
      error: error.message
    });
  }
};

// UPDATE attribute
exports.updateAttribute = async (req, res) => {
  try {
    const { category, name, values } = req.body;

    // Check for duplicates (excluding the current one)
    const existing = await ProductAttribute.findOne({
      category,
      name: { $regex: new RegExp("^" + name + "$", "i") },
      _id: { $ne: req.params.id }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Attribute "${name}" already exists for this category`
      });
    }

    const attribute = await ProductAttribute.findByIdAndUpdate(
      req.params.id,
      { category, name, values },
      { new: true }
    );

    if (!attribute) {
      return res.status(404).json({ success: false, message: "Attribute not found" });
    }

    res.status(200).json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update attribute",
      error: error.message
    });
  }
};

// DELETE attribute
exports.deleteAttribute = async (req, res) => {
  try {
    const attribute = await ProductAttribute.findByIdAndDelete(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, message: "Attribute not found" });
    }
    res.status(200).json({ success: true, message: "Attribute deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete attribute",
      error: error.message
    });
  }
};
    
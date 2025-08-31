const Subcategory = require('../Models/SubCategory');
const Category = require('../Models/Category');

// Create new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategory = await Subcategory.create({ name, category: categoryId });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isOn } = req.body;

    const updated = await Subcategory.findByIdAndUpdate(
      id,
      { name, isOn },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.json({ message: 'Subcategory deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



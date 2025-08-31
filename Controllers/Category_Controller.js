const Category = require("../Models/Category");

// Create Category
async function handleCreateCategory(req, res) {
    const { name, isOn } = req.body;
    try {
        const newCategory = new Category({ name, isOn });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}

// Update Category isOn
async function handleIsOn(req, res) {
    const { isOn } = req.body;
    const { id } = req.params;   // ✅ take id from params
    try {
        const category = await Category.findByIdAndUpdate(id, { isOn }, { new: true });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: "Error updating category" });
    }
}

// Delete Category
async function handleDeleteCategory(req, res) {
    const { id } = req.params;   // ✅ take id from params
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting category" });
    }
}

// Get All Categories
async function getAllCategory(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching categories" });
    }
}

module.exports = { 
    handleCreateCategory, 
    handleIsOn, 
    handleDeleteCategory, 
    getAllCategory 
};

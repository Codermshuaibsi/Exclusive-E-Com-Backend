const Brand = require("../Models/Brand");

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name are required" });
        }

        const brand = new Brand({ name });
        await brand.save();

        res.status(201).json({ message: "Brand created successfully", brand });
    } catch (error) {
        res.status(500).json({ error: "Failed to create brand", details: error.message });
    }
};

// Get all brands
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch brands" });
    }
};

// Get single brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({ error: "Brand not found" });
        }

        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch brand" });
    }
};

// Update brand
exports.updateBrand = async (req, res) => {
    try {
        const { name, isOn } = req.body;

        const brand = await Brand.findByIdAndUpdate(
            req.params.id,
            { name, isOn },
            { new: true, runValidators: true }
        );

        if (!brand) {
            return res.status(404).json({ error: "Brand not found" });
        }

        res.status(200).json({ message: "Brand updated successfully", brand });
    } catch (error) {
        res.status(500).json({ error: "Failed to update brand" });
    }
};

// Delete brand
exports.deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);

        if (!brand) {
            return res.status(404).json({ error: "Brand not found" });
        }

        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete brand" });
    }
};

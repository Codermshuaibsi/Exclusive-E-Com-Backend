const mongoose = require('mongoose');

const ProductAttribute = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true }, // e.g., "Size"
    values: [{ type: String }] // e.g., ["XS","S","M","L","XL"] or ["6","7","8"] or ["20L","30L"]
});

module.exports = mongoose.model('ProductAttribute', ProductAttribute);

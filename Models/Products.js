const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    OriginalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    DiscountedPrice: {
        type: Number,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    images: [
        {
            url: { type: String, required: true }, 
            public_id: { type: String, required: true }
        }
    ],

    // ✅ Attributes field
    attributes: [
        {
            attribute: { type: mongoose.Schema.Types.ObjectId, ref: "ProductAttribute" }, // e.g. Size
            value: { type: String } // e.g. "XL", "8", "30L"
        }
    ],

    isOn: {
        type: Boolean,
        default: true
    },
    badge: {
        type: String,
        enum: ['Sale', 'New', 'Best Seller'],
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Products', Products);

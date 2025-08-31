const mongoose = require('mongoose');

const FeaturedProduct = new mongoose.Schema({
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
    images: [
        {
            url: { type: String, required: true }, // Cloudinary secure URL
            public_id: { type: String, required: true } // Cloudinary public_id (for delete/replace)
        }
    ],

    isOn: {
        type: Boolean,
        default: true
    },
    badge: {
        type: String,
        enum: ['Sale', 'New', 'Best Seller'], // optional predefined badges
        default: null
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FeaturedProduct', FeaturedProduct);

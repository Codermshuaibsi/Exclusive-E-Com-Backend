const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: [
        {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String,
        },
    ],
    phone: String,
    otp: String,

    is_verified: {
        type: Boolean,
        default: false,
    },
    is_reset_verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)

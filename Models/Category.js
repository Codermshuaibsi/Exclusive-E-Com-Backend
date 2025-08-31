const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isOn: {
        type: Boolean,
        default: true
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
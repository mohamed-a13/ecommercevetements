const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: String,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    expedition: {
        required: false,
        type: Boolean
    }
}, {
    timestamps: true
})

const Product = mongoose.model("product", productSchema)

module.exports = Product;
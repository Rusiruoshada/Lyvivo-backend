import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema (
    {
        productName: {
            type: String,
            required : true
        },
        category: {
            type: String,
            ref: 'Category',
            required :true
        },
        weight: {
            type: String,
            required: true
        },
        regular_price: {
            type: Number,
            required: true
        },
        discount_price: {
            type: Number,
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Product',ProductSchema)
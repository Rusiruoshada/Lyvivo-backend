import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required : true
        },
        category: {
            type: {id:String, title: String},
            ref: 'Category',
            required :true
        },
        quantity: {
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
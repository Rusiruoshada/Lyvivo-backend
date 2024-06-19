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
        }
    }
)
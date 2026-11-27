import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    qty: {
        type: Number,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
    images: {
        type: [String],
        require: true,
    },
    price: {
        type: Number,
        require:true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require:true,
    },
},
    { timestamps: true }
);
const productModel = mongoose.model("product", productSchema);
export default productModel;
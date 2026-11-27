import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
    image: {
        type: String,
        require:true,
    },
    price: {
        type: Number,
        require:true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require:true,
    },
},
    {timestamps:true}
)
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
import mongoose from "mongoose";

const OrderHeaderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        name: {
            type: String,
        },
        streetAddress: {
            type: String,
        },
        phoneNumber: {
            type: Number,
        },
        pincode: {
            type: Number,
        },
        orderStatus: {
          type:String,  
        },
        paymentStatus: {
            type:String,
        },
        orderTotal: {
            type:Number,
        },
    },
    { timestamps: true }
);
const OrderHeaderModel = mongoose.model("orderHeader", OrderHeaderSchema);
export default OrderHeaderModel;
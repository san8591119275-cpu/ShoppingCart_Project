import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            require: true,
        },
        orderHeader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orderHeader",
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true }
);
const OrderDetailModel = mongoose.model("orderDetail", OrderDetailSchema);
export default OrderDetailModel;
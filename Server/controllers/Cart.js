import cartModel from "../models/Cart.js";
import OrderDetailModel from "../models/OrderDetail.js";

export const createCart = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename; 
        });
        const catData = await cartModel.create({
            name: req.body.name,
            description: req.body.description,
            qty: req.body.qty,            
            images: images,
            price: req.body.price,
            product: req?.query.productId,
            user:req.body.userId,
        });
        if (catData) res.status(201).send({ message: "Product added to cart" })
        else res.status(404).send({message:"unable to add product in cart"})
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const getProductByUserId = async (req, res) => {
    try {
        const catData = await cartModel.find({
            user: req?.query.id,
        }).populate("product");
            // populate({ path: "user", populate: [{ path: "product" }] });
        res.status(200).send({ catData });
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const cartSummary = async (req, res) => {
    try {
        const catData = await OrderDetailModel.find({
            user: req?.query.id,
        }). populate({ path: "user", populate: [{ path: "cart" }] });
        res.status(200).send({ catData });
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};

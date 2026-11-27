import productModel from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename; 
        });
        const proData = await productModel.create({
            name: req.body.name,
            description: req.body.description,
            qty: req.body.qty,            
            images: images,
            price:req.body.price,
            department: req.body.departmentId,
        });
        if (proData) res.status(201).send({ message: "Product added" })
        else res.status(404).send({message:"unable to add product"})
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const updateProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const proData = await productModel.findByIdAndUpdate(
        {_id:req.body.id},
            {
            name: req.body.name,
            description: req.body.description,
            qty: req.body.qty,           
                images: images,
            price:req.body.price,
            department: req.body.departmentId,
        });
        if (proData) res.status(200).send({ message: "Product updated" })
        else res.status(404).send({message:"unable to update product"})
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const proData = await productModel.deleteOne(
        {_id:req.body.id}
        );
        if (proData.deletedCount==1) res.status(200).send({ message: "Product deleted" })
        else res.status(404).send({ message: "unable to delete product"})
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const getProductsByDepartmentId = async (req, res) => {
    try {
        const proData = await productModel.find({
            department: req.query.departmentId,
        }).populate({ path: "department", populate: [{ path: "university" }] });
        res.status(200).send({ proData });
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const productDetails = async (req, res) => {
    try {
        const proData = await productModel.findOne(
            {
                _id: req.query.id,
            }).populate({ path: "department", populate: [{ path: "university" }] });
        res.status(200).send({ proData });
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};

export const updateProductQty = async (req, res) => {
    try {
        let product = await productModel.findOne({
            _id: req.body.id
        });
        let active = true;
        if (product.qty - req?.body?.qty <= 0) {
            active = false;
        }
        let proData = await productModel.findByIdAndUpdate({
            _id: req.body.id,
        },
            {
                qty: product?.qty - req.body.qty,
                active: active,
            }
        );
        if (proData) res.status(200).send({ message: "product qty updated" })
        else res.status(404).send({message:"unable to update product qty"})
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }

};

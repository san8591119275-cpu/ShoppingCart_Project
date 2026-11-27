import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { CreateUniversity, DeleteUniversity, UpdateUniversity, getUniversities } from "./controllers/University.js";
import { createDepartment, deleteDepartment, getDepartmentsByUniversityId, updateDepartment } from "./controllers/Department.js";
import { createProduct, deleteProduct, getProductsByDepartmentId, productDetails, updateProduct, updateProductQty } from "./controllers/Product.js";
import {   login, register } from "./controllers/User.js";
import { cartSummary, createCart, getProductByUserId} from "./controllers/Cart.js";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//University Module
const storageUni =multer.diskStorage({
    destination: "uploadsUni",
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadsUni = multer({
    storage:storageUni,
});
app.post("/university",uploadsUni.single("image"),CreateUniversity);
app.put("/university",uploadsUni.single("image"),UpdateUniversity);
app.delete("/university",DeleteUniversity);
app.get("/university", getUniversities);

//Access Images
app.use(express.static("uploadsUni/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsProduct/"));

// Department Module
const storageDep =multer.diskStorage({
    destination: "uploadsDep",
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadsDep = multer({
    storage:storageDep,
});
app.post("/department", uploadsDep.single("image"), createDepartment);
app.put("/department", uploadsDep.single("image"), updateDepartment);
app.delete("/department", deleteDepartment);
app.get("/department", getDepartmentsByUniversityId);
 
// Product Module
const storageProduct =multer.diskStorage({
    destination: "uploadsProduct",
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadsProduct = multer({
    storage:storageProduct,
});
app.post("/product", uploadsProduct.array("images"), createProduct);
app.put("/product", uploadsProduct.array("images"), updateProduct);
app.delete("/product", deleteProduct);
app.get("/product", getProductsByDepartmentId);
app.get("/productdetails", productDetails);
app.put("/updateproductqty", updateProductQty);
app.post("/register", register);
app.post("/login", login);

//Cart
const storageCart =multer.diskStorage({
    destination: "uploadCart",
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadCart = multer({
    storage:storageCart,
});
app.post("/cart", uploadCart.array("image"), createCart);
app.get("/cartdetails", getProductByUserId);
app.get("/summary", cartSummary);


mongoose.connect(process.env.DB_URL).then(() => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
        console.log("server running at port:" + process.env.PORT);
    });
}).catch(() => {
    console.log("database connection error");
});
const PORT = process.env.PORT || 1217;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
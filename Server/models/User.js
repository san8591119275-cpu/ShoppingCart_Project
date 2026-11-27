import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
    },
    lastName: {
        type: String,
        require: true,
        min: 2,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    confirmPassword: {
        type: String,
        require: true,
        min:5,
    },
    profilePic: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
},
    {timestamps:true}
);
const userModel = mongoose.model("user", userSchema);
export default userModel;
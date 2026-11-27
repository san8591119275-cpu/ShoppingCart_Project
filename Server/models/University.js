import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
         require: true,
    },
},
    {timestamps:true});
const universityModel = mongoose.model("university", universitySchema);
export default universityModel;
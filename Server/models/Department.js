import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "university",
        require: true,
    },
},
    { timestamps: true }
);
const departmentModel = mongoose.model("department", departmentSchema);
export default departmentModel;
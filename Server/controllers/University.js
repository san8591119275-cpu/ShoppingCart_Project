import universityModel from "../models/University.js"

export const CreateUniversity = async (req, res) => {
    try {
        const uniData = await universityModel.create({
            name: req.body.name,
            image: req?.file?.filename,
        });
        if (uniData) res.status(201).send({ message: "University created" })
        else res.status(404).send({ message: "unable to create university" })
    }
    catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const UpdateUniversity = async (req, res) => {
    try {
        const uniData = await universityModel.findByIdAndUpdate(
            {_id:req.body.id},
            {
            name: req.body.name,
            image: req?.file?.filename,
        });
        if (uniData) res.status(200).send({ message: "University updated" })
        else res.status(404).send({ message: "unable to update university" })
    }
    catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const DeleteUniversity = async (req, res) => {
    try {
        const uniData = await universityModel.deleteOne(
             {_id:req.body.id},
            {
            name: req.body.name,
            image: req?.file?.filename,
        });
        if (uniData.deletedCount==1) res.status(200).send({ message: "University deleted" })
        else res.status(404).send({ message: "unable to delete university" })
    }
    catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const getUniversities = async (req, res) => {
    try {
        const uniData = await universityModel.find();
        res.status(200).send({ uniData }); 
    }
    catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
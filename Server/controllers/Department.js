import departmentModel from "../models/Department.js";

export const createDepartment = async (req, res) => {
    try {
        const depData = await departmentModel.create({
            name: req.body.name,
            image: req?.file?.filename,
            university: req.body.universityId,
        });
        if (depData) res.status(201).send({ message: "Department created" })
        else res.status(404).send({ message: "unable to create department" })
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const updateDepartment = async (req, res) => {
    try {
        const depData = await departmentModel.findByIdAndUpdate(
        {_id:req.body.id},
            {
            name: req.body.name,
            image: req?.file?.filename,
            university: req.body.universityId,
        });
        if (depData) res.status(200).send({ message: "Department updated" })
        else res.status(404).send({ message: "unable to update department" })
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const deleteDepartment = async (req, res) => {
    try {
        const depData = await departmentModel.deleteOne(
        {_id:req.body.id},
        );
        if (depData.deletedCount==1) res.status(200).send({ message: "Department deleted" })
        else res.status(404).send({ message: "unable to delete department" })
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
export const getDepartmentsByUniversityId = async (req, res) => {
    try {
        const depData = await departmentModel.find({
            university:req.query.universityId,
        }).populate("university");
        res.status(200).send({ depData });
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
}

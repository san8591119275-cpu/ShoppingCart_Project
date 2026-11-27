import userModel from "../models/User.js";



  
export const register = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      res.status(409).send({ message: "user already created with this email" });
      return user;
    }
    let userInfo = await userModel.create({
      ...req.body,
      profilePic: req?.file?.name,
    });
    if (userInfo)
      res.status(201).send({ message: "User successfully register" });
    else res.status(404).send({ message: "User not register" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const login = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email, password: req.body.password });
        if (user) res.status(200).send({ id: user._id, role: user.role })
        else res.status(404).send({ message: "wrong user/pwd" });
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
};
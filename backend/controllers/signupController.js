const bcrypt = require("bcrypt");

const userModel = require("../models/userModel.js");

const signupPost = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
    };
    const modelResponse = await userModel.userModelSignup(user);
    if (modelResponse === null)
      return res.status(500).json({ msg: "postgres error" });
    else {
      return res.status(201).json({ msg: "created user successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = signupPost;

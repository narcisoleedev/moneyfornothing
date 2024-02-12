require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel.js");

const loginPost = async (req, res) => {
  try {
    const user = { username: req.body.username, password: req.body.password };
    const modelResponse = await userModel.userModelLogin(user);
    if (modelResponse === null)
      return res.status("500").json({ msg: "postgres error" });
    else {
      if (modelResponse.rows.length == 0)
        return res.status(401).json({ msg: "no users found" });
      bcrypt.compare(
        user.password,
        modelResponse.rows[0].password,
        (errCRY, responseCRY) => {
          if (!errCRY) {
            if (responseCRY) {
              const token = jwt.sign(
                { user: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" },
              );
              return res.status(200).json({ token: token });
            } else {
              return res.status(401).json({ msg: "wrong password" });
            }
          }
        },
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = loginPost;

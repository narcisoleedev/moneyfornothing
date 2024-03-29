require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel.js");

const loginPost = async(req, res) => {
  try {
    const user = { email: req.body.email, password: req.body.password };
    const modelResponse = await userModel.userModelLogin(user);
    if (modelResponse === null)
      return res.status(500).json({ msg: "postgres error" });
    else {
      if (modelResponse.rows.length == 0)
        return res.status(404).json({ msg: "user not found" });
      bcrypt.compare(
        user.password,
        modelResponse.rows[0].password,
        (errCRY, responseCRY) => {
          if (!errCRY) {
            if (responseCRY) {
              const token = jwt.sign(
                { email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" },
              );
              res.cookie('jwt-cookie', token, {
                signed: true,
                path: ['/home', '/expenses', '/incomes'],
                maxAge: 36000000,
                //secure: true,
                httpOnly: true
              })
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

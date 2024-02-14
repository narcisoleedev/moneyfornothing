require("dotenv").config();

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ msg: "not allowed (no header)" });
  const token = authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ msg: "not allowed (no token)" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ msg: "not allowed (fraudulent token)" });
    }
    console.log("allowed!");
    req.user = user;
    next();
  });
}

module.exports = auth;

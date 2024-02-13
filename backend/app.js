require("dotenv").config();

const Express = require("express");
const app = Express();

const Cors = require("cors");
app.use(Cors());

const bp = require("body-parser");
app.use(bp.json());

const authMiddleware = require("./middlewares/authMiddleware.js");

const port = process.env.PORT || 8000;

//Routes
const loginRoute = require("./routes/loginRoute.js");
const signupRoute = require("./routes/signupRoute.js");

app.use("/login", loginRoute);

app.use("/signup", signupRoute);

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
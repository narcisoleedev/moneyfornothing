require("dotenv").config();

const Express = require("express");
const app = Express();

const https = require("https");
const fs = require("fs");

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

const expensesRoute = require("./routes/expensesRoute.js");

app.use("/expenses", authMiddleware, expensesRoute);

const homeRoute = require("./routes/homeRoute.js");

app.use("/home", authMiddleware, homeRoute);

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/SSL/ssl.key"),
      cert: fs.readFileSync(__dirname + "/SSL/m4n.crt"),
    },
    app,
  )
  .listen(port, () => {
    console.log(`app running on port ${port}...`);
  });

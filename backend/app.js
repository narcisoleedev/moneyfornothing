require("dotenv").config();
const credentials = require("./config/.credentials.development.json");

const Express = require("express");
const app = Express();

const https = require("https");
const fs = require("fs");

const Cors = require("cors");
app.use(Cors());

const bp = require("body-parser");
app.use(bp.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser(credentials.cookiesSecret));

const authMiddleware = require("./middlewares/authMiddleware.js");

const port = process.env.PORT || 8000;

//Routes
const loginRoute = require("./routes/loginRoute.js");
const signupRoute = require("./routes/signupRoute.js");

app.get('/', (req, res)=>{
  res.redirect("/login")
})

app.use("/login", loginRoute);

app.use("/signup", signupRoute);

const expensesRoute = require("./routes/expensesRoute.js");

app.use("/expenses", authMiddleware, expensesRoute);

const incomesRoute = require("./routes/incomesRoute.js");

app.use("/incomes", authMiddleware, incomesRoute);


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

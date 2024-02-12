const Express = require("express");
const router = Express.Router();
const loginPost = require("../controllers/loginController.js");

router.route("/").post(loginPost);

module.exports = router;

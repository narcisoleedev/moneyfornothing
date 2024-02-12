const Express = require("express");
const router = Express.Router();
const signupPost = require("../controllers/signupController.js");

router.route("/").post(signupPost);

module.exports = router;

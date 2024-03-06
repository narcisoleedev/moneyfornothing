const Express = require("express");
const router = Express.Router();
const homeController = require("../controllers/homeController.js");

router.route("/").get(homeController);

module.exports = router;

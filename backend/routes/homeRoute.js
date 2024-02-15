const Express = require("express");
const router = Express();
const homeController = require("../controllers/homeController.js");

router.route("/").get(homeController);

module.exports = router;

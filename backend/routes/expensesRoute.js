const Express = require("express");
const router = Express();
const expensesController = require("../controllers/expensesController.js");

router.route("/").get(expensesController.expansesGet);
router.route("/").post(expensesController.expensesPost);

module.exports = router;

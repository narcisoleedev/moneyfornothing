const Express = require("express");
const router = Express.Router();
const expensesController = require("../controllers/expensesController.js")

router.route("/").get(expensesController.expensesGet);
router.route("/").post(expensesController.expensesPost);

module.exports = router;

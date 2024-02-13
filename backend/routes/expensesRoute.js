const Express = require('express');
const router = Express();
const expensesPost = require('../controllers/expensesController.js')

router.route("/").post(expensesPost);

module.exports = router;
const Express = require('express');
const router = Express.Router();
const incomesController = require('../controllers/incomesController.js');

router.route("/").get(incomesController.incomesGet);
router.route("/").post(incomesController.incomesPost);

module.exports = router;
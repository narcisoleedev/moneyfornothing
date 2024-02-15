const homeModel = require("../models/homeModel.js");

const homeController = async (req, res) => {
  try {
    console.log(1);
    const donutChartResponse = await homeModel.donutChart(req.user.email);
    if (donutChartResponse === null) {
      return res.status(500).json({ msg: "postgres error" });
    } else {
      return res.status(200).json(donutChartResponse);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = homeController;

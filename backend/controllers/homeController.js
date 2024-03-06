const homeModel = require("../models/homeModel.js");

const homeController = async (req, res) => {
  try {
    const donutChartResponse = await homeModel.donutChart(req.user.email);
    const averageExpensesResponse = await homeModel.averageExpenses(
      req.user.email,
    );
    if ((donutChartResponse || averageExpensesResponse) === null) {
      return res.status(500).json({ msg: "postgres error" });
    } else {
      return res.status(200).json({
        donutchart: donutChartResponse,
        averageExpenses: averageExpensesResponse,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = homeController;

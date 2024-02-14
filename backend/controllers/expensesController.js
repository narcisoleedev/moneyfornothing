const expensesModel = require("../models/expensesModel");

const expensesPost = (req, res) => {
  try {
    const expenses = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      value: req.body.value,
      date: req.body.date,
      userEmail: req.user.email,
    };
    if (expenses["date"] == null) {
      const dateRaw = new Date();
      expenses["date"] = dateRaw.toISOString().replace("T", " ").slice(0, -1);
    }
    const modelResponse = expensesModel.expensesModelPost(expenses);
    if (modelResponse === null)
      return res.status(500).json({ msg: "postgres error" });
    else {
      return res.status(200).json({ msg: "expenses sent successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = expensesPost;

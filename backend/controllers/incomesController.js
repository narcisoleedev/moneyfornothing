const incomesModel = require('../models/incomesModel');

const incomesGet = async(req, res)=>{
    try{
      const modelResponse = await incomesModel.incomesModelGet(req.user.email);
      if(modelResponse===null) return res.status(500).json({msg: 'postgres error'});
      else{
        return res.status(200).json({[req.user.email]: modelResponse});
      }
    }
    catch(err){
      console.log(err);
    }
  } 
  
const incomesPost = async(req, res) =>{
    try{
        const incomes = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            value: req.body.value,
            liquidity: req.body.liquidity,
            frequency: req.body.frequency,
            startDate: req.body.date,
            userEmail: req.user.email
        }
        if(incomes['incomeStartDate']==null){
            const dateRaw = new Date();
            incomes["startDate"] = dateRaw.toISOString().replace("T", " ").slice(0, -1);
        }
        const modelResponse = await incomesModel.incomesModelPost(incomes);
        if (modelResponse === null)
            return res.status(500).json({ msg: "postgres error" });
        else {
            return res.status(200).json({ msg: "incomes sent successfully" });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { incomesGet, incomesPost }
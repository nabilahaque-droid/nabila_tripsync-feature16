const CurrencyRate = require("../models/CurrencyRate");
const fetchCurrencyRate = require("../services/currencyService");

exports.convertCurrency = async (req, res) => {
  try {
    const { base, target, amount } = req.query;

    if (!base || !target || !amount) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const rate = await fetchCurrencyRate(base, target);
    const convertedAmount = rate * Number(amount);

      //await CurrencyRate.create({
        //base,
        //target,
        //rate
      //});

    res.json({
      base,
      target,
      amount,
      convertedAmount
    });
  } catch (error) {
    res.status(500).json({ message: "Currency conversion failed" });
  }
};

class CalculatorController {
  static lumpSum(req, res, next) {
    try {
      const {investmentFund, period, annualReturn} = req.body;
      const year = +period / 12;
      let returnTotal = 0;

      for (let i = 0; i < year; i++) {
        if (i === 0) returnTotal += +investmentFund + (+investmentFund * (+annualReturn / 100));
        else returnTotal = returnTotal + (returnTotal * (+annualReturn / 100));
      }

      res.status(200).send({returnTotal});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CalculatorController;
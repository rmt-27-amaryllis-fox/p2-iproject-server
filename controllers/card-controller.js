const downloadingRandomSixCardData = require('../coba_kartu/sekali_jalan_langsung_aja')
const { CardDatabase } = require('../models')

class CardController {
  static async fetchingCards(req, res, next) {
    try {
      let cardList = await downloadingRandomSixCardData()

      console.log(cardList, `<<< ini masok dari method nya ya`)

      res.status(200).json({ cardList })

    } catch (error) {
      next(error)
    }
  }

  static async addCardToDb(req, res, next) {
    try {

    } catch (error) {

    }
  }
}


module.exports = CardController
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

  static async addCardToDbFromProfile(req, res, next) {
    try {
      let UserId = req.userLogged.id
      let cardList = await downloadingRandomSixCardData()
      console.log(cardList)
      let userCardGain = [cardList[0], cardList[1], cardList[2]]
      console.log(userCardGain, `<< ini yg dah splce 3`)

      userCardGain.forEach((item) => {
        let bodyCardToAdd = {
          cardName: item.name,
          cardType: item.type,
          imageUrl: item.image_url,
          imageUrlShort: item.image_url_small,
          UserId: UserId
          // UserId: 1
        }
        console.log(item.name)
        console.log(bodyCardToAdd, ` << ini per elemen di foreach`)
        const fillingCardToDb = CardDatabase.create(bodyCardToAdd)
        // console.log(`masokin dah itu kartu ${bodyCardToAdd.cardName} `)
      })

      res.status(201).json({ message: `Sukses masukin kartu ke db ` })

    } catch (error) {
      console.log(error)
      next(error)

    }
  }

  static async addCardToDbFromButtonAddToDbClientNya(req, res, next) {
    try {
      // let UserId = req.userLogged.id
      // let cardList = await downloadingRandomSixCardData()
      let userCardGain
      // console.log(cardList)
      // let userCardGain = [cardList[0], cardList[1], cardList[2]]
      console.log(userCardGain, `<< ini yg dah splce 3`)

      userCardGain.forEach((item) => {
        let bodyCardToAdd = {
          cardName: item.name,
          cardType: item.type,
          imageUrl: item.image_url,
          imageUrlShort: item.image_url_small,
          // UserId: UserId
          // UserId: 1
        }
        console.log(item.name)
        console.log(bodyCardToAdd, ` << ini per elemen di foreach`)
        // const fillingCardToDb = CardDatabase.create(bodyCardToAdd)
        // console.log(`masokin dah itu kartu ${bodyCardToAdd.cardName} `)
      })

      res.status(201).json({ message: `Sukses masukin kartu ke db ` })

    } catch (error) {
      console.log(error)
      // next(error)

    }
  }


}

// CardController.addCardToDbFromProfile()
module.exports = CardController
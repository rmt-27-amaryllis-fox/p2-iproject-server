const downloadingRandomSixCardData = require('../coba_kartu/sekali_jalan_langsung_aja')
const { CardDatabase, UserProfile } = require('../models')

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

  static async addRedeemCardMethod(req, res, next) {
    try {
      let UserId = req.userLogged.id
      let cardList = await downloadingRandomSixCardData()
      console.log(cardList)
      let userCardGain = [cardList[0], cardList[1], cardList[2]]
      console.log(userCardGain, `<< ini yg dah splce 3`)
      let spellcardbody = 0
      let trapcardbody = 0
      let monstercardbody = 0

      userCardGain.forEach((item) => {
        if (item.type === 'Spell Card') {
          spellcardbody += 1
        }
        if (item.type === 'Trap Card') {
          trapcardbody += 1
        }
        if (item.type.includes('Monster')) {
          monstercardbody += 1
        }

        let bodyCardToAdd = {
          cardName: item.name,
          cardType: item.type,
          imageUrl: item.image_url,
          imageUrlShort: item.image_url_small,
          UserId: UserId
          // UserId: 1
        }
        console.log(item.name, '<< nama')
        console.log(item.type, '<< tipe')

        console.log(bodyCardToAdd, ` << ini per elemen di foreach`)
        const fillingCardToDb = CardDatabase.create(bodyCardToAdd)
        // console.log(`masokin dah itu kartu ${bodyCardToAdd.cardName} `)\
      })
      console.log(`Total card : 
      
        Spell : ${spellcardbody}
        Trap : ${trapcardbody}
        Monster : ${monstercardbody}`)
      // updating

      // Model.increment(
      //   { seq: +5 },
      //   { where: { id: 4 } }
      // );

      let addingStatsCardToUserProfile = await UserProfile.increment({
        'totalSpellCard': spellcardbody,
        'totalTrapCard': trapcardbody,
        'totalMonsterCard': monstercardbody,
      },
        { where: { UserId } }
      );


      // const updatingProfile = UserProfile.update({ where: UserId })


      res.status(201).json({ message: `Sukses masukin kartu ke db ` })


    } catch (error) {
      console.log(error)
      next(error)

    }
  }

  static async addCardAfterGameMethod(req, res, next) {
    try {
      let UserId = req.userLogged.id
      // let cardList = await downloadingRandomSixCardData()
      let {
        pointAI,
        pointYou
      } = req.body

      console.log(`body => ai : ${pointAI} | you : ${pointYou} `)

      let totalLose
      let totalWin

      if (pointAI > pointYou) {
        totalLose = 1
        totalWin = 0
      }
      else if (pointYou > pointAI) {
        totalWin = 1
        totalLose = 0
      }
      else if (pointYou === pointAI) {
        totalWin = 0
        totalLose = 0
      }

      let userCardGain = req.body.cardList


      let spellcardbody = 0
      let trapcardbody = 0
      let monstercardbody = 0

      userCardGain.forEach((item) => {
        if (item.type === 'Spell Card') {
          spellcardbody += 1
        }
        if (item.type === 'Trap Card') {
          trapcardbody += 1
        }
        if (item.type.includes('Monster')) {
          monstercardbody += 1
        }
      })

      console.log(`total mau masok ke db =>  win : ${totalWin} | lose : ${totalLose}`)
      // console.log(cardList)
      // let userCardGain = [cardList[0], cardList[1], cardList[2]]
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
        console.log(item, `<< ini di foreach nya`)
        // console.log(bodyCardToAdd, ` << ini per elemen di foreach`)
        const fillingCardToDb = CardDatabase.create(bodyCardToAdd)
        // console.log(`masokin dah itu kartu ${bodyCardToAdd.cardName} `)
      })


      let addingStatsCardToUserProfile = await UserProfile.increment({
        'totalSpellCard': spellcardbody,
        'totalTrapCard': trapcardbody,
        'totalMonsterCard': monstercardbody,
        'totalWin': totalWin,
        'totalLose': totalLose
      },


        { where: { UserId } }
      );


      res.status(201).json({ message: `Success saving cards & stats` })

    } catch (error) {
      console.log(error)
      // next(error)

    }
  }


}

// CardController.addCardToDbFromProfile()
module.exports = CardController
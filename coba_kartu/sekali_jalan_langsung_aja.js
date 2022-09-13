const axios = require('axios')


async function downloadingRandomSixCardData() {
  try {
    const endpoints = [
      'https://db.ygoprodeck.com/api/v7/randomcard.php',
      'https://db.ygoprodeck.com/api/v7/randomcard.php',
      'https://db.ygoprodeck.com/api/v7/randomcard.php',
      'https://db.ygoprodeck.com/api/v7/randomcard.php',
      'https://db.ygoprodeck.com/api/v7/randomcard.php',
      'https://db.ygoprodeck.com/api/v7/randomcard.php'
    ];
    const trayOfRawRandomCardData = []

    let fetchingRawRandomCardData = await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))

    let savingRawRandomCardDataToJson = fetchingRawRandomCardData.map((card) => {
      trayOfRawRandomCardData.push(card.data)

      // const rawCardStringified = JSON.stringify(trayOfRawRandomCardData, null, 2);
      // console.log(trayOfRawRandomCardData)

      // fs.writeFileSync('./nampung_via_writefilesync/raw_all_card_random.json', rawCardStringified);
    })

    const mappedCardNImgUrl = trayOfRawRandomCardData.map((item) => {
      if (!item.atk) {
        item.atk = 0
      }
      return {
        name: item.name,
        type: item.type,
        atk: item.atk,
        image_url: item.card_images[0].image_url,
        image_url_small: item.card_images[0].image_url_small
      }
    })

    console.log(mappedCardNImgUrl)

  } catch (error) {
    console.log(error)
  }
}

// downloadingRandomSixCardData()

module.exports = downloadingRandomSixCardData
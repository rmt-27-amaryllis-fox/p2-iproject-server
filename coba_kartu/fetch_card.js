const axios = require('axios')
const fs = require('fs')


// https://stackoverflow.com/questions/58234734/write-a-file-into-specific-folder-in-node-js

function initializeFolderSimpan() {
  const exists = fs.existsSync('./nampung_via_writefilesync');
  if (!exists) {
    return fs.mkdirSync('./nampung_via_writefilesync')
  }

}

// async function coba_download() {
//   try {
//     const endpoints = [
//       'https://db.ygoprodeck.com/api/v7/randomcard.php',
//       'https://db.ygoprodeck.com/api/v7/randomcard.php',
//       'https://db.ygoprodeck.com/api/v7/randomcard.php',
//       'https://db.ygoprodeck.com/api/v7/randomcard.php',
//       'https://db.ygoprodeck.com/api/v7/randomcard.php',
//       'https://db.ygoprodeck.com/api/v7/randomcard.php'
//     ];
//     const tampungan = []

//     initializeFolderSimpan()
//     await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
//       .then((data) => {
//         data.map((card) => {
//           // console.log(card.data);
//           // console.log(`-----------------------------`)
//           tampungan.push(card.data)

//           const originalNoteString = JSON.stringify(tampungan, null, 2);
//           console.log(tampungan)


//           fs.writeFileSync('./sandbox/nampung_via_writefilesync/coba_dulu_bos_tampung_dari_ygoprodb.json', originalNoteString);
//         })
//       });

//   } catch (error) {
//     console.log(error)
//   }
// }

// coba_download()

// module.exports = coba_download


// refactoring to readable async await :

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

    initializeFolderSimpan()
    let fetchingRawRandomCardData = await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))

    let savingRawRandomCardDataToJson = fetchingRawRandomCardData.map((card) => {
      trayOfRawRandomCardData.push(card.data)

      const rawCardStringified = JSON.stringify(trayOfRawRandomCardData, null, 2);
      console.log(trayOfRawRandomCardData)

      fs.writeFileSync('./nampung_via_writefilesync/raw_all_card_random.json', rawCardStringified);
    })

  } catch (error) {
    console.log(error)
  }
}

// downloadingRandomSixCardData()

module.exports = downloadingRandomSixCardData
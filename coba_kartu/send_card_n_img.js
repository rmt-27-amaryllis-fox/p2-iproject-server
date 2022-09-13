const axios = require('axios')
const fs = require('fs')
const downloadingRandomSixCardData = require('./fetch_card')

// const fetchedCard = require()

// downloadingRandomSixCardData()

const fetchedCard = require('../nampung_via_writefilesync/raw_all_card_random.json')

const mappedCardNImgUrl = fetchedCard.map((item) => {
  return {
    name: item.name,
    type: item.type,
    atk: item.atk,
    image_url: item.card_images[0].image_url,
    image_url_small: item.card_images[0].image_url_small
  }
})

console.log(mappedCardNImgUrl)
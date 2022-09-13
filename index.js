if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const route = require('./routes/router')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(route)

app.listen(port, () => {
  console.log(`app listen on port ${port}`)
})

module.exports = app
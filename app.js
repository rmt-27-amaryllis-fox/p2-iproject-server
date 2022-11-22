if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

const express = require('express')
const app = express()

const cors = require('cors')
const errorHandler = require('./middleware/errorhandler')
const port = process.env.PORT || 3000
const routes = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listen on port ${port}`)
})

module.exports = app
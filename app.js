const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const ProductController = require('./controller/productController')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', ProductController.showPlan)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
if (process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const ProductController = require('./controller/productController')
const AuthController = require('./controller/authController')
const errorHandler = require('./helper/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/register', AuthController.register)
app.post('/login', AuthController.login)
app.get('/plan', ProductController.showPlan)


app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
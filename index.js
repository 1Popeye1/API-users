const express = require('express')
const {sequelize} = require('./models')
const app = express()

const PORT = 3000

app.get('/', async (req, res) => {
  //res.send(sequelize)
  res.send(await sequelize.models.User.findAll())
})

app.listen(PORT, () => {
     console.log(`Example app listening at http://localhost:${PORT}`)
})
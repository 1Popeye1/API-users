const express = require('express')
const {sequelize} = require('./models')
const app = express()

const PORT = 3000

app.get('/', async (req, res) => {
  //res.send(sequelize)
  res.send(await sequelize.models.User.findAll())
})

app.get('/:id', async (req, res) => {
  const userId = req.params.id
  const user = await sequelize.models.User.findOne({ where: {id: userId} })
  res.send(user)
})

app.listen(PORT, () => {
     console.log(`Example app listening at http://localhost:${PORT}`)
})
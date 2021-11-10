const express = require('express')
const {sequelize} = require('./models')
const { body, validationResult } = require('express-validator');

const containsLowercase = require('./validators/containsLowercase');
const containsUppercase = require('./validators/containsUppercase');
const containsSpecialCharacter = require('./validators/containsSpecialCharacter');
const containsNumber =  require('./validators/containsNumber');

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/', async (req, res) => {
    //res.send(sequelize)
    res.send(await sequelize.models.User.findAll())
})

app.delete('/:id', async (req, res) => {
    const userId = req.params.id
    const deleted = await sequelize.models.User.destroy({where: {id: userId}})
    if (!deleted)
        res.status(404).end()
    res.status(204).end()
})

app.get('/:id', async (req, res) => {
  const userId = req.params.id
  const user = await sequelize.models.User.findOne({ where: {id: userId} })
  res.send(user)
})

app.put('/:id', body('email').isEmail(), body('password').custom((value, {ruq}) => {
  if (value.length < 8)
    throw new Error('Minimum length is 8')
  const regexValidators = [containsLowercase, containsUppercase, containsNumber, containsSpecialCharacter]
  if (regexValidators.some(regexValidator => {
    return !regexValidator(value)})) {
    throw new Error('Failed validation')
  }
  return true
}),  async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(errors)
  }

//  if (email === undefined || password === undefined)
//    return res.status(400).send({error: 'There was an error with the request'})

  const userId = req.params.id
  let user = await sequelize.models.User.findOne({ where: {id: userId} })
  user.email = email
  user.password = password
  await user.save()
  res.send(200)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

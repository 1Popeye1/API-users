const express = require('express')
const {sequelize} = require('./models')
const app = express()

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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

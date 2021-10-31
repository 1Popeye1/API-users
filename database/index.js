const {Sequalize} = require('sequelize')

const sequalize = new Sequalize('users', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,  {
  dialect: 'mysql',
  dialectOptions: {}
})

export default sequalize
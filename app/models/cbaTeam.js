const { sequelize } = require('../../core/db')
const {
  Sequelize, Model
} = require('sequelize')

class CbaTeam extends Model { }

CbaTeam.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  team_id: Sequelize.STRING,
  name: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'cbateam'
  })

module.exports = {
  CbaTeam
}
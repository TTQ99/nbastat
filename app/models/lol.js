const moment = require('moment')

const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class LoL extends Model { }

LoL.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status_id: Sequelize.STRING,
  match_time: Sequelize.DATE,
  match_id: Sequelize.STRING,
  away_score: Sequelize.STRING,
  home_score: Sequelize.STRING,
  away: Sequelize.STRING,
  home: Sequelize.STRING,
  tournament_id: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'lol'
})

module.exports = LoL
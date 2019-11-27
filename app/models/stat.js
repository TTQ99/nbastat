const moment = require('moment')

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const template = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 队伍id
  team_id: Sequelize.INTEGER,
  team_name: Sequelize.STRING,

  

  gp: Sequelize.INTEGER,
  w: Sequelize.INTEGER,
  l: Sequelize.INTEGER,
  w_pct: Sequelize.FLOAT,
  min: Sequelize.FLOAT,
  fgm: Sequelize.FLOAT,
  fga: Sequelize.FLOAT,
  fg_pct: Sequelize.FLOAT,
  fg3m: Sequelize.FLOAT,
  fg3a: Sequelize.FLOAT,
  fg3_pct: Sequelize.FLOAT,
  ftm: Sequelize.FLOAT,
  fta: Sequelize.FLOAT,
  ft_pct: Sequelize.FLOAT,
  oreb: Sequelize.FLOAT,
  dreb: Sequelize.FLOAT,
  reb: Sequelize.FLOAT,
  ast: Sequelize.FLOAT,
  tov: Sequelize.FLOAT,
  stl: Sequelize.FLOAT,
  blk: Sequelize.FLOAT,
  blka: Sequelize.FLOAT,
  pf: Sequelize.FLOAT,
  pfd: Sequelize.FLOAT,
  pts: Sequelize.FLOAT,
  plus_minus: Sequelize.FLOAT,
  plus_minus_rank: Sequelize.INTEGER,
  cfid: Sequelize.INTEGER,
}

class Stat extends Model { }

Stat.init(template, {
  sequelize,
  tableName: 'total'
})

module.exports = {
  Stat
}
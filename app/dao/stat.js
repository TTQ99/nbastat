const { Stat } = require('../models/stat')
const { Sequelize, Op } = require('sequelize')

class StatDao {
  static async createStat (v) {
    const stat = new Stat()
    stat.team_id = 11
    stat.team_name = 'laker'
    stat.gp = 13
    stat.w = 10
    stat.l = 3

    stat.save()

  }
}

module.exports = {
  StatDao
}
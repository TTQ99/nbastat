const { CbaTeam } = require('../models/cbaTeam')


class CbaTeamDao {
  static async createStat (v) {
    const stat = new CbaTeam()
    stat.team_id = v.team_id
    stat.name = v.name
    stat.save()
  }

  static a () {

  }
}


// const { Stat } = require('../models/stat')
// const { Sequelize, Op } = require('sequelize')
let a1 = {}


module.exports = CbaTeamDao

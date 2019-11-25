const { CbaTeam } = require('../models/cbaTeam')


class CbaTeamDao {
  static async createStat (v) {
    const stat = new CbaTeam()
    stat.team_id = v.team_id
    stat.name = v.name
    stat.save()
  }

  static async getTeams() {
    const cbaTeam = new cbaTeam()
    const res = await cbaTeam.findAll({
      where:{
        name: '四川'
      }
    })
    console.log(res,11111111);
    
  }

  static a () {

  }
}


// const { Stat } = require('../models/stat')
// const { Sequelize, Op } = require('sequelize')
let a1 = {}


module.exports = CbaTeamDao

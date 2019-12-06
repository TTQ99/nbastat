const { Stat, template } = require('../models/stat')
const { Sequelize, Op } = require('sequelize')
console.log(template);


class StatDao {

  static async createStat (v) {
    console.log(v);
    let team = await Stat.findAll({
      where: {
        team_id: v.team_id
      }
    })
    if (team.length) return
    const stat = new Stat()

    for (const key in template) {
      stat[key] = v[key]
    }
    stat.save()
  }

  static async getTeam (v) {
    console.log(v.id);
    let team = await Stat.findAll({
      where: {
        team_id: v.id
      }
    })
    // console.log(team);
    return team

  }
}

module.exports = {
  StatDao
}
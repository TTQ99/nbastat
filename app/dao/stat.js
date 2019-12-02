const { Stat, template } = require('../models/stat')
const { Sequelize, Op } = require('sequelize')
console.log(template);


class StatDao {


  // static async createStat (v) {
  //   const stat = new CbaTeam()
  //   stat.team_id = v.team_id
  //   stat.name = v.name
  //   stat.save()
  // }

  static async createStat (v) {
    console.log(v);

    const stat = new Stat()

    for (const key in template) {
      stat[key] = v[key]
    }
    stat.save()
  }
}

module.exports = {
  StatDao
}
const moment = require('moment')

const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')


class Stat extends Model {
  static async createGame (v) {

    let games = await Stat.findOne({
      where: {
        match_id: v.match_id
      }
    })

    if (!games) {
      let game = new Stat()
      game.status_id = v.status_id
      game.match_time = v.match_time
      game.match_id = v.match_id
      game.away_score = v.away_score
      game.home_score = v.home_score
      game.away = v.away
      game.home = v.home
      game.save()
    }

  }
}


class Game extends Model {
  static async createGame (v) {

    let games = await Game.findOne({
      where: {
        game_id: v.gameId
      }
    })

    if (!games) {
      let game = new Game()
      game.game_id = v.gameId
      game.date = v.startTimeUTC
      game.hteam_id = v.hTeam.teamId
      game.vteam_id = v.vTeam.teamId
      game.hscore = v.hTeam.score
      game.vscore = v.vTeam.score
      game.save()
    }

  }

  static async getGames (v) {


    let games = await Game.findAll({
      where: {
        date: {
          [Op.gt]: new Date(`${v.date} 00:00:00`),
          [Op.lt]: new Date(`${v.date} 23:59:00`)
        }
      }
    })
    return games
  }
}
Game.init({
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
}, {
  sequelize,
  tableName: 'game'
})
const template = {}
module.exports = {
  Stat,
  Game,
  template
}
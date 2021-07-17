const moment = require('moment')

const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')


class Stat extends Model {
  static async createGame (v) {

    let games = await Game.findOne({
      where: {
        match_id: v.match_id
      }
    })

    if (!games) {
      let game = new Game()
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

Stat.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status_id: {
    type: Sequelize.INTEGER,
    defaultValue: false
  },
  match_time: {
    type: Sequelize.DATE,
    defaultValue: false
  },
  match_id: {
    type: Sequelize.STRING,
  },
  away_score: {
    type: Sequelize.INTEGER,
    defaultValue: false
  },
  home_score: {
    type: Sequelize.INTEGER,
    defaultValue: false
  },
  away: {
    type: Sequelize.STRING,
    defaultValue: false
  },
  home: {
    type: Sequelize.STRING,
    defaultValue: false
  },
}, {
  sequelize,
  tableName: 'lpl'
})

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
  game_id: Sequelize.STRING,
  date: Sequelize.DATE,
  hteam_id: Sequelize.STRING,
  vteam_id: Sequelize.STRING,
  hscore: Sequelize.STRING,
  vscore: Sequelize.STRING,
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
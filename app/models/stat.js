const moment = require('moment')

const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

const template = {

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
  cfid: Sequelize.INTEGER,
}

class Stat extends Model { }

Stat.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ...template,
  last5: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  home: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  road: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
    sequelize,
    tableName: 'total'
  })

class Game extends Model {
  static async createGame (v) {
    console.log(v);

    let games = await Game.findOne({
      where: {
        game_id: v.gameId
      }
    })
    // console.log(games);

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
    console.log(v.date);

    console.log(new Date(`${v.date} 00:00:00`));

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

module.exports = {
  Stat,
  Game,
  template
}
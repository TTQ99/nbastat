const nba = require('nba.js').default;
const { StatDao } = require('../dao/stat')
const { Game } = require('../models/stat')
const moment = require('moment')

class Spider {
  static init () {
    console.log(123);
    this.getShedule()
  }

  static async updatePer () {
    let data = await this.getData()
    console.log(data);
  }
  static async createPer () {
    let data = await this.getData()
    for (const item of data) {
      await StatDao.createStat(item)
    }
  }

  static async getShedule () {
    let day = moment().format('YYYYMMDD')
    console.log(day);

    let list = await nba.data.scoreboard({
      date: day
    })
    let games = list.games || []
    if (!games.length) return
    for (const item of games) {
      console.log(item);
      console.log('11111111111111111111111');

      let game = Game.createGame(item)

    }

    // console.log(list);

  }
  static getData (params = {}) {


    // {
    // Season: '2019-20',
    // SeasonType: 'Regular+Season',
    // PerMode: 'Per100Possessions',
    // LastNGames: 0,
    // LeagueID: '00',
    // MeasureType: 'Base',
    // Month: '0',
    // OpponentTeamID: '0',
    // PORound: '0',
    // PaceAdjust: 'N',
    // PlusMinus: 'N',
    // Rank: 'N'
    // }
    return new Promise((re, rf) => {
      nba.stats.teamGeneralStats({
        ...params,
        Season: '2019-20',
      }).then(res => {
        re(res.LeagueDashTeamStats)
      }).catch(err => {
        rf(err)
      });
    })
  }
}


module.exports = {
  Spider
}
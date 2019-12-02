const nba = require('nba.js').default;
const { StatDao } = require('../dao/stat')
console.log(StatDao);


class Spider {
  static init () {
    console.log(123);
    // this.createPer()
  }

  static async updatePer () {
    let data = await this.getData()

    console.log(data);

  }
  static async createPer () {
    let data = await this.getData()
    console.log(data);
    for (const item of data) {
      console.log(item);
      StatDao.createStat(item)

    }
    console.log('suss');


    // StatDao.createStat(data.LeagueDashTeamStats[0])

    // await stat.createStat(data[0])

    // data.forEach(async item => {
    //   await stat.createStat(item)
    // });
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
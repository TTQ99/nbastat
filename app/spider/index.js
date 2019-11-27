const nba = require('nba.js').default;

class Spider {
  static init () {
    console.log(123);
    // this.updatePer()
  }

  static async updatePer () {
    let data = await this.getData()
    console.log(data);

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
        re(res)
      }).catch(err => {
        rf(err)
      });
    })
  }
}


module.exports = {
  Spider
}
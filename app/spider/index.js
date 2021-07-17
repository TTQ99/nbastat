const nba = require('nba.js').default;
const { StatDao } = require('../dao/stat')
const { Game, Stat } = require('../models/stat')
const moment = require('moment')
const axios = require('axios')

class Spider {
  static async init () {
    // this.getShedule()
    // console.log(b);
    // getFodds('20191211')
    // let a = await this.getFMatch('20191211')
    console.log(123);
    getLeague()
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

  static async getFMatch (date) {
    let zcdz = await getZcdz(date)
    let matchs_sp = await getMatchsSP(date)
    let matchs_rqsp = await getMatchsRSP(date)
    let obj = []
    let a = []
    for (const key in zcdz) {
      console.log(key);

      a.push(zcdz[key][29])
      let m = {
        num: key,
        fid: zcdz[key][0],
        l: zcdz[key][1],
        time: zcdz[key][3],
        ht: zcdz[key][4],
        vt: zcdz[key][5],
        hs: zcdz[key][6],
        vs: zcdz[key][7],
        fs: zcdz[key][12],
        o: zcdz[key][29],
        sp1: matchs_sp[key][0],
        sp2: matchs_sp[key][1],
        sp3: matchs_sp[key][2],
        rsp1: matchs_rqsp[key][0],
        rsp2: matchs_rqsp[key][1],
        rsp3: matchs_rqsp[key][2],
      }
      m.sp12 = computeSP(m.sp1, m.sp2)
      m.sp23 = computeSP(m.sp3, m.sp2)
      m.rsp12 = computeSP(m.rsp1, m.rsp2)
      m.rsp23 = computeSP(m.rsp3, m.rsp2)
      if (m.hs > m.vs) {
        m.res = 3
      } else if (m.hs < m.vs) {
        m.res = 0
      } else {
        m.res = 1
      }
      if (m.hs > m.vs - (m.o - 0)) {
        m.res1 = 3
      } else if (m.hs < m.vs - (m.o - 0)) {
        m.res1 = 0
      } else {
        m.res1 = 1
      }
      obj.push(m)
    }
    return obj
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

function getLeague () {
  axios.post('https://gm.1zplay.com/api/v1/getServerTime').then(res => {
    console.log(res.data)
    axios.post('https://gm.1zplay.com/api/v1/league/match/0',
      { "game_id": 1, "tournament_id": "nHFOtC5FWa8%3D", "sign": "a5388e9a9efc449803120c1b39749445", "time": "1626512839" }
    ).then(res1 => {
      console.log(res1.data);
      if (res1.data && res1.data.data.list) {
        console.log(res1.data)
        let v = res1.data.data.list[100]
        let game = {

        }
        game.status_id = v.status_id
        game.match_time = v.match_time
        game.match_id = v.match_id
        game.away_score = v.away_score
        game.home_score = v.home_score
        game.away = v.away.name_en || ''
        game.home = v.home.name_en || ''
        console.log(game)

        let a = Stat.createGame(game)
        res1.data.data.list.forEach(v => {

        });

      }
    })
  })
}


module.exports = {
  Spider
}


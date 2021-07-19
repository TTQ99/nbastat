const nba = require('nba.js').default;
const LoLDao = require('../dao/lol')
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
    // getLeague()
    LoLDao.getMatch()

  }

}


function getLeague () {
  axios.post('https://gm.1zplay.com/api/v1/getServerTime').then(res => {
    console.log(res.data)
    axios.post('https://gm.1zplay.com/api/v1/league/match/0',
      { "game_id": 1, "tournament_id": "Vpo530A1nH8%3D", "sign": "57935778b5a575eff09c288bac05dcd1", "time": "1626684796" }
    ).then(res1 => {
      if (res1.data && res1.data.data.list) {
        console.log(res1.data)
        res1.data.data.list.forEach(v => {

        });
        let v = res1.data.data.list[70]
        let game = {

        }
        game.status_id = v.status_id
        game.match_time = moment(v.match_time * 1000).format('YYYY-MM-DD HH:mm:ss')
        game.match_id = v.match_id
        game.away_score = v.away_score
        game.home_score = v.home_score
        game.away = v.away.name_en || ''
        game.home = v.home.name_en || ''
        game.tournament_id = 'lcs'
        // let a = LoLDao.createData(game)


      }
    })
  })
}


module.exports = {
  Spider
}


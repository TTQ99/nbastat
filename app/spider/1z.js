const axios = require('axios')
const moment = require('moment')
const LoLDao = require('../dao/lol')

class OneZ {
  static async init () {
    console.log('--------------------------')
    // getLeague('Vpo530A1nH8%3D%3D')

  }
  static async getServeTime () {
    let { data } = await axios.post('https://gm.1zplay.com/api/v1/getServerTime')
    if (data.code == '1') {
      return data.data.time
    } else {
      return ''
    }
  }
  static async getLeague (id) {
    let time = await this.getServeTime()
    let data = await axios.post('https://gm.1zplay.com/api/v1/league/match/0',
      { "game_id": 1, "tournament_id": id, "sign": "a5388e9a9efc449803120c1b39749445", "time": time }
    )
    console.log(data);
  }

  static async getGame (params) {
    let time = await this.getServeTime()
    let { data } = await axios.post('https://gm.1zplay.com/api/v1/match/info/0',
      { "game_id": 1, "tournament_id": params.id, "sign": "a5388e9a9efc449803120c1b39749445", "time": time }
    )
    console.log(data);
  }
}

function getLeague (id) {
  axios.post('https://gm.1zplay.com/api/v1/getServerTime').then(res => {
    console.log(res.data)
    axios.post('https://gm.1zplay.com/api/v1/league/match/0',
      { "game_id": 1, "tournament_id": "Vpo530A1nH8%3D", "sign": "57935778b5a575eff09c288bac05dcd1", "time": "1626684796" }
    ).then(res1 => {
      console.log(res1.data);
      if (res1.data && res1.data.data.list) {
        let v = res1.data.data.list[80]
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
        let a = LoLDao.createData(game)
        res1.data.data.list.forEach(v => {

        });

      }
    })
  })
}

module.exports = OneZ

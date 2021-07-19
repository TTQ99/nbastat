const LoL = require('../models/lol')

class LoLDao {
  static async createData (v) {
    console.log(v.match_id);
    console.log(999999999999999);
    let match = await LoL.findAll({
      where: {
        match_id: v.match_id
      }
    })
    console.log(1111111111);
    console.log(match);
    if (!match) {
      let game = new LoL()
      game.status_id = v.status_id
      game.match_time = v.match_time
      game.match_id = v.match_id
      game.away_score = v.away_score
      game.home_score = v.home_score
      game.away = v.away
      game.home = v.home
      game.league_id = v.tournament_id
      game.save()
    } else {
      match.league_id = v.tournament_id
      match.save
    }
  }
  static async getMatch (v) {
    console.log(9999);

    LoL.findOne(
      { where: { id: 99 } }
    ).then(res => {
      console.log(res, 111111111111);
    })
    // return await LoL.findOne({
    //   where: {
    //     id: 123
    //   }
    // })
  }
}

module.exports = LoLDao
const moment = require('moment')

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Stat extends Model {

}

Stat.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 队伍id
  team_id: Sequelize.INTEGER,
  team_name: Sequelize.STRING,
  gp: Sequelize.INTEGER,
  w: Sequelize.INTEGER,
  l: Sequelize.INTEGER,
  // w_pct: Sequelize.FLOAT,
  // min: Sequelize.FLOAT,
  // fgm: Sequelize.FLOAT,
  // fga: Sequelize.FLOAT,
  // fg_pct: Sequelize.FLOAT,
  // fg3m: Sequelize.FLOAT,
  // fg3a: Sequelize.FLOAT,
  // fg3_pct: Sequelize.FLOAT,
  // ftm: Sequelize.FLOAT,
  // fta: Sequelize.FLOAT,
  // ft_pct: Sequelize.FLOAT,
  // oreb: Sequelize.FLOAT,
  // dreb: Sequelize.FLOAT,
  // reb: Sequelize.FLOAT,
  // ast: Sequelize.FLOAT,
  // tov: Sequelize.FLOAT,
  // stl: Sequelize.FLOAT,
  // blk: Sequelize.FLOAT,
  // blka: Sequelize.FLOAT,
  // pf: Sequelize.FLOAT,
  // pfd: Sequelize.FLOAT,
  // pts: Sequelize.FLOAT,
  // plus_minus: Sequelize.FLOAT,
  // gp_rank: Sequelize.INTEGER,
  // w_rank: Sequelize.INTEGER,
  // l_rank: Sequelize.INTEGER,
  // w_pct_rank: Sequelize.INTEGER,
  // min_rank: Sequelize.INTEGER,
  // fgm_rank: Sequelize.INTEGER,
  // fga_rank: Sequelize.INTEGER,
  // fg_pct_rank: Sequelize.INTEGER,
  // fg3m_rank: Sequelize.INTEGER,
  // fg3a_rank: Sequelize.INTEGER,
  // fg3_pct_rank: Sequelize.INTEGER,
  // ftm_rank: Sequelize.INTEGER,
  // fta_rank: Sequelize.INTEGER,
  // ft_pct_rank: Sequelize.INTEGER,
  // oreb_rank: Sequelize.INTEGER,
  // dreb_rank: Sequelize.INTEGER,
  // reb_rank: Sequelize.INTEGER,
  // ast_rank: Sequelize.INTEGER,
  // tov_rank: Sequelize.INTEGER,
  // stl_rank: Sequelize.INTEGER,
  // blk_rank: Sequelize.INTEGER,
  // blka_rank: Sequelize.INTEGER,
  // pf_rank: Sequelize.INTEGER,
  // pfd_rank: Sequelize.INTEGER,
  // pts_rank: Sequelize.INTEGER,
  // plus_minus_rank: Sequelize.INTEGER,
  // cfid: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'pergame'
  })

module.exports = {
  Stat
}
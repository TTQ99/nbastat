
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const template = {

  // 队伍id
  num1: Sequelize.STRING,
  fid: Sequelize.STRING,
  l: Sequelize.STRING,
  time: Sequelize.STRING,
  ht: Sequelize.STRING,
  vt: Sequelize.STRING,
  hs: Sequelize.STRING,
  vs: Sequelize.STRING,
  fs: Sequelize.STRING,
  o: Sequelize.STRING,
  res: Sequelize.INTEGER,
  res1: Sequelize.INTEGER,
  sp1: Sequelize.STRING,
  sp2: Sequelize.STRING,
  sp3: Sequelize.STRING,
  sp12: Sequelize.STRING,
  sp23: Sequelize.STRING,
  rsp1: Sequelize.STRING,
  rsp2: Sequelize.STRING,
  rsp3: Sequelize.STRING,
  rsp12: Sequelize.STRING,
  rsp23: Sequelize.STRING,

}

class Football extends Model {
  static async createGame (v) {
    let a = await Football.findOne({
      where: {
        fid: v.fid
      }
    })

    if (!a) {
      let game = new Football()
      game.num = v.num
      game.fid = v.fid
      game.l = v.l
      game.time = v.time
      game.ht = v.ht
      game.vt = v.vt
      game.hs = v.hs
      game.vs = v.vs
      game.fs = v.fs
      game.o = v.o
      game.res = v.res
      game.res1 = v.res1
      game.sp1 = v.sp1
      game.sp2 = v.sp2
      game.sp3 = v.sp3
      game.sp12 = v.sp12
      game.sp23 = v.sp23
      game.rsp1 = v.rsp1
      game.rsp2 = v.rsp2
      game.rsp3 = v.rsp3
      game.rsp12 = v.rsp12
      game.rsp23 = v.rsp23
      game.save()
    } else {
      a.num = v.num
      a.fid = v.fid
      a.l = v.l
      a.time = v.time
      a.ht = v.ht
      a.vt = v.vt
      a.hs = v.hs
      a.vs = v.vs
      a.fs = v.fs
      a.o = v.o
      a.res = v.res
      a.res1 = v.res1
      a.sp1 = v.sp1
      a.sp2 = v.sp2
      a.sp3 = v.sp3
      a.sp12 = v.sp12
      a.sp23 = v.sp23
      a.rsp1 = v.rsp1
      a.rsp2 = v.rsp2
      a.rsp3 = v.rsp3
      a.rsp12 = v.rsp12
      a.rsp23 = v.rsp23
      a.save()
    }

    // let game = new Football()


  }
}

Football.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ...template,
}, {
  sequelize,
  tableName: 'football'
})

module.exports = {
  Football
}
const moment = require('moment')
const axios = require('axios')
const { Football } = require('../models/football')

class fSpider {
  static async init () {
    console.log('fSpider start');
    // let a = await this.getFMatch('20191210')
    // for (const key of a) {
    //   await Football.createGame(key)
    //   console.log(key.fid);
    // }
    // await Football.createGame(a[5])

    // console.log('ttq');
    // let date = moment('20190101')
    // let day = date.format('YYYYMMDD')
    // console.log(day);


  }


  static async getGames (date) {
    let list = await fSpider.getFMatch(date)
    for (const key of list) {
      await Football.createGame(key)
    }
  }

  static async  getFMatch (date) {
    let zcdz = await getZcdz(date)
    let matchs_sp = await getMatchsSP(date)
    let matchs_rqsp = await getMatchsRSP(date)
    let obj = []
    let a = []
    for (const key in zcdz) {
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


}


module.exports = {
  fSpider
}

function computeSP (val, val2) {
  val = val - 0
  val2 = val2 - 0
  let c = val * val2 / (val + val2)
  return c.toFixed(2) + ''
}

async function getMatchsSP (date) {
  let { data: fodds } = await axios.get(`https://mcache.iuliao.com/mcache/jcsp/${date}.js?_=1575534882`)
  eval(fodds.replace('new Array()', '{}'))
  return matchs_sp
}

async function getMatchsRSP (date) {
  let { data: rodds } = await axios.get(`https://mcache.iuliao.com/mcache/jcrqsp/${date}.js?_=1575451928`)
  eval(rodds.replace('new Array()', '{}'))
  return matchs_rqsp
}

async function getZcdz (date) {
  let { data: match } = await axios.get(`https://mcache.iuliao.com/mcache/livejcjs/${date}.js?_=1575534882`)
  eval(match.replace('new Array()', '{}'))
  return zcdz
}

async function forTime (day) {
  let flag = moment().isBefore(day)
  // if ()
  let day1 = moment(day).add(1, 'day').format('YYYYMMDD')
  fSpider.getGames(day)
  if (!flag) {
    console.log(`${day} end`);
    // forTime(day1)
  } else {
    console.log('all end');
  }
}

// forTime('20191211')
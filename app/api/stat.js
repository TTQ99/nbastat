const Router = require('koa-router')
const { StatDao } = require('../dao/stat');
const { Game } = require('../models/stat')

const nba = require('nba.js').default;
const axios = require('axios')




const router = new Router()

router.get('/stat/:id', async (ctx, next) => {
  const id = ctx.params.id
  console.log(ctx.params);

  // const a = await StatDao.createStat()
  const res = await StatDao.getTeam({ id })
  console.log(res);

  ctx.body = {
    list: res,
  }
})
router.get('/test/:name', async (ctx, next) => {
  const fn = ctx.params.name
  let data = await nba.stats[fn]()
  ctx.body = {
    fn: data,
  }
})

router.get('/test', async (ctx, next) => {
  let list = await nba.data.scoreboard({
    date: '20191203'
  })
  ctx.body = {
    fn: list,
  }
})

router.get('/s', async (ctx, next) => {
  await next()
  // let 
  let list = await Game.getGames({
    date: '20191204'
  })
  ctx.body = {
    fn: list,
  }
})

router.get('/you/:date', async (ctx, next) => {
  let date = ctx.params.date || '20191231'
  console.log(123111111111111);
  // matchs_sp
  let { data: fodds } = await axios.get(`https://mcache.iuliao.com/mcache/jcsp/${date}.js?_=1575534882`)
  // matchs_rqsp
  let { data: rodds } = await axios.get(`https://mcache.iuliao.com/mcache/jcrqsp/${date}.js?_=1575451928`)
  //zcdz
  let { data: match } = await axios.get(`https://mcache.iuliao.com/mcache/livejcjs/${date}.js?_=1575534882`)
  // .replace('new Array()','{}')
  eval(fodds.replace('new Array()', '{}'))
  eval(rodds.replace('new Array()', '{}'))
  eval(match.replace('new Array()', '{}'))

  let obj = []
  let a = []
  for (const key in zcdz) {
    a.push(zcdz[key][29])
    let m = {
      num: key,
      id: zcdz[key][0],
      l: zcdz[key][1],
      time: zcdz[key][3],
      ht: zcdz[key][4],
      vt: zcdz[key][5],
      hs: zcdz[key][6],
      vs: zcdz[key][7],
      fs: zcdz[key][12],
      o: zcdz[key][29],
      sp1: matchs_sp[key][0] - 0,
      sp2: matchs_sp[key][1] - 0,
      sp3: matchs_sp[key][2] - 0,
      rsp1: matchs_rqsp[key][0] - 0,
      rsp2: matchs_rqsp[key][1] - 0,
      rsp3: matchs_rqsp[key][2] - 0,
    }
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

  // ctx.body = " zcdz['191203001']"
  ctx.response.status = 200;
  ctx.body = {
    data: obj,
  }
})

module.exports = router
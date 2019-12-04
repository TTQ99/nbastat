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

router.get('/you', async (ctx, next) => {
  console.log(123111111111111);
  let data = await axios.get('https://mcache.iuliao.com/mcache/jcrqsp/20191203.js?_=1575451928')
  console.log(data);

  var zcdz = {};

  let obj = []
  let a = []
  for (const key in zcdz) {
    a.push(zcdz[key][29])
    obj.push({
      num: key,
      id: zcdz[key][0],
      l: zcdz[key][1],
      time: zcdz[key][3],
      ht: zcdz[key][4],
      vt: zcdz[key][5],
      hs: zcdz[key][6],
      vs: zcdz[key][7],
      fs: zcdz[key][12],
      o: zcdz[key][29]
    })
  }

  // ctx.body = " zcdz['191203001']"
  ctx.body = {
    arr: a,
    data: obj,
    res: data.data
  }
})

module.exports = router
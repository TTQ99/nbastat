const Router = require('koa-router')
const { StatDao } = require('../dao/stat');
const { Game } = require('../models/stat')

const nba = require('nba.js').default;




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

module.exports = router
const Router = require('koa-router')
const { StatDao } = require('../dao/stat');


const router = new Router()

router.get('/stat/:id', async (ctx, next) => {
  const id = ctx.request.param
  const a = await StatDao.createStat()
  ctx.body = {
    id: id,
  }
})

module.exports = router
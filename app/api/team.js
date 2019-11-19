const Router = require('koa-router')

const router = new Router()

router.get('/team/list', (ctx, next) => {
  ctx.body = 'team list'
})

router.get('/team/detail', (ctx, next) => {
  ctx.body = 'team detail'
})

module.exports = router

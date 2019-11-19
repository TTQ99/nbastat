const Router = require('koa-router')
// const 

const router = new Router()

router.get('/stat/:id', (ctx, next) => {
  // const id = ctx.request.param
  ctx.body = {
    id: ctx.params.id,
    head: ctx.header.ttq
  }
})

module.exports = router
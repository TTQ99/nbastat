const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')

const app = new Koa()

app.use(parser())
InitManager.initCore(app)

app.listen('3000', function () {
  console.log('server listen prot:3000');
})
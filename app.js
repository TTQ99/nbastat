const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')

const OneZ = require('./app/spider/1z.js')
const { Spider } = require('./app/spider/index')
const { fSpider } = require('./app/spider/football')
const cors = require('@koa/cors')
const static_ = require('koa-static')



OneZ.init()
Spider.init()

const app = new Koa()
app.use(cors());
app.use(static_(
  './'
))
app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen('8080', function () {
  console.log('server listen prot:8080');
})
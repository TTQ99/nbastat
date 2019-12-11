const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')

const { Spider } = require('./app/spider/index')
const { fSpider } = require('./app/spider/football')
const cors = require('@koa/cors')


Spider.init()
fSpider.init()

const app = new Koa()
app.use(cors());

app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen('3000', function () {
  console.log('server listen prot:3000');
})
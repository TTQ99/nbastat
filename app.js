const Koa = require('koa')
const InitManager = require('./core/init')

const app = new Koa()

InitManager.initCore(app)
// requireDirectory(module, './app/api', {
//   visit: (obj) => {
//     if (obj instanceof Router) {
//       app.use(obj.routes())
//     }
//   }
// })



app.listen('3000', function () {
  console.log('server listen prot:3000');
})
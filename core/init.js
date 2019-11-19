const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  // 初始化
  static initCore (app) {
    InitManager.app = app
    this.initLoadRouter()
  }
  
  // 加载路由
  static initLoadRouter () {
    const path = `${process.cwd()}/app/api`
    requireDirectory(module, path, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }
}

module.exports = InitManager

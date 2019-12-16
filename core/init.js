const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  // 初始化
  static initCore (app) {
    InitManager.app = app
    this.initLoadRouter()
    InitManager.loadConfig()

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
  // 初始化配置文件
  // static loadConfig (path = '') {
  //   const configPath = path || process.cwd() + '\\config\\config.js'
  //   const config = require(configPath)
  //   global.config = config // 赋值给全局变量
  // }
}

module.exports = InitManager

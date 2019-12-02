console.log(123);

const axios = require('axios')
const cheerio = require('cheerio')
// const cbaTeamDao = require('./app/dao/cbaTeam.js')
// });

const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  const data = await fn(ctx)
  // ctx.body = data
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);

});

app.listen(3000);

async function fn (ctx) {
  let a = {
    team_id: 123,
    name: 'huojianduo'
  }
  // let res = await cbaTeamDao.createStat(a)
  // console.log(res);
  console.log('loading page');

  let res = await axios.get('http://cbadata.sports.sohu.com/teams/team_tech/Te028/')
  console.log(res);
  let $ = cheerio.load(res.data)
  // let a1 = $('#select_team_2').children()
  return new Promise((res, rej) => {
    res(res.data)
  })
  // console.log(a1);
  // for (const key of a1) {
  //   // console.log(key);
  //   let name = cheerio.load(key).html()
  //   console.log(name);


  // }
  // a1.forEach(key => {
  //   let name = cheerio.load(key).html()
  //   console.log(name);

  // })


}
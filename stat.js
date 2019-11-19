
const nba = require('nba.js').default;
// nba.stats.allPlayers(function (err, res) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(res);
// });

const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  const data = await getData()
  ctx.body = data
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);

});


// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  // ctx.body = 'Hello World';

});

app.listen(3000);

function getData () {
  return new Promise((re, rf) => {
    nba.stats.teamGeneralStats({
      Season: '2019-20',
      // SeasonType: 'Regular+Season',
      // PerMode: 'Per100Possessions',
      // LastNGames: 0,
      // LeagueID: '00',
      // MeasureType: 'Base',
      // Month: '0',
      // OpponentTeamID: '0',
      // PORound: '0',
      // PaceAdjust: 'N',
      // PlusMinus: 'N',
      // Rank: 'N'
    }).then(res => {
      console.log(res);
      re(res)
    }).catch(err => {
      rf(err)
    });
  })

}
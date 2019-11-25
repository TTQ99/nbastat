console.log(123);

const axios = require('axios')
const cheerio = require('cheerio')
const _ = require('lodash')
const cbaTeamDao = require('./app/dao/cbaTeam.js')



// fn()

async function fn() {
  console.log('loading page');
  let res = await axios.get('http://cbadata.sports.sohu.com/teams/team_tech/Te028/')
  console.log('loading end');
  let $ = cheerio.load(res.data)
  let a1 = $('#select_team_2').children()
  _.forEach(a1, async function (item) {
    if (item.children[0]) {
      if (!!item.attribs.value && item.attribs.value !=0) {
        let team = {
          team_id: item.attribs.value,
          name: item.children[0].data
        }
        await cbaTeamDao.createStat(team)
      }
    }
  })


}

let teamUrl = 'http://cbadata.sports.sohu.com/compare/teams/2019/NTe013'

async function getStat(){
  console.log(321);
  // let res = await cbaTeamDao.getTeams()
  // console.log(res);
  
}

getStat()
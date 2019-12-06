 /**
 * 只适用与足球
 */
(function(window) {

  var Common = {};
  var Video  = {};
  var Caiguo = {};
  var SP     = {};

  /**
   * 获取视频链接(比赛完结返回集锦,否则返回直播)
   * @param int mid 赛事id
   * @param int state 状态
   * @param array infos 视频信息数据 一般是LiveVideo 可选
   * @return string
   */
  Video.getUrl = function(mid,state,infos){
      infos = infos || LiveVideo || {};
      var info = infos[mid];
      var url = '';
      if(!info){
          return url;
      }
      // 已完结 集锦 mytv letv pptv
      if(4 == state || 10 == state){
          // 自定义
          if(info['mytv'] && info['mytv']['videoslink']){
              url = info['mytv']['videoslink'];
          }else if(info['letv'] && info['letv']['videoslink']){
              // letv
              url = info['letv']['videoslink'];
          }else if(info['pptv'] && info['pptv']['videoslink']){
              // pptv
              url = info['pptv']['videoslink'];
          }
      }else{
          // 直播 mytv pptv letv
          if(info['mytv'] && info['mytv']['playlink']){
              url = info['mytv']['playlink'];
          }else if(info['pptv'] && info['pptv']['playlink']){
              url = info['pptv']['playlink'];
          }else if(info['letv'] && info['letv']['playlink']){
              url = info['letv']['playlink'];
          }
      }
      return url;
  };

  /**
   * 获取视频链接(比赛完结返回集锦,否则返回直播)
   * @param int mid 赛事id
   * @param int state 状态
   * @param array infos 视频信息数据 一般是LiveVideo 可选
   * @return string html格式a链接
   */
  Video.getUrlHtml = function(mid,state,infos){
      var html = '';
      var url = Video.getUrl(mid,state,infos);
      if(!url){
          return html;
      }

      // 已结束 集锦
      if(4 == state || 10 == state){
          html = '<a class="video-jijin video" title="集锦" target="_blank" href="' + url + '" >&nbsp;</a>';
      }else{
          // 直播
          html = '<a class="video-zhibo video" title="直播" target="_blank" href="' + url + '" >&nbsp;</a>';
      }
      return html;
  };

  /**
   * 根据类型获取$parent type 可选 or 'top'
   */
  var parentType = function (type) {
      var $parent;
      if('top' === type){
          $parent = $('#top');
      }else{
          $parent = $('#normal');
      }
      return $parent;
  };

  /**
   * 获取 进球声 的值
   * @param {Object} type 'top'为置顶 否则为普通
   */
  Common.getSound = function(type){
      var $parent = parentType(type);
      return $parent.find('select[name="sound"]').val();
  };

  /**
   * 获取 球队排名 的值
   * @param {Object} type 'top'为置顶 否则为普通
   */
  Common.isRanking = function(type) {
      var $parent = parentType(type);
      return $parent.find('input[name="ranking"]:checked').val();
  };

  /**
   * 获取 红牌 的值
   * @param {Object} type 'top'为置顶 否则为普通
   */
  Common.isRedCard= function(type) {
      var $parent = parentType(type);
      return $parent.find('input[name="redcard"]:checked').val();
  };

  /**
   * 获取 进球弹窗 的值
   * @param {Object} type 'top'为置顶 否则为普通
   */
  Common.isPopWindow = function(type) {
      var $parent = parentType(type);
      return $parent.find('input[name="popwindow"]:checked').val();
  };

  /**
   * 获取 彩果 的值
   * @param {Object} type 'top'为置顶 否则为普通
   * @param {Object} defaults 不存在时的默认值
   */
  Common.getCaiguo = function(type,defaults){
      var $parent = parentType(type);
      return $parent.find('select[name="caiguo"]').val() || defaults;
  };

  /**
   * 获取 sp下拉 的值
   * @param {Object} type 'top'为置顶 否则为普通
   * @param {Object} defaults 不存在时的默认值
   */
  Common.getSP = function(type,defaults){
      var $parent = parentType(type);
      return $parent.find('select[name="sp"]').val() || defaults;
  };

  /**
   * 获取 隐藏以完成比赛 的值
   * @param {Object} type 'top'为置顶 否则为普通
   */
  Common.isHideOverMatch = function(type) {
      var $parent = parentType(type);
      return $parent.find('input[name="hide-over-match"]:checked').val();
  };

  /**
   * 开关排行
   * @param {Object} type 'top'为置顶 否则为普通
   * @return {Jquery array object} 符合条件的jquery对象
   */
  Common.toggleRanking = function(type){
      var $result = parentType(type).find('td .ranking');
      if(Common.isRanking(type)){
          $result.show();
      }else{
          $result.hide();
      }
      return $result;
  };

  /**
   * 开关红牌
   * @param {Object} type 'top'为置顶 否则为普通
   * @return {Jquery array object} 符合条件的jquery对象
   */
  Common.toggleRedcard = function(type){
      var $result = parentType(type).find('td .red-card');
      if(Common.isRedCard(type)){
          $result.show();
      }else{
          $result.hide();
      }
      return $result;
  };

  /**
   * 开关红牌
   * @param {Object} type 'top'为置顶 否则为普通
   * @return {Jquery array object} 符合条件的jquery对象
   */
  Common.toggleOverMatch = function(type){
      var $result = parentType(type).find('tr.over');
      if(Common.isHideOverMatch(type)){
          $result.hide();
      }else{
          $result.show();
      }
      return $result;
  };

  /**
   * 经过计算的状态只剩下 1上,2中,3下,4完,5暂停(已开赛),13延期(未开赛),17未开始
   */
  Common.liveStateResult = function(state){
      var result = 17;
      switch(state){
          case 1: // 上
          case 2: // 中
          case 3: // 下
              result = state;
              break;
          case 4:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
              result = 4; // 完赛
              break;
          case 5:
          case 14:
              result = 5; // 中断 已开始比赛
              break;
          case 13:
          case 15:
              result = 13; // 延期 未开始比赛
              break;
          default:
              result = 17; // 未开始
      }
      return result;
  };

  /**
   * 根据状态获取状态字符
   */
  Common.liveStateStr = function(state){
       // 赛事状态数组
       // [0'', 1'上', 2'中', 3'下', 4'完', 5'断', 6'取(取消)', 7'加(1)', 8'加(2)', 9'加(3)',
       // 10'(加)完', 11'点', 12'全', 13'延', 14'斩', 15'待', 16'金(金球)', 17''];
      var liveStates = ['','上', '中', '下', '完', '断', '取', '完', '完',
                        '完', '完', '完', '全', '延', '斩', '待', '金', ''];
      return liveStates[state] || '未';
  };
  /**
   * 根据状态获取状态css 分别时live over pause ''
   */
  Common.liveStateCss = function(state){
      var css = '';
      switch(state){
          case 1:
          case 2:
          case 3:
              css = 'live';
              break;
          case 4:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
              css = 'over';
              break;
          case 5:
          case 13:
          case 14:
          case 15:
              css = 'pause';
              break;
          default:
              css = '';
      }
      return css;
  };

  /**
   * 半场比分转换为主客队半场数组
   * @param {string} half  半场比分 通常是'','-','2-3'
   * @param {string} splitstr  分隔符,可选 默认'-'
   * @return {array} [2,3]
   */
  Common.halfScoreToArray = function(half,splitstr){
      splitstr = splitstr || '-';
      var result = ['',''];
      if(!half || half === '-' || half === splitstr){
          return result;
      }
      var matchs = half.match(/(\d+)-(\d+)/);
      if(matchs){
          result[0] = +matchs[1];
          result[1] = +matchs[2];
      }
      return result;
  };

  /**
   * 小数点后补零
   * @param {float} num
   * @param {int} digits 位数
   */
  Common.toFixed = function(num,digits){
      num    = +num;
      digits = digits || 2;
      return Number.prototype.toFixed.call(num,digits);
  };

  /**
   * 指定mid 是置顶数据还是普通数据
   * @param {int} mid
   * @retrun {string} 'top' ,'normal'
   */
  Common.inWhichData = function(mid){
      if(-1 !== $.inArray(mid,Data.topData) ){
          return 'top';
      }else{
          return 'normal';
      }
  };

  /**
   * 获取首次末的个数
   * @param {String} type 类型
   * s:首赔 c:次赔 m:末配
   */
  Common.getShouCiMoCount = function(type){
      switch(type){
          case 's':
          case 'shou':
              type = 'odds-shoupei';
              break;
          case 'c':
          case 'ci':
              type = 'odds-cipei';
              break;
          case 'm':
          case 'mo':
              type = 'odds-mopei';
              break;
      }
      // 只计算 正在直播 和已经结束的比赛
      return $('.live td.sp .' + type + ',.over td.sp .' + type).length || 0;
  };

  /**
   * 获取天气css
   */
  Common._getWeather = function (index) {
      // ["", "晴天", "少云", "多云", "阴天", "小雨", "中到大雨", "雷阵雨", "雷暴", "小雪", "大雨", "晴天",
      // "晴间多云", "少云", "多云", "雨加雪", "", "", "晴间多云", "小雷雨", "小阵雨", "汽雾", "冻雾", "零星小雨",
      // "中雨", "小阵雪", "细雨", "阵雪", "风尘", "低空飘雪", "大阵雪", "中雪"]
      // 小雨 xiaoyu 晴 qing 大雨 dayu 阴 yin 晴阴(晴转阴) qingyin 晴雨(晴转雨) qingyu 雪 xue
      var css  = '';
      var text = '';
      switch(+index){
          case 1: case 2: case 11: case 13: case 14: case 18:
              css  = 'qing'; // 晴
              text = '晴';
              break;
          case 3: case 4: case 21: case 22: case 28:
              css  = 'yin'; // 阴
              text = '阴';
              break;
          case 5: case 24:
              css  = 'xiaoyu'; // 小雨
              text = '小雨';
              break;
          case 6: case 7: case 8: case 10:
              css  = 'dayu'; // 大雨
              text = '大雨';
              break;
          case 9: case 15: case 25: case 26: case 27: case 29: case 30: case 31:
              css  = 'xue'; // 雪
              text = '雪';
              break;
          case 12:
              css  = 'qingyin'; // 晴阴(晴转阴)
              text = '多云';
              break;
          case 19: case 20: case 23:
              css = 'qingyu'; // 晴雨(晴转雨)
              text = '晴转雨';
              break;
          default:
              css  = 'qing';
              text = '晴';
      }
      return {css:css,text:text};
  };
  /**
   * 天天样式
   */
  Common.getWeatherCss = function(index){
      return Common._getWeather(index)['css'];
  };
  /**
   * 天气文本描述
   */
  Common.getWeatherText = function(index){
      return Common._getWeather(index)['text'];
  };

  // 今天12:00
  var cache_date = new Date();
  cache_date.setHours(12);
  cache_date.setMinutes(0);
  cache_date.setSeconds(0);
  cache_date.setMilliseconds(0);
  var cache_timestamp = cache_date.getTime();
  /**
   * 通过时间戳返回一个可读的字符串
   * 今天12~明天12点为 today
   * 昨天12~今天12点为 yesterday
   * 昨天12之前为      history
   * 明天12之后为      future
   */
  Common.getDayDesc = function(mtime){
      var result = '';
      if(mtime >= cache_timestamp && mtime <= cache_timestamp + 86400000){
          result = 'today';
      }else if(mtime > cache_timestamp + 86400000){
          result = 'future';
      }else if(mtime > cache_timestamp - 86400000 && mtime < cache_timestamp){
          result = 'yesterday';
      }else{
          result = 'history';
      }
      return result;
  };


  // 缓存 此方法使用次数较多,故做缓存
  var cache_wdl = {};
  /**
   * 获取 彩果 胜平负
   * @param {Object} hscore  主得分
   * @param {Object} ascore  客得分
   * @param {Object} letball 主让球 默认为0即不让球
   * @return {int} 3,1,0
   */
  Caiguo.getWDL = function(hscore,ascore,letball){
      letball = letball || 0;
      hscore = hscore || 0;
      ascore = ascore || 0;
      var key = 'wdl' + hscore + ascore + letball;
      if(typeof cache_wdl[key] !== 'undefined'){
          return cache_wdl[key];
      }
      var result = 1;
      if(hscore + letball > ascore){
          result = 3;
      }else if (hscore + letball < ascore){
          result = 0;
      }
      cache_wdl[key] = result;
      return result;
  };

  /**
   * 获取 彩果 比分
   * @param {Object} hscore  主得分
   * @param {Object} ascore  客得分
   * @param {string} splitstr 分割
   * @return {string} 3-2
   */
  Caiguo.getScore = function(hscore,ascore,splitstr){
      splitstr = splitstr || ':';
      hscore = hscore || 0;
      ascore = ascore || 0;
      return hscore + splitstr + ascore;
  };

  /**
   * 获取 彩果 进球
   * @param {Object} hscore  主得分
   * @param {Object} ascore  客得分
   * @return {int} 4
   */
  Caiguo.getGoals = function(hscore,ascore){
      hscore = hscore || 0;
      ascore = ascore || 0;
      return hscore + ascore;
  };

  /**
   * 获取 彩果 半全
   * @param {Object} hhalf 主半场得分
   * @param {Object} ahalf 客半场得分
   * @param {Object} hscore 主总得分
   * @param {Object} ascore 客总得分
   * @return {string} 3/0
   */
  Caiguo.getBanQuan = function(hhalf,ahalf,hscore,ascore){
      return Caiguo.getWDL(hhalf,ahalf,0) + '/' + Caiguo.getWDL(hscore,ascore,0);
  };

  /**
   * 获取 彩果 上下 以总进球 3个为分界线 >=3上盘 进球数单数为单
   * @param {Object} hscore 主总得分
   * @param {Object} ascore 客总得分
   * @return {string} 上/单
   */
  Caiguo.getShangXia = function(hscore,ascore){
      var total = Caiguo.getGoals(hscore,ascore);
      var sx = '下';
      var ds = '单';
      if(total >=3 ){
          sx = '上';
      }
      if(total % 2 == 0){
          ds = '双';
      }
      return sx + '/' + ds;
  };

  /**
   * 获取彩果 进球 主客进球数最大为3
   * @param {Object} hscore 主总得分
   * @param {Object} ascore 客总得分
   * @return {string} 3/0
   */
  Caiguo.getJinQiu = function(hscore,ascore){
      hscore = hscore || 0;
      hscore = hscore > 3 ? 3 : hscore;
      ascore = ascore > 3 ? 3 : ascore;
      return hscore + '/' + ascore;
  };

  /**
   * 参考sp
   * @param {Object} sparr   sp数组
   * @param {Object} hscore
   * @param {Object} ascore
   * @param {Object} letball 让球
   * @return {Object}
   */
  SP.getCankaoSP = function(sparr,hscore,ascore,letball){
      var result = {
          sp3:{value:'-',css:''},
          sp1:{value:'-',css:''},
          sp0:{value:'-',css:''}
      };
      if(!$.isArray(sparr)){
          return result;
      }
      var sp3 = +sparr[0];
      var sp1 = +sparr[1];
      var sp0 = +sparr[2];
      if(!sp3 || !sp1 || !sp0){
          return result;
      }
      sp3 = Common.toFixed(sp3,2);
      sp1 = Common.toFixed(sp1,2);
      sp0 = Common.toFixed(sp0,2);
      var wdl = Caiguo.getWDL(hscore,ascore,letball);
      var sp  = 'sp' + wdl;
      var css = 'odds-cipei';
      switch(wdl){
          case 3:
              if(sp3 == Math.min(sp3,sp1,sp0)){
                  css = 'odds-shoupei';
              }else if(sp3 == Math.max(sp3,sp1,sp0)){
                  css = 'odds-mopei';
              }
              break;
          case 1:
              if(sp1 == Math.min(sp3,sp1,sp0)){
                  css = 'odds-shoupei';
              }else if(sp1 == Math.max(sp3,sp1,sp0)){
                  css = 'odds-mopei';
              }
              break;
          case 0:
              if(sp0 == Math.min(sp3,sp1,sp0)){
                  css = 'odds-shoupei';
              }else if(sp0 == Math.max(sp3,sp1,sp0)){
                  css = 'odds-mopei';
              }
          break;
      }
      result['sp3']['value'] = sp3;
      result['sp1']['value'] = sp1;
      result['sp0']['value'] = sp0;
      result[sp]['css']      = css;
      return result;
  };

  /**
   * 开奖sp
   * @param {Object} sparr   sp数组
   * @param {Object} hscore
   * @param {Object} ascore
   * @param {Object} letball 让球
   * @return {Object}
   */
  SP.getKaijiangSP = function(sparr,hscore,ascore,letball){
      var result = {
          sp3:{value:'-',css:''},
          sp1:{value:'-',css:''},
          sp0:{value:'-',css:''}
      };
      if(!$.isArray(sparr)){
          return result;
      }
      // 开奖sp
      var sp_kj = +sparr[3];
      if( !sp_kj){
          return result;
      }
      sp_kj = Common.toFixed(sp_kj,2);
      var wdl = Caiguo.getWDL(hscore,ascore,letball);
      var sp  = 'sp' + wdl;
      result[sp]['value']    = sp_kj;
      result[sp]['css']      = 'odds-kaijiang';
      return result;
  };

  /**
   * 百家欧赔
   * @param {Object} sparr
   */
  SP.getBaijiaOupei = function(sparr){
      var result = {
          sp3:{value:'-',css:''},
          sp1:{value:'-',css:''},
          sp0:{value:'-',css:''}
      };
      if(!$.isArray(sparr)){
          return result;
      }
      // 取数组的最后三位
      //sparr = sparr.slice(-3);
      var sp3 = +sparr[0];
      var sp1 = +sparr[1];
      var sp0 = +sparr[2];
      if(!sp3 || !sp1 || !sp0){
          return result;
      }
      result['sp3']['value'] = Common.toFixed(sp3,2);
      result['sp1']['value'] = Common.toFixed(sp1,2);
      result['sp0']['value'] = Common.toFixed(sp0,2);
      return result;
  };

  /**
   * 澳门亚盘
   * @param stinng tp 1,0
   * @param float bets 0.25
   * @param float ab
   * @param float be
   * @return array
   */
  SP.getAomenYapan = function(tp,bets,ab,be){
      var result = {
          sp3:{value:'-',css:''},
          sp1:{value:'-',css:''},
          sp0:{value:'-',css:''}
      };
      tp   = +tp;
      bets = +bets;
      ab   = +ab;
      be   = +be;
      if(!ab || !be){
          return result;
      }
      var sp1 = SP.pkcover(bets,tp,'<span class="red" title="受">*</span>');
      result['sp1']['value'] = sp1;
      // >2是1.85盘
      if(ab + be > 2){
          ab -= 1;
          be -= 1;
      }
      if(tp == 1){
          result['sp3']['value'] = Common.toFixed(be,2);
          result['sp0']['value'] = Common.toFixed(ab,2);
      }else{
          result['sp3']['value'] = Common.toFixed(ab,2);
          result['sp0']['value'] = Common.toFixed(be,2);
      }
      return result;
  };

  /**
   * 盘口
   * @param int bets
   * @param stinng tp 1,0
   * @param string prefix tp为A的前缀 '受'或'*' 默认'受' 可选
   * @return string
   */
  SP.pkcover = function(bets,tp,prefix){
      prefix = prefix || '受';
      var arr = ["平手", "平/半", "半球", "半/一", "一球", "一/半", "球半", "球半/二", "二球", "二/半",
              "二半", "二半/三", "三球", "三/半", "三半", "三半/四", "四球", "四/半", "四半", "四半/五",
              "五", "五/五半", "五半", "五半/六", "六", "六/六半", "六半", "六半/七", "七球", "七/七半",
              "七半", "七半/八", "八球", "八/八半", "八半", "八半/九", "九球", "九/九半", "九半", "九半/十",
              "十球", "十/十半", "十半", "十半/十一", "十一球", "十一/十一半", "十一半", "十一半/十二球",
              "十二球", "十二/十二半", "十二半", "十二半/十三球", "十三球", "十三/十三半", "十三半",
              "十三半/十四球", "十四球", "十四/十四半", "十四半", "十四半/十五球", "十五球", "十五/十五半",
              "十五半", "十五半/十六球", "十六球", "十六/十六半", "十六半", "十六半/十七球", "十七球",
              "十七/十七半", "十七半", "十七半/十八球", "十八球", "十八/十八半", "十八半", "十八半/十九球",
               "十九球", "十九/十九半", "十九半", "十九半/二十球", "二十球"];
      return (tp ? prefix :'') + arr[Math.floor(bets*4)];
  };

  window.Common = Common;
  window.Video  = Video;
  window.Caiguo = Caiguo;
  window.SP     = SP;

})(window);


(function(window){
  var scolltimer = null;
  /**
   * 标题滚动 同时只能有一个在滚动
   */
  var TitleScoll = function(options){
      this.msg   = options['msg'] || ''; // 滚动内容
      this.times = options['times'];     // 次数
      this.resetTitle = options['resetTitle']; // 停止时显示内容
      this.currentTimes = 0;
      this.index = 0;
  };
  TitleScoll.prototype = {
      /**
       * 开始滚动
       */
      start:function(){
          var me = this;
          me._clear();
          me._loop();
      },
      /**
       * 停止滚动
       */
      stop:function(){
          var me = this;
          me._clear();
          document.title = me.resetTitle;
      },
      _loop:function(){
          var me = this;
          if(me.index === me.msg.length){
              me.index = 0;
              me.currentTimes ++;
              if(me.times && me.currentTimes >= me.times ){
                  me.stop();
                  return;
              }
          }
          var msg = me._getCurrentMsg(me.index);
          document.title = msg;
          me.index ++;
          scolltimer = setTimeout(function(){
              me._loop();
          },300);
      },
      _getCurrentMsg:function(index){
          return this.msg.substring(index);
      },
      _clear:function(){
          var me = this;
          me.index = 0;
          me.currentTimes = 0;
          clearTimeout(scolltimer);
      }
  };

  window.TitleScoll = TitleScoll;
})(window);

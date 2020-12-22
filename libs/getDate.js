/**
 * 获取时间
 * @param {string} formate 输出事件格式， yy-MM-dd hh:mm:ss
 * @returns {string}
 */
module.exports = function getDate(formate) {
    let date = new Date();
    let o = {
      yy: date.getFullYear(),
      MM: date.getMonth() + 1,
      dd: date.getDate(),
      hh: date.getHours(),
      mm: date.getMinutes(),
      ss: date.getSeconds()
    };
    if (formate) {
      formate.match(/([a-zA-Z]+)/g).forEach(v => {
          formate = formate.replace(v, o[v]);
      })
    }
    return formate || `${o.yy}-${o.MM}-${o.dd} ${o.hh}:${o.mm}:${o.ss}`
  }
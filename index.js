const getNewsList = require('./libs/getNewsList');
const getEasyNews = require('./libs/getEasyNews');

/*getNewsList().then((news) => {
  console.log(news);
});*/

let url = 'http://www3.nhk.or.jp/news/easy/k10010772791000/k10010772791000.html';
getEasyNews(url).then((result) => {
  console.log(result);
});

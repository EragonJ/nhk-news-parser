const getEasyNews = require('./libs/getEasyNews');

getEasyNews().then((news) => {
  console.log(news);
});

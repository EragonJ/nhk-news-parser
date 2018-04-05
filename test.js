var Parser = require('./');

// check getNewsList
Parser.getNewsList().then(function(allNews) {
  console.log(allNews);
  if (allNews) {
    var news = allNews[0];

    Parser.getEasyNews(news.newsEasyWebURL).then(function(content) {
      console.log(content);
    }).catch(function(error) {
      //console.log(error);
    });
  }
}).catch(function(error) {
  console.log(error);
});

const News = require('../models/News');
const request = require('request');
const URL = 'http://www3.nhk.or.jp/news/easy/news-list.json';

module.exports = () => {
  return new Promise((resolve, reject) => {
    request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // NOTE 
        // 1. there is one weird character in the front
        // 2. new objects are stored in a big array, so use [0] here
        let rawNews = body.slice(1);
        let result = JSON.parse(rawNews)[0];

        let news = [];
        Object.keys(result).forEach((key) => {
          let eachDay = result[key];
          eachDay.forEach((newsData) => {
            let eachNews = new News(newsData);
            news.push(eachNews);
          });
        });

        resolve(news);
      }
      else {
        reject(error);
      }
    });
  });
};

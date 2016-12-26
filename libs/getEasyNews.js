const request = require('request');
const cheerio = require('cheerio');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('no url');
    }
    else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          let $ = cheerio.load(html);
          let title = $('#newstitle h2').html();
          let content = $('#newsarticle').html();

          // TODO
          // filter out ruby in title / content later
          resolve({
            title: title,
            titleWithRuby: title,
            content: content,
            contentWithRuby: content
          });
        }
        else {
          reject(error);
        }
      });
    }
  });
};

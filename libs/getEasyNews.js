const request = require('request');
const cheerio = require('cheerio');

function removeFurigana(html) {
  html = html || '';
  html = html.replace(/<rt>.*?<\/rt>/g, '');
  html = html.replace(/(<ruby>|<\/ruby>)/g, '');
  return html;
}

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('no url');
    }
    else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          let $ = cheerio.load(html);
          let rawTitle  = $('#newstitle h2').html();
          rawTitle = rawTitle.trim();

          let titleWithFurigana = rawTitle;
          let title = removeFurigana(rawTitle);

          let rawContent = $('#newsarticle').html();
          rawContent = rawContent.trim();

          let contentWithFurigana = rawContent;
          let content = removeFurigana(rawContent);

          // TODO
          // filter out ruby in title / content later
          resolve({
            title: title,
            titleWithFurigana: titleWithFurigana,
            content: content,
            contentWithFurigana: contentWithFurigana
          });
        }
        else {
          reject(error);
        }
      });
    }
  });
};

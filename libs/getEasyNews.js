const request = require('request');
const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

function removeFurigana(html = '') {
  html = html.replace(/<rt>.*?<\/rt>/g, '');
  html = html.replace(/(<ruby>|<\/ruby>)/g, '');
  return html;
}

function removeUselessTags(html = '') {
  html = html.replace(/<(?!(ruby|rt|\/ruby|\/rt|a|\/a|span|\/span)).*?>/g, '');
  html = html.replace(/<a[^>]*>/g, '<a href="#">');
  html = html.replace(/<span[^>]*>/g, '<span>');
  return html;
}

function toText(html) {
  let text = entities.decode(html);
  text = text.trim();
  text = text.replace(/\n/g, '<br/>');
  return text;
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
          let rawTitle  = $('.article-main__title').html();
          rawTitle = rawTitle.trim();

          let titleWithFurigana = toText(removeUselessTags(rawTitle));
          let title = toText(removeUselessTags(removeFurigana(rawTitle)));

          let rawContent = $('#js-article-body').html();
          rawContent = rawContent.trim();

          let contentWithFurigana = toText(removeUselessTags(rawContent));
          let content = toText(removeUselessTags(removeFurigana(rawContent)));

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

const moment = require('moment');
const NHK_URL = 'http://www3.nhk.or.jp';
const MOVIE_URL =
  'http://www3.nhk.or.jp/news/easy/swf/news_player4.swf?' +
  'fms=rtmp://flv.nhk.or.jp/ondemand/flv/news/&movie=';

class News {
  constructor(data) {
    this.type = 'easyNews';
    this.date = Date.now();
    this.priority = data.news_priority_number || '0';
    this.uniqueId = '';
    this.newsId = data.news_id || 'No id';
    this.title = data.title || 'No title';
    this.titleWithFurigana = data.title_with_ruby || 'No title';
    this.content = '';
    this.contentWithFurigana = '';
    this.newsWebURL = data.news_web_url || NHK_URL;
    this.newsWebImageURL = '';
    this.newsWebMovieURL = '';

    this.newsEasyVoiceURL = '';
    this.newsEasyImageURL = '';
    this.newsEasyMovieURL = '';

    this.newsEasyWebURL =
      `${NHK_URL}/news/easy/${this.newsId}/${this.newsId}.html`;

    if (data.news_prearranged_time) {
      if (moment(data.news_prearranged_time).isValid()) {
        this.date = +moment(data.news_prearranged_time);
      }
    }

    if (data.has_news_web_image) {
      this.newsWebImageURL = data.news_web_image_uri;
    }

    if (data.has_news_web_movie) {
      this.newsWebMovieURL = `${MOVIE_URL}${data.news_web_movie_uri}`;
    }

    if (data.has_news_easy_image) {
      this.newsEasyImageURL =
        `${NHK_URL}/news/easy/${this.newsId}/${data.news_easy_image_uri}`;
    }

    // Note
    // Need to check this later because didn't find anything related yet
    if (data.has_news_easy_movie) {
      this.newsEasyMovieURL = `${MOVIE_URL}${data.news_easy_movie_uri}`;
    }

    if (data.has_news_easy_voice) {
      this.newsEasyVoiceURL =
        `${NHK_URL}/news/easy/${this.newsId}/${data.news_easy_voice_uri}`;
    }
  }
}

module.exports = News;

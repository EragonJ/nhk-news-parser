const NHK_URL = 'http://www3.nhk.or.jp';
const MOVIE_URL =
  'http://www3.nhk.or.jp/news/easy/swf/news_player4.swf?' +
  'fms=rtmp://flv.nhk.or.jp/ondemand/flv/news/&movie=';

class News {
  constructor(data) {
    this.date = +(Date(data.news_prearranged_time)) || Date.now();
    this.priority = data.news_priority_number || '0';
    this.newsId = data.news_id || 'No id';
    this.title = data.title || 'No title';
    this.titleWithRuby = data.title_with_ruby || 'No title';
    this.newsWebURL = data.news_web_url || NHK_URL;
    this.newsWebImageURL = data.news_web_image_uri || '';
    this.newsWebMovieURL = '';
    this.newsEasyVoiceURL = '';
    this.newsEasyWebURL =
      `${NHK_URL}/news/easy/${this.newsId}/${this.newsId}.html`;

    if (data.news_easy_voice_uri) {
      let match = data.news_easy_voice_uri.match(/(\w+)\.mp3/);
      if (match) {
        let filename = match[0];
        this.newsEasyVoiceURL =
          `${NHK_URL}/news/easy/${filename}/${data.news_easy_voice_uri}`;
      }
    }

    if (data.news_web_movie_uri) {
      this.newsWebMovieURL = `${MOVIE_URL}${data.news_web_movie_uri}`;
    }
  }
}

module.exports = News;

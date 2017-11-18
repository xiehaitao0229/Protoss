import { Config } from 'config.js';


class Base {
  constructor() {
    this.baseRequestUrl = Config.requestUrl;
  }

  request(params) {
    var url = this.baseRequestUrl + params.url;

    if (!params.type) {
      params.type = 'GET';
    }

    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')  //  从缓存得到token
      },
      success: function (res) {
        /*  if (params.sCallback){
            params.sCallback(res);
          }*/
        //  等同上面
        params.sCallback && params.sCallback(res.data);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }
}

export {Base};
import { Config } from 'config.js';


class Base {
  constructor() {
    this.baseRequestUrl = Config.requestUrl;
  }

  /**
   * 对请求数据做了封装
   */
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

/**
 * 对获取页面传递的参数做了封装
 * 获取元素上的绑定的值
 */
getDataSet(event,key){
  return event.currentTarget.dataset[key];
}


}

export {Base};
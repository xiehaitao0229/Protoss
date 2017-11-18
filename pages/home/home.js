// pages/home/home.js
//  引入homeModel.js
import { Home } from "homeModel.js";
var home = new Home();  //  实例化homeModel类

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onLoad: function () {
    this._loadData();
  },

  //  自定义的加载函数
  _loadData: function () {
    //  获得banner接口数据
     home.getBannerData((res) => {
        this.setData({
          'bannerArr':res  //  做数据绑定
        })
    });

    home.getThemeData((res)=>{
      this.setData({
         'themeArr':res
      })
    })
  }



})
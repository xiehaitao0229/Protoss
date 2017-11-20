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

    home.getProductsData((res) => {
      this.setData({
        'productsArr': res
      })
    })

  },

  /**
   * 跳转到具体商品页
   */
  onProductsItemTap:function(event){
      var id = home.getDataSet(event,'id');
     // console.log(id);
      wx.navigateTo({
        url: '../product/product?id='+id,
      })
  },

/**
 * 跳转到主题页
 */
onThemeItemTap:function(event){
  var id = home.getDataSet(event,'id');
  var name = home.getDataSet(event, 'name');
  wx.navigateTo({
    url: '../theme/theme?id=' + id+'&name='+name,
  })
},


})
// pages/theme/theme.js
import {Theme} from "./themeModel.js";
var theme = new Theme();  //  实例化 主题列表对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id; 
    this.data.name = options.name;
    this._loadData(id);
  },

  onReady:function(){
    wx.setNavigationBarTitle({
       title: this.data.name,
    })
  },


  _loadData(id){
    theme.getProductData(id,(res)=>{
       this.setData({
          "themeInfo":res
       })
    })
  }  
})
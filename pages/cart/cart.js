// pages/cart/cart.js
import {  Cart} from './cartModel.js';
var cart = new Cart();

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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var cartData = cart.getCartDataFromLocal();  //  获取购物车所有的数据
    //  var countsInfo = cart.getCartTotalCounts(true);
      var cal = this._calcTotalAccountAndCounts(cartData);
      this.setData({
        selectedCounts: cal.selectedCounts,
        selectedTypeCounts: cal.selectedTypeCounts,
        account: cal.account,
        cartData: cartData,
      })
   //   console.log(this.data);
  },

/**
 * 统一更新缓存
 */
  onHide: function () {
    //wx.setStorageSync('cart', this.data.cartData);    在cartModel层封装了更新缓存方法
    cart.execSetStorageSync(this.data.cartData);
  },


  /**
   * 计算订单总金额
   * 只是计算订单被选中的商品的总金额
   */
  _calcTotalAccountAndCounts: function (data){
    var len = data.length;
    var account = 0;  //  所需计算的总价格，但是要注意排除掉未选中的商品
      var selectedCounts = 0;  //  购买商品数量的总和
      var selectedTypeCounts = 0;  //  购买商品类型的总和

      let multiple = 100;
      for(let i=0;i<len;i++){
        //  避免0.05+0.01 = 0.060 000 000 000 000 005的问题，乘以100*100
        //  避免js浮点数的运算产生的误差
        if (data[i].selectStatus){
          account +=data[i].counts*multiple*Number(data[i].price)*multiple;
          selectedCounts+=data[i].counts;
          selectedTypeCounts++;
        }
      }

      return {
        selectedCounts: selectedCounts,
        selectedTypeCounts: selectedTypeCounts,
        account: account / (multiple*multiple)
      }

  },

  /**
   * 单选
   */
  toggleSelect:function(event){
    var id = cart.getDataSet(event,'id');
    var status = cart.getDataSet(event,'status');  //  改变缓存商品的状态
    var index = this._getProductIndexById(id);
    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },

  /**
   * 全选
   */
  toggleSelectAll: function (event){
      var status = cart.getDataSet(event,'status') =='true';

      var data = this.data.cartData;
      var len = data.length;
      for(let i=0;i<len;i++){
        data[i].selectStatus = !status;
      }
      this._resetCartData();

  },


/**
 * 根据商品id得到 商品所在下标
 */
_getProductIndexById:function(id){
  var data = this.data.cartData;
  var len = data.length;
  for( let i=0;i<len;i++ ){
    if(data[i].id==id){
      return i;
    }
  }
},

/**
 * 重新计算购物车的商品总额和商品总数
 */
_resetCartData(){
  var newData = this._calcTotalAccountAndCounts(this.data.cartData);
  this.setData({
    account: newData.account,
    selectedCounts: newData.selectedCounts,
    selectedTypeCounts: newData.selectedTypeCounts,
    cartData: this.data.cartData
  })
},

/**
 * 购物车的商品加减控制
 */
changeCounts:function(event){
  var id = cart.getDataSet(event,'id');
  var type = cart.getDataSet(event,'type');
  var index = this._getProductIndexById(id);
  var counts = 1;
  if(type=='add'){
    cart.addCounts(id);
  }else{
    counts = -1
    cart.cutCounts(id);
  }

  this.data.cartData[index].counts +=counts;  
  this._resetCartData();  //  重新计算商品数量
},

/**
 * 删除商品
 */
delete:function(event){
  var id = cart.getDataSet(event,'id');
  var index = this._getProductIndexById(id);
  this.data.cartData.splice(index,1);  //  删除某一项商品
  this._resetCartData();  //  重新计算商品数量
  cart.delete(id);
}


})
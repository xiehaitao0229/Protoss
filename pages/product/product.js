// pages/product/product.js
import  {Product} from './productModel.js';
import { Cart } from '../cart/cartModel.js';
var product = new Product();
var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:null,
      countsArray:[1,2,3,4,5,6,7,8,9,10],
      productCounts:1,
      currentTabsIndex: 0,
      cartTotalCounts: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var id = options.id ; // options里面有从页面传递过来的参数
        this.data.id = id;
        this._loadData();
  },

  /**
   * 加载商品详细数据
   */
  /*_loadData(){
    product.getDetailInfo(this.data.id,(res)=>{
      console.log(res);
      this.setData({
        "product":res
      })
    })
  },*/
  _loadData: function (callback) {
    var that = this;
    product.getDetailInfo(this.data.id, (data) => {
      that.setData({
        cartTotalCounts: cart.getCartTotalCounts().counts1,
        product: data,
        loadingHidden: true
      });
      callback && callback();
    });
  },

  /**
   * 绑定改变的数量数据
   */
  bindPickerChange:function(event){
     var index = event.detail.value;
     var selectedCount = this.data.countsArray[index];
     this.setData({
       productCounts: selectedCount
     })
  },
 
 /**
  * 设置当前选择的数量，绑定选择的数量对应的序号
  */
  onTabsItemTap:function(event){
    var index = product.getDataSet(event,'index');
    this.setData({
      currentTabsIndex:index
    })
  },


/**
 * 添加到购物车
 * 
 */
onAddingToCartTap:function(event){
  this.addToCart();
    //  购物车商品的总数量=原有在购物车的数量(this.data.cartTotalCoun)+新添加商品的数量( this.data.productCount)
  var counts = this.data.cartTotalCounts + this.data.productCounts;  
 /* console.log(this.data.cartTotalCounts);
  console.log(this.data.productCounts);
  console.log(counts);
  console.log(this.data);*/
 this.setData({
   cartTotalCounts: counts
 })

},

/**
 * 把添加到购物车的商品组成一个对象
 */
addToCart:function(){
  var tempObj = {};  //商品对象
  var keys = ['id','name','main_img_url','price'];  //  商品对象属性
  for(var key in this.data.product){
    if(keys.indexOf(key)>=0){
      //如果存在key的话，保存在tempObj里面
      tempObj[key] = this.data.product[key];
    }
  }

  cart.add(tempObj, this.data.productCounts);  //  传到cart.add()方法里面
},
  

/*跳转到购物车*/
onCartTap: function () {
  wx.switchTab({
    url: '/pages/cart/cart'
  });
},


})
import { Base } from '../../utils/base.js';



class Cart extends Base {
  constructor() {
    super();
    this._storageKeyName = 'cart';
  }


  /**
   * 添加购物车
   * 如果之前没有这样的商品，则直接添加一条新的记录，数量为counts
   * 如果有，则只将相应数量+counts
   * @params
   * item-{obj}添加到购物车的商品对象
   * counts-{int}商品的数量
   */
  add(item,counts){
      var cartData = this.getCartDataFromLocal();
      var isHasInfo = this._isHasThatOne(item.id,cartData);  //  item.id是动态生成的属性
      if(isHasInfo.index==-1){
        //  新商品添加
        item.counts = counts;  //  给item新增count属性
        item.selectStatus = true;  //给item新增selectStatus属性,在购物车里面的商品是否选中状态
        cartData.push(item);
      }else{
         //  已有的商品再添加数量
         cartData[isHasInfo.index].counts+=counts;
      }
      
      //更新缓存状态
      wx.setStorage({
        key: this._storageKeyName,
        data: cartData,
      })
}

  /**
     * 从缓存中读取购物车数据
     */
  getCartDataFromLocal() {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];
    }
    return res;
  }

  /*
     *获得购物车商品总数目,包括分类和不分类
     * param:
     * flag - {bool} 是否区分选中和不选中
     * return
     * counts1 - {int} 不分类
     * counts2 -{int} 分类
     */
  getCartTotalCounts(flag) {
    var data = this.getCartDataFromLocal(),
      counts1 = 0,
      counts2 = 0;
    for (let i = 0; i < data.length; i++) {
      if (flag) {
        if (data[i].selectStatus) {
          counts1 += data[i].counts;
          counts2++;
        }
      } else {
        counts1 += data[i].counts;
        counts2++;
      }
    }
    return {
      counts1: counts1,
      counts2: counts2
    };
  };

  /**
   * 判断某个商品是否已经被添加到购物车中，并且返回这个商品数据已经所在数组中的序号
   */
  _isHasThatOne(id, arr) {
    var item;
    var result = {index:-1};
    for(let i=0;i<arr.length;i++){
      item = arr[i];
      if(item.id==id){
        result = {
          index:i,  //  返回商品再缓存的位置
          data:item  //  返回商品原有的属性
        };
        break;
      }
    }
    return result;
  };


  /**
   * 修改商品数量
   * params
   * id-{int}-商品id
   * counts-{int}-数量
   */
  _changeCount(id,counts){
    var cartData = this.getCartDataFromLocal();
    var hasInfo = this._isHasThatOne(id,cartData);
    if(hasInfo!=-1){
      if(hasInfo.data.counts>1){
        cartData[hasInfo.index].counts+=counts;
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData)  //  更新本地缓存
  }

/**
 * 添加商品数目
 */
addCounts(id){
  this._changeCount(id,1);
};

/**
 * 减少商品数目
 */
cutCounts(id) {
  this._changeCount(id, -1);
};

/**
 * 删除商品
 * 支持商品多个商品
 */
delete(ids){
  if(!(ids instanceof Array)){
    ids = [ids];
  }
  var cartData = this.getCartDataFromLocal();
  for(let i=0;i<ids.length;i++){
    var hasInfo = this._isHasThatOne(ids[i],cartData);
    if(hasInfo!=-1){
      cartData.splice(hasInfo.index,1);  //  删除数组某一项商品
    }
  }
  wx.setStorageSync(this._storageKeyName, cartData)  //  更新本地缓存
}


/**
 * 本地缓存 保存 /更新方法
 */
execSetStorageSync(data){
  wx.setStorageSync(this._storageKeyName, data)
}

}

export {Cart};
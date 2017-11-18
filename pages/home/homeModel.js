import {Base} from "../../utils/base.js";

class Home  extends Base{
  //  一定要有构造函数
  constructor() {
    super();
  }

     /*banner数据*/ 
      getBannerData(callback) {
        var params = {
            url:'banner/1',
            type:"GET",
            sCallback:function(res){
              callback && callback(res.items);
            }
        }
          //  调用基类封装好的reques()函数
        this.request(params);
    }

      /*首页主题*/
      getThemeData(callback) {
        var params = {
          url: 'theme?ids=1,2,3',
          type: "GET",
          sCallback: function (res) {
            callback && callback(res);
          }
        }
        //  调用基类封装好的reques()函数
        this.request(params);
      }

}

//  最后记得export出去
export { Home }
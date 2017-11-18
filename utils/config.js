class Config {
  constructor() {

  }
}

// 如果想在外部直接向调用静态的成员变量的话，需要这样子定义

Config.requestUrl = "http://zn.com/api/v1/";


export { Config };
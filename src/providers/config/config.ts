import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  // 正式环境
  //  public apiUrl="https://appnew.zhongjianmall.com/zjapp/";
  //  public domain="https://appnew.zhongjianmall.com";

  // 开发环境
   public apiUrl="http://192.168.1.71/zjapp/";
   public domain="http://192.168.1.71";

  //测试环境
  //  public apiUrl="http://192.168.1.71/zjapp/";
  //  public domain="http://192.168.1.71";

}

///<reference path="../../services/jweixin.d.ts"/>
///<reference path="../../services/user_defined.d.ts"/>
import { Injectable } from '@angular/core';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/*
  Generated class for the WechatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WechatProvider {

  constructor(private httpService: HttpServicesProvider) {
  }
  wxConfig(callback) {
    if (!global_wxFunciton.isloadWxConfig()) {
      let url = location.href.split('#')[0];//url不能写死
      let api = 'wechat/wechatParam.wxpaydo';
      this.httpService.requestData(api, (data) => {
        wx.config({
          debug: false,////生产环境需要关闭debug模式
          appId: data.appid,//appId通过微信服务号后台查看
          timestamp: data.timestamp,//生成签名的时间戳
          nonceStr: data.nonceStr,//生成签名的随机字符串
          signature: data.signature,//签名
          jsApiList: [//需要调用的JS接口列表
            'checkJsApi',//判断当前客户端版本是否支持指定JS接口
            'onMenuShareTimeline',//分享给好友
            'onMenuShareAppMessage',//分享到朋友圈
            'onMenuShareQQ',
            'onMenuShareQZone',
            'uploadImage',  //上传图片
            'chooseWXPay',
            'chooseImage'
          ]
        });
        
      }, { url: url });
    }else{
      callback();
    }
    wx.ready(() => {
      callback();
    });
  }
}

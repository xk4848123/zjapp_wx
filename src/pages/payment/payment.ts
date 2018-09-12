///<reference path="../../services/jweixin.d.ts"/>
///<reference path="../../services/user_defined.d.ts"/>
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess';
import { WeblinkProvider } from '../../providers/weblink/weblink';
import { WechatProvider } from '../../providers/wechat/wechat';
import { ConfigProvider } from '../../providers/config/config';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public way = 1;
  public payPara = {
    openid: 'init',
    orderNo: '',
    realpay: '',
    orderType: ''
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServicesProvider, private storage: StorageProvider,
    private noticeSer: ToastProvider, private rloginprocess: RloginprocessProvider, private webLink: WeblinkProvider, private wechat: WechatProvider, private config: ConfigProvider) {
    if (this.navParams.get('data')) {
      let tempData = this.navParams.get('data');
      this.payPara.orderNo = tempData["orderNo"];
      this.payPara.realpay = tempData["realpay"];
      this.payPara.orderType = tempData["orderType"];
    } else {
      let qs = this.getQueryString();
      this.payPara.openid = qs["openid"];
      this.payPara.orderNo = qs["orderno"];
      this.payPara.realpay = qs["realpay"];
      this.payPara.orderType = qs["ordertype"];
    }
  }


  ionViewWillEnter(){ 
    this.wechat.wxConfig(() => {
      this.openWexinClient();
    });
  
  }

  getQueryString() {
    let qs = location.search.substr(1), // 获取url中"?"符后的字串  
      args = {}, // 保存参数数据的对象
      items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
      item = null,
      len = items.length;

    for (let i = 0; i < len; i++) {
      item = items[i].split("=");
      let name = decodeURIComponent(item[0]),
        value = decodeURIComponent(item[1]);
      if (name) {
        args[name] = value;
      }
    }
    return args;
  }
  wxpay() {
    // if (this.payPara.openid = 'init') {
    //   let token = this.storage.get('token');
    //   if (token) {
    //     let api = 'v1/PersonalCenter/GetPersonalInfo/' + token;
    //     this.httpService.requestData(api, (data) => {
    //       if (data.error_code == 0) {//请求成功
    //         let tempData = data.data;
    //         if (tempData['personDataMap'].WxOpenId != '') {
    //           //调支付
    //           this.payPara.openid = tempData['personDataMap'].WxOpenId;
    //           this.openWexinClient();
    //         } else {
    //           //微信授权获取openid
    //           let token = this.storage.get('token');
    //           if (token) {
    //             let orderNo = this.payPara.orderNo;
    //             let realpay = this.payPara.realpay;
    //             let orderType = this.payPara.orderType;
    //             let web_url: string = this.config.domain + "/zjapp/wechat/wechatauth.wxpaydo?token=" + token + "&orderno=" + orderNo + "&realpay=" + realpay + "&ordertype=" + orderType;
    //             // this.webLink.goWeb(web_url);
    //             window.location.href= web_url;
    //           }
    //         }
    //       } else if (data.error_code == 3) {//token过期
    //         this.rloginprocess.rLoginProcessWithHistory(this.navCtrl);
    //       }
    //       else {
    //         this.noticeSer.showToast('数据获取异常：' + data.error_message);
    //       }
    //     });
    //   }
    // } else {
    //   //调支付
    //   this.openWexinClient();
    // }
    this.openWexinClient();
  }

  openWexinClient() {
    let apiUrl = "wechat/createwxpayparam.wxpaydo";
    this.httpService.doPost(apiUrl, {
      total_fee: this.payPara.realpay,
      out_trade_no: this.payPara.orderNo,
      type: this.payPara.orderType,
      openid: this.payPara.openid
    }, (data) => {
      if (data.error_code == 0) {
        let tempData = data.data;
        wx.chooseWXPay({
          appId:tempData.appId,
          timestamp: tempData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: tempData.nonceStr, // 支付签名随机串，不长于 32 位
          package: tempData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: tempData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: tempData.paySign, // 支付签名
          success: (res)=> {
               this.goToSuccess();
          }
      });
      } else {
        this.noticeSer.showToast("后台签名微信支付异常");
      }

    });
  }

  pay() {
    if (this.way == 1) {
      this.wxpay();
    }
  }


  goToSuccess() {
    this.navCtrl.push('PaysuccessPage', {
      orderType: this.payPara.orderType
    });
  }
}
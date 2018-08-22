import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess'
declare let cordova;
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


  public aliSignature = '';

  public way = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServicesProvider, private storage: StorageProvider, private noticeSer: ToastProvider,private rloginprocess:RloginprocessProvider) {
  }


  ionViewWillEnter() {
    this.aliSignature = '';
  }

  unescapeHTML(a) {
    let aNew = "" + a;
    return aNew.replace(/</g, "<").replace(/>/g, ">").replace(/&/g, "&").replace(/"/g, '"').replace(/'/g, "'");
  }


  wxpay() {
    this.noticeSer.showToast('该方式正在开通中');
  }

  alipay() {
    if (this.aliSignature == '') {
      let token = this.storage.get('token');
      this.httpService.doFormPost('/v1/MemberShip/createCOrder/' + token, { money: this.navParams.data.money }, (data) => {
        if (data.error_code == 0) {//登录成功
          this.aliSignature = data.data;//保存签名页面至页面退出
          let payInfo = this.unescapeHTML(data.data);
          cordova.plugins.alipay.payment(payInfo, (success) => {
            if (success.resultStatus === "9000") {
              this.noticeSer.showToast('支付成功');
              this.navCtrl.pop();
            } else {
              this.noticeSer.showToast('支付失败');
            }
          }, (error) => {
            //支付失败
            this.noticeSer.showToast('支付失败');
          });
        } else if(data.error_code == 3){
            this.rloginprocess.rLoginProcess(this.navCtrl);
        }else {
          this.noticeSer.showToast(data.error_message);

        }
      });
    } else {
      let payInfo = this.unescapeHTML(this.aliSignature);
      cordova.plugins.alipay.payment(payInfo, (success) => {
        if (success.resultStatus === "9000") {
          this.noticeSer.showToast('支付成功');
          this.navCtrl.pop();
        } else {
          this.noticeSer.showToast('支付失败');
        }
      }, (error) => {
        //支付失败
       
      });
    }
  }

  pay() {

    if (this.way == 1) {
      this.wxpay();
    } else if (this.way == 2) {
      this.alipay();
    }
  }
}
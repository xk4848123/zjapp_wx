import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the RefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refund',
  templateUrl: 'refund.html',
})
export class RefundPage {
public  temp='';
public  getSelectedText='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private config: ConfigProvider,public storage: StorageProvider, public httpService: HttpServicesProvider, public toast: ToastProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundPage');
  }

  goToOrderlist(){
    this.navCtrl.push('OrderlistPage',{orderId:this.navParams.get('orderId'),behindHandle:true});
  }
  ionViewWillEnter() {
    this.temp=this.navParams.get('item');
    console.log(this.temp)
  }
  confirm(){
    console.log(this.getSelectedText)
    let token = this.storage.get('token');
    if (token) {
      //api请求
      let api = 'v1/PersonalCenter/ApplyRefund/' + token; 
      // +'?' + 'orderNo=' + this.navParams.get('orderNo') + '&' + 'memo=' + this.getSelectedText;
      console.log(api);
       //发送请求提交退款申请
      this.httpService.doFormPost(api,{orderNo: this.navParams.get('orderNo'),memo: this.getSelectedText} ,(data) => {
        console.log(data);
          if (data.error_code == 0) {
            
           this.goToOrderlist();
         } else if(data.error_code == 3){
           //抢登处理
         }
         else {
           this.toast.showToast(data.error_message);
         }
      });
    }
      }

}

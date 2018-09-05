import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the SalereturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salereturn',
  templateUrl: 'salereturn.html',
})
export class SalereturnPage {
  public  temp='';
  public  getSelectedText='';
  oderId:number;
  orderNo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private config: ConfigProvider,public storage: StorageProvider, public httpService: HttpServicesProvider, public toast: ToastProvider) {
    this.oderId = this.navParams.get('orderId');
    this.temp=this.navParams.get('item');
    this.orderNo = this.navParams.get('orderNo');
  }
  goToOrderlist(){
    this.navCtrl.push('OrderlistPage',{orderId:this.oderId,behindHandle:true});
  }

  confirm(){
    let token = this.storage.get('token');
    if (token) {
      //api请求
      let api = 'v1/PersonalCenter/ApplySaleReturn/' +token;
      console.log(api);
       //发送请求提交退货申请
       this.httpService.doFormPost(api,{orderNo:this.orderNo,memo: this.getSelectedText} ,(data) => {
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

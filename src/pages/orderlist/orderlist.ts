import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';



/**
 * Generated class for the OrderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {
public idData='';
public tempData='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public httpService:HttpServicesProvider,public toast: ToastProvider,private config:ConfigProvider) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad OrderlistPage');
  // }
  ionViewWillEnter(){
    //接受从订单列表页传过来的参数
    this.idData = this.navParams.get('item');
    let token=this.storage.get('token');
    if(token){
       //api请求
       let api='v1/PersonalCenter/getOrderDetails/' + token+'/'+this.idData;
       this.httpService.requestData(api,(data)=>{
        console.log(data);
        if(data.error_code==0){
            this.tempData=data.data;
            console.log(this.tempData);
        }else{
          this.toast.showToast('数据获取异常');
        }
    });
    }


  }
}

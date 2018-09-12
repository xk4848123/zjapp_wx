import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';

import { ToastController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the TitlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-title',
  templateUrl: 'title.html',
})
export class TitlePage {
public title='';
public content='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: StorageProvider, public httpService: HttpServicesProvider, public toast: ToastProvider,
    private config: ConfigProvider, private toastCtrl: ToastController, private alertCtrl: AlertController,public sanitizer:DomSanitizer) {
    console.log(this.navParams.get('curId'))
  }
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewWillEnter() {
    //课程详细简介
    let api='v2/commercialcollege/coursedetailbrief?' + 'courseid=' + this.navParams.get('curId'); 
    this.httpService.requestData(api, (data) => {
      if(data.error_code==0){
       this.title=data.data['coursedatalist'];
       if(this.title.length == 1){
         //课程资料详情
        let api='v2/commercialcollege/coursedatahtmltext?' + 'id=' + this.title[0]['id'];
      this.httpService.requestData(api,(data)=>{
      if(data.error_code==0){
               this.content=data.data;
               console.log(this.content);
         }
      });
    }
      }else{
        this.toast.showToast('数据获取异常');
      }
    });
  }

}

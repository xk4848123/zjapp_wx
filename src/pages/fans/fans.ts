import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FandetailPage } from '../fandetail/fandetail'

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the FansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fans',
  templateUrl: 'fans.html',
})
export class FansPage {


  public fansmessage='';
  //public temp=[];

  public color='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public httpService:HttpServicesProvider,public alertProvider: AlertProvider) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad FansPage');
  // }
    onClick(item:any){
      
    }
    Red(event){
       this.color=event.target.innerHTML
       this.navCtrl.push(FandetailPage,{
        item:this.color
      });
       console.log(this.color);
    }
    ionViewWillEnter(){
      let token=this.storage.get('token');
      if(token){
        //api请求
        let api='v1/MemberShip/GetFans/' + token;
        this.httpService.requestData(api,(data)=>{
          if(data.error_code==0){
            //请求成功
            this.fansmessage=data.data;
            console.log(data.data);
            //  let temp=JSON.stringify(this.fansmessage);//字符串 
            //    let tempData=temp.split(',');
            let arr=[];
            for(let i in data.data){
              if(!data.data.hasOwnProperty(i)){
                   continue;
              }
              let temp={};
             temp[i]=data.data[i];
                   //arr.push(data.data[i])
                  arr.push(temp);
            }
              console.log(arr);
            }else{
           this.alertProvider.showAlert('数据获取异常','',['ok']);
                 }
      });
      }
    }
  
}

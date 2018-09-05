import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { StorageProvider } from '../../providers/storage/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

//定义数据

public history='';

  public userinfo={
    phoneNum:'',
    password:''
  }

  constructor(public navCtrl: NavController, public navParams:NavParams ,public httpService:HttpServicesProvider,public storage:StorageProvider,public noticeSer:ToastProvider) {
      this.history=this.navParams.get('history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
    //1.this.userinfo 表单信息

    //2.请求接口 完成登录功能

    // console.log(this.userinfo);   //{username: "3214324", password: "324"}

    if(this.userinfo.phoneNum.length<11){
      this.noticeSer.showToast('手机号格式不对');
    }else{

        // var api='api/doLogin';
        let api='v1/LoginAndRegister/UserLogin';
        this.httpService.doPost(api,this.userinfo,(data)=>{
          if(data.error_code==0){//登录成功
              this.storage.set('token',data.data);
              this.storage.setSessionStorage('test','test2');
              if(this.history=='history'){
             
                this.navCtrl.pop();  /*返回上一个页面*/
              }else{
                this.navCtrl.popToRoot(); /*回到根页面*/
              }
          }else{
            console.log(data.error_message);
            this.noticeSer.showToast(data.error_message);

          }
        });
     }

  }

}

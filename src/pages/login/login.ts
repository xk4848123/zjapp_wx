import { Component, Renderer2, ElementRef } from '@angular/core';
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

  public history = '';

  public userinfo = {
    phoneNum: '',
    password: ''
  }
  public userinfo2 = {
    phoneNum: '',
    verifyCode: '',
    inviteCode: null
  }


  type: any = 1;
  private spareTime: number = 60;

  private interval: any = null;

  private inviteCode:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider
    , public storage: StorageProvider, public noticeSer: ToastProvider, private el: ElementRef, private renderer2: Renderer2) {
    this.history = this.navParams.get('history');
    this.type = 1;
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }
    if(storage.getSessionStorage('usercode')){
      this.inviteCode = storage.getSessionStorage('usercode');
    }else{
      this.inviteCode = 'no';
    }
  }

  change() {
    if (this.type == 1) {
      this.type = 2;
    } else {
      this.type = 1;
    }
  }

  getVerifyCode() {
    let apiUrl = 'v1/LoginAndRegister/SendRegisterVerifyCode'
    this.httpService.doPost(apiUrl, { phoneNum: this.userinfo2.phoneNum }, (res) => {
      if (res.error_code == 0) {//请求成功
        let button = this.el.nativeElement.querySelector('#button');
        this.renderer2.setStyle(button, 'display', 'none');
        //设置倒计时
        let time = this.el.nativeElement.querySelector('#time');
        this.renderer2.setStyle(time, 'display', 'inline-block');
        this.interval = setInterval(() => {
          this.spareTime--;
          if (this.spareTime == 0) {
            this.renderer2.setStyle(time, 'display', 'none');
            this.renderer2.setStyle(button, 'display', 'inline-block')
            this.spareTime = 60;
            clearInterval(this.interval);
          }
        }, 1000);
      } 
      else {
        this.noticeSer.showToast('服务异常：' + res.error_message);
      }
    });
  }

  doLogin() {
    let api = '';
    let tempData = null;
    if (this.type == 1) {
      if (this.userinfo.phoneNum == '') {
        this.noticeSer.showToast('手机号不可为空');
        return;
      }
      if (this.userinfo.phoneNum.length < 11) {
        this.noticeSer.showToast('手机号格式不对');
        return;
      }
      if (this.userinfo.password == '') {
        this.noticeSer.showToast('密码不可为空');
        return;
      }
      api = 'v1/LoginAndRegister/UserLogin';
      tempData = this.userinfo;
    } else {
      if (this.userinfo2.phoneNum == '') {
        this.noticeSer.showToast('手机号不可为空');
        return;
      }
      if (this.userinfo2.phoneNum.length < 11) {
        this.noticeSer.showToast('手机号格式不对');
        return;
      }
      if (this.userinfo2.verifyCode.length != 4) {
        this.noticeSer.showToast('验证码不正确');
        return;
      }
      if(this.inviteCode != 'no'){
        this.userinfo2.inviteCode =  this.inviteCode;
      }
      api = 'v2/LoginAndRegister/dynamicLogin';
      tempData = this.userinfo2;
    }


    this.httpService.doPost(api, tempData, (data) => {
      if (data.error_code == 0) {//登录成功
        this.storage.set('token', data.data);
        if (this.history == 'history') {

          this.navCtrl.pop();  /*返回上一个页面*/
        } else {
          this.navCtrl.popToRoot(); /*回到根页面*/
        }
      } else {
        this.noticeSer.showToast(data.error_message);

      }
    });
  }



  ionViewWillUnload() {
    //清理定时器，收回资源
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}

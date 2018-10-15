import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess';

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  public UpdatephonenumPage = 'UpdatephonenumPage';
  public userInfo = {
    userName: '',
    nickName: '',
    beInviteCode: '',
    headPhoto: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, private noticeSer: ToastProvider,
    private config: ConfigProvider, public httpService: HttpServicesProvider, private rlogin: RloginprocessProvider) {
  }


  ionViewWillEnter() {
    this.refreshUser();
  }


  refreshUser() {
    let token = this.storage.get('token');
    if (token) {
      let api = 'v1/PersonalCenter/GetPersonalInfo/' + token;
      this.httpService.requestData(api, (data) => {
        if (data.error_code == 0) {//请求成功
          let tempData = data.data;
          this.userInfo.userName = tempData['personDataMap'].UserName;
          console.log(this.userInfo.userName);
          this.userInfo.nickName = tempData['personDataMap'].NickName;
          this.userInfo.beInviteCode = tempData['personDataMap'].BeInviteCode;
          this.userInfo.headPhoto = tempData['personDataMap'].HeadPhoto;
        } else if (data.error_code == 3) {//token过期
          this.rlogin.rLoginProcessWithHistory(this.navCtrl);
        }
        else {
          this.noticeSer.showToast('数据获取异常：' + data.error_message);
        }
      });
    }
  }

  setAttr(type){
      this.navCtrl.push('SetattrPage',{type:type});
  }
  loginOut() {

    //用户信息保存在localstorage
    this.storage.remove('token');

    this.storage.remove('userInfo');

    //跳转到用户中心

    this.navCtrl.popToRoot();

  }
}

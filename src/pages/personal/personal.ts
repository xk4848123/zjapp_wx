import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { ToastProvider } from '../../providers/toast/toast';

import { ImgProvider } from '../../providers/img/img';

import { ConfigProvider } from '../../providers/config/config';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess'

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  public userInfo = {
    userName:'',
    nickName:'',
    beInviteCode:'',
    headPhoto:''
  }

  public test = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, private noticeSer: ToastProvider,
    private imgSer: ImgProvider, private config: ConfigProvider, public httpService: HttpServicesProvider,private rlogin:RloginprocessProvider) {
  }

  ionViewDidLoad() {
    this.initImgSer();
    
  }

  ionViewWillEnter() {
    this.refreshUser();
  }
  // 初始化上传图片的服务
  private initImgSer() {
    this.imgSer.uploadApi = this.config.apiUrl + 'v1/upload'; // 上传图片的url，如果同默认配置的url一致，那无须再设置
    this.imgSer.upload.params = { token: this.storage.get('token') }
    this.imgSer.upload.success = (data) => {
      //上传成功后的回调处理
      this.updateHttpCatalogue(data.data);

    };
    this.imgSer.upload.error = (err) => {
      this.noticeSer.showToast('错误：头像上传失败！');
    };
  }
  changeHead() {
    this.imgSer.showPicActionSheet();
  }

  refreshUser() {
    let token = this.storage.get('token');
    if (token) {
      let api = 'v1/PersonalCenter/initPersonalCenterData/' + token;
      this.httpService.requestData(api, (data) => {
        if (data.error_code == 0) {//请求成功
          let tempData = data.data;
          this.userInfo.userName = tempData['personDataMap'].UserName;
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

  updateHttpCatalogue(httpCatalogue) {
    let api = 'v1/PersonalCenter/updateHeadPhoto/' + this.storage.get('token');
    this.httpService.doFormPost(api, {
      headPhoto: httpCatalogue
    }, (res) => {
      if (res.error_code == 0) {
        this.noticeSer.showToast('更新头像成功');
      } else if (res.error_code == 3) {//token过期
        this.rlogin.rLoginProcess(this.navCtrl);
      }else {
        this.noticeSer.showToast('错误：上传失败！' + res.error_message);
      }
    });
  }

  loginOut() {

    //用户信息保存在localstorage
    this.storage.remove('token');

    this.storage.remove('userInfo');

    //跳转到用户中心

    this.navCtrl.popToRoot();

  }
}

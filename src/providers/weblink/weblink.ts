import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
/*
  Generated class for the WeblinkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeblinkProvider {

  constructor(public loadingCtrl: LoadingController,
    private storage: StorageProvider, private themeableBrowser: ThemeableBrowser, private config: ConfigProvider) {
    console.log('Hello WeblinkProvider Provider');
  }

  loading: any;

  private options = {
    //这里我仅仅定义了状态栏颜色（ios下有效）和关闭按妞，以及工具条的颜色和标题颜色
    statusbar:
    {
      color: '#ffffffff'
    },
    toolbar: {
      height: 44,
      color: '#f0f0f0ff'
    },
    title:
    {
      color: '#003264ff',
      showPageTitle: true
    },
    closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    backButtonCanClose: true
  };

  goWeb(webUrl) {

    this.themeableBrowser.create(webUrl, '_blank', this.options);
 
  }

  wxGoWebPay(token, orderNo, realpay, orderType) {
    let web_url: string = this.config.domain + "/zjapp/wechat/wechatauth.wxpaydo?token=" + token + "&orderno=" + orderNo + "&realpay=" + realpay + "&ordertype=" + orderType;
    this.show();
    setTimeout(() => {
      window.location.href = web_url;
    }, 500);
  }

  show() {
    this.loading = this.loadingCtrl.create({
      content: '跳转支付中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.hide();
    }, 3000);
  }
  // 隐藏loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

}
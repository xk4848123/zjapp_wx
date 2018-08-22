import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { ConfigProvider } from '../../providers/config/config';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  public SetpaypasswordPage='SetpaypasswordPage';

  public UpdatepasswordPage='UpdatepasswordPage';

  constructor(public navCtrl: NavController, private themeableBrowser: ThemeableBrowser, public config: ConfigProvider) {
  }
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
  
  aboutUs() {
    let web_url: string = this.config.domain + '/html/sysaticle.html?id=1';
    this.themeableBrowser.create(web_url, '_blank', this.options);

  }
}

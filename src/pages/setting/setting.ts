import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';

import { WeblinkProvider } from '../../providers/weblink/weblink';
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

  public AddressPage = 'AddressPage';

  // public AddressPage='AddressPage';

  constructor(public navCtrl: NavController, private webLink: WeblinkProvider, public config: ConfigProvider) {

  }
  
  aboutUs(){
    this.webLink.goWeb(this.config.domain + '/html/sysaticle.html?id=2');
  }

}

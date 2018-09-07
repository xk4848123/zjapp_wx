import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeblinkProvider } from '../../providers/weblink/weblink';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
@Component({
  selector: 'page-index-adv',
  templateUrl: 'index-adv.html',
})
export class IndexAdvPage {
  public focusList=[];  /*数组 轮播图*/
  constructor(public storage: StorageProvider,public config: ConfigProvider,public web:WeblinkProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexAdvPage');
  }
  getFocus(){
    this.focusList=[
      {img:'assets/imgs/1.png'},
      {img:'assets/imgs/2.png'},
      {img:'assets/imgs/3.png'}
    ];
  }
  newUser(){
    let token = this.storage.get("token");
    if(token==null){
      this.navCtrl.push('LoginPage',{history:'history'});
    }else{
      this.web.goWeb(this.config.domain+"/html/newpeople.html?token="+token);
    }
  }
  goSign(){
    let token = this.storage.get("token");
    if(token==null){
      this.navCtrl.push('LoginPage',{history:'history'});
    }else{
      this.web.goWeb(this.config.domain+"/html/signIn.html?token="+token);
    }
  }
}

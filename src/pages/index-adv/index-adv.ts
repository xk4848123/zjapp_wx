import { Component } from '@angular/core';
import { NavController, NavParams, ItemContent } from 'ionic-angular';

import { WeblinkProvider } from '../../providers/weblink/weblink';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import { ToastProvider } from '../../providers/toast/toast';
@Component({
  selector: 'page-index-adv',
  templateUrl: 'index-adv.html',
})
export class IndexAdvPage {
  public focusList=[];  /*数组 轮播图*/
  constructor(public toast:ToastProvider,public storage: StorageProvider,public config: ConfigProvider,public web:WeblinkProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexAdvPage');
  }
  /**轮播页跳转 */
  go(item){
    if(item.type==1){
      this.navCtrl.push("ProductDetailPage",{
        "id":item.productId
      });
    }else if(item.type==2){
      this.navCtrl.push("ProductlistPage",{
        "id":item.key,
        "categoryname":"热门推荐"
      });
    }
  }
  getFocus(){
    this.focusList=[
      {img:'assets/imgs/1.png',type:"2","productId":76,"key":"110"},
      {img:'assets/imgs/2.png',type:"1","productId":76,"key":""},
      {img:'assets/imgs/3.png',type:"1","productId":76,"key":""}
    ];
  }

  commercial(){
    this.navCtrl.push('CommercialPage')
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
  goOldUser(){
    this.navCtrl.push('MembersProductPage');
  }
  gobulk(){
    this.toast.showToast("暂未开放,敬请期待！");
  }
}

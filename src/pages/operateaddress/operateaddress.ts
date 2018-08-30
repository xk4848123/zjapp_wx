import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OperateaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operateaddress',
  templateUrl: 'operateaddress.html',
})
export class OperateaddressPage {

  title:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('id')){
      this.title = '编辑地址';
    }else{
      this.title = '添加新地址';
    }
  }

  ionViewDidLoad() {
   
  }

}

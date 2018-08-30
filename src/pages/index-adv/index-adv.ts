import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-index-adv',
  templateUrl: 'index-adv.html',
})
export class IndexAdvPage {
  public focusList=[];  /*数组 轮播图*/
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexAdvPage');
  }
  getFocus(){
    this.focusList=[
      {img:'assets/imgs/1.png'},
      {img:'assets/imgs/2.png'},
      {img:'assets/imgs/3.png'},
      {img:'assets/imgs/4.jpg'},
      {img:'assets/imgs/5.png'},
      {img:'assets/imgs/6.png'}
    ];
  }
}

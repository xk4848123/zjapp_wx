import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommercialdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commercialdetail',
  templateUrl: 'commercialdetail.html',
})
export class CommercialdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('curId'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommercialdetailPage');
  }

}

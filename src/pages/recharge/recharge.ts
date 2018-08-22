import { Component, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {

  public money = '100';

  public num: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private renderer2: Renderer2, private el: ElementRef) {
  }

  ionViewWillEnter() {
    this.num = 0;
  }

  choose($event) {
    let moneyDiv = $event.target;
    let tempMoney = moneyDiv.innerHTML;
    if (!isNaN(tempMoney)) {
      this.num++;
      this.money = tempMoney;
      let flow_divs_array = this.el.nativeElement.querySelectorAll('.flow_divs');
      for (let i = 0; i < flow_divs_array.length; i++) {
        let children = flow_divs_array[i].children;
        for (let j = 0; j < children.length; j++) {
          this.renderer2.setStyle(children[j], 'border', '');
          this.renderer2.setStyle(children[j], 'box-shadow', '0 0.1rem 0.1rem #888888');
        }
      }
      this.renderer2.setStyle(moneyDiv, 'border', '1px solid red');
      this.renderer2.setStyle(moneyDiv, 'box-shadow', '0 0');
    }
  }

  inputClick() {
    if (this.num == 0) {
      this.money = '';
      // this.renderer2.setStyle(moneyDiv,'innerHTML','');
      this.num++;
    }
  }
  pay() {
    this.navCtrl.push('PaymentPage', {
      money: this.money
    });
  }

}

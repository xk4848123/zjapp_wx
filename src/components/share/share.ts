import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { ViewController } from 'ionic-angular';
import { AppshareProvider } from '../../providers/appshare/appshare';
import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the ShareComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'share',
  templateUrl: 'share.html'
})
export class ShareComponent {

  text: string;

  constructor(public viewCrl:ViewController,public appshare :AppshareProvider,public alert:AlertProvider) {
    console.log('Hello ShareComponent Component');
    this.text = 'Hello World';
  }
  dimiss(){
    this.viewCrl.dismiss();
  }
  /**分享 */
  share(num){
    if(num==1){
      this.appshare.wxShare(0);
    }else if(num==2){
      this.appshare.wxShare(1);
    }else if(num==3){
      this.appshare.wxShare(2);
    }else if(num==4){
      this.appshare.qqShare(0);
    }else if(num==5){
      this.appshare.qqShare(1);
    }else{
      this.alert.showAlert('系统异常','',['ok']);
    }
  }
}

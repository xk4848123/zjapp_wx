import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertProvider } from '../../providers/alert/alert';
import { LoginPage } from '../../pages/login/login';
@Component({
  selector: 'car-modal',
  templateUrl: 'car-modal.html'
})
export class CarModalComponent {
  public productname:(string);
  public price:(any);
  public elec:(any);
  public img:(any);
  public num:(any);
  public id:(any);
  public productspecs:(any);
  public buyNumber = 1;
  public specId:(number);
  constructor(public navCtrl :NavController,public params: NavParams,public config :ConfigProvider,public viewCrl:ViewController,public storage:StorageProvider,public alert: AlertProvider) {
    this.productname = params.get("productname");
    this.num = params.get("stocknum");
    this.price = params.get("price");
    this.elec = params.get("elecnum");
    this.id = params.get("id");
    this.img = params.get("productphotos");
    this.productspecs = params.get("productspecs");
  }
  /**立即购买 */
  buynow(){
    if(this.storage.get("token")==null){
      var title="未登录";
      var content = "小主，去登陆吧？";
      var ass = "";
      var buttons = [{
      text:"取消",
      role:'cancle',
      handler:()=>{
      }
    },{
      text:"确认",
      role:"destructive",
      handler:()=>{
        this.navCtrl.push(LoginPage);
        this.viewCrl.dismiss();
      }
    }];
    this.alert.showMoreAlert(title,content,ass,buttons);
    }else{
      console.log(this.specId);
      if(this.specId == null){
        this.alert.showAlert('未选择规格','',['ok']);
      }else{
        this.viewCrl.dismiss();
      }
    }
  }
  /**点击空白销毁modal */
  dimiss(){
    this.viewCrl.dismiss();
  }
  /**数量减 */
  onMinus(){
    if(this.buyNumber>1){
      this.buyNumber--;
    }
  }
  /**数量+ */
  onAdd(){
    this.buyNumber++;
  }
  /**选择规格 */
  choiceSpec(specid){
    this.specId = specid;
  }
  /**加入购物车 */
  addCart(){
    if(this.storage.get("token")==null){
      var title="未登录";
      var content = "小主，去登陆吧？";
      var ass = "";
      var buttons = [{
      text:"取消",
      role:'cancle',
      handler:()=>{
      }
    },{
      text:"确认",
      role:"destructive",
      handler:()=>{
        this.navCtrl.push(LoginPage);
        this.viewCrl.dismiss();
      }
    }];
    this.alert.showMoreAlert(title,content,ass,buttons);
    }else{
      console.log(this.specId);
      if(this.specId == null){
        this.alert.showAlert('未选择规格','',['ok']);
      }else{
        this.viewCrl.dismiss();
      }
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
// import{ IndexAdvPage } from '../index-adv/index-adv';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';
import { AlertProvider } from '../../providers/alert/alert';
import { DomSanitizer } from '@angular/platform-browser';/*转译html标签*/
// import { CartPage } from '../cart/cart';
import { CarModalComponent } from '../../components/car-modal/car-modal';
import { ShareComponent } from '../../components/share/share';
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  public id :(number);
  public product :(any);
  public productText :(string);
  public focusList=[];  /*数组 轮播图*/
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService: HttpServicesProvider,public config:ConfigProvider,public alertProvider:AlertProvider,public sanitizer: DomSanitizer,public app:App) {
    this.id = navParams.get("id");
    this.getFocus();
    this.getPicText();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  getFocus(){
    var api = "v1/ProductManager/getProductDetails";
    var param = {"productId":this.id};
    this.httpService.requestData(api,(data)=>{
      if(data.error_code!=0){
        this.alertProvider.showAlert('数据获取异常','',['ok']);
        return;
      }
      this.product = data.data.product;
      for(let i=0;i<data.data.product.productphotos.length;i++){
        this.focusList.push(data.data.product.productphotos[i].photo);
      }
    },param)
  }
  /*获取图文详情*/
  getPicText(){
    var api =  "v1/ProductManager/getProductImgAndText";
    var param = {"productId":this.id};
    this.httpService.requestData(api,(data)=>{
      if(data.error_code!=0){
        this.alertProvider.showAlert('数据获取异常','',['ok']);
        return;
      }
      var reg = new RegExp("/upload","g");
      this.productText = data.data.replace(reg,this.config.domain+"/upload");
    },param)
  }
  /**转译html标签 */
  assembleHTML(strHTML:any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  /*客服 */
  goTel(){
    var title="客服电话";
    var content = "0571-57183790";
    var ass = "";
    var buttons = [{
      text:"取消",
      role:'cancle',
      handler:()=>{
        console.log("点击取消");
      }
    },{
      text:"确认",
      role:"destructive",
      handler:()=>{
        console.log("点击确认");
      }
    }];
    this.alertProvider.showMoreAlert(title,content,ass,buttons);
  }
  /**跳转购物车 */
  goShop(){
    this.navCtrl.push('CartPage');
  }
  /**加入购物车 */
  joinShop(){
    this.alertProvider.showAlertM(CarModalComponent,this.product);
  }
  /**立即购买 */
  goBuy(){
    this.alertProvider.showAlertM(CarModalComponent,this.product);
  }
  choiceSpec(){
    this.alertProvider.showAlertM(CarModalComponent,this.product);
  }
  /**分享 */
  share(){
    this.alertProvider.showAlertM(ShareComponent,this.product);
  }
}

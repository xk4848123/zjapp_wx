///<reference path="../../services/jquery.d.ts"/>
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  public elec:(number);
  public specname:(any);
  public specid:(any);
  public productid:(any);
  public price:(any);
  public productname:(any);
  public buynum:(any);
  public img :(any);
  public deduRedback = 0;
  public dedubuy = 0;
  public deduCash = 0;
  public redBak:(boolean) = false;
  public buy:(boolean) = false;
  public cash:(boolean) = false;
  public res:(any);
  public isup = false;
  public clientHeight:(any);
  public realpay = 0;
  public token :(any);
  public addressName:(any);
  public addressPhone:(any);
  public address:(any);
  public addressDetail:(any);
  public remainCoupon:(any);
  public remainPay:(any);
  public remainCash:(any);
  public productArray = [];
  public maxCoupon = 0;
  public allAmount = 0;
  constructor(public alert:AlertProvider,public navCtrl: NavController, public navParams: NavParams,private event: Events, public config:ConfigProvider,public httpservice : HttpServicesProvider,public storage:StorageProvider,public rlogin:RloginprocessProvider) {
    // this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.productArray = navParams.get("product");
    console.log("------");
    console.log(this.productArray);
    console.log("------");
    /**总价 */
    for(var i=0;i<this.productArray.length;i++){
      this.allAmount = this.allAmount+this.productArray[i].buynum*this.productArray[i].specPrice;
    }
    /**可使用红包数 */
    for(var j=0;j<this.productArray.length;j++){
      this.maxCoupon = this.maxCoupon + (this.productArray[j].specElec/2)*this.productArray[j].buynum;
    }
    console.log(this.maxCoupon);
  }
  ionViewWillEnter(){
    this.token = this.storage.get("token");
    var api = "v1/PersonalCenter/GetPersonalAccountBalance/"+this.token;
    this.httpservice.requestData(api,(data)=>{
        if(data.error_code==3){
          this.rlogin.rLoginProcessWithHistory(this.navCtrl);
        }else{
          this.res={
            "redBak":data.data.personDataMap.Coupon,
            "buy":data.data.personDataMap.RemainPoints,
            "cash":data.data.personDataMap.RemainElecNum
          }
          this.remainCoupon = this.res.redBak;
          this.remainPay = this.res.buy;
          this.remainCash = this.res.cash;
        }
    })
    this.getDefaultAddress();
  }
  /**获取用户默认地址 */
  getDefaultAddress(){
    var api = "v1/AddressManager/getDefaultAddressOfUser";
    var params = {
      "token":this.token
    }
    this.httpservice.doFormPost(api,params,(data)=>{
      if(data.error_code==0){
        this.addressName = data.data.Name;
        this.addressPhone = data.data.Phone;
        this.address = data.data.ProvinceName+data.data.CityName+data.data.RegionName;
        this.addressDetail = data.data.DetailAddress;
      }else{
        // this.rlogin.rLoginProcessWithHistory(this.navCtrl);
      }
    })
  }
  /**回调获取用户地址 */
  getUserAddress(addressId){
    var api = "v1/AddressManager/getAddressOfUserById/"+this.token+'/'+addressId;
    this.httpservice.requestData(api,(data)=>{
      if(data.error_code==0){
        this.addressName = data.data.Name;
        this.addressPhone = data.data.Phone;
        this.address = data.data.ProvinceName+data.data.CityName+data.data.RegionName;
        this.addressDetail = data.data.DetailAddress;
      }else{
        this.rlogin.rLoginProcessWithHistory(this.navCtrl);
      }
    })
  }
  /**选择地址 */
  toAddress(){
    let action = (msg)=>{
      return new Promise((resolve,reject)=>{
        if(msg!=undefined){
          this.getUserAddress(msg);
          resolve('ok');
        }else{
          reject(Error('error'));
        }
      });
    }
    this.navCtrl.push("AddressPage",{'action':action});
  }
  /**监听键盘弹出，收起 android */
  ionViewDidLoad() {
  //   var that = this;
  //   $(window).on('resize', function () {
  //     $('body').height(that.clientHeight);
  //     var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //     if(that.clientHeight < nowClientHeight){
  //       that.isup = true;
  //     }
  // });
  }
  /**监听键盘弹出，收起 ios*/
  blurInput(){
    this.isup = false;
  }
  focusInput(){
    this.isup = true;
  }
  /**处理减法精度丢失 */
    subDouble(f,s,digit){
      var m = Math.pow(10, digit);
      return Math.round((f*m-s*m))/m;
    }
    /**处理三个数减法精度丢失 */
    subDouble3(f,s,t,digit){
      var m = Math.pow(10, digit);
      var middle =  Math.round((f*m-s*m))/m;
      return Math.round((middle*m-t*m))/m;
    }
     /**处理四个数减法精度丢失 */
     subDouble4(f,s,t,fouth,digit){
      var m = Math.pow(10, digit);
      var middle =  Math.round((f*m-s*m))/m;
      var middle1 = Math.round((middle*m-t*m))/m;
      return Math.round((middle1*m-fouth*m))/m;
    }
  /**监听币值切换 */
  clickcash(){
    if(this.redBak==true && this.buy==true && this.cash==true){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==false && this.cash==true){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  0;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==true && this.cash==false){
      this.deduRedback  = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==false && this.cash==false){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  0;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==false && this.cash==false){
      this.deduRedback = 0;
      this.dedubuy = 0;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==false && this.cash==true){
      this.deduRedback = 0;
      this.dedubuy = 0;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==true && this.cash==false){
      this.deduRedback = 0;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else{
      this.deduRedback = 0;
      this.dedubuy = this.allAmount-this.deduRedback>=this.res.buy ? this.res.buy: this.allAmount - this.deduRedback;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }
  }
  clickred(){
    if(this.redBak==true && this.buy==true && this.cash==true){
      this.deduRedback = 0;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==false && this.cash==true){
      this.deduRedback = 0;
      this.dedubuy = 0;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==true && this.cash==false){
      this.deduRedback = 0;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==false && this.cash==false){
      this.deduRedback = 0;
      this.dedubuy = 0;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==false && this.cash==false){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy = 0;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==false && this.cash==true){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy = 0;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==true && this.cash==false){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else{
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }
  }
  clickbuy(){
    if(this.redBak==true && this.buy==true && this.cash==true){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  0;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==false && this.cash==true){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==true && this.cash==false){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  0;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==true && this.buy==false && this.cash==false){
      this.deduRedback = this.res.redBak>=this.maxCoupon ? this.maxCoupon : this.res.redBak;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==false && this.cash==false){
      this.deduRedback = 0;
      this.dedubuy =  this.subDouble(this.allAmount,this.deduRedback,2)>=this.res.buy ? this.res.buy: this.subDouble(this.allAmount,this.deduRedback,2);
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==false && this.cash==true){
      this.deduRedback = 0;
      this.dedubuy = this.allAmount-this.deduRedback>=this.res.buy ? this.res.buy: this.allAmount - this.deduRedback;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else if(this.redBak==false && this.buy==true && this.cash==false){
      this.deduRedback = 0;
      this.dedubuy =  0;
      this.deduCash = 0;
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }else{
      this.deduRedback = 0;
      this.dedubuy = 0;
      this.deduCash = this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2)>=this.res.cash ? this.res.cash : this.subDouble3(this.allAmount,this.deduRedback,this.dedubuy,2);
      this.realpay = this.subDouble4(this.allAmount,this.deduRedback,this.dedubuy,this.deduCash,2);
    }
  }
}

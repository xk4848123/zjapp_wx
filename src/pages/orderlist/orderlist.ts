import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';
import { AlertController } from 'ionic-angular';
import { VerifypasswordProvider } from '../../providers/verifypassword/verifypassword';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess';
//申请退款
import { RefundPage } from '../refund/refund';

//申请退货
import { SalereturnPage } from '../salereturn/salereturn';
//查看物流
import { InformationPage } from '../information/information';


/**
 * Generated class for the OrderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {

  @ViewChild(Navbar) navBar: Navbar;

  public tempData='';
  public pageStackLength = 0; 
  public cancer='';
  public confirm='';
  public orderData:(any);
  constructor(public rlogin:RloginprocessProvider,public passwordProvider:VerifypasswordProvider,public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public httpService: HttpServicesProvider, public toast: ToastProvider, private config: ConfigProvider, private alertCtrl: AlertController) {
    this.pageStackLength  = this.navCtrl.length();
  }

  ionViewDidLoad() {
    if (this.navParams.get('behindHandle')) {
      console.log('注册回退重写');
      this.navBar.backButtonClick = ()=>{
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.pageStackLength-2));
      }
    }
  }
  ionViewWillEnter() {
    //接受从订单列表页传过来的参数
    let token = this.storage.get('token');
    if (token) {
      //api请求
      let api = 'v1/PersonalCenter/getOrderDetails/' + token + '/' + this.navParams.get('orderId');
      this.httpService.requestData(api, (data) => {
        console.log(data);
        if (data.error_code == 0) {
          this.tempData = data.data;
          this.orderData = data.data;
          console.log(this.tempData);
        } else if(data.error_code == 3){
          //抢登处理
        }
        else {
          this.toast.showToast(data.error_message);
        }
      });
    }

  }
  //申请退款
  pushrefund(orderNo,item){
    this.navCtrl.push('RefundPage',
    {
      orderNo:this.navParams.get('orderNo'),
      item:this.navParams.get('item')
    });
  }
   //申请退货
   pushsale(orderNo,item){
    this.navCtrl.push('RefundPage',
    {
      orderNo:this.navParams.get('orderNo'),
      item:this.navParams.get('item')
    });
  }
   //取消订单
   pushcancelOrder(item) {
    this.cancer=item.orderno;
    console.log(this.cancer);
    let token = this.storage.get('token');
    if (token) {
      //api请求
      let api = 'v1/PersonalCenter/cancelOrder/' +token;
       //发送请求提交退款申请
       this.httpService.doFormPost(api,{orderNo:this.cancer } ,(data) => {
        console.log(data);
          if (data.error_code == 0) {
             this.navCtrl.pop();
         } else if(data.error_code == 3){
           //抢登处理
         }
         else {
           this.toast.showToast(data.error_message);
         }
      });
    }
  }
  //确认收货
  confirmorder(item){
    this.confirm=item.orderno;
    console.log(this.confirm);
    let token = this.storage.get('token');
    if (token) {
      //api请求
      let api = 'v1/PersonalCenter/confirmOrder/' +token;
      //发送请求提交退款申请
      this.httpService.doFormPost(api,{orderNo:this.confirm } ,(data) => {
        console.log(data);
          if (data.error_code == 0) {
            this.navCtrl.pop();
        } else if(data.error_code == 3){
          //抢登处理
        }
        else {
          this.toast.showToast(data.error_message);
        }
      });
    }
  }
  //查看物流
  information(orderId,orderNo,item){
    this.navCtrl.push('InformationPage',
    {orderId: orderId,
    orderNo: orderNo,
    item:item 
    });
  }
  //立即支付
  payNow(){
    var api = "v2/PersonalCenter/HandleEOrder/"+this.storage.get('token');
    var params = {
      "orderNo":this.orderData.orderno
    }
    this.httpService.doFormPost(api,params,(data)=>{
      console.log(data);
      if(data.data.type==1){
        //使用虚拟货币未使用钱 
        this.passwordProvider.execute(this.navCtrl,()=>{
          var api = "v1/PersonalCenter/syncHandleOrder/"+this.storage.get('token');
          var params = {
            "orderNo":data.data.datas
          }
          this.httpService.doFormPost(api,params,(data)=>{
            if(data.error_code==0){
              this.navCtrl.push('PaysuccessPage',{
                "orderType":"1"
              });
            }else if(data.error_code==3){
              this.rlogin.rLoginProcess(this.navCtrl);
            }else{
              this.toast.showToast(data.error_message);
            }
          });
        });
      }else if(data.data.type==2){
        //使用钱
        this.navCtrl.push('PaymentPage',{
          orderNo: data.data.datas.orderNo,
          realpay: data.data.datas.realpay,
          orderType: data.data.datas.orderType
        });
      }else if(data.data.type==3){
        //使用虚拟货币使用钱
        this.passwordProvider.execute(this.navCtrl,()=>{
          this.navCtrl.push('PaymentPage',{
            orderNo: data.data.datas.orderNo,
            realpay: data.data.datas.realpay,
            orderType: data.data.datas.orderType
          });
        });
      }
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//订单详情页
import { OrderlistPage} from '../orderlist/orderlist';

// import { ReceivingPage} from '../receiving/receiving';
// //待收货
// import { ShipmentsPage} from '../shipments/shipments';
//待评价

import { StorageProvider } from '../../providers/storage/storage';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ToastProvider } from '../../providers/toast/toast';
import { ConfigProvider } from '../../providers/config/config';

import {ToastController  } from 'ionic-angular';


/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
public temp='';
typeData:any;
page:number;
pageNum:number;
public tempDatas=[];
cnt:number =0;//条数
public datas='';
//public bPage = OrdersdetailPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public httpService:HttpServicesProvider,public toast: ToastProvider,
                  private config:ConfigProvider,private toastCtrl:ToastController) {
                    
                    // this.bPage = OrdersdetailPage;
  }
  //从订单页面到订单详情页
  pushdetail(item){
    //console.log('订单详情页');
    this.navCtrl.push('OrderlistPage',
    {item:item['id']});
  }
  // receiving(){
  //   this.navCtrl.push(ReceivingPage);
  // }
  // //待收货
  // shipments(){
  //   this.navCtrl.push(ShipmentsPage);
  // }
  //待评价
  //下拉刷新界面
  doRefresh(refresher){
    console.log('下拉刷新');
    //动态切换
    //当订单页面数量为3
    if(this.temp.length==3){
       this.temp=this.temp;
    }else{
      console.log(222);
    }
    setTimeout(()=>{
      console.log('加载完成后，关闭刷新');
      refresher.complete();//当数据请求完成时调用
      this.toast.showToast('加载成功');
    },2000);
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad OrdersPage');
  // }
  ionViewWillEnter(){
      //接传过来的type，page，pageNum
    this.typeData=this.navParams.get('type')
    this.page=0
    this.pageNum=3
    // console.log(this.typeData);
    let token=this.storage.get('token');
    // console.log(token);
    if(token){
      let api = 'v1/PersonalCenter/getOrder/' + token+'/'+this.typeData;
       this.httpService.requestData(api,(data)=>{
        console.log(data);
    if(data.error_code==0){
           this.temp=data.data;
           console.log(this.temp);
         
  //  for(let v in data.data){
  //       // this.tempData[data.data[v].id]=data.data[v].orderlines;

  //      this.tempDatas[data.data[v].id]=data.data[v].orderlines;
  //         }
  //         console.log(this.tempDatas);
     }else{
           this.toast.showToast('数据获取异常');
         }
      },{page: this.page,pageNum: this.pageNum});
    }
  }
  //上拉加载数据
  doInfinite(infiniteScroll){
    
            setTimeout(() => { 
                console.log('加载完成后，关闭刷新'); 
                infiniteScroll.complete();
    
                //toast提示
                this.showInfo("加载成功");
                //加载成功增加一条数据
                this.pageNum ++;
              //  var data1 = {name:'yellowcong'+this.cnt,age:'1994', gender:'1', description:'三炮',img:"http://www.runoob.com/try/demo_source/venkman.jpg"};
                //this.users.push(data1);
                this.typeData=this.navParams.get('type')
                this.page=+1;
                
                let token=this.storage.get('token');
                if(token){
                  let api = 'v1/PersonalCenter/getOrder/' + token+'/'+this.typeData;
                   this.httpService.requestData(api,(data)=>{
                    console.log(data);
                if(data.error_code==0){
                       this.temp=data.data;
                       console.log(this.temp);
                      this.temp
                 }else{
                       this.toast.showToast('数据获取异常');
                     }
                  },{page: this.page,pageNum: this.pageNum});
                }
                if(this.pageNum >=10){
                    //如果都加载完成的情况，就直接 disable ，移除下拉加载
                    infiniteScroll.enable(false);
                    //toast提示
                    this.showInfo("已加载所有");
                }
            }, 2000);
        }
         //显示toast消息
    showInfo(msg){
      let toast = this.toastCtrl.create({
          message: msg, //提示消息
          duration: 3000,//3秒后自动消失
          position: 'bottom',//位置top,bottom
          showCloseButton:true, //是否显示关闭按钮
          closeButtonText:"关闭" //关闭按钮字段
      });
       //关闭后执行的操作
   toast.onDidDismiss(() => { console.log('toast被关闭之后执行'); });

        //显示toast
        toast.present();//符合触发条件后立即执行显示。
}
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

//工具服务
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public list=[];
  public LoginPage='LoginPage';


  public allPrice=0;  /*总价*/
  public leaveWord=''; /*留言*/

  public userinfo='';
  public address='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public httpService:HttpServicesProvider,public config:ConfigProvider,public tools:ToolsProvider) {
  }

  ionViewWillEnter(){

    //获取用户信息
    this.userinfo=this.tools.getUserInfo();
    //获取订单信息
    this.list=this.storage.get('order_data');
    // console.log(this.list);
    if(this.userinfo)  /*用户登录*/
    {
      this.getDefaultAddress();
      
    }

    if(this.list){
        //调用计算总价的方法
        this.sumPrice();
    }
  
    
  }

  ionViewDidEnter(){
     
  }

  //获取默认收货地址

  getDefaultAddress(){

    //获取签名
    let userinfo:any=this.userinfo;

    let json={
      uid:userinfo['_id'],
      salt:userinfo.salt
    }
    let sign=this.tools.sign(json);

    //请求数据
    let api='api/oneAddressList?uid='+userinfo['_id']+'&sign='+sign;

    this.httpService.requestData(api,(data)=>{

      // console.log(data);
      if(data.success){

        console.log(data.result);

        // this.address=''
        this.address=data.result[0];
        
      }else{
        this.address=''

      }

    })



  }
 //提交订单
  goPayment(){

    // console.log(this.userinfo);   //用户信息
    // console.log(this.address);   //收货地址
    // console.log(this.list);  //商品



    if(!this.userinfo){

       this.navCtrl.push('LoginPage',{
           history:'order'
       })
    }else if(!this.address){

       alert('您还没有选择收货地址');

    }else{

        //提交订单

            let userinfo:any=this.userinfo;  
            // var uid:any=userinfo['_id'];
            var address:any=this.address['address'];
            var phone:any=this.address['phone'];
            var name:any=this.address['name'];
            var all_price=this.allPrice;
            var products:any=JSON.stringify(this.list);

            //签名的字段
            let json={
              uid:userinfo._id,
              salt:userinfo.salt,
              address:address,
              phone:phone,
              name:name,
              all_price:all_price
            }
  
            let sign=this.tools.sign(json);
  
            //请求数据
            let api='api/doOrder';      
            this.httpService.doPost(api,{
              uid:userinfo._id,
              salt:userinfo.salt,
              address:address,
              phone:phone,
              name:name,
              all_price:all_price,
              sign:sign,
              products:products
  
            },(data)=>{          
                if(data.success){
                  this.navCtrl.push('PaymentPage');
                  // alert('成功')

                  console.log(data);
                }else{
                  alert(data.message);
                }
            })
  










    }




    

  }


  /*计算总价*/
  sumPrice(){
    
    
        var tempAllPrice=0;
  
        for(let i=0;i<this.list.length;i++){
  
          if(this.list[i].checked==true){
  
            tempAllPrice+=this.list[i].product_count*this.list[i].product_price;
          }
  
        }
  
        this.allPrice=tempAllPrice;
  
    }

}

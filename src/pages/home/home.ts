import { Component,ViewChild, NgZone } from '@angular/core';
import { NavController,Content } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import {Jsonp} from "@angular/http";

import { ToastProvider } from '../../providers/toast/toast';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild('search') search;
  public PcontentPage='PcontentPage';
  public focusList=[];  /*数组 轮播图*/
  public bestList=[];   /*精品推荐*/
  public bestListWidth=''; /*精品推荐数据长度*/
  public hotList=[];  /*热门商品 精品推荐*/
  public paramsA1 = new Array();/*A模块参数*/
  public paramsB1 = new Array();/*B模块参数*/
  public paramsC1 = new Array();/*C模块参数*/
  public paramsD1 = new Array();/*D模块参数*/
  public paramsG1 = new Array();/*G模块参数*/
  public paramsA2 = new Array();/*A模块参数*/
  public paramsB2 = new Array();/*B模块参数*/
  public paramsC2 = new Array();/*C模块参数*/
  public paramsD2 = new Array();/*D模块参数*/
  public paramsG2 = new Array();/*G模块参数*/
  public paramsA3 = new Array();/*A模块参数*/
  public paramsB3 = new Array();/*B模块参数*/
  public paramsC3 = new Array();/*C模块参数*/
  public paramsD3 = new Array();/*D模块参数*/
  public paramsG3 = new Array();/*G模块参数*/
  public paramsA4 = new Array();/*A模块参数*/
  public paramsB4 = new Array();/*B模块参数*/
  public paramsC4 = new Array();/*C模块参数*/
  public paramsD4 = new Array();/*D模块参数*/
  public paramsG4 = new Array();/*G模块参数*/
  public paramsA5 = new Array();/*A模块参数*/
  public paramsB5 = new Array();/*B模块参数*/
  public paramsC5 = new Array();/*C模块参数*/
  public paramsD5 = new Array();/*D模块参数*/
  public paramsG5 = new Array();/*G模块参数*/
  public paramsA6 = new Array();/*A模块参数*/
  public paramsB6 = new Array();/*B模块参数*/
  public paramsC6 = new Array();/*C模块参数*/
  public paramsD6 = new Array();/*D模块参数*/
  public paramsG6 = new Array();/*G模块参数*/
  public testParams = new Array();
  public isRed = false;
  

  constructor(public ngzone: NgZone,public navCtrl: NavController,public config:ConfigProvider,public jsonp:Jsonp,public httpService:HttpServicesProvider,private noticeSer: ToastProvider) {
   this.testParams = [{ "type": 1, "sort": 1, "title": "促/销/专/区", "content1": { "pic": "assets/imgs/mod2.png", "picType": 1, "picUrl": "" } },
    {
      "type": 2, "sort": 2, "title": "", "content1": { "pic": "assets/imgs/modb1.png", "picType": 2, "picUrl": "" },
      "content2": { "pic": "assets/imgs/modb2.png", "picType": 2, "picUrl": "" },
      "content3": { "pic": "assets/imgs/modb3.png", "picType": 2, "picUrl": "" }
    },
    {
      "type": 3, "sort": 3, "title": "畅/享/美/食", "content1": { "pic": "assets/imgs/modc1.png", "picType": 2, "picUrl": "" },
      "content2": { "pic": "assets/imgs/modc2.png", "picType": 2, "picUrl": "" }
    },
    // { "type": 1, "sort": 4, "title": "活/力/无/限", "content1": { "pic": "assets/imgs/mod2.png", "picType": 1, "picUrl": "" } },
    {
      "type": 4, "sort": 5, "title": "有/机/食/品", "content1": { "pic": "assets/imgs/modd2.png", "picType": 2, "picUrl": "" },
      "content2": { "pic": "assets/imgs/modd3.png", "picType": 2, "picUrl": "" },
      "content3": { "pic": "assets/imgs/modd1.png", "picType": 2, "picUrl": "" }
    },
    {
      "type": 5, "sort": 6, "title": "你/会/喜/欢", "content1": { "pic": "assets/imgs/product2.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 },
      "content2": { "pic": "assets/imgs/product1.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 },
      "content3": { "pic": "assets/imgs/product3.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 },
      "content4": { "pic": "assets/imgs/product4.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 }
    }
    ];
    this.getindex();
  }
  ionViewWillEnter(){
    this.get();
    this.content.ionScroll.subscribe(($event: any) => {
      this.ngzone.run(() => {//如果在页面滑动过程中对数据进行修改，页面是不会重构的。所以在对应的操作中需要使用如下方法，使页面能够重构。
          let length = $event.scrollTop;//当前滑动的距离
          if(length>=219.4){
            this.isRed = true;
          }else{
            this.isRed = false;
          }
          this.search.nativeElement//获取html中标记为one的元素
      })
  })
  }
  ionViewDidEnter() {
    this.content.ionScroll.subscribe(($event: any) => {
      this.ngzone.run(() => {//如果在页面滑动过程中对数据进行修改，页面是不会重构的。所以在对应的操作中需要使用如下方法，使页面能够重构。
          let length = $event.scrollTop;//当前滑动的距离
          if(length>=219.4){
            this.isRed = true;
          }else{
            this.isRed = false;
          }
          this.search.nativeElement//获取html中标记为one的元素
      })
  })
  }
  //加载首页收据
  getindex(){
    for(let i=0;i<this.testParams.length;i++){
      if(this.testParams[i].type==1){
        if(i==0){
          this.paramsA1 = [this.testParams[i].title,this.testParams[i].content1.pic,this.testParams[i].sort];
        }else if(i==0){
          this.paramsA2 = [this.testParams[i].title,this.testParams[i].content1.pic,this.testParams[i].sort];
        }else if(i==2){
          this.paramsA3 = [this.testParams[i].title,this.testParams[i].content1.pic,this.testParams[i].sort];
        }
        else if(i==3){
          this.paramsA4 = [this.testParams[i].title,this.testParams[i].content1.pic,this.testParams[i].sort];
        }
        else if(i==4){
          this.paramsA5 = [this.testParams[i].title,this.testParams[i].content1.pic,this.testParams[i].sort];
        }
        else if(i==5){
          this.paramsA6 = [this.testParams[i].title,this.testParams[i].content1.pic,this.testParams[i].sort];
        }
      }else if(this.testParams[i].type==2){
        if(i==0){
          this.paramsB1 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }else if(i==1){
          this.paramsB2 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }else if(i==2){
          this.paramsB3 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
        else if(i==3){
          this.paramsB4 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
        else if(i==4){
          this.paramsB5 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
        else if(i==5){
          this.paramsB6 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
      }else if(this.testParams[i].type==3){
        if(i==0){
          this.paramsC1 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl}]];
        }else if(i==1){
          this.paramsC2 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl}]];
        }else if(i==2){
          this.paramsC3 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl}]];
        }
        else if(i==3){
          this.paramsC4 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl}]];
        }
        else if(i==4){
          this.paramsC5 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl}]];
        }
        else if(i==5){
          this.paramsC6 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl}]];
        }
      }else if(this.testParams[i].type==4){
        if(i==0){
          this.paramsD1 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }else if(i==1){
          this.paramsD2 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }else if(i==2){
          this.paramsD3 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
        else if(i==3){
          this.paramsD4 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
        else if(i==4){
          this.paramsD5 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
        else if(i==5){
          this.paramsD6 = [this.testParams[i].content1.picUrl,this.testParams[i].content1.pic,this.testParams[i].content2.picUrl,this.testParams[i].content2.pic,this.testParams[i].content3.picUrl,this.testParams[i].content3.pic,this.testParams[i].title,this.testParams[i].sort];
        }
      }else if(this.testParams[i].type==5){
        if(i==0){
          this.paramsG1 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl,"picTitle":this.testParams[i].content1.picTitle,"oldPrice":this.testParams[i].content1.oldPrice,"newPrice":this.testParams[i].content1.newPrice},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl,"picTitle":this.testParams[i].content2.picTitle,"oldPrice":this.testParams[i].content2.oldPrice,"newPrice":this.testParams[i].content2.newPrice},{"img":this.testParams[i].content3.pic,"url":this.testParams[i].content3.picUrl,"picTitle":this.testParams[i].content3.picTitle,"oldPrice":this.testParams[i].content3.oldPrice,"newPrice":this.testParams[i].content3.newPrice},{"img":this.testParams[i].content4.pic,"url":this.testParams[i].content4.picUrl,"picTitle":this.testParams[i].content4.picTitle,"oldPrice":this.testParams[i].content4.oldPrice,"newPrice":this.testParams[i].content4.newPrice}]];
        }else if(i==1){
          this.paramsG2 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl,"picTitle":this.testParams[i].content1.picTitle,"oldPrice":this.testParams[i].content1.oldPrice,"newPrice":this.testParams[i].content1.newPrice},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl,"picTitle":this.testParams[i].content2.picTitle,"oldPrice":this.testParams[i].content2.oldPrice,"newPrice":this.testParams[i].content2.newPrice},{"img":this.testParams[i].content3.pic,"url":this.testParams[i].content3.picUrl,"picTitle":this.testParams[i].content3.picTitle,"oldPrice":this.testParams[i].content3.oldPrice,"newPrice":this.testParams[i].content3.newPrice},{"img":this.testParams[i].content4.pic,"url":this.testParams[i].content4.picUrl,"picTitle":this.testParams[i].content4.picTitle,"oldPrice":this.testParams[i].content4.oldPrice,"newPrice":this.testParams[i].content4.newPrice}]];
        }else if(i==2){
          this.paramsG3 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl,"picTitle":this.testParams[i].content1.picTitle,"oldPrice":this.testParams[i].content1.oldPrice,"newPrice":this.testParams[i].content1.newPrice},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl,"picTitle":this.testParams[i].content2.picTitle,"oldPrice":this.testParams[i].content2.oldPrice,"newPrice":this.testParams[i].content2.newPrice},{"img":this.testParams[i].content3.pic,"url":this.testParams[i].content3.picUrl,"picTitle":this.testParams[i].content3.picTitle,"oldPrice":this.testParams[i].content3.oldPrice,"newPrice":this.testParams[i].content3.newPrice},{"img":this.testParams[i].content4.pic,"url":this.testParams[i].content4.picUrl,"picTitle":this.testParams[i].content4.picTitle,"oldPrice":this.testParams[i].content4.oldPrice,"newPrice":this.testParams[i].content4.newPrice}]];
        }else if(i==3){
          this.paramsG4 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl,"picTitle":this.testParams[i].content1.picTitle,"oldPrice":this.testParams[i].content1.oldPrice,"newPrice":this.testParams[i].content1.newPrice},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl,"picTitle":this.testParams[i].content2.picTitle,"oldPrice":this.testParams[i].content2.oldPrice,"newPrice":this.testParams[i].content2.newPrice},{"img":this.testParams[i].content3.pic,"url":this.testParams[i].content3.picUrl,"picTitle":this.testParams[i].content3.picTitle,"oldPrice":this.testParams[i].content3.oldPrice,"newPrice":this.testParams[i].content3.newPrice},{"img":this.testParams[i].content4.pic,"url":this.testParams[i].content4.picUrl,"picTitle":this.testParams[i].content4.picTitle,"oldPrice":this.testParams[i].content4.oldPrice,"newPrice":this.testParams[i].content4.newPrice}]];
        }else if(i==4){
          this.paramsG5 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl,"picTitle":this.testParams[i].content1.picTitle,"oldPrice":this.testParams[i].content1.oldPrice,"newPrice":this.testParams[i].content1.newPrice},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl,"picTitle":this.testParams[i].content2.picTitle,"oldPrice":this.testParams[i].content2.oldPrice,"newPrice":this.testParams[i].content2.newPrice},{"img":this.testParams[i].content3.pic,"url":this.testParams[i].content3.picUrl,"picTitle":this.testParams[i].content3.picTitle,"oldPrice":this.testParams[i].content3.oldPrice,"newPrice":this.testParams[i].content3.newPrice},{"img":this.testParams[i].content4.pic,"url":this.testParams[i].content4.picUrl,"picTitle":this.testParams[i].content4.picTitle,"oldPrice":this.testParams[i].content4.oldPrice,"newPrice":this.testParams[i].content4.newPrice}]];
        }else if(i==5){
          this.paramsG6 = [this.testParams[i].title,this.testParams[i].sort,[{"img":this.testParams[i].content1.pic,"url":this.testParams[i].content1.picUrl,"picTitle":this.testParams[i].content1.picTitle,"oldPrice":this.testParams[i].content1.oldPrice,"newPrice":this.testParams[i].content1.newPrice},{"img":this.testParams[i].content2.pic,"url":this.testParams[i].content2.picUrl,"picTitle":this.testParams[i].content2.picTitle,"oldPrice":this.testParams[i].content2.oldPrice,"newPrice":this.testParams[i].content2.newPrice},{"img":this.testParams[i].content3.pic,"url":this.testParams[i].content3.picUrl,"picTitle":this.testParams[i].content3.picTitle,"oldPrice":this.testParams[i].content3.oldPrice,"newPrice":this.testParams[i].content3.newPrice},{"img":this.testParams[i].content4.pic,"url":this.testParams[i].content4.picUrl,"picTitle":this.testParams[i].content4.picTitle,"oldPrice":this.testParams[i].content4.oldPrice,"newPrice":this.testParams[i].content4.newPrice}]];
        }
      }
    }
  }
  //测试方法
  say(){
    console.log("设计师设计时尚");
  }
  //下拉刷型界面
doRefresh($event){
  this.testParams = [{ "type": 1, "sort": 1, "title": "促/销/专/区", "content1": { "pic": "assets/imgs/mod2.png", "picType": 1, "picUrl": "" } },
    {
      "type": 2, "sort": 2, "title": "", "content1": { "pic": "assets/imgs/modb1.png", "picType": 2, "picUrl": "" },
      "content2": { "pic": "assets/imgs/modb2.png", "picType": 2, "picUrl": "" },
      "content3": { "pic": "assets/imgs/modb3.png", "picType": 2, "picUrl": "" }
    },
    {
      "type": 3, "sort": 3, "title": "畅/享/美/食", "content1": { "pic": "assets/imgs/modc1.png", "picType": 2, "picUrl": "" },
      "content2": { "pic": "assets/imgs/modc2.png", "picType": 2, "picUrl": "" }
    },
    // { "type": 1, "sort": 4, "title": "活/力/无/限", "content1": { "pic": "assets/imgs/mod2.png", "picType": 1, "picUrl": "" } },
    {
      "type": 4, "sort": 5, "title": "有/机/食/品", "content1": { "pic": "assets/imgs/modd1.png", "picType": 2, "picUrl": "" },
      "content2": { "pic": "assets/imgs/modd2.png", "picType": 2, "picUrl": "" },
      "content3": { "pic": "assets/imgs/modd3.png", "picType": 2, "picUrl": "" }
    },
    {
      "type": 5, "sort": 6, "title": "你/会/喜/欢", "content1": { "pic": "assets/imgs/product2.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 },
      "content2": { "pic": "assets/imgs/product1.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 },
      "content3": { "pic": "assets/imgs/product3.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 },
      "content4": { "pic": "assets/imgs/product4.png", "picType": 2, "picUrl": "", "picTitle": "西门双子冰箱", "oldPrice": 1500, "newPrice": 1200 }
    }
    ];
  this.getindex();
  this.get();
  setTimeout(() => { 
     $event.complete();
      this.noticeSer.showToast('加载成功');
  }, 1000);
}
   //操作dom
   get(){
    var a = document.querySelectorAll('.dis');
    for(let i=0;i<this.testParams.length;i++){
      if(this.testParams[i].type==1){
        var a1 = a[i].querySelectorAll("ion-modle-a");
        a1[0]['style'].display = '';
      }else if(this.testParams[i].type==2){
        var b1 = a[i].querySelectorAll("ion-modle-b");
        b1[0]['style'].display = '';
      }else if(this.testParams[i].type==3){
        var c1 = a[i].querySelectorAll("ion-modle-c");
        c1[0]['style'].display = '';
      }else if(this.testParams[i].type==4){
        var d1 = a[i].querySelectorAll("ion-modle-d");
        d1[0]['style'].display = '';
      }else if(this.testParams[i].type==5){
        var g1 = a[i].querySelectorAll("ion-modle-g");
        g1[0]['style'].display = '';
      }
    } 
     
  }
  //定义一个跳转到搜索页面的方法
  goSearch(){
    this.navCtrl.push('SearchPage');
  }

}

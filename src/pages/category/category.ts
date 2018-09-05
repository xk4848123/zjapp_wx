import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  public ProductlistPage='ProductlistPage';  /*商品列表页面*/

  public tempDatas=[]; 

  public leftCate=[];  /*左侧分类数据*/

  public rightCate=[];  /*右侧分类数据*/


  constructor(public navCtrl: NavController,public config:ConfigProvider,public httpService:HttpServicesProvider) {
    
  }

  ionViewWillEnter(){

    this.getLeftCateData();/*左侧分类*/
    // this.getRightCateData(this.firstId);
}
  //左侧分类的方法

  getLeftCateData(){
    let api='v1/ProductManager/getProductOfCategory';
    //var api='api/pcate'
    //网络接口请求
    this.httpService.requestData(api,(data)=>{
        this.leftCate=data.data;
        
        // let i:number=0;
        for(let index=0; index < data.data.length  ; index ++){
           if(index == 0){
            this.rightCate =data.data[index].productSubCategories;
           }
          this.tempDatas[data.data[index].id]=data.data[index].productSubCategories;
        }
      
          // aaa.Id=n[productSubCategories];
          // this.tempDatas[data.data[v].id]=data.data[v].productSubCategories;
        //调用右侧分类
        //console.log(this.leftCate);
        //  this.getRightCateData(this.leftCate[0]['id']); 
    })
    // console.log(this.tempDatas);
  }

  getRightCateData(id){
   this.rightCate=this.tempDatas[id];
}
}







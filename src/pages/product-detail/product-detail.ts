import { Component,ElementRef,Renderer2,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Content } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ConfigProvider } from '../../providers/config/config';
import { AlertProvider } from '../../providers/alert/alert';
import { DomSanitizer } from '@angular/platform-browser';/*转译html标签*/
import { CarModalComponent } from '../../components/car-modal/car-modal';
import { CarMemberComponent } from '../../components/car-member/car-member';
import { ShareComponent } from '../../components/share/share';
import { StorageProvider } from '../../providers/storage/storage';
import { CartPage } from '../../pages/cart/cart';
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  @ViewChild(Content) content: Content;
  public id :(number);
  public product :(any);
  public productText :(string);
  public focusList=[];  /*数组 轮播图*/
  public starList=[];/**星星个数 */
  public comment :(string);
  public commentDetail:(any);
  public beLongToVIP = false;
  public commentHeight:(number);
  public detailHeight:(number);
  public topHeight:(number);
  public username = "";
  public headPic = "";
  constructor(private renderer2: Renderer2,public eleref:ElementRef,public navCtrl: NavController, public navParams: NavParams,public httpService: HttpServicesProvider,public config:ConfigProvider,public alertProvider:AlertProvider,public sanitizer: DomSanitizer,public app:App,public storage:StorageProvider) {

  }
  ionViewDidLoad() {
      let footer = this.eleref.nativeElement.querySelector('.tfoot-left');
      let footerHeight = footer.offsetHeight;
      let buy = this.eleref.nativeElement.querySelector('.buy');
      let join = this.eleref.nativeElement.querySelector('.join');
      this.commentHeight = this.eleref.nativeElement.querySelector('.tcomment').offsetTop;
      this.detailHeight = this.eleref.nativeElement.querySelector('.tproductText').offsetTop;
      this.topHeight = this.eleref.nativeElement.querySelector('.t-title').offsetHeight;
      footerHeight = footerHeight+2;
      footerHeight = footerHeight+2;
      this.renderer2.setStyle(buy,'height',footerHeight+'px');
      this.renderer2.setStyle(join,'height',footerHeight+'px');
      this.id = this.navParams.get("id");
      if(this.id==undefined){

      }else{
        this.storage.setSessionStorage("productId",this.id);
      }
  }

  ionViewWillEnter(){
    this.starList = [];
    if(this.id==undefined){
      this.id = this.storage.getSessionStorage("productId");
    }
    this.getFocus();
    this.getPicText();
  }
  /**获取商品详情 */
  getFocus(){
    var api = "v1/ProductManager/getProductDetails";
    var param = {"productId":this.id};
    this.httpService.requestData(api,(data)=>{
      if(data.error_code!=0){
        this.alertProvider.showAlert('数据获取异常','',['ok']);
        return;
      }
      this.beLongToVIP = data.data.beLongToVIP;
      this.product = data.data.product;
      this.commentDetail = data.data.productComment;
      if(this.commentDetail==null){
        this.commentDetail={
          "id": -1,
          "createtime": "",
          "memo": "还没有人评价呢，快来评价吧！",
          "star": 0,
          "productCommentPhotos": []
        } 
      }else{
        if(this.commentDetail.user==null){
          this.username = "匿名用户";
        }else{
          this.username = this.commentDetail.user.truename;
          this.headPic = this.commentDetail.user.headphoto;
        }
      }
      this.comment = this.commentDetail.memo;
      if(this.comment.length>42){
        this.comment = this.comment.substring(0,41)+"...";
      }
      for(let i=0;i<this.commentDetail.star;i++){
        this.starList.push(1);
      }
      for(let i=0;i<data.data.product.productphotos.length;i++){
        this.focusList.push(data.data.product.productphotos[i].photo);
      }
    },param)
  }
  /**跳转评论页 */
  goevaluation(){
    this.navCtrl.push('ProductCommentPage',{
      "id":this.id
    });
  }
  /**获取评论用户信息 */
  getUserInfo(){

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
      var reg1 = new RegExp("https://appnew.zhongjianmall.com/","g");
      this.productText = data.data.replace(reg1,'');
      this.productText = this.productText.replace(reg,this.config.domain+"/upload");
      // this.productText = data.data;
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
       
      }
    },{
      text:"确认",
      role:"destructive",
      handler:()=>{
       window.location.href = "tel:"+content;
      }
    }];
    this.alertProvider.showMoreAlert(title,content,ass,buttons);
  }
  /**跳转购物车 */
  goShop(){
    this.navCtrl.push(CartPage,{
      "isIndex":false
    });
  }
  /**加入购物车 */
  joinShop(){
    if(this.beLongToVIP == false){
      this.alertProvider.showAlertM(CarModalComponent,{
        "product":this.product
      });
    }
  }
  /**立即购买 */
  goBuy(){
    if(this.beLongToVIP == false){
      this.alertProvider.showAlertM(CarModalComponent,{
        "product":this.product
      });
    }else{
      this.alertProvider.showAlertM(CarMemberComponent,{
        "product":this.product
      });
    }
  }
  choiceSpec(){
    if(this.beLongToVIP == false){
      this.alertProvider.showAlertM(CarModalComponent,{
        "product":this.product
      });
    }else{
      this.alertProvider.showAlertM(CarMemberComponent,{
        "product":this.product
      });
    }
  }
  /**分享 */
  share(){
    this.alertProvider.showAlertM(ShareComponent,this.product);
  }
  /**跳转头部 */
  goProductDiv(){
      this.content.scrollTo(0, 0, 300);
  }
  /**跳转评价 */
  goCommentDiv(){
    this.content.scrollTo(0, this.commentHeight+this.topHeight, 300);
  }
  godetailDiv(){
  /**跳转详情 */
    this.content.scrollTo(0, this.detailHeight+this.topHeight, 300);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { RloginprocessProvider } from '../../providers/rloginprocess/rloginprocess';
import { ToastProvider } from '../../providers/toast/toast';
/**
 * Generated class for the MoneyrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moneyrecord',
  templateUrl: 'moneyrecord.html',
})
export class MoneyrecordPage {

  public type: string = 'elec';
  public datas = [];
  public page = 0;
  public pageNum = 10;
  public enable = true;
  public title = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private rlogin: RloginprocessProvider,
    private httpService: HttpServicesProvider, private storage: StorageProvider, private noticeSer: ToastProvider) {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }
    if (this.type == 'elec') {
      this.title = '现金币记录';
    }
    if (this.type == 'points') {
      this.title = '购物币记录';
    }
    if (this.type == 'vip') {
      this.title = '消费积分记录';
    }
    if (this.type == 'coupon') {
      this.title = '红包记录';
    }

  }


  ionViewWillEnter() {
    //初始化数据
    let enable: boolean = this.getData();
    this.enable = enable;
  }

  getData(): boolean {
    let enable = true;
    let token = this.storage.get('token');
    if (token) {
      let api = 'v1/PersonalCenter/accountBill/' + token;
      this.httpService.requestData(api, (data) => {
        if (data.error_code == 0) {//请求成功
          let dataLength = data.data.length;
          if (dataLength < this.pageNum) {
            enable = false;
          }
          for (let index = 0; index < dataLength; index++) {
            this.datas.push(data.data[index]);
          }
          this.page++;
        } else if (data.error_code == 3) {//token过期
          this.rlogin.rLoginProcessWithHistory(this.navCtrl);
        }
        else {
          this.noticeSer.showToast('数据获取异常：' + data.error_message);
        }
      }, { type: this.type, page: this.page, pageNum: this.pageNum });
    } else {
      enable = false;
    }
    return enable;
  }

  doInfinite(infiniteScroll) {
    let enable: boolean = this.getData();
    infiniteScroll.complete();
    infiniteScroll.enable(enable);
  }
}

import { Component,Input,ElementRef,Renderer2 } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { NavController } from 'ionic-angular';
import { WeblinkProvider } from '../../providers/weblink/weblink';
@Component({
  selector: 'ion-modle-g',
  templateUrl: 'ion-modle-g.html'
})
export class IonModleGComponent {
  @Input() params:(any);
  public param : Array<any>;
  public title = "";
  public sort :number;
  constructor(public navCtrl:NavController,public config: ConfigProvider,public web: WeblinkProvider,public ele:ElementRef,public ren :Renderer2) {
    
  }
  goDetail(item){
    if(item.picType==1){
      this.web.goWeb(item.picUrl);
    }else if(item.picType==2){
      this.navCtrl.push("ProductDetailPage",{
        "id":item.picProductid
      });
    }else if(item.picType==3){
      this.navCtrl.push("KeyProductListPage",{
        "keywords":item.picKeyword
      });
    }
  }
  ngOnChanges(){
    if(this.params.pageMoudles!=null){
      this.param = this.params.pageMoudles;
      this.title="促/销/专/区";
      this.sort = this.params.sort;
    }
    if(this.title==''){
      let titleDom = document.querySelectorAll(".dis");
      if(this.sort!=undefined){
        let titleDom1 = titleDom[this.sort-2].querySelectorAll(".style1");
        titleDom1[4]['style'].display = "none";
      }
    }
  }
  // ngAfterViewInit(){
  //   var divs = document.querySelectorAll("div.product");
  //   var row = divs[4].querySelectorAll(".row");
  //   var col = row[0].childNodes;
  //   let nodes = col[0].nextSibling.nextSibling.parentElement.getElementsByTagName("ion-col")
  //   console.log(nodes);
  //   for(let i=0;i<nodes.length;i++){
  //     console.log(nodes[i].clientHeight);
  //   }
  // }
}

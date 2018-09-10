import { Component,Input } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
@Component({
  selector: 'ion-modle-g',
  templateUrl: 'ion-modle-g.html'
})
export class IonModleGComponent {
  @Input() params:(any);
  public param : Array<any>;
  public title = "";
  public sort :number;
  constructor(public config: ConfigProvider) {
    
  }
  goDetails(){
    
  }
  // ngOnInit(){
  //   this.title = this.params[0];
  //   this.sort = this.params[1];
  //   this.param = this.params[2];
  //   if(this.title==''){
  //     let titleDom = document.querySelectorAll(".dis");
  //     let titleDom1 = titleDom[this.sort-1].querySelectorAll(".style1");
  //     titleDom1[2]['style'].display = "none";
  //   }
  // }
  ngOnChanges(){
    console.log("------");
    console.log(this.params);
    console.log("------");
    this.param = this.params.pageMoudles;
    // this.title = this.params.title;
    this.title="猜你喜欢";
    this.sort = this.params.sort;
    if(this.title==''){
      let titleDom = document.querySelectorAll(".dis");
      let titleDom1 = titleDom[this.sort-1].querySelectorAll(".style1");
      titleDom1[2]['style'].display = "none";
    }
  }
}

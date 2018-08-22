import { Component,Input } from '@angular/core';
@Component({
  selector: 'ion-modle-g',
  templateUrl: 'ion-modle-g.html'
})
export class IonModleGComponent {
  @Input() params:Array<any>;
  public param : Array<any>;
  public title = "";
  public sort :number;
  constructor() {
    
  }
  goDetails(){
    console.log("商品详情");
  }
  ngOnInit(){
    this.title = this.params[0];
    this.sort = this.params[1];
    this.param = this.params[2];
    if(this.title==''){
      let titleDom = document.querySelectorAll(".dis");
      let titleDom1 = titleDom[this.sort-1].querySelectorAll(".style1");
      titleDom1[2]['style'].display = "none";
    }
  }
}

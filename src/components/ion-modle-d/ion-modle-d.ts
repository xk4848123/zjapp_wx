import { Component,Input } from '@angular/core';
@Component({
  selector: 'ion-modle-d',
  templateUrl: 'ion-modle-d.html'
})
export class IonModleDComponent {
  @Input() params:Array<any>;
  public href1 = "";
  public href2 = "";
  public href3 = "";
  public img1 = "";
  public img2 = "";
  public img3 = "";
  public title = "";
  public sort: number;
  constructor() {
   
  }
  ngOnInit(){
    this.href1 = this.params[0];
    this.img1 = this.params[1];
    this.href2 = this.params[2];
    this.img2 = this.params[3];
    this.href3 = this.params[4];
    this.img3 = this.params[5];
    this.title = this.params[6];
    this.sort = this.params[7];
    if(this.title==''){
      let titleDom = document.querySelectorAll(".dis");
      let titleDom1 = titleDom[this.sort-1].querySelectorAll(".style1");
      titleDom1[3]['style'].display = "none";
    }
    
  }
}

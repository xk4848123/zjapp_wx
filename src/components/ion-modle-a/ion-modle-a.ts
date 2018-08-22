import { Component,Input } from '@angular/core';
@Component({
  selector: 'ion-modle-a',
  templateUrl: 'ion-modle-a.html'
})
export class IonModleAComponent {
  @Input() params: Array<any>;
  public title = "";
  public img = "";
  public sort:number;
  constructor() {
   
  }
  ngOnInit(){
    this.img = this.params[1];
    this.title = this.params[0];
    this.sort = this.params[2];
    if(this.title==''){
      let titleDom = document.querySelectorAll(".dis");
      let titleDom1 = titleDom[this.sort-1].querySelectorAll(".style1");
      titleDom1[0]['style'].display = "none";
    }
  }
}

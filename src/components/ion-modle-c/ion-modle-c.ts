import { Component,Input } from '@angular/core';
@Component({
  selector: 'ion-modle-c',
  templateUrl: 'ion-modle-c.html'
})
export class IonModleCComponent {
  @Input() params:Array<any>;
  public param : Array<any>;
  public title = "";
  public sort :number;
  constructor() {
    
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

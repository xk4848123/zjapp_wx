import { Component,Input } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
@Component({
  selector: 'ion-modle-b',
  templateUrl: 'ion-modle-b.html'
})
export class IonModleBComponent {
  @Input() params:(any);
  public href1 = "";
  public href2 = "";
  public href3 = "";
  public img1 = "";
  public img2 = "";
  public img3 = "";
  public title = "";
  public sort: number;
  constructor(public config :ConfigProvider) {
    
  }
  // ngOnInit(){
  //   this.href1 = this.params[0];
  //   this.img1 = this.params[1];
  //   this.href2 = this.params[2];
  //   this.img2 = this.params[3];
  //   this.href3 = this.params[4];
  //   this.img3 = this.params[5];
  //   this.title = this.params[6];
  //   this.sort = this.params[7];
  //   if(this.title==''){
  //     let titleDom = document.querySelectorAll(".dis");
  //     let titleDom1 = titleDom[this.sort-1].querySelectorAll(".style1");
  //     titleDom1[1]['style'].display = "none";
  //   }
  // }
  ngOnChanges(){
    // if(this.params.pageMoudles[0].type==2){

    // }
    if(this.params.pageMoudles!=null){
      this.href1 = this.params.pageMoudles[0].picProductid;
      this.img1 = this.params.pageMoudles[0].pic;
      this.href2 = this.params.pageMoudles[1].picProductid;
      this.img2 = this.params.pageMoudles[1].pic;
      this.href3 = this.params.pageMoudles[2].picProductid;
      this.img3 = this.params.pageMoudles[2].pic;
    }
    this.title = this.params.title;
    this.sort = this.params.sort;
    if(this.title==''){
      let titleDom = document.querySelectorAll(".dis");
      let titleDom1 = titleDom[this.sort-2].querySelectorAll(".style1");
      titleDom1[1]['style'].display = "none";
    }
  }
}

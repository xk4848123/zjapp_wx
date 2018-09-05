import { Component } from '@angular/core';
import { App,NavController,IonicApp,Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
// import { PaysuccesspagePage } from '../pages/paysuccesspage/paysuccesspage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public appCtrl:App,public ionicApp: IonicApp,public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      platform.registerBackButtonAction(()=>{
        this.backButton();
      },999)
    });
  }
  backButton()  {
    // modal层，loading层，toast层消失
    let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive() ;
    alert(activePortal);
    if (activePortal) {
      activePortal.dismiss().catch(() => {});
      activePortal.onDidDismiss(() => {});
      return;
    }
    let activeNav:NavController = this.appCtrl.getActiveNav();
    let activeVC = activeNav.getActive();
    let page = activeVC.instance;
    
    //页面跳回rootpage
    // if (page instanceof ExWarehousingPage) {
    //   activeNav.popToRoot();
    //   return;
    // }

   
    // if (activeNav.canGoBack()) {
    // //返回上一页
    //   activeNav.pop();
    // } else {
    //  //rootpage退出APP
    //   this.backButtonProvider.showExit();
    // }
}
}


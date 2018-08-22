import { Component } from '@angular/core';
import {HomePage } from '../../pages/home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'CategoryPage';
  tab3Root = 'CartPage';
  tab4Root=   'UserPage';  

  constructor() {

  }
}

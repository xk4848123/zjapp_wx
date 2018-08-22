import { Injectable } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';
/*
  Generated class for the ClearloginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClearloginProvider {

  constructor(public storage:StorageProvider) {
  }
    
  public release(){
    this.storage.remove('token');
    this.storage.remove('userInfo');
  }
}

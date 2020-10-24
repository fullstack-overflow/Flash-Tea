import { Injectable } from '@angular/core';
import { StoreAccount } from '../types/storeAccount';
import { CrudService } from './crud.service';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {
  shopProfile: StoreAccount;
  constructor(
    private crudService: CrudService,
    public ngFireAuth: AngularFireAuth
  ) {

  }

  initShopProfile(shopId: string): void {
    this.crudService.getShopAccountFromFirebaseCloud().subscribe(data => {
      this.shopProfile = data.map(e => {
        return {
          // tslint:disable-next-line:no-string-literal
          uid: e.payload.doc.data()['uid'],
          // tslint:disable-next-line:no-string-literal
          email: e.payload.doc.data()['email'],
          // tslint:disable-next-line:no-string-literal
          displayName: e.payload.doc.data()['displayName'],
          // tslint:disable-next-line:no-string-literal
          photoURL: e.payload.doc.data()['photoURL'],
          // tslint:disable-next-line:no-string-literal
          emailVerified: e.payload.doc.data()['emailVerified'],
          // tslint:disable-next-line:no-string-literal
          phoneNumber: e.payload.doc.data()['phoneNumber'],
          // tslint:disable-next-line:no-string-literal
          address: e.payload.doc.data()['address']
        };
      }).find(shop => {
        return shop.uid === shopId;
      });

      if (this.shopProfile === undefined) {
        this.shopProfile = {
          // tslint:disable-next-line:no-string-literal
          uid: 'uid',
          // tslint:disable-next-line:no-string-literal
          email: '',
          // tslint:disable-next-line:no-string-literal
          displayName: '',
          // tslint:disable-next-line:no-string-literal
          photoURL: '',
          // tslint:disable-next-line:no-string-literal
          emailVerified: false,
          // tslint:disable-next-line:no-string-literal
          phoneNumber: 0,
          // tslint:disable-next-line:no-string-literal
          address: ''
        };
      }
    });
  }
}

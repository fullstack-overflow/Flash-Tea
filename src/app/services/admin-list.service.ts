import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

type Admin = {
  id?: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber?: number;
  address?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  account: Admin[];
  constructor(
    private crudService: CrudService
  ) {
    this.crudService.getShopAccountFromFirebaseCloud().subscribe(data => {
      if (data) {
        this.account = data.map(e => {
          return {
            id: e.payload.doc.id,
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
        });
        localStorage.setItem('shopsAccount', JSON.stringify(this.account));
        JSON.parse(localStorage.getItem('shopsAccount'));
      } else {
        localStorage.setItem('shopsAccount', null);
      }
    });
  }
}

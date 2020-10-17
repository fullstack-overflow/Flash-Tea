import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

type Admin = {
  id: string;
  email: string;
  displayName: string;
  imageUrl: string;
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
            email: e.payload.doc.data()['email'],
            // tslint:disable-next-line:no-string-literal
            displayName: e.payload.doc.data()['displayName'],
            // tslint:disable-next-line:no-string-literal
            imageUrl: e.payload.doc.data()['imageUrl'],
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

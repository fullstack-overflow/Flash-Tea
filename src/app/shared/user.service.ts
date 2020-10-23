import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: User[];
  constructor(
    public crudService: CrudService
  ) {
    this.crudService.getUserAccountFromFirebaseCloud().subscribe(data => {
      if (data) {
        this.userList = data.map(e => {
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
      } else {
        localStorage.setItem('shopsAccount', null);
      }
    });
  }
}

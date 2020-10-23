import { Injectable } from '@angular/core';

import { User } from '../types/user';

import { CrudService } from './crud.service';

import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userProfile: User;
  constructor(
    private crudService: CrudService,
    public ngFireAuth: AngularFireAuth
  ) { }

  initUserProfile(userId: string): void {
    this.crudService.getUserAccountFromFirebaseCloud().subscribe(data => {
      this.userProfile = data.map(e => {
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
      }).find(user => user.uid === userId);
    });
  }
}

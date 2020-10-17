import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.page.html',
  styleUrls: ['./shop-info.page.scss'],
})
export class ShopInfoPage implements OnInit {

  displayName: string;
  email: string;
  photoURL: string;

  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService,
    public router: Router,
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    const getShopAccount = JSON.parse(localStorage.getItem('user'));
    // console.log(getShopAccount);
    this.displayName = getShopAccount.displayName;
    this.email = getShopAccount.email;
    this.photoURL = getShopAccount.photoURL;

    if (getShopAccount.emailVerified === true) {
      const shopRef: AngularFirestoreDocument<any> = this.afStore.doc(`shops/${getShopAccount.uid}`);
      const shopData = {
        emailVerified: true
      };
      return shopRef.set(shopData, {
        merge: true
      });
    }
  }

  logOut() {
    this.authService.signOut();
  }
}

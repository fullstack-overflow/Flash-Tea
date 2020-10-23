import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.page.html',
  styleUrls: ['./shop-info.page.scss'],
})
export class ShopInfoPage implements OnInit {
  shopAccount: any;
  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService,
    public router: Router,
    public afStore: AngularFirestore,
    private location: Location
  ) { }

  ngOnInit() {
    const getShopAccount = JSON.parse(localStorage.getItem('user'));

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

  ionViewDidUpdate() {
    console.log(this.getShop());
  }

  getShop(): object | null {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const arrShopAccountStorage = JSON.parse(localStorage.getItem('shopsAccount'));
    if (userStorage === null ||
      userStorage === null && arrShopAccountStorage === null) {
      return {
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        emailVerified: '',
        phoneNumber: '',
        address: ''
      };
    }

    if (arrShopAccountStorage !== null && userStorage !== null) {
      return arrShopAccountStorage.find(acc => {
        return acc.uid === userStorage.uid;
      });
    }

    if (arrShopAccountStorage === null && userStorage !== null) {
      return userStorage;
    }
  }

  navigateToFormUpdateShop() {
    this.router.navigateByUrl('form-update-shop');
  }

  logOut() {
    this.authService.signOut();
  }

  goBack() {
    this.location.back();
  }

  addItem() {
    this.router.navigate(['add-item']);
  }
}

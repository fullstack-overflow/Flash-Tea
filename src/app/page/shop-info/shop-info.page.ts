import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import * as firebase from 'firebase';

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
    public router: Router
  ) { }

  ngOnInit() {
    const getShopAccount = JSON.parse(localStorage.getItem('user'));
    // console.log(getShopAccount);
    this.displayName = getShopAccount.displayName;
    this.email = getShopAccount.email;
    this.photoURL = getShopAccount.photoURL;
  }

  logOut() {
    this.authService.signOut();
  }

  addItem() {
    this.router.navigate(['add-item']);
  }
}

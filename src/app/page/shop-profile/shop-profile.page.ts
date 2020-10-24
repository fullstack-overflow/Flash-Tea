import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { Location } from '@angular/common';

import { ShopDataService } from '../../services/shop-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.page.html',
  styleUrls: ['./shop-profile.page.scss'],
})
export class ShopProfilePage implements OnInit {
  shopId: string;
  shopProfile: object;
  currentUser: any;
  displayName = '';
  uid = '';
  email = '';
  phoneNumber = 0;
  address = '';
  photoURL = '';

  constructor(
    private router: Router,
    public toats: ToastService,
    private location: Location,
    public shopDataService: ShopDataService,
    public authService: AuthenticationService
  ) {
    this.shopId = this.router.url.split(`/root/shop-profile/`).join(``);
  }

  async ngOnInit() {
    await this.callShopDataService(this.shopId);
    await this.initLocalStorage();
  }

  async callShopDataService(shopID: string) {
    await this.shopDataService.initShopProfile(shopID);
  }

  async initLocalStorage() {
    this.currentUser = await JSON.parse(localStorage.getItem('user'));
  }

  async ionViewWillEnter() {
    if (this.shopDataService.shopProfile === undefined) {
      this.displayName = await this.currentUser.displayName;
      this.uid = await this.currentUser.uid;
      this.email = await this.currentUser.email;
      this.photoURL = await this.currentUser.photoURL;
      // await this.toats.presentToast('Profile page not ready, please try again! Thank you');
      // await this.router.navigate(['root/home']);
    }
  }

  async ionViewDidEnter() {
    if (this.shopDataService.shopProfile !== undefined) {
      this.displayName = await this.shopDataService.shopProfile.displayName;
      this.uid = await this.shopDataService.shopProfile.uid;
      this.email = await this.shopDataService.shopProfile.email;
      this.photoURL = await this.shopDataService.shopProfile.photoURL;
      this.address = await this.shopDataService.shopProfile.address;
      this.phoneNumber = await this.shopDataService.shopProfile.phoneNumber;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopDataService } from '../../services/shop-data.service';

import * as firebase from 'firebase';
import { AdminListService } from '../../services/admin-list.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // emailFind: any;
  currentUser: any;
  adminListStorage: any;

  constructor(
    public router: Router,
    public adminListService: AdminListService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    // const getUser = JSON.parse(localStorage.getItem('user'));
    // const getadminList = JSON.parse(localStorage.getItem('shopsAccount'));
    this.currentUser = await JSON.parse(localStorage.getItem('user'));
    this.adminListStorage = await JSON.parse(localStorage.getItem('shopsAccount'));
  }

  ionViewDidEnter() {
    if (this.currentUser === null) {
      return this.router.navigate(['login']);
    }

    if (this.currentUser.emailVerified === false) {
      return this.router.navigate(['verify-email']);
    }

    if (this.adminListService.account === null || this.adminListService.account === undefined) {
      const result = this.adminListStorage.find(item => {
        return item.email === this.currentUser.email;
      });

      if (result !== undefined && this.currentUser !== null) {
        return this.router.navigate([`root/shop-profile/${result.id}`]);
      }

      if (result === undefined && this.currentUser !== null) {
        return this.router.navigate([`root/user-profile/${this.currentUser.uid}`]);
      }
    }

    const result2 = this.adminListService.account.find(item => {
      return item.email === this.currentUser.email;
    });

    if (result2 !== undefined && this.currentUser !== null) {
      return this.router.navigate([`root/shop-profile/${result2.id}`]);
    }

    if (result2 === undefined && this.currentUser !== null) {
      return this.router.navigate([`root/user-profile/${this.currentUser.uid}`]);
    }
  }
}

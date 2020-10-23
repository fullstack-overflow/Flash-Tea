import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminListService } from '../../services/admin-list.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  emailFind: any;
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

    if (this.adminListStorage === null) {
      this.emailFind = this.adminListService.account.find(item => {
        return item.email === this.currentUser.email;
      });
    }

    if (this.adminListService.account === null || this.adminListService.account === undefined) {
      this.emailFind = this.adminListStorage.find(item => {
        return item.email === this.currentUser.email;
      });
    }

    if (this.emailFind !== undefined && this.currentUser !== null) {
      return this.router.navigate([`root/shop-profile/${this.emailFind.id}`]);
    }

    if (this.emailFind === undefined && this.currentUser !== null) {
      return this.router.navigate([`root/user-profile/${this.currentUser.uid}`]);
    }
  }
}

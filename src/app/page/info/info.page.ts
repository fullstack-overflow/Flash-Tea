import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminListService } from '../../shared/admin-list.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(
    public router: Router,
    public adminList: AdminListService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const getUser = JSON.parse(localStorage.getItem('user'));
    const getadminList = JSON.parse(localStorage.getItem('shopsAccount'));
    if (getUser === null) {
      return this.router.navigate(['login']);
    }

    if (getUser.emailVerified === false) {
      return this.router.navigate(['verify-email']);
    }

    const emailFind = this.adminList.account.find(item => {
      return item.email === getUser.email;
    });

    if (emailFind !== undefined && getUser !== null) {
      return this.router.navigate(['root/shop-info']);
    }

    if (emailFind === undefined && getUser !== null) {
      return this.router.navigate(['root/info-user']);
    }
  }

}

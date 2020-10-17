import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { AdminListService } from '../../shared/admin-list.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService,
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
    console.log(getadminList);
    const emailFind = getadminList.find(item => {
      return item.email === getUser.email;
    });

    if (emailFind !== undefined && getUser !== null) {
      return this.router.navigate(['root/shop-info']);
    }
  }

  logOut() {
    this.authService.signOut();
  }
}

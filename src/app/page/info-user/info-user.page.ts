import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { AdminListService } from '../../shared/admin-list.service';

import * as firebase from 'firebase';
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
    // if (firebase.auth().currentUser === null) {
    //   return this.router.navigate(['login']);
    // }

    const emailFind = this.adminList.adminList.find(item => {
      if (firebase.auth().currentUser === null) {
        return this.router.navigate(['login']);
      } else {
        return item.email === firebase.auth().currentUser.email;
      }
    });

    if (emailFind !== undefined && firebase.auth().currentUser !== null) {
      return this.router.navigate(['root/shop-info']);
    }
  }

  logOut() {
    this.authService.signOut();
  }
}

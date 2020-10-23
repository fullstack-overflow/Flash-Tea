import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
  user: any;
  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService,
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
  }

  getUser(): object | null {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      return {
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        emailVerified: '',
        phoneNumber: '',
        address: ''
      };
    } else {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  logOut() {
    this.authService.signOut();
  }

  navigateToUpdateProfile() {
    this.router.navigateByUrl('form-update');
  }
}

import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

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
    public router: Router
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    if (firebase.auth().currentUser === null) {
      return this.router.navigate(['login']);
    }
  }

  logOut() {
    this.authService.signOut();
  }
}

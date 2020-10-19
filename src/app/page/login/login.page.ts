import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.signInWithEmailAndPassword(email.value, password.value)
      .then(res => {
        // tslint:disable-next-line:no-string-literal
        if (res.user.emailVerified === true) {
          console.log(res.user.uid);
          this.router.navigate(['root/home']);

          // this.router.
        } else {
          this.toastService.presentToast('Email is not verified');
          return false;
        }
      }).catch(error => {
        console.log(error.message);
        this.toastService.presentToast(error.message);
      });
  }

  async logInWithGoogle() {
    await this.authService.signInWithGoogle();
    await this.toastService.presentToast(this.authService.messageAuthentication);
  }

  async logInWithFacebook() {
    await this.authService.signInWithFacebook();
    await this.toastService.presentToast(this.authService.messageAuthentication);
  }

  navigateToRegister() {
    this.router.navigate(['registration']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
}

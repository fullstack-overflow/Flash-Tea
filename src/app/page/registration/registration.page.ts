import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

  signUp(email, password) {
    this.authService.registerWithEmailAndPassword(email.value, password.value)
      .then((res => {
        this.successHandleSignUp();
      })).catch(error => {
        this.toastService.presentToast(error.message);
      });
  }

  async successHandleSignUp(): Promise<void> {
    await this.authService.sendVerificationEmail();
    await this.router.navigate(['verify-email']);
    await this.toastService.presentToast('Please check your email for success registration');
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }
}

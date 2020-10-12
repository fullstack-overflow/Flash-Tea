import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationForm: FormGroup;
  emailInput: string;
  passInput: string;
  rePassInput: string;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService
  ) {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

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

  checkPasswordAndRePasswordIsSame(password, repassword) {
    if (password !== repassword) {
      return false;
    } else {
      return true;
    }
  }

  async successHandleSignUp(): Promise<void> {
    await this.authService.sendVerificationEmail();
    await this.registrationForm.reset();
    await this.router.navigate(['verify-email']);
    await this.toastService.presentToast('Please check your email for success registration');
  }

  async logInWithGoogle() {
    await this.authService.signInWithGoogle();
    await this.toastService.presentToast(this.authService.messageAuthentication);
  }

  async logInWithFacebook() {
    await this.authService.signInWithFacebook();
    await this.toastService.presentToast(this.authService.messageAuthentication);
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }
}

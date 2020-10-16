import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { StoreAccount } from '../../shared/storeAccount';

@Component({
  selector: 'app-storeregister',
  templateUrl: './storeregister.page.html',
  styleUrls: ['./storeregister.page.scss'],
})
export class StoreregisterPage implements OnInit {

  registrationForm: FormGroup;
  emailInput: string;
  passInput: string;
  rePassInput: string;
  uploadimage: string;
  displayName: string;
  shopAccountData: StoreAccount[];

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService
  ) {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      uploadimage: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit() {
  }

  signUp(email, password) {
    this.authService.registerWithEmailAndPassword(email.value, password.value)
      .then((res => {
        // firebase.auth().currentUser.set
        this.successHandleSignUp();
        this.authService.setShopAccountData(res.user);
      })).catch(error => {
        this.toastService.presentToast(error.message);
      });
  }

  async successHandleSignUp(): Promise<void> {
    await this.authService.sendVerificationEmail();
    await this.registrationForm.reset();
    await this.router.navigate(['verify-email']);
    await this.toastService.presentToast('Please check your email for success registration');
  }

  checkPasswordAndRePasswordIsSame(password, repassword) {
    if (password !== repassword) {
      return false;
    } else {
      return true;
    }
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

  navigateUserRegister() {
    this.router.navigate(['registration']);
  }

}

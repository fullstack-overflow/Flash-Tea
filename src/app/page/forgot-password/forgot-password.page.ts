import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  emailInput: string;

  constructor(
    public router: Router,
    public authService: AuthenticationService,
    public toast: ToastService
  ) { }

  ngOnInit() {
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  async sendPasswordRecorver() {
    await this.authService.passwordRecoverWithLink(this.emailInput);
    this.emailInput = await '';
    await this.toast.presentToast(this.authService.messageAuthentication);
  }

}

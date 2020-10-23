import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public toast: ToastService
  ) { }

  ngOnInit() {
  }

  resendEmailVerify() {
    this.authService.sendVerificationEmail();
    this.toast.presentToast('Send successful!');
  }

}

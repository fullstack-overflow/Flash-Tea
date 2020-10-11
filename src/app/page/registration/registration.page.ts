import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  signUp(email, password) {
    this.authService.registerWithEmailAndPassword(email.value, password.value)
      .then((res => {
        this.successHandleSignUp();
      })).catch(error => {
        this.presentToast(error.message);
      });
  }

  async successHandleSignUp(): Promise<void> {
    await this.authService.sendVerificationEmail();
    await this.router.navigate(['verify-email']);
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}

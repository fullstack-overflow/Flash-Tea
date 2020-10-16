import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

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
  filePathImage: string;
  fileImage: any;
  pathImageURL: string | null;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    private afStorage: AngularFireStorage,
    private afDB: AngularFireDatabase,
    private auth: AngularFireAuth,
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
        this.successHandleSignUp(res);
        console.log(res);
      })).catch(error => {
        this.toastService.presentToast(error.message);
      });
  }

  async successHandleSignUp(res): Promise<void> {
    await this.authService.sendVerificationEmail();
    await this.registrationForm.reset();
    await this.uploadImage(res.user);
    const result = await this.pathImageURL;
    console.log(this.pathImageURL);
    await this.toastService.presentToast('Please check your email for success registration');
    await this.router.navigate(['verify-email']);
    // await this.authService.setShopAccountData(res.user, 'dosomething2jgkajgka');
  }

  changeImage() {
    this.fileImage = (document.getElementById('image') as HTMLInputElement).files[0];
    console.log(typeof (this.fileImage));
    this.filePathImage = this.fileImage.name;
    console.log(this.filePathImage);
    console.log(this.fileImage);
  }

  async uploadImage(shopAccount) {
    const ref = await this.afStorage.ref('upload/' + shopAccount.uid + '/' + this.filePathImage);
    await ref.put(this.fileImage).then(res => {
      // tslint:disable-next-line:no-shadowed-variable
      ref.getDownloadURL().subscribe(url => {
        shopAccount.imgURL = url;
        this.authService.setShopAccountData(shopAccount, url);
      });
    }).catch(e => {
      console.log(e);
    });
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

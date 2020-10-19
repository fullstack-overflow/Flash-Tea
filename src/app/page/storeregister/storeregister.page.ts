import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-storeregister',
  templateUrl: './storeregister.page.html',
  styleUrls: ['./storeregister.page.scss'],
})
export class StoreregisterPage implements OnInit {

  registrationForm: FormGroup;

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
      teaname: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      uploadimage: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit() {
  }

  signUp(email, password, teaname) {
    this.authService.registerWithEmailAndPassword(email, password)
      .then((res => {
        // firebase.auth().currentUser.set
        console.log(teaname);
        this.successHandleSignUp(res, teaname);
        console.log(res);
      })).catch(error => {
        this.toastService.presentToast(error.message);
      });
  }

  async successHandleSignUp(res, teaname): Promise<void> {
    await this.authService.sendVerificationEmail();
    await this.registrationForm.reset();
    await this.uploadImage(res.user, teaname);
    // const result = await this.pathImageURL;
    // console.log(this.pathImageURL);
    await this.toastService.presentToast('Please check your email for success registration');
    await this.router.navigate(['verify-email']);
    // await this.authService.setShopAccountData(res.user, 'dosomething2jgkajgka');
  }

  updateProfileShop(path, teaname): void {
    firebase.auth().currentUser.updateProfile({
      displayName: teaname,
      photoURL: path
    });
  }

  async uploadImage(shopAccount, teaname) {
    const ref = await this.afStorage.ref('upload/' + shopAccount.uid + '/' + this.filePathImage);
    await ref.put(this.fileImage).then(res => {
      // tslint:disable-next-line:no-shadowed-variable
      ref.getDownloadURL().subscribe(url => {
        shopAccount.imgURL = url;
        console.log(teaname);
        this.authService.setShopAccountData(shopAccount, url, teaname);
        this.updateProfileShop(url, teaname);
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

  changeImage() {
    this.fileImage = (document.getElementById('image') as HTMLInputElement).files[0];
    console.log(typeof (this.fileImage));
    this.filePathImage = this.fileImage.name;
    console.log(this.filePathImage);
    console.log(this.fileImage);
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

  navigateUserRegister() {
    this.router.navigate(['registration']);
  }
}

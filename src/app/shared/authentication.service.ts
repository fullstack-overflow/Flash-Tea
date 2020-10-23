import { Injectable, NgZone } from '@angular/core';
import { User } from '../types/user';
import { StoreAccount } from '../types/storeAccount';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

import { UserService } from '../shared/user.service';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;
  messageAuthentication: string;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public navCtrl: NavController,
    public userService: UserService,
    public crudService: CrudService
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  signInWithEmailAndPassword(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmailAndPassword(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationEmail() {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  // forgot password?
  passwordRecoverWithLink(email) {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        this.messageAuthentication = 'Password reset email has been sent, please check your inbox! ^^';
      }).catch((error) => {
        console.log(email);
        this.messageAuthentication = error;
      });
  }

  // return true when user if logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // return true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // sign in with google
  signInWithGoogle() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // sign in with facebook
  signInWithFacebook() {
    return this.authLogin(new firebase.auth.FacebookAuthProvider());
  }

  // sign in with github
  signInWighGithub() {
    return this.authLogin(new firebase.auth.GithubAuthProvider());
  }

  // authLogin provider
  authLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['root/home']);
          this.messageAuthentication = 'Welcome to Flash Tea! ^^';
        });
        this.setUserData(result.user);
        console.log('this user', result.user);
      }).catch(error => {
        this.messageAuthentication = error;
      });
  }

  // store user localStorage to cloud database
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // update profile user to cloud firebase
  setUpdateUserData(user, pathImage, displayName, phoneNumber, address) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: pathImage,
      emailVerified: user.emailVerified,
      phoneNumber,
      address,
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // set update profile shop admin to cloude firebase
  setUpdateShopAccData(shop, pathImage, displayName, phoneNumber, address) {
    const shopRef: AngularFirestoreDocument<any> = this.afStore.doc(`shops/${shop.uid}`);
    const shopData: StoreAccount = {
      uid: shop.uid,
      email: shop.email,
      displayName,
      photoURL: pathImage,
      emailVerified: shop.emailVerified,
      phoneNumber,
      address
    };
    return shopRef.set(shopData, {
      merge: true
    });
  }

  // store shop account to cloud firebase
  setShopAccountData(shop, pathImage, teaname) {
    const shopRef: AngularFirestoreDocument<any> = this.afStore.doc(`shops/${shop.uid}`);
    const shopData: StoreAccount = {
      uid: shop.uid,
      email: shop.email,
      displayName: teaname,
      photoURL: pathImage,
      emailVerified: shop.emailVerified
    };
    return shopRef.set(shopData, {
      merge: true
    });
  }

  getDataFromCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      } else {
        console.log(user);
      }
    });
  }

  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.messageAuthentication = 'Log out successfull! ^^';
      localStorage.removeItem('user');
      this.router.navigate(['root/home']);
    });
  }
}

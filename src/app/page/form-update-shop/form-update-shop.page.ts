import { Component, OnInit } from '@angular/core';

import { ToastService } from '../../services/toast.service';

import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { CrudService } from '../../services/crud.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';

import { AdminListService } from '../../services/admin-list.service';

@Component({
  selector: 'app-form-update-shop',
  templateUrl: './form-update-shop.page.html',
  styleUrls: ['./form-update-shop.page.scss'],
})
export class FormUpdateShopPage implements OnInit {
  fileImage: any;
  filePathImage: string;

  image: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;

  currentUser: any;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    public crudService: CrudService,
    private afStorage: AngularFireStorage,
    public adminList: AdminListService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const result = await this.adminList.account.find(item => {
      return item.email === firebase.auth().currentUser.email;
    });

    if (result !== null) {
      this.currentUser = firebase.auth().currentUser;
    } else {
      this.router.navigateByUrl('root/home');
      this.toastService.presentToast('Only shop account can access to this page');
    }
  }

  async updateProfileShop(shop, name, phoneNumber, address) {
    if (name === undefined) {
      name = firebase.auth().currentUser.displayName;
    }

    if (phoneNumber === undefined) {
      phoneNumber = firebase.auth().currentUser.phoneNumber;
    }

    if (address === undefined) {
      address = '';
    }

    if (this.fileImage === null || this.fileImage === undefined) {
      this.toastService.presentToast('You must upload image avatar to update profile!');
      return;
    }

    await this.uploadImageAndSetShopAccountData(shop, name, phoneNumber, address);
    await this.toastService.presentToast('Update profile sucessful! ^^');
    await this.router.navigateByUrl('root/home');
  }

  async uploadImageAndSetShopAccountData(shop, name, phoneNumber, address) {
    const ref = await this.afStorage.ref('upload/' + shop.uid + '/' + this.filePathImage);
    await ref.put(this.fileImage).then(res => {
      ref.getDownloadURL().subscribe(url => {
        this.authService.setUpdateShopAccData(shop, url, name, phoneNumber, address);
        this.updateIntoCurrentShopProfile(name, url);
      });
    }).catch(e => {
      this.toastService.presentToast(`Err ${e}`);
    });
  }

  async updateIntoCurrentShopProfile(displayName: string, photoURL: string) {
    await firebase.auth().currentUser.updateProfile({
      displayName,
      photoURL
    });
  }

  changeImage() {
    this.fileImage = (document.getElementById('image') as HTMLInputElement).files[0];
    this.filePathImage = this.fileImage.name;
  }

  getPhotoURL(): string | null {
    if (firebase.auth().currentUser === null) {
      return JSON.parse(localStorage.getItem('user')).photoURL;
    }

    if (firebase.auth().currentUser === null && JSON.parse(localStorage.getItem('user')) === null) {
      return '';
    }

    return firebase.auth().currentUser.photoURL;
  }

  getDisplayName(): string | null {
    if (firebase.auth().currentUser === null) {
      return JSON.parse(localStorage.getItem('user')).displayName;
    }

    if (firebase.auth().currentUser === null && JSON.parse(localStorage.getItem('user')) === null) {
      return '';
    }

    return firebase.auth().currentUser.displayName;
  }

  getEmail(): string | null {
    if (firebase.auth().currentUser === null) {
      return JSON.parse(localStorage.getItem('user')).email;
    }

    if (firebase.auth().currentUser === null && JSON.parse(localStorage.getItem('user')) === null) {
      return '';
    }

    return firebase.auth().currentUser.email;
  }

  getPhoneNumber(): number | string | null {
    if (firebase.auth().currentUser === null && JSON.parse(localStorage.getItem('user')) === null) {
      return '';
    }

    if (firebase.auth().currentUser === null) {
      return this.adminList.account.find(ad => {
        return ad.email === JSON.parse(localStorage.getItem('user')).email;
      }).phoneNumber;
    }

    if (localStorage.getItem('user') === null) {
      return this.adminList.account.find(ad => {
        return ad.email === JSON.parse(localStorage.getItem('user')).email;
      }).phoneNumber;
    }
  }

  getAddress(): string | null {
    if (firebase.auth().currentUser === null && JSON.parse(localStorage.getItem('user')) === null) {
      return '';
    }

    if (firebase.auth().currentUser === null) {
      return this.adminList.account.find(ad => {
        return ad.email === JSON.parse(localStorage.getItem('user')).email;
      }).address;
    }

    if (localStorage.getItem('user') === null) {
      return this.adminList.account.find(ad => {
        return ad.email === JSON.parse(localStorage.getItem('user')).email;
      }).address;
    }
  }
}

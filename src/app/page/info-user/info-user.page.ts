import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

import { AdminListService } from '../../shared/admin-list.service';

import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
  currentEmail = '';
  captureDataUrl: string;
  // tslint:disable-next-line:no-input-rename
  @Input('useURI') useURI = true;

  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService,
    public router: Router,
    public adminList: AdminListService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    const emailFind = this.adminList.adminList.find(item => {
      if (firebase.auth().currentUser === null) {
        return undefined;
      } else {
        return item.email === firebase.auth().currentUser.email;
      }
    });

    if (firebase.auth().currentUser === null) {
      return this.router.navigate(['login']);
    }

    if (emailFind !== undefined && firebase.auth().currentUser !== null) {
      return this.router.navigate(['root/shop-info']);
    }
  }

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, (image64) => {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res));
          }, err => {
            reject(err);
          });
      });
    });
  }

  encodeImageUri(imageUri, callback) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const img = new Image();
    img.onload = function() {
      const aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = c.toDataURL('image/jpeg');
      callback(dataURL);
    };
    img.src = imageUri;
  }

  logOut() {
    this.authService.signOut();
  }
}

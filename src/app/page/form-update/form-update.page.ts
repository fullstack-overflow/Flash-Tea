import { Component, OnInit } from '@angular/core';

import { ToastService } from '../../shared/toast.service';

import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { CrudService } from '../../shared/crud.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.page.html',
  styleUrls: ['./form-update.page.scss'],
})
export class FormUpdatePage implements OnInit {

  fileImage: any;
  filePathImage: string;

  image: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;

  currentUser: any;
  displayName: string;
  currentEmail: string;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    private firestore: AngularFirestore,
    public crudService: CrudService,
    private afStorage: AngularFireStorage
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ionViewDidEnter() {
    console.log((this.currentUser));
  }

  async updateProfile(name, phoneNumber, address) {
    console.log(`name`, name);
    console.log(`phoneNumber`, phoneNumber);
    console.log(`address`, address);
    console.log(`fileImage`, this.filePathImage);
  }

  changeImage() {
    this.fileImage = (document.getElementById('image') as HTMLInputElement).files[0];
    this.filePathImage = this.fileImage.name;
  }

  getPhotoURL(): string | null {
    return JSON.parse(localStorage.getItem('user')).photoURL;
  }

  getDisplayName(): string | null {
    return JSON.parse(localStorage.getItem('user')).displayName;
  }

  getEmail(): string | null {
    return JSON.parse(localStorage.getItem('user')).email;
  }

  getPhoneNumber(): number | string | null {
    return JSON.parse(localStorage.getItem('user')).phoneNumber;
  }
}

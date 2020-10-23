import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { ToastService } from '../../services/toast.service';

import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  addItemForm: FormGroup;
  fileImage: any;
  filePathImage: string;

  image: string;
  name: string;
  price: number;
  description: string;
  getShopAccount: any;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    private firestore: AngularFirestore,
    public crudService: CrudService,
    private afStorage: AngularFireStorage
  ) {
    this.addItemForm = new FormGroup({
      image: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      price: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
    console.log(this.addItemForm.value);
  }

  ngOnInit() {
    this.getShopAccount = JSON.parse(localStorage.getItem('user'));
  }


  async addMilkTea(name, price, description) {
    // const itemId = this.firestore.createId;
    // await this.crudService.setAddItemsShopData(
    //   this.firestore.createId, name, price, description, this.filePathImage, this.getShopAccount.name
    // );
    const id = this.firestore.createId();
    await this.uploadImageAndSetItemsData(
      id, name, Number(price), description, this.fileImage, this.filePathImage, this.getShopAccount.displayName
    );
    this.router.navigate(['root/home']);
  }

  async uploadImageAndSetItemsData(uid, name, price, description, fileImage, filePathImage, nameShop) {
    console.log('uid', uid);
    console.log('name', name);
    console.log('price', price);
    console.log('description', description);
    console.log('fileImage', fileImage);
    console.log('filePathImage', filePathImage);
    console.log('nameshop', nameShop);


    const ref = await this.afStorage.ref('items/' + filePathImage);
    await ref.put(fileImage).then(res => {
      // tslint:disable-next-line:no-shadowed-variable
      ref.getDownloadURL().subscribe(url => {
        this.crudService.setAddItemsShopData(
          uid, name, price, description, url, nameShop
        );
      });
    }).catch(e => {
      console.log(e);
    });
  }

  changeImage() {
    this.fileImage = (document.getElementById('image') as HTMLInputElement).files[0];
    this.filePathImage = this.fileImage.name;
  }
}

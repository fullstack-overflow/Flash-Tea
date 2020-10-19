import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../shared/crud.service';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { ToastService } from '../../shared/toast.service';

interface ItemArray {
  id: any;
  name: string;
  img: string;
  price: number;
  sale: number;
  quantity: number;
  idUser: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: ItemArray[] = [];
  currentUser: any;
  countNumber = 0;

  constructor(
    private crudService: CrudService,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    public toast: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.countNumber = JSON.parse(localStorage.getItem('count'));
    if (this.currentUser === null) {
      this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
        this.items = data.map(e => {
          return {
            id: e.payload.doc.id,
            // tslint:disable-next-line:no-string-literal
            name: e.payload.doc.data()['name'],
            // tslint:disable-next-line:no-string-literal
            price: e.payload.doc.data()['price'],
            // tslint:disable-next-line:no-string-literal
            sale: e.payload.doc.data()['sale'],
            // tslint:disable-next-line:no-string-literal
            img: e.payload.doc.data()['img'],
            quantity: 0,
            // tslint:disable-next-line:no-string-literal
            idUser: null
          };
        });
      });
    } else {
      this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
        this.items = data.map(e => {
          return {
            id: e.payload.doc.id,
            // tslint:disable-next-line:no-string-literal
            name: e.payload.doc.data()['name'],
            // tslint:disable-next-line:no-string-literal
            price: e.payload.doc.data()['price'],
            // tslint:disable-next-line:no-string-literal
            sale: e.payload.doc.data()['sale'],
            // tslint:disable-next-line:no-string-literal
            img: e.payload.doc.data()['img'],
            quantity: 0,
            // tslint:disable-next-line:no-string-literal
            idUser: this.currentUser['uid']
            // idUser: firebase.auth().currentUser.uid
          };
        });
      });
    }
  }

  ionViewDidLeave() {
    this.deleteCartStorage();
  }

  navigateToCartPage() {
    this.router.navigateByUrl('cart');
  }

  /**
   * delete cart storage if user login another account
   */
  deleteCartStorage() {
    const getUserStorage = JSON.parse(localStorage.getItem('user'));
    if (getUserStorage === null) {
      return;
    }
    this.items.forEach(item => {
      if (item.id in localStorage && item.idUser !== getUserStorage.uid) {
        localStorage.removeItem(item.id);
        localStorage.removeItem('count');
      }
    });
  }

  addToCart(idItem) {
    const getItemLocalStorage = JSON.parse(localStorage.getItem(idItem));
    const getCountLocalStorage = JSON.parse(localStorage.getItem('count'));

    if (firebase.auth().currentUser === null) {

      this.toast.presentToast('Bạn cần phải đăng nhập để thêm vào giỏ hàng');
      this.router.navigateByUrl('login');
      return;
    }

    this.toast.presentToast('Đã thêm vào giỏ hàng!');

    if (getItemLocalStorage === null || getCountLocalStorage === null) {
      // tslint:disable-next-line:prefer-const
      let result = this.items.find(item => {
        if (item.id === idItem) {
          item.quantity += 1;
          this.countNumber += 1;
        }
        return item.id === idItem;
      });
      localStorage.setItem(idItem, JSON.stringify(result));
      localStorage.setItem('count', JSON.stringify(this.countNumber));
    } else {
      console.log(getItemLocalStorage);
      // tslint:disable-next-line:prefer-const
      let result = this.items.find(item => {
        if (item.id === idItem) {
          item.quantity = getItemLocalStorage.quantity + 1;
          this.countNumber = Number(getCountLocalStorage) + 1;
        }
        return item.id === idItem;
      });
      localStorage.setItem(idItem, JSON.stringify(result));
      localStorage.setItem('count', JSON.stringify(this.countNumber));
    }
  }
}

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
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: ItemArray[] = [];
  itemsInStorage = [];
  currentUser: any;
  local: any;

  constructor(
    private crudService: CrudService,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    public toast: ToastService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
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
          };
        });
      });
    }
  }

  getDataItemsLocal(key: string): (object | null) {
    return JSON.parse(localStorage.getItem(key));
  }

  ionViewDidEnter() {
  }
}

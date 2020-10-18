import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../shared/crud.service';

import * as firebase from 'firebase';

interface ItemArray {
  id: any;
  name: string;
  img: string;
  price: number;
  sale: number;
  quantity: number;
  idUser: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: ItemArray[] = [];

  constructor(
    private crudService: CrudService,
  ) { }

  ngOnInit() {
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
          idUser: firebase.auth().currentUser.uid
        };
      });
    });

    this.deleteCartStorage();
  }

  /**
   * @description: delete cart storage if user login another account
   * @author: quoctrung163
   */
  deleteCartStorage() {
    const getCartStorage = JSON.parse(localStorage.getItem('cart'));
    const getUserStorage = JSON.parse(localStorage.getItem('user'));
    getCartStorage.forEach(cart => {
      if (cart.idUser !== getUserStorage.uid) {
        localStorage.removeItem('cart');
      }
    });
  }

  addToCart(idItem) {
    const result = this.items.filter(item => {
      if (item.id === idItem) {
        (item.quantity) += 1;
      }
      return item.quantity > 0;
    });

    localStorage.setItem('cart', JSON.stringify(result));

    console.log(result);
  }
}

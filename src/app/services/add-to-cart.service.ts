import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(
    public toast: ToastService,
    public router: Router
  ) { }

  /**
   * @author: quoctrung163
   * @param item: object items {}
   * @param countNumber: this.count
   * @param itemStorage: item has added and save in localStorage
   * @param total: total storage
   */
  addToCartDetailItems(item, countNumber, itemStorage, countStorage, totalStorage): void {

    this.toast.presentToast('Đã thêm vào giỏ hàng!');

    if (itemStorage === null || countStorage === null) {

      if (localStorage.getItem(item.id) === null) {
        item.quantity = 1;
      } else {
        item.quantity = Number(JSON.parse(localStorage.getItem(item.id)).quantity) + 1;
      }

      if (totalStorage === null) {
        countNumber = 1;
      } else {
        // tslint:disable-next-line:prefer-const
        let countStorage2 = JSON.parse(localStorage.getItem('count'));
        countNumber = Number(countStorage2) + 1;
      }

      if (firebase.auth().currentUser === null) {
        localStorage.setItem(item.id, JSON.stringify({
          ...item,
          total: item.quantity * item.price,
          idUser: null
        }));
      } else {
        localStorage.setItem(item.id, JSON.stringify({
          ...item,
          total: item.quantity * item.price,
          idUser: firebase.auth().currentUser.uid
        }));
      }

      localStorage.setItem('count', JSON.stringify(countNumber));

      if (!totalStorage) {
        localStorage.setItem('total', item.price.toString());
      } else {
        localStorage.setItem('total', (Number(totalStorage) + (item.price * 1)).toString());
      }
    } else {
      item.quantity = itemStorage.quantity + 1;
      // tslint:disable-next-line:prefer-const
      let countStorage2 = localStorage.getItem('count');
      countNumber = Number(countStorage2) + 1;

      // const totalPrice = item.quantity * item.price;
      if (firebase.auth().currentUser === null) {
        localStorage.setItem(item.id, JSON.stringify({
          ...item,
          total: item.quantity * item.price,
          idUser: null
        }));
      } else {
        localStorage.setItem(item.id, JSON.stringify({
          ...item,
          total: item.quantity * item.price,
          idUser: firebase.auth().currentUser.uid
        }));
      }
      // localStorage.setItem(item.id, JSON.stringify({ ...item, total: totalPrice }));

      localStorage.setItem('total', (Number(totalStorage) + (item.price * 1)).toString());
      // console.log(Number(totalStorage) + (item.price * 1));
      localStorage.setItem('count', JSON.stringify(countNumber));
    }
  }


  userBeginAddedItem(idItem: string, items, countNumber: number | null, totalStorage) {
    // tslint:disable-next-line:prefer-const
    let result = items.find(item => {
      if (item.id === idItem) {
        // item.quantity += 1;
        if (localStorage.getItem(item.id) === null) {
          item.quantity = 1;
        } else {
          item.quantity = Number(JSON.parse(localStorage.getItem(item.id)).quantity) + 1;
        }
        if (totalStorage === null) {
          countNumber = 1;
        } else {
          // tslint:disable-next-line:prefer-const
          let countStorage2 = JSON.parse(localStorage.getItem('count'));
          // countNumber += 1;
          countNumber = Number(countStorage2) + 1;
        }
      }
      return item.id === idItem;
    });

    // const quantityItemsLocal = JSON.parse(localStorage.getItem(result.id));

    if (firebase.auth().currentUser === null) {
      localStorage.setItem(idItem, JSON.stringify({
        ...result,
        total: result.price * result.quantity,
        idUser: null
      }));
    } else {
      localStorage.setItem(idItem, JSON.stringify({
        ...result,
        total: result.price * result.quantity,
        idUser: firebase.auth().currentUser.uid
      }));
    }

    localStorage.setItem('count', JSON.stringify(countNumber));

    if (!totalStorage) {
      localStorage.setItem('total', result.price.toString());
    } else {
      localStorage.setItem('total', (Number(totalStorage) + (result.price * 1)).toString());
    }
  }

  userHasAddedItem(
    idItem: string, items, countNumber: number | null, itemStorage, countStorage, totalStorage
  ) {
    // tslint:disable-next-line:prefer-const
    let result = items.find(item => {
      if (item.id === idItem) {
        item.quantity = itemStorage.quantity + 1;
        const countStorage2 = localStorage.getItem('count');
        countNumber = Number(countStorage2) + 1;
      }

      return item.id === idItem;
    });

    if (firebase.auth().currentUser === null) {
      localStorage.setItem(idItem, JSON.stringify({
        ...result,
        total: result.price * result.quantity,
        idUser: null
      }));
    } else {
      localStorage.setItem(idItem, JSON.stringify({
        ...result,
        total: result.price * result.quantity,
        idUser: firebase.auth().currentUser.uid
      }));
    }

    localStorage.setItem('total', (Number(totalStorage) + (result.price * 1)).toString());

    localStorage.setItem('count', JSON.stringify(countNumber));
  }

  /**
   * @author: quoctrung163
   * @param idItem: iditem when user add (from .html)
   * @param items: items array on items data services
   * @param countNumber: this.countNumber
   * @param itemStorage: item has user added in localStorage
   * @param countStorage: count item has user added in localStorage
   * @param totalStorage: total in localStorage
   */
  addToCart2(
    idItem: string, items, countNumber: number | null,
    itemStorage, countStorage, totalStorage) {
    this.toast.presentToast('Đã thêm vào giỏ hàng! ^^');

    // user begin add item :D
    if (itemStorage === null || countStorage === null) {
      this.userBeginAddedItem(idItem, items, countNumber, totalStorage);
    } else {
      this.userHasAddedItem(
        idItem, items, countNumber, itemStorage, countStorage, totalStorage
      );
    }
  }
}

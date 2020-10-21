import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { ToastService } from '../shared/toast.service';

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
   * @param idItem: idItems
   * @param items: array items
   * @param count: this.count
   * @param itemStorage: item has added and save in localStorage
   * @param countStorage: count number had saved in localStorage
   */
  // tslint:disable-next-line:no-shadowed-variable
  addToCart(idItem, items, count, itemStorage, countStorage) {
    if (firebase.auth().currentUser === null) {
      this.toast.presentToast('Bạn cần phải đăng nhập để thêm vào giỏ hàng');
      this.router.navigateByUrl('login');
      return;
    }

    this.toast.presentToast('Đã thêm vào giỏ hàng!');

    if (itemStorage === null || countStorage === null) {
      // tslint:disable-next-line:prefer-const
      let result = items.find(item => {
        if (item.id === idItem) {
          item.quantity += 1;
          count += 1;
        }
        return item.id === idItem;
      });
      localStorage.setItem(idItem, JSON.stringify(result));
      localStorage.setItem('count', JSON.stringify(count));

    } else {
      // tslint:disable-next-line:prefer-const
      let result = items.find(item => {
        if (item.id === idItem) {
          item.quantity = itemStorage.quantity + 1;
          count = Number(countStorage) + 1;
        }
        return item.id === idItem;
      });
      localStorage.setItem(idItem, JSON.stringify(result));
      localStorage.setItem('count', JSON.stringify(count));
    }
  }

  /**
   * @author: quoctrung163
   * @param item: object items {}
   * @param countNumber: this.count
   * @param itemStorage: item has added and save in localStorage
   * @param total: total storage
   */
  addToCartDetailItems(item, countNumber, itemStorage, countStorage, total): void {
    if (firebase.auth().currentUser === null) {
      this.toast.presentToast('Bạn cần phải đăng nhập để thêm vào giỏ hàng');
      this.router.navigateByUrl('login');
      return;
    }

    this.toast.presentToast('Đã thêm vào giỏ hàng!');

    if (itemStorage === null || countStorage === null) {
      // tslint:disable-next-line:prefer-const
      item.quantity += 1;
      countNumber += 1;

      const totalPrice = item.quantity * item.price;

      // localStorage.setItem(item.id, JSON.stringify(item));
      localStorage.setItem(item.id, JSON.stringify({ ...item, total: totalPrice }));

      localStorage.setItem('count', JSON.stringify(countNumber));

      if (!total) {
        localStorage.setItem('total', item.price.toString());
      } else {
        localStorage.setItem('total', (Number(total) + (item.price * 1)).toString());
      }
      console.log('dosomething1', total);
    } else {
      item.quantity = itemStorage.quantity + 1;
      countNumber = Number(countStorage) + 1;
      // localStorage.setItem(item.id, JSON.stringify(item));
      const totalPrice = item.quantity * item.price;
      localStorage.setItem(item.id, JSON.stringify({ ...item, total: totalPrice }));
      // localStorage.setItem(`total${item.id}`, totalPrice.toString());
      localStorage.setItem('total', (Number(total) + (item.price * 1)).toString());
      console.log(Number(total) + (item.price * 1));
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
          let countStorage2 = localStorage.getItem('count');
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

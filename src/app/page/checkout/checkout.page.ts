import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '../../services/toast.service';

import { CrudService } from '../../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Location } from '@angular/common';
import { ItemsDataService } from 'src/app/services/items-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  addressAndPhoneNumber: string;
  shipcod: boolean;
  masterCart: boolean;
  cardNumber: string;
  cardHolder: string;
  dateCheckout: string;
  securityCode: number;
  total: number;

  data: any;
  datetimeOrders: string;
  orderId: string;

  currentUser: any;

  constructor(
    public toast: ToastService,
    private route: Router,
    public crudService: CrudService,
    private firestore: AngularFirestore,
    private location: Location,
    public itemsDataService: ItemsDataService
  ) { }

  ngOnInit() {
    this.total = Number(JSON.parse(localStorage.getItem('total')));
    this.data = [];
  }

  async ionViewWillEnter() {
    await this.itemsDataService.initItemsData();
    this.currentUser = await JSON.parse(localStorage.getItem('user'));
  }

  getItemsCheckoutStorage() {
    this.itemsDataService.items.forEach(item => {
      // tslint:disable-next-line:prefer-const
      let itemsLocalStorage = JSON.parse(localStorage.getItem(item.id));
      if (itemsLocalStorage !== null) {
        this.data = this.data.concat(itemsLocalStorage);
      }
    });
  }

  setStorage() {
    this.itemsDataService.items.forEach(item => {
      localStorage.removeItem(item.id);
    });
    localStorage.removeItem('count');
    localStorage.removeItem('total');
  }

  getDatetimeOrders() {
    const today = new Date();
    this.datetimeOrders = `${today.getHours()}:${today.getMinutes()} - ${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  }

  async handleCheckout() {
    await this.getItemsCheckoutStorage();
    await this.getDatetimeOrders();
    this.orderId = await this.firestore.createId();
    await this.toast.presentToast('Loading.., please wait! Thanks');
    await this.crudService.setBillData(this.currentUser.uid,
      this.data,
      this.datetimeOrders,
      this.total,
      this.addressAndPhoneNumber,
      this.orderId
    );
    await this.setStorage();
  }

  regexAddress(): boolean {
    const regex = new RegExp(`[A-Za-z0-9'\.\-\s\,]+[a-zA-Z0-9]+`);
    return regex.test(this.addressAndPhoneNumber);
  }

  checkOutSucessful() {
    if (this.addressAndPhoneNumber === undefined || this.regexAddress() === false) {
      this.toast.presentToast('Please enter delivery address & your phone number!');
      return;
    }

    if (this.shipcod === true && this.masterCart === true) {
      this.toast.presentToast('Please choose one in two option for checkout!');
      return;
    }

    if (this.shipcod === true && this.masterCart === false || this.shipcod === true && this.masterCart === undefined) {
      this.toast.presentToast('Checkout successfull! ^^');
      this.doneCheckout();
      return;
    }

    if (this.masterCart === true && this.shipcod === false || this.masterCart === true && this.shipcod === undefined) {
      if (this.cardNumber === undefined ||
        this.cardHolder === undefined ||
        this.dateCheckout === undefined ||
        this.securityCode === undefined) {
        this.toast.presentToast('Please enter all fields!');
        return;
      } else {
        this.toast.presentToast('Checkout successfull! ^^');

        this.doneCheckout();
        return;
      }
    }
  }

  async doneCheckout() {
    await this.handleCheckout();
    await this.toast.presentToast('Checkout succesfully! Thank you');
    await this.route.navigateByUrl('checkout-success');
  }

  goBack() {
    this.location.back();
  }
}

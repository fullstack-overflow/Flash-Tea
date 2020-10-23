import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../services/crud.service';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { ToastService } from '../../services/toast.service';

import { Location } from '@angular/common';

import { ItemsDataService } from '../../services/items-data.service';


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
  currentUser: any;
  total = '';

  constructor(
    // private crudService: CrudService,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    public toast: ToastService,
    private location: Location,
    public itemsDataService: ItemsDataService
  ) {

    this.total = localStorage.getItem('total');
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.itemsDataService.initItemsData();
  }

  ionViewDidEnter() {

  }

  ionViewDidLeave() {

  }

  getDataItemsLocal(key: string): object | null {
    const dataItemStorage = JSON.parse(localStorage.getItem(key));
    return dataItemStorage;
  }

  deleteItem(key: string) {
    const dataItemStorage = JSON.parse(localStorage.getItem(key));
    const count = JSON.parse(localStorage.getItem('count'));
    const totalItem = JSON.parse(localStorage.getItem('total'));
    localStorage.setItem('total', (Number(totalItem) - (Number(dataItemStorage.price) * Number(dataItemStorage.quantity))).toString());
    localStorage.setItem('count', (Number(count) - Number(dataItemStorage.quantity)).toString());
    this.total = localStorage.getItem('total');
    return localStorage.removeItem(key);
  }

  goBack() {
    this.location.back();
  }

  navigateToCheckout() {
    this.router.navigateByUrl('checkout');
  }
}

import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../shared/crud.service';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { ToastService } from '../../shared/toast.service';

import { ItemsDataService } from '../../shared/items-data.service';

import { AddToCartService } from 'src/app/shared/add-to-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: any;
  countNumber = 0;

  constructor(
    public itemsDataService: ItemsDataService,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    public toast: ToastService,
    public addToCartService: AddToCartService
  ) {
  }

  async ngOnInit() {

  }

  async initLocalStorage() {
    this.currentUser = await JSON.parse(localStorage.getItem('user'));
    this.countNumber = JSON.parse(localStorage.getItem('count'));
  }

  async ionViewWillEnter() {
    await this.itemsDataService.initItemsData();
    await this.initLocalStorage();
    await this.deleteCartStorage();
  }

  async ionViewDidEnter() {

  }

  ionViewDidLeave() {
  }

  navigateToCartPage() {
    this.router.navigateByUrl('cart');
  }

  navigateToDetailItem(id: string) {
    this.router.navigate([`item/${id}`]);
  }

  deleteCartStorage() {
    const getUserStorage = JSON.parse(localStorage.getItem('user'));
    if (getUserStorage === null) {
      return;
    } else {
      this.itemsDataService.items.forEach(item => {
        if (item.id in localStorage && (JSON.parse(localStorage.getItem(item.id))).idUser !== getUserStorage.uid) {
          localStorage.removeItem(item.id);
          localStorage.removeItem('count');
          localStorage.removeItem('total');
        }
      });
    }
    this.countNumber = JSON.parse(localStorage.getItem('count'));
  }

  async checkAndAddToCart(idItem, countNumber) {
    await this.deleteCartStorage();
    await this.addToCart2(idItem, countNumber);
  }

  async addToCart2(idItem, countNumber) {
    const getItemLocalStorage = await JSON.parse(localStorage.getItem(idItem));
    const getCountLocalStorage = await JSON.parse(localStorage.getItem('count'));
    const totalLocalStorage = await JSON.parse(localStorage.getItem('total'));
    await this.addToCartService.addToCart2(
      idItem, this.itemsDataService.items, countNumber,
      getItemLocalStorage, getCountLocalStorage, totalLocalStorage);
    this.countNumber = await JSON.parse(localStorage.getItem('count'));
  }
}

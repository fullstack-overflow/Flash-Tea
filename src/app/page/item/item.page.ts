import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemsDataService } from '../../services/items-data.service';

import { ToastService } from '../../services/toast.service';

import { AddToCartService } from '../../services/add-to-cart.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  idItem: string;
  currentUser: any;
  countNumber = 0;

  name = '';
  price = 0;
  img = '';

  itemDetail: object;

  constructor(
    private router: Router,
    public itemsDataService: ItemsDataService,
    public toats: ToastService,
    public addToCartService: AddToCartService,
    private location: Location
  ) {
    this.idItem = this.router.url.split(`/item/`).join(``);
  }

  async ngOnInit() {
    await this.initLocalStorage();
    await this.callItemsDataService(this.idItem);
  }

  async ionViewWillEnter() {
    if (this.itemsDataService.itemDetail === undefined) {
      await this.toats.presentToast('Item detail page not ready, please try again! Thank you');
      await this.router.navigate(['root/home']);
    }
  }

  async ionViewDidEnter() {
    if (this.itemsDataService.itemDetail !== undefined) {
      this.name = await this.itemsDataService.itemDetail.name;
      this.price = await Number(this.itemsDataService.itemDetail.price);
      this.img = await this.itemsDataService.itemDetail.img;
      this.itemDetail = await this.itemsDataService.itemDetail;
    }
  }

  async initLocalStorage() {
    this.currentUser = await JSON.parse(localStorage.getItem('user'));
    this.countNumber = await JSON.parse(localStorage.getItem('count'));
  }

  async callItemsDataService(itemID) {
    await this.itemsDataService.initItemDetail(itemID);
  }

  addToCart(itemDetail, countNumber) {
    const getItemLocalStorage = JSON.parse(localStorage.getItem(itemDetail.id));
    const getCountLocalStorage = JSON.parse(localStorage.getItem('count'));
    const getTotalLocalStorage = JSON.parse(localStorage.getItem('total'));

    // this.addToCartService.addToCartDetailItems(this.itemDetail, this.countNumber)
    this.addToCartService.addToCartDetailItems(itemDetail, countNumber, getItemLocalStorage, getCountLocalStorage, getTotalLocalStorage);
  }

  click() {
    console.log(this.itemsDataService.itemDetail.name);
  }

  goBack() {
    this.location.back();
  }
}

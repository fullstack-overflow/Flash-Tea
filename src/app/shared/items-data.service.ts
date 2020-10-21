import { Injectable } from '@angular/core';

import { Items, Items2 } from '../types/items';

import { CrudService } from './crud.service';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {

  items: Items2[] = [];
  itemDetail: any;

  constructor(
    private crudService: CrudService,
    public ngFireAuth: AngularFireAuth,
  ) { }

  initItemsData(): void {
    this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          // tslint:disable-next-line:no-string-literal
          name: e.payload.doc.data()['name'],
          // tslint:disable-next-line:no-string-literal
          price: e.payload.doc.data()['price'],
          // tslint:disable-next-line:no-string-literal
          img: e.payload.doc.data()['img'],
          quantity: 0,
          // tslint:disable-next-line:no-string-literal
          description: e.payload.doc.data()['description'],
          // tslint:disable-next-line:no-string-literal
          shopName: e.payload.doc.data()['shopName']
        };
      });
    });
  }

  // initItems(currentUser): void {
  //   if (currentUser === null) {
  //     this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
  //       this.items = data.map(e => {
  //         return {
  //           id: e.payload.doc.id,
  //           // tslint:disable-next-line:no-string-literal
  //           name: e.payload.doc.data()['name'],
  //           // tslint:disable-next-line:no-string-literal
  //           price: e.payload.doc.data()['price'],
  //           // tslint:disable-next-line:no-string-literal
  //           sale: e.payload.doc.data()['sale'],
  //           // tslint:disable-next-line:no-string-literal
  //           img: e.payload.doc.data()['img'],
  //           quantity: 0,
  //           // tslint:disable-next-line:no-string-literal
  //           idUser: null
  //         };
  //       });
  //     });
  //   } else {
  //     this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
  //       this.items = data.map(e => {
  //         return {
  //           id: e.payload.doc.id,
  //           // tslint:disable-next-line:no-string-literal
  //           name: e.payload.doc.data()['name'],
  //           // tslint:disable-next-line:no-string-literal
  //           price: e.payload.doc.data()['price'],
  //           // tslint:disable-next-line:no-string-literal
  //           sale: e.payload.doc.data()['sale'],
  //           // tslint:disable-next-line:no-string-literal
  //           img: e.payload.doc.data()['img'],
  //           quantity: 0,
  //           // tslint:disable-next-line:no-string-literal
  //           idUser: currentUser['uid']
  //         };
  //       });
  //     });
  //   }
  // }

  initItemDetail(currentUser, itemId: string): void {
    if (currentUser === null) {
      this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
        this.itemDetail = data.map(e => {
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
        }).find(item => {
          return item.id === itemId;
        });
      });
    } else {
      this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
        this.itemDetail = data.map(e => {
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
            idUser: currentUser['uid']
          };
        }).find(item => {
          return item.id === itemId;
        });
      });
    }
  }
}

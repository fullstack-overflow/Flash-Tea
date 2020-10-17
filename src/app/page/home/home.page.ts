import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../shared/crud.service';

interface ItemArray {
  name: string;
  img: string;
  price: number;
  sale: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: ItemArray[] = [];

  constructor(
    private crudService: CrudService
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
          img: e.payload.doc.data()['img']
        };
      });
      // tslint:disable-next-line:no-string-literal
    });
  }
}

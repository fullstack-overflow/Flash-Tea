import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../shared/crud.service';

interface ItemArray {
  name: string;
  img: string;
  price: number;
  sale: number;
}

interface ItemArray2 {
  name: string;
  img: string;
  real: string;
  sale: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  itemList: ItemArray[] = [];

  public items: ItemArray2[] = [
    {
      img: '../../../assets/items/BlueSky.png',
      name: 'Trà sữa trân châu đường đen',
      real: '45 000',
      sale: '30 000',
    },
    {
      img: '../../../assets/items/milktea.png',
      name: 'Trà sữa trân châu đường đen',
      real: '45 000',
      sale: '30 000'
    },
    {
      img: '../../../assets/items/milktea.png',
      name: 'Trà sữa trân châu đường đen',
      real: '45 000',
      sale: '30 000'
    },
    {
      img: '../../../assets/items/milktea.png',
      name: 'Trà sữa trân châu đường đen',
      real: '45 000',
      sale: '30 000'
    },
    {
      img: '../../../assets/items/milktea.png',
      name: 'Trà sữa trân châu đường đen',
      real: '45 000',
      sale: '30 000'
    },
    {
      img: '../../../assets/items/milktea.png',
      name: 'Trà sữa trân châu đường đen',
      real: '45 000',
      sale: '30 000'
    }
  ];

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.crudService.getItemsFromFirebaseCloud().subscribe(data => {
      // this.itemList = data.map(e => {
      //   return {
      //     // id: e.payload.doc.id,
      //     // isEdit: false,
      //     // name: e.payload.doc.data().name,
      //     // price: e.payload.doc.data().price,
      //     // sale: e.payload.doc.data().Address,
      //     // img: e.payload.doc.data().img
      //   };
      // });
      data.map(e => {
        console.log(e.payload.doc.data().img);
      });
      console.log(this.itemList);
      console.log(data);
    });
  }
}

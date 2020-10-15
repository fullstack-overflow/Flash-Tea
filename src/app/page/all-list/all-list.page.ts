import { Component, OnInit } from '@angular/core';

interface ItemArray {
  img: string;
  name: string;
  real: string;
  sale: string;
}

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.page.html',
  styleUrls: ['./all-list.page.scss'],
})
export class AllListPage implements OnInit {

  public items: ItemArray[] = [
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
  constructor() { }

  ngOnInit() {
  }

}

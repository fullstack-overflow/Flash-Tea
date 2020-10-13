import { Component, OnInit } from '@angular/core';

interface ItemArray {
  img: string;
  name: string;
  real: string;
  sale: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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

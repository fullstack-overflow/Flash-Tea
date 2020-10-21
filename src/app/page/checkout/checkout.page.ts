import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  address: string;
  shipcod: boolean;
  masterCart: boolean;
  cardNumber: string;
  cardHolder: string;
  dateCheckout: string;
  securityCode: number;
  total: number;
  constructor(
    public toast: ToastService,
    private route: Router
  ) { }

  ngOnInit() {
    this.total = Number(JSON.parse(localStorage.getItem('total')));
  }


  regexAddress(): boolean {
    const regex = new RegExp(`[A-Za-z0-9'\.\-\s\,]+[a-zA-Z0-9]+`);
    return regex.test(this.address);
  }

  checkOutSucessful() {
    if (this.address === undefined || this.regexAddress() === false) {
      this.toast.presentToast('Please enter your address!');
    }

    if (this.shipcod === true && this.masterCart === true) {
      this.toast.presentToast('Please choose one in two option for checkout!');
    }

    if (this.shipcod === true && this.masterCart === false || this.shipcod === true && this.masterCart === undefined) {
      this.doneCheckout();
    }

    if (this.masterCart === true && this.shipcod === false || this.masterCart === true && this.shipcod === undefined) {
      if (this.cardNumber === undefined ||
        this.cardHolder === undefined ||
        this.dateCheckout === undefined ||
        this.securityCode === undefined) {
        this.toast.presentToast('Please enter all fields!');
      } else {
        this.doneCheckout();
      }
    }
  }

  doneCheckout() {
    this.route.navigateByUrl('checkout-success');
  }
}

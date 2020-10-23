import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '../../shared/toast.service';

import { CrudService } from '../../shared/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';


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
    private route: Router,
    public crudService: CrudService,
    private firestore: AngularFirestore
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
      return;
    }

    if (this.shipcod === true && this.masterCart === true) {
      this.toast.presentToast('Please choose one in two option for checkout!');
      return;
    }

    if (this.shipcod === true && this.masterCart === false || this.shipcod === true && this.masterCart === undefined) {
      const id = this.firestore.createId();
      this.toast.presentToast('Checkout successfull! ^^');
      // this.crudService.setCheckoutData(id, );
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

  doneCheckout() {
    this.route.navigateByUrl('checkout-success');
  }
}
